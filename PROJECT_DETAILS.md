# ClinRoute — AI-Powered Healthcare Triage Platform
### From Rule-Based Triage to Autonomous Clinical AI

---

## 📋 Executive Summary

> *"Most healthcare AI is a chatbot. ClinRoute's agent actually acts: it collects symptoms, reasons through a differential diagnosis, searches the medical database, books the appointment, and follows up on recovery — all autonomously. That's the difference between AI as a tool and AI as a clinical colleague."*

**ClinRoute** is an AI-powered hospital triage and clinical workflow platform currently in active development. We started by building a solid, production-ready foundation — patient portals, doctor dashboards, real-time communication, and a disease dataset — and we are now layering **autonomous agentic AI** on top of it to transform how clinical intake works.

This document covers three things in sequence:
1. **The Problem** — what is broken in healthcare today
2. **What We Built** — our current working solution (the MVP)
3. **What We Are Building Next** — how agentic AI changes everything

---

## 🚨 Part 1: The Problem

### Healthcare Intake Is Broken

When a patient falls sick today, the process looks like this:

```
Patient feels unwell
      ↓
Searches symptoms on Google (misinformation risk)
      ↓
Decides whether it's "worth going to a doctor"
      ↓
Calls clinic → holds for 15+ minutes
      ↓
Fills out a long static intake form (incomplete, frustrating)
      ↓
Waits days for an appointment (wrong specialty)
      ↓
Doctor receives incomplete intake data, spends time re-asking questions
      ↓
More delays, worse outcomes
```

### Three Core Failures

#### 1. Triage at Intake is Guesswork
Patients self-triage when deciding whether to visit urgent care or wait for a GP. Most lack the knowledge to do this accurately. Critical conditions like early sepsis, stroke, or cardiac events get dismissed as "flu" until it's too late. Clinics rely on static severity checkboxes, not reasoning.

#### 2. Doctors Receive Incomplete Information
Intake forms ask the same questions every time. Patients fill them out poorly because forms don't ask follow-up questions. A doctor opening a new case often spends the first 5-10 minutes asking questions the form should have answered. That's wasted clinical time multiplied across thousands of consultations.

#### 3. No Continuity After the Appointment
Most digital health platforms stop after the consultation. There is no automated follow-up. Recovery outcomes are untracked. If a patient's condition worsens at 11 PM, there is no system watching for it — they go back to Google.

### The Gap in Existing Solutions

| Solution | What It Does | What It Misses |
|---|---|---|
| Symptom checker apps (WebMD, Ada) | One-shot assessment | No action taken, no continuity |
| Booking platforms (Zocdoc, Practo) | Appointment scheduling | No clinical intelligence |
| EHR systems (Epic, Cerner) | Record keeping | No patient-facing intake intelligence |
| Chatbots (most health AI) | Answer single questions | No planning, no tool use, no follow-through |

**The gap:** There is no platform that reasons through symptoms, takes actions (search database, book appointment, notify doctor), and follows through to recovery — end to end, autonomously.

---

## 🏥 Part 2: What We Built — The Current Platform

### Overview
ClinRoute's MVP is a full-stack healthcare application that digitizes the patient journey from symptom submission to doctor consultation. It is live and functional with authentication, patient portals, doctor dashboards, AI-assisted chat, and a real-time backend.

### Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, React Router v6, Material-UI, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js, Socket.IO |
| **Primary DB** | Supabase (PostgreSQL) — auth + profiles |
| **Secondary DB** | MongoDB (Mongoose) — consultations, appointments, medical history |
| **AI** | Groq SDK, LLaMA 3.3 70B Versatile |
| **Real-time** | Socket.IO (WebSockets) |
| **Auth** | Supabase Auth (email/password + OAuth) |
| **Security** | Helmet.js, JWT, Bcrypt, Rate Limiting, RLS policies |

---

### System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         REACT FRONTEND                           │
│  ┌──────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  Public Pages│  │  Patient Portal  │  │  Doctor Portal   │  │
│  │  - Home      │  │  - Dashboard     │  │  - Dashboard     │  │
│  │  - For Docs  │  │  - Symptoms Form │  │  - Patient Queue │  │
│  │  - Security  │  │  - Consultations │  │  - Case View     │  │
│  │  - RAG Tech  │  │  - AI Chat       │  │  - Appointments  │  │
│  └──────────────┘  └──────────────────┘  └──────────────────┘  │
│                            │                                     │
│                    AuthContext (Supabase)                        │
└────────────────────────────┼─────────────────────────────────────┘
                             │ HTTP + WebSocket
                             │
┌────────────────────────────▼─────────────────────────────────────┐
│                      EXPRESS SERVER                               │
│                                                                   │
│   /api/auth   /api/patients   /api/doctors   /api/consultations  │
│   /api/triage   /api/appointments   /api/users                   │
│                                                                   │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                  AI SERVICES                             │   │
│   │  ┌──────────────────┐    ┌──────────────────────────┐  │   │
│   │  │   RAG Service    │    │    Dataset Service        │  │   │
│   │  │  (Groq LLaMA)    │───▶│  (1000 diseases CSV)     │  │   │
│   │  └──────────────────┘    └──────────────────────────┘  │   │
│   └─────────────────────────────────────────────────────────┘   │
│                        │                                         │
│          ┌─────────────┴──────────────┐                         │
│   ┌──────▼──────┐             ┌───────▼───────┐                │
│   │   MongoDB   │             │    Supabase   │                │
│   │ consultations│             │  profiles +  │                │
│   │ appointments │             │  auth.users  │                │
│   │  patients   │             └───────────────┘                │
│   └─────────────┘                                               │
└──────────────────────────────────────────────────────────────────┘
```

---

### What Users See Today

#### For Patients

**1. Symptom Submission (`/patient/submit-symptoms`)**
A 3-step guided form:
- **Step 1**: Select from common symptoms (headache, fever, cough, fatigue, nausea, body pain) via icon-based cards
- **Step 2**: Rate severity on a 1–10 scale, specify duration (hours/days/weeks)
- **Step 3**: Add free-text description + medical history context

On submission, our backend runs a **rule-based triage algorithm** that:
- Multiplies severity by a weight factor (×2)
- Scans for urgent keywords (+30 points per urgent symptom)
- Adds points for duration, age extremes, and chronic conditions
- Normalizes to a 0–100 score → assigns Critical / High / Medium / Low priority

Then the **RAG Service** kicks in:
1. Searches the 1000-disease CSV for symptom keyword matches
2. Passes top 5 matches + patient demographics to Groq LLaMA 3.3 70B
3. AI returns structured JSON: possible conditions, urgency level, recommended actions

**2. AI Health Assistant (`/chat`)**
A conversational chatbot interface where patients can:
- Type symptoms and get assessment
- Ask general health questions
- Get urgency warnings if critical symptoms detected
- Be directed to submit a formal consultation

*Current limitation: This is a **single-call reactive chatbot**. Each message is its own LLM call. There is no planning, tool use, or autonomous action. It can tell you what might be wrong — it cannot do anything about it.*

**3. Consultation Tracking (`/patient/consultations`)**
- View all past and active consultations
- See assigned doctor, triage priority, status
- View detailed AI analysis per case

**4. Nearby Doctors (`/patient/doctors`)**
- Browse available doctors by specialty
- View credentials, fees, hospital affiliation, ratings

**5. Dashboard (`/patient/dashboard`)**
- Overview of active consultations, upcoming appointments, health summary

#### For Doctors

**1. Patient Queue (`/doctor/queue`)**
The core workflow page. Doctors see every incoming consultation, sorted by triage score highest-first. Columns include:
- Patient demographics (age, gender)
- Primary symptom + additional symptoms
- Triage priority badge (color-coded: red/amber/blue/green)
- Wait time (calculated from submission time)
- AI analysis snippet

Data is fetched live from Supabase consultations table with real-time updates via Socket.IO.

**2. Case View (`/doctor/case/:id`)**
Full detail panel when a doctor opens a case:
- Left panel: Patient information, medical history, allergies
- Center panel: Symptoms, AI differential diagnoses, risk factors
- Right panel: Action buttons (start consultation, refer, prescribe, close)

**3. Appointments (`/doctor/appointments`)**
Calendar and list view of scheduled appointments with patients.

**4. Profile Management (`/doctor/profile`)**
Public-facing profile with specialty, credentials, availability, consultation fee.

---

### Database Design

#### Supabase PostgreSQL — `profiles` table (single-table architecture)

```sql
profiles {
  id              UUID  (auth.users FK)
  role            TEXT  ('patient' | 'doctor')
  name, phone, avatar, profile_complete

  -- Patient fields
  age, weight, height, blood_group, gender, dob
  address, emergency_contact, family_members (JSONB)

  -- Doctor fields
  specialty, doctor_id, license_number
  hospital_name, hospital_address, bio
  experience, consultation_fee
}
```

Row Level Security (RLS) ensures each user can only read/write their own row.

#### MongoDB — Collections

| Collection | Purpose |
|---|---|
| `consultations` | Full consultation records including symptoms, triage scores, AI analysis, timeline |
| `patients` | Medical history, allergies, medications, surgeries, family history |
| `doctors` | Credentials, certifications, hospital affiliations, availability schedule |
| `appointments` | Scheduled visits with location, type, reminder logs |
| `users` | Base user record (name, email, role) |

---

### Security & Compliance

| Layer | Implementation |
|---|---|
| **Auth** | Supabase Auth (JWT + OAuth) |
| **API protection** | Express JWT middleware on all protected routes |
| **Row security** | Supabase RLS — users can only access their own data |
| **Rate limiting** | 100 req/15 min per IP via express-rate-limit |
| **HTTP headers** | Helmet.js (CSP, HSTS, XSS filter, no-sniff) |
| **Input validation** | Express Validator on all incoming requests |
| **Password hashing** | Bcrypt (12 salt rounds) |
| **HIPAA readiness** | Audit trails, encrypted transit, access controls |

---

### Current AI Pipeline

```
Patient submits symptoms
         │
         ▼
triageController.analyzeSymptoms()
  ├─ Rule-based scoring (severity × weight + urgency keywords + age/history)
  └─ Priority: critical / high / medium / low

         │
         ▼
ragService.analyzeSymptoms()
  ├─ datasetService.searchBySymptoms()  ← queries 1000-disease CSV
  ├─ Build context from top 5 matching diseases
  ├─ Groq API call (LLaMA 3.3 70B)
  │    Prompt: symptoms + patient context + disease matches
  │    Response: { possibleConditions, urgencyLevel, urgencyScore,
  │               recommendedActions, seekImmediateCareIf, generalAdvice }
  └─ Return structured analysis to frontend
```

### The Core Problem With the Current AI

**It reacts. It does not act.**

- The triage scoring is rule-based keyword matching — not reasoning  
- The RAG service makes **one LLM call** and returns text — no follow-through  
- The chat assistant answers questions — it cannot book appointment, create records, notify doctors  
- There is no system that asks follow-up questions, gathers complete intake data, then autonomously takes action  

This is what we fix with Agentic AI.

---

## 🤖 Part 3: What We're Building — Agentic AI

### What Is an Agent?

An **agent** is an LLM that doesn't just respond — it **plans**, **uses tools**, **takes actions**, and **loops until a goal is achieved** without human orchestration at every step.

Key properties:
| Property | Description |
|---|---|
| **Tool use** | The model calls real functions (DB queries, APIs, schedulers) |
| **Multi-step reasoning** | ReAct loop: Reason → Act → Observe → Reason again… |
| **Memory** | Maintains context across the entire conversation arc |
| **Autonomy** | Decides *what to do next* rather than just answering |

**The difference:**

```
Current (Reactive):
  Patient: "I have a headache"
  AI: "Headaches can be caused by tension, dehydration, or migraine..."
  → Nothing happens. Patient still doesn't have an appointment.

With Agent:
  Patient: "I have a headache"
  Agent thinks: "Need more info — duration, severity, associated symptoms?"
  Agent asks: "How long have you had it, and is it throbbing or constant?"
  Patient: "3 days, throbbing, with nausea and light sensitivity"
  Agent thinks: "Migraine vs meningitis. Check for fever/neck stiffness."
  Agent asks: "Any fever or neck stiffness?"
  Patient: "No"
  Agent thinks: "Likely migraine. Confirm with dataset."
  Agent calls: search_disease_dataset(["headache","nausea","light sensitivity"])
  Agent observes: "Migraine 92%, Cluster Headache 71%"
  Agent calls: create_consultation(triage="medium", hint="Migraine")
  Agent calls: find_available_doctor(specialty="neurology")
  Agent calls: schedule_appointment(doctor_id, patient_id, slot)
  Agent: "I've booked you with Dr. Rao (Neurology) tomorrow at 10 AM."
  → Patient has an appointment. Doctor has complete intake notes.
```

---

### Use Case 1 — Autonomous Pre-Consultation Agent ⭐ (Primary)

#### The Problem It Solves
- Patients fill out static forms → incomplete intake data
- Triage is rule-based scores → not clinical reasoning
- Chat assistants respond but take no action

#### What the Agent Does
When a patient types their first symptom, the agent autonomously runs a **complete clinical intake**:

```
Step 1:  REASON  — "Patient says 'headache'. Need duration, severity, associated symptoms."
Step 2:  ACT     — send_message(): Ask clarifying question
Step 3:  OBSERVE — "3 days, throbbing, with nausea and light sensitivity"
Step 4:  REASON  — "Migraine vs meningitis differential. Need: fever? neck stiffness?"
Step 5:  ACT     — send_message(): Ask follow-up
Step 6:  OBSERVE — "No fever, no neck stiffness"
Step 7:  REASON  — "Low-urgency migraine likely. Confirm against dataset."
Step 8:  ACT     — search_disease_dataset(["headache","nausea","light sensitivity"])
Step 9:  OBSERVE — Migraine 92%, Cluster Headache 71%
Step 10: ACT     — create_consultation(triage_level="medium", hint="Migraine")
Step 11: ACT     — find_available_doctor(specialty="neurology", urgency="medium")
Step 12: ACT     — schedule_appointment(doctor_id, patient_id, slot)
Step 13: DONE    — Patient notified. Doctor queue updated.
```

#### Demo Flow (Judges See)
1. Patient types: *"I have a bad headache"*
2. UI shows animated agent "thinking" bubbles in real-time (streamed via Socket.IO)
3. Agent asks 2–3 targeted clarifying questions
4. Agent searches dataset, creates consultation, books appointment — all live on screen
5. Patient receives confirmation; doctor's queue updates instantly

---

### Use Case 2 — Doctor's AI Co-Pilot Agent

#### The Problem It Solves
Doctors spend 5–10 minutes re-gathering intake information and 15–20 minutes writing clinical notes per patient. That is time taken away from actual care.

#### What the Agent Does
When a doctor opens a case, the agent autonomously:
1. Pulls patient's full history from MongoDB
2. Searches the disease dataset for differential diagnoses
3. Checks existing medications for contraindications
4. Drafts a complete **SOAP note** (Subjective, Objective, Assessment, Plan)
5. Suggests specialist referrals if needed

The doctor gets a ready-made clinical summary — they verify, edit, and approve.

#### Demo Flow
- Doctor opens a case in `DoctorCaseView`
- Agent streams SOAP note generation section by section via Socket.IO
- Doctor sees live AI reasoning → structured SOAP note appears in real-time

```
S — Subjective:  (auto-filled from patient's symptom submission + chat)
O — Objective:   (vitals if recorded, demographics)
A — Assessment:  (AI differential from dataset + LLM reasoning)
P — Plan:        (AI-recommended actions, referral suggestions)
```

---

### Use Case 3 — Autonomous Follow-up & Monitoring Agent

#### The Problem It Solves
Most platforms end at the appointment. No one tracks recovery. Worsening conditions go unnoticed until the patient is back in the ER.

#### What the Agent Does
After a consultation closes, a background agent monitors recovery:
- **Day 1**: Sends auto check-in message to patient
- **Worsening reported**: Re-runs triage → escalates to doctor automatically
- **No response in 48h**: Triggers doctor alert
- **Resolution confirmed**: Auto-closes case, updates all records

#### Implementation
A `node-cron` scheduled job triggers the agent loop for all open post-consultation records. The agent checks Supabase for status, messages via Socket.IO, and updates MongoDB accordingly.

---

### The Agent Architecture

#### Agent Loop (ReAct Pattern)

```
┌──────────────────────────────────────────────────────────┐
│                    AGENT LOOP                            │
│                                                          │
│  Patient message                                         │
│       │                                                  │
│       ▼                                                  │
│  ┌─────────────────────────────────────────────────┐    │
│  │  LLaMA 3.3 70B  (via Groq)                      │    │
│  │                                                 │    │
│  │  System prompt: clinical intake agent           │    │
│  │  Tools available: 5 tool definitions            │    │
│  │  Messages: full conversation history            │    │
│  └──────────────────┬──────────────────────────────┘    │
│                     │                                    │
│          ┌──────────▼────────────┐                      │
│          │ tool_calls in response?│                      │
│          └──────┬────────────────┘                      │
│                 │                                        │
│         NO ─────┤─────── YES                            │
│          │      │           │                            │
│          ▼      │           ▼                            │
│       Return    │    Execute tool(s)                     │
│       reply to  │    emit step to Socket.IO              │
│       patient   │    push result to messages[]           │
│                 │    → loop again                        │
│                 └──────────────────────────────────────  │
└──────────────────────────────────────────────────────────┘
```

#### Agent Tools (Function Definitions)

```javascript
const tools = [
  {
    name: "search_disease_dataset",
    description: "Search symptom-disease dataset for matching conditions",
    parameters: {
      symptoms: { type: "array", items: { type: "string" } }
    }
  },
  {
    name: "get_patient_history",
    description: "Retrieve patient's past consultations and medical history",
    parameters: {
      patient_id: { type: "string" }
    }
  },
  {
    name: "create_consultation",
    description: "Create a new consultation record with triage data",
    parameters: {
      patient_id:     { type: "string" },
      symptoms:       { type: "array" },
      triage_level:   { type: "string", enum: ["emergency", "high", "medium", "low"] },
      diagnosis_hint: { type: "string" }
    }
  },
  {
    name: "find_available_doctor",
    description: "Find available doctors by specialty and urgency level",
    parameters: {
      specialty: { type: "string" },
      urgency:   { type: "string" }
    }
  },
  {
    name: "schedule_appointment",
    description: "Schedule an appointment between patient and doctor",
    parameters: {
      doctor_id:  { type: "string" },
      patient_id: { type: "string" },
      preferred_time: { type: "string" }
    }
  }
];
```

#### Agent Core Loop (Implementation)

```javascript
// server/services/agentService.js
async function runPreConsultationAgent(patientId, initialMessage, emitStep) {
  const messages = [
    { role: "system", content: AGENT_SYSTEM_PROMPT },
    { role: "user",   content: initialMessage }
  ];

  while (true) {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      tools,
      tool_choice: "auto"
    });

    const choice = response.choices[0];
    messages.push(choice.message);

    // Agent finished — no more tool calls needed
    if (!choice.message.tool_calls) {
      emitStep({ type: "reply", content: choice.message.content });
      return { done: true, reply: choice.message.content };
    }

    // Execute each tool, stream result to UI, feed back to agent
    for (const toolCall of choice.message.tool_calls) {
      const args = JSON.parse(toolCall.function.arguments);

      // Emit "thinking" bubble to frontend in real-time
      emitStep({ type: "tool_call", tool: toolCall.function.name, args });

      // Execute actual tool (DB call, API call, etc.)
      const result = await executeTool(toolCall.function.name, args, patientId);

      // Emit result preview to frontend
      emitStep({ type: "tool_result", tool: toolCall.function.name, result });

      // Feed result back to agent's context
      messages.push({
        role:         "tool",
        tool_call_id: toolCall.id,
        content:      JSON.stringify(result)
      });
    }
    // Agent will reason on results and decide next action
  }
}
```

#### Agent System Prompt

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

### What Changes in the Codebase

#### New Files to Create

| File | Purpose |
|---|---|
| `server/services/agentService.js` | Core agent loop, tool definitions, tool executor |
| `server/routes/agent.js` | POST `/api/agent/consult` — triggers agent via HTTP |

#### Existing Files to Modify

| File | Change |
|---|---|
| `server/server.js` | Register `/api/agent` route, expose `io` for agent use |
| `client/src/pages/chat/AIHealthAssistant.js` | Replace single `createChatCompletion` call with agent endpoint + Socket.IO step listener |
| `client/src/pages/doctor/CaseView.js` | Add AI Co-Pilot panel for SOAP note generation |

#### New API Route

```
POST /api/agent/consult
  Body:    { message: "I have a bad headache" }
  Auth:    JWT required (patient)
  Effect:  Triggers agent loop
           Emits agent_step events via Socket.IO to patient's room
  Response: { done: true, reply: "I've booked you with Dr. Rao..." }
```

#### New Socket.IO Events

```javascript
// Server → Client
'agent_step'  →  {
  type: "tool_call"   // Agent is calling a tool
       | "tool_result" // Tool returned a result
       | "reply"       // Agent's final message to patient
  tool: "search_disease_dataset"  // (for tool_call / tool_result)
  args: { symptoms: ["headache", "nausea"] }
  result: [{ disease: "Migraine", symptoms: [...] }]
  content: "I've booked you with Dr. Rao..."  // (for reply)
}
```

#### Frontend Agent Step Rendering

Each Socket.IO `agent_step` event renders a different animated Framer Motion bubble:

| Step Type | UI Appearance |
|---|---|
| `tool_call` | Grey pulsing "thinking" bubble: *"Searching medical database…"* |
| `tool_result` | Subtle indented preview showing matched diseases |
| `reply` | Standard teal assistant message bubble with final text |

This makes the **agent's reasoning visible** — the most impactful part for any observer.

---

### Before vs. After Comparison

| Aspect | Current (MVP) | With Agentic AI |
|---|---|---|
| **Symptom intake** | Static 3-step form filled by patient | Agent asks targeted follow-up questions dynamically |
| **Triage** | Rule-based scoring (keyword weights) | LLM reasons through differential diagnoses |
| **Database search** | Called once after form submit | Agent calls it autonomously when it needs more info |
| **Booking** | Patient manually browses doctors | Agent finds and books the right specialist automatically |
| **Doctor intake** | Doctor re-reads incomplete form | Agent pre-generates complete SOAP note |
| **Follow-up** | Nothing — platform stops at appointment | Autonomous agent monitors recovery, escalates if needed |
| **AI type** | Reactive chatbot (single LLM call) | Agentic AI (ReAct loop with tool use) |

---

## 📐 Full Page & Feature Reference

### Public Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, features, how-it-works, testimonials |
| `/about` | About | Mission, team, technology |
| `/how-it-works` | How It Works | Step-by-step patient journey |
| `/for-doctors` | For Doctors | Benefits, features, onboarding |
| `/for-hospitals` | For Hospitals | Enterprise solutions, ROI |
| `/security` | Security | HIPAA, data protection, certifications |
| `/rag-technology` | RAG Technology | How the AI system works |
| `/login` | Login | Supabase auth |
| `/register` | Register | Role-based signup (patient/doctor) |
| `/privacy` | Privacy Policy | GDPR, data rights |
| `/terms` | Terms of Service | Usage rules, liability |
| `/hipaa` | HIPAA | Compliance explanation |
| `/cookies` | Cookie Policy | Cookie usage |
| `/faqs` | FAQs | Common questions by category |
| `/help-center` | Help Center | Knowledge base, support |
| `/contact` | Contact | Form + contact info |
| `/status` | System Status | API uptime, incidents |

### Patient Portal (Protected)

| Route | Page | Description |
|---|---|---|
| `/patient/dashboard` | Dashboard | Consultations overview, quick actions |
| `/patient/submit-symptoms` | Symptom Submission | 3-step form → triage |
| `/patient/consultations` | Consultations | List of all consultations |
| `/patient/consultation/:id` | Consultation Status | Timeline, AI analysis, doctor notes |
| `/patient/doctors` | Nearby Doctors | Browse and filter specialists |
| `/patient/reports` | Reports | Medical records, lab results |
| `/patient/settings` | Account Settings | Profile, medical history, privacy |
| `/chat` | AI Health Assistant | Conversational AI (→ becoming agent) |

### Doctor Portal (Protected)

| Route | Page | Description |
|---|---|---|
| `/doctor/dashboard` | Dashboard | Queue stats, today's appointments |
| `/doctor/queue` | Patient Queue | Prioritized list of pending consultations |
| `/doctor/case/:id` | Case View | Full patient case + AI analysis + actions |
| `/doctor/appointments` | Appointments | Calendar + list view |
| `/doctor/profile` | Profile | Public-facing professional profile |
| `/doctor/settings` | Settings | Credentials, availability, notifications |

---

## 🔗 API Reference

### Authentication
```
POST /api/auth/register       — Signup
POST /api/auth/login          — Login (returns JWT)
GET  /api/auth/me             — Current user
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Patient & Doctor
```
GET/PUT  /api/patients/:id              — Patient profile
GET      /api/patients/:id/consultations
GET      /api/doctors                   — Browse doctors
GET      /api/doctors/:id
POST     /api/doctors/:id/availability
```

### Consultations & Appointments
```
POST /api/consultations                  — Submit symptoms → create consultation
GET  /api/consultations/:id
PATCH /api/consultations/:id/status
POST /api/consultations/:id/assign       — Assign doctor
POST /api/appointments                   — Schedule appointment
DELETE /api/appointments/:id             — Cancel
```

### Triage & AI
```
POST /api/triage/analyze                 — RAG + AI symptom analysis
GET  /api/triage/diseases/search         — Query disease dataset
```

### Agent (New — Being Built)
```
POST /api/agent/consult                  — Trigger pre-consultation agent loop
POST /api/agent/summarize-case           — Doctor: generate SOAP note
```

---

## 🛠️ Development Setup

### Prerequisites
```
Node.js 18+
MongoDB 6+ (local or Atlas)
Supabase project (free tier)
Groq API key (free tier)
```

### Environment Variables
```env
# Server (.env in root)
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/clinroute
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GROQ_API_KEY=your-groq-api-key
JWT_SECRET=your-jwt-secret

# Client (.env in /client)
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GROQ_API_KEY=your-groq-api-key
```

### Install & Run
```bash
# Install all dependencies
npm run install:all

# Terminal 1 — Backend
cd server && npm run dev         # http://localhost:5000

# Terminal 2 — Frontend
cd client && npm start           # http://localhost:3000
```

### Database Setup
1. Create Supabase project at https://supabase.com
2. Open SQL Editor → paste contents of `sql/supabase-setup.sql` → Run
3. For MongoDB: start local `mongod` or use MongoDB Atlas connection string

---

## 🗺️ Roadmap

### ✅ Phase 1 — Foundation (Complete)
- [x] Supabase auth (email/password + OAuth)
- [x] Patient portal (symptom submission, consultations, dashboard)
- [x] Doctor portal (queue, case view, appointments)
- [x] Rule-based triage scoring
- [x] RAG service with Groq + 1000-disease dataset
- [x] Reactive AI health chat
- [x] Socket.IO real-time backend
- [x] Security hardening (Helmet, RLS, rate limiting, input validation)

### 🚀 Phase 2 — Agentic AI (Current / Hackathon Focus)
- [ ] `agentService.js` — ReAct loop with 5 tool definitions
- [ ] Agent API route (`POST /api/agent/consult`)
- [ ] Socket.IO `agent_step` event streaming
- [ ] Frontend: animated "thinking" bubbles per agent step
- [ ] Doctor Co-Pilot: SOAP note auto-generation
- [ ] Background follow-up monitoring agent (node-cron)

### 🔮 Phase 3 — Platform Expansion
- [ ] Video consultations (WebRTC / Twilio)
- [ ] Prescription management
- [ ] Payment processing (Stripe)
- [ ] Mobile apps (React Native)
- [ ] Multi-language support (i18n)
- [ ] Lab test ordering and results

### 🌐 Phase 4 — Enterprise
- [ ] Hospital admin dashboards
- [ ] Multi-hospital network
- [ ] FHIR health records interoperability
- [ ] Pharmacy integration
- [ ] Insurance verification
- [ ] Wearable device data ingestion

---

## 🏆 Why Agentic AI Wins

| Criterion | How ClinRoute Delivers |
|---|---|
| **True Agentic AI** | ReAct loop — the model plans, uses tools, acts, observes, loops |
| **Real-world impact** | Reduces intake time, catches urgent cases that static forms miss |
| **Technical depth** | Tool-calling API + streaming + Socket.IO + RAG + Agent combined |
| **Existing foundation** | Groq, Socket.IO, MongoDB, Supabase already fully integrated — not a throwaway prototype |
| **Demo clarity** | Visible "thinking" steps make agent reasoning tangible to any audience |

---

## ⚠️ Medical Disclaimer

ClinRoute is a healthcare technology platform designed to assist in triage and workflow automation. It is **not a substitute for professional medical advice, diagnosis, or treatment**. In case of a medical emergency, call emergency services immediately. Doctors using this platform are solely responsible for clinical decisions and patient care.

---

**Version**: 1.0.0 (MVP) → 2.0.0 (Agentic AI — In Progress)  
**Last Updated**: March 11, 2026  
**Status**: Active Development — Hackathon Phase
