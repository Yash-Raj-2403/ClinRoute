# ClinRoute — Agentic AI Hackathon Plan

## Pitch Statement

> "Most healthcare AI is a chatbot. ClinRoute's agent actually acts: it collects symptoms,
> reasons through a differential diagnosis, searches the medical database, books the appointment,
> and follows up on recovery — all autonomously. That's the difference between AI as a tool
> and AI as a clinical colleague."

---

## What is Agentic AI?

An **agent** is an LLM that doesn't just respond — it **plans**, **uses tools**, **takes actions**,
and **loops until a goal is achieved** without human orchestration at each step.

Key properties:
- **Tool use** — the model calls real functions (DB queries, APIs, schedulers)
- **Multi-step reasoning** — ReAct loop: Reason → Act → Observe → Reason…
- **Memory** — maintains context across the entire conversation arc
- **Autonomy** — decides *what to do next* rather than just answering

**The gap today:** ClinRoute's current chat (`AIHealthAssistant.js`) makes a single LLM call — a reactive chatbot.
The triage system (`triageController.js`) is rule-based scoring, not reasoning.
Wrapping these in an agent loop is the hackathon differentiator.

---

## Use Case 1 — Autonomous Pre-Consultation Agent ⭐ (Primary Demo)

### Problem
Patients fill out tedious symptom forms. Doctors receive incomplete intake data.
The triage score is rule-based, not reasoning-based.

### What the Agent Does
When a patient types an initial symptom, the agent autonomously runs a full clinical intake:

```
Step 1:  REASON  — "Patient says 'headache'. Need duration, severity, associated symptoms."
Step 2:  ACT     — Ask clarifying question → tool: send_message()
Step 3:  OBSERVE — "3 days, throbbing, with nausea and light sensitivity"
Step 4:  REASON  — "Migraine vs meningitis differential. Need: fever? neck stiffness?"
Step 5:  ACT     — Ask follow-up → tool: send_message()
Step 6:  OBSERVE — "No fever, no neck stiffness"
Step 7:  REASON  — "Low-urgency migraine likely. Confirm against dataset."
Step 8:  ACT     — tool: search_disease_dataset(["headache","nausea","light sensitivity"])
Step 9:  OBSERVE — Migraine 92%, Cluster Headache 71%
Step 10: ACT     — tool: create_consultation(triage_level="medium", hint="Migraine")
Step 11: ACT     — tool: find_available_doctor(specialty="neurology", urgency="medium")
Step 12: ACT     — tool: schedule_appointment(doctor_id, patient_id, slot)
Step 13: DONE    — Notify patient and doctor
```

### Demo Flow (Judges See)
1. Patient types: *"I have a bad headache"*
2. UI shows agent "thinking" bubbles in real-time (streamed via Socket.IO)
3. Agent asks 2–3 targeted clarifying questions
4. Agent searches dataset, creates consultation, books appointment — all live on screen
5. Patient receives confirmation; doctor's queue updates instantly

---

## Use Case 2 — Doctor's AI Co-Pilot Agent

### Problem
Doctors spend significant time reviewing intake notes and composing clinical documentation.

### What the Agent Does
When a doctor opens a case (`/doctor/case/:id`), the agent autonomously:
1. Pulls patient's full history from MongoDB
2. Searches the disease dataset for differential diagnosis
3. Checks existing medications for contraindications
4. Drafts a SOAP note (Subjective, Objective, Assessment, Plan)
5. Suggests a specialist referral if warranted

Doctor gets a ready-made clinical summary — they verify and approve.

### Demo Flow
- Doctor opens a case in DoctorCaseView
- Agent streams SOAP note generation in real-time
- Doctor sees "AI thinking" → structured note appears section by section

---

## Use Case 3 — Autonomous Follow-up & Monitoring Agent

### Problem
Most platforms drop off after the appointment. Recovery outcomes go untracked.

### What the Agent Does
After a consultation closes, a background agent monitors recovery:
- **Day 1:** Sends automated check-in message to patient
- **Worsening reported:** Re-runs triage → escalates to doctor automatically
- **No response in 48h:** Triggers doctor alert
- **Resolution:** Auto-closes case, updates records in MongoDB

### Implementation
A scheduled job (node-cron) triggers the agent loop for all open consultations.
The agent checks Supabase for status, messages via Socket.IO, and updates MongoDB.

---

## Implementation Plan

### Phase 1 — Agent Core (Day 1)

**New file:** `server/services/agentService.js`

Define tools wrapping existing backend operations:

```js
const tools = [
  {
    type: "function",
    function: {
      name: "search_disease_dataset",
      description: "Search symptom-disease dataset for matching conditions",
      parameters: {
        type: "object",
        properties: {
          symptoms: { type: "array", items: { type: "string" } }
        },
        required: ["symptoms"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "get_patient_history",
      description: "Retrieve patient's past consultations and medical history",
      parameters: {
        type: "object",
        properties: { patient_id: { type: "string" } },
        required: ["patient_id"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "create_consultation",
      description: "Create a new consultation record with triage data",
      parameters: {
        type: "object",
        properties: {
          patient_id:     { type: "string" },
          symptoms:       { type: "array" },
          triage_level:   { type: "string", enum: ["emergency","high","medium","low"] },
          diagnosis_hint: { type: "string" }
        },
        required: ["patient_id", "symptoms", "triage_level"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "find_available_doctor",
      description: "Find available doctors by specialty and urgency level",
      parameters: {
        type: "object",
        properties: {
          specialty: { type: "string" },
          urgency:   { type: "string" }
        },
        required: ["specialty"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "schedule_appointment",
      description: "Schedule an appointment between patient and doctor",
      parameters: {
        type: "object",
        properties: {
          doctor_id:      { type: "string" },
          patient_id:     { type: "string" },
          preferred_time: { type: "string" }
        },
        required: ["doctor_id", "patient_id"]
      }
    }
  }
];
```

**ReAct Agent Loop:**

```js
async function runPreConsultationAgent(patientId, initialMessage, emitStep) {
  const messages = [
    { role: "system", content: AGENT_SYSTEM_PROMPT },
    { role: "user",   content: initialMessage }
  ];

  while (true) {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",   // already used in ragService.js
      messages,
      tools,
      tool_choice: "auto"
    });

    const choice = response.choices[0];
    messages.push(choice.message);

    // Agent finished reasoning — return final message to patient
    if (!choice.message.tool_calls) {
      emitStep({ type: "reply", content: choice.message.content });
      return { done: true, reply: choice.message.content };
    }

    // Execute each tool call, stream result to UI, feed back to agent
    for (const toolCall of choice.message.tool_calls) {
      const args = JSON.parse(toolCall.function.arguments);
      emitStep({ type: "tool_call", tool: toolCall.function.name, args });

      const result = await executeTool(toolCall.function.name, args, patientId);
      emitStep({ type: "tool_result", tool: toolCall.function.name, result });

      messages.push({
        role:         "tool",
        tool_call_id: toolCall.id,
        content:      JSON.stringify(result)
      });
    }
    // Loop: agent reasons on results and picks next action
  }
}
```

**Agent System Prompt:**

```
You are a clinical intake agent for ClinRoute. Your goal is to:
1. Ask targeted clarifying questions to fully understand the patient's symptoms
2. Use the search_disease_dataset tool to identify likely conditions
3. Assess urgency level based on symptoms and patient history
4. Create a consultation record and schedule an appointment with the right specialist
5. Keep the patient informed at each step in plain, empathetic language

Ask no more than 4 clarifying questions before proceeding to action.
Always prioritize patient safety — escalate to "emergency" triage immediately
if symptoms suggest stroke, heart attack, severe respiratory distress, or sepsis.
```

---

### Phase 2 — New API Route (Day 1)

**New file:** `server/routes/agent.js`

```js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const agentService = require('../services/agentService');

// POST /api/agent/consult — triggers the pre-consultation agent loop
router.post('/consult', authenticate, async (req, res) => {
  const { message } = req.body;
  const patientId = req.user.id;

  // Emit each agent step over Socket.IO to the patient's room
  const emitStep = (step) => {
    req.app.get('io').to(`patient_${patientId}`).emit('agent_step', step);
  };

  const result = await agentService.runPreConsultationAgent(patientId, message, emitStep);
  res.json(result);
});

module.exports = router;
```

Register in `server/server.js`:
```js
app.use('/api/agent', require('./routes/agent'));
```

---

### Phase 3 — Frontend Agent UI (Day 2)

**File to update:** `client/src/pages/chat/AIHealthAssistant.js`

Replace the single `createChatCompletion` call with:
1. `POST /api/agent/consult` to trigger the agent on first message
2. Socket.IO listener for `agent_step` events
3. Render each step as an animated Framer Motion bubble:

| Event type    | Bubble style                                               |
|---------------|------------------------------------------------------------|
| `tool_call`   | Grey "thinking" bubble: *"Searching medical database…"*   |
| `tool_result` | Subtle indented preview of match results                   |
| `reply`       | Normal teal assistant message bubble                       |

This makes the agent's reasoning **visible** — the most impressive part for judges.

---

### Phase 4 — Doctor Co-Pilot (Day 2, if time permits)

**File to update:** `client/src/pages/doctor/CaseView.js`

Add an "AI Summary" panel that calls `POST /api/agent/summarize-case` on mount.

Agent tools: `get_patient_history`, `search_disease_dataset`, `generate_soap_note`

Stream the SOAP note generation section by section via Socket.IO.

---

## Build Priority

| Priority | Feature                                        | Demo Impact    | Effort |
|----------|------------------------------------------------|----------------|--------|
| 1        | Pre-consultation agent with live thinking stream | Extremely high | Medium |
| 2        | Tool-calling: dataset search + auto-schedule   | High           | Medium |
| 3        | Doctor SOAP note generation                    | High           | Low    |
| 4        | Follow-up monitoring agent                     | Medium         | High   |

---

## Files to Create / Modify

| Action | File |
|--------|------|
| **Create** | `server/services/agentService.js` |
| **Create** | `server/routes/agent.js` |
| **Modify** | `server/server.js` — register `/api/agent` route |
| **Modify** | `client/src/pages/chat/AIHealthAssistant.js` — swap to agent mode |
| **Modify** (optional) | `client/src/pages/doctor/CaseView.js` — add AI Co-Pilot panel |

---

## Why This Wins

| Criterion          | How ClinRoute Delivers                                                             |
|--------------------|------------------------------------------------------------------------------------|
| **Agentic AI**     | True ReAct loop — plans, uses tools, acts, observes, loops                         |
| **Real-world impact** | Reduces intake time, reduces missed urgent cases                                |
| **Technical depth** | Tool-calling API, streaming, Socket.IO, RAG + Agent combined                     |
| **Existing foundation** | Groq, Socket.IO, MongoDB, Supabase already integrated — no throwaway prototype |
| **Demo clarity**   | Visible "thinking" steps make agent behavior tangible to non-technical judges       |

---

## Tech Stack Summary

| Component          | Technology                                                              |
|--------------------|-------------------------------------------------------------------------|
| **LLM**            | Groq `llama-3.3-70b-versatile` (tool-calling supported, already wired) |
| **Agent pattern**  | ReAct (Reason + Act) via Groq function/tool calling API                 |
| **Streaming**      | Socket.IO (already in `server/server.js`)                               |
| **Disease knowledge** | `Diseases_1000_Symptoms_Balanced.csv` via `datasetService`           |
| **Persistence**    | MongoDB (consultations, appointments) + Supabase (profiles, auth)       |
| **Frontend**       | React + Framer Motion for animated agent step rendering                 |
