import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are ClinRoute RAG Assistant, an intelligent medical triage assistant powered by retrieval-augmented generation. Your role is to:

1. Ask about symptoms in a conversational, empathetic manner
2. Gather relevant medical history when appropriate
3. Assess urgency level (Emergency, Urgent, Moderate, Low)
4. Recommend appropriate next steps (ER, Urgent Care, Schedule Appointment, Home Care)
5. Suggest relevant specialists if needed

IMPORTANT GUIDELINES:
- Always be empathetic and professional
- Never diagnose - only assess and recommend next steps
- For any chest pain, difficulty breathing, signs of stroke, severe bleeding, or loss of consciousness, immediately recommend emergency services
- Ask clarifying questions to better understand symptoms
- Provide educational information when helpful
- Always recommend consulting a healthcare professional for medical advice

Start by greeting the user and asking how you can help with their health concerns today.`;

export const createChatCompletion = async (messages) => {
  try {
    const chatMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: chatMessages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    });

    return completion.choices[0]?.message?.content || 'I apologize, but I encountered an error. Please try again.';
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error('Failed to get RAG response. Please try again.');
  }
};

export const assessUrgency = async (symptoms) => {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a medical triage RAG assistant. Based on the symptoms provided, assess the urgency level and respond with ONLY a JSON object in this exact format:
{
  "urgency": "emergency|urgent|moderate|low",
  "confidence": 0.0-1.0,
  "recommendation": "brief recommendation",
  "specialist": "suggested specialist or null"
}`
        },
        { role: 'user', content: symptoms }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 256
    });

    const response = completion.choices[0]?.message?.content || '';
    try {
      return JSON.parse(response);
    } catch {
      return {
        urgency: 'moderate',
        confidence: 0.5,
        recommendation: 'Please consult a healthcare provider',
        specialist: null
      };
    }
  } catch (error) {
    console.error('Urgency Assessment Error:', error);
    return null;
  }
};

export default groq;
