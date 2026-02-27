/**
 * RAG Service - AI-Powered Semantic Search using Groq
 */

const Groq = require('groq-sdk');
const datasetService = require('./datasetService');

class RAGService {
  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️  GROQ_API_KEY not found. RAG service will use fallback mode.');
      this.groq = null;
    } else {
      this.groq = new Groq({ apiKey });
      console.log('✅ Groq AI initialized for RAG');
    }
    
    this.model = 'llama-3.3-70b-versatile';
  }

  /**
   * Initialize RAG service - load dataset
   */
  async initialize() {
    try {
      await datasetService.loadDataset();
      console.log('✅ RAG Service initialized');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize RAG service:', error);
      return false;
    }
  }

  /**
   * Analyze symptoms using AI and dataset
   */
  async analyzeSymptoms(symptoms, patientContext = {}) {
    try {
      // Get basic matches from dataset
      const datasetMatches = datasetService.searchBySymptoms(symptoms);
      
      // If no Groq API key, return basic matches
      if (!this.groq) {
        return this._formatBasicResponse(symptoms, datasetMatches);
      }
      
      // Use Groq AI for advanced analysis
      const aiAnalysis = await this._performAIAnalysis(symptoms, datasetMatches, patientContext);
      
      return {
        success: true,
        analysis: aiAnalysis,
        datasetMatches: datasetMatches.slice(0, 10),
        matchCount: datasetMatches.length,
        source: 'ai-enhanced'
      };
    } catch (error) {
      console.error('Error in RAG analysis:', error);
      
      // Fallback to basic analysis
      const datasetMatches = datasetService.searchBySymptoms(symptoms);
      return this._formatBasicResponse(symptoms, datasetMatches);
    }
  }

  /**
   * Perform AI analysis using Groq
   */
  async _performAIAnalysis(symptoms, datasetMatches, patientContext) {
    const symptomList = Array.isArray(symptoms) 
      ? symptoms.join(', ') 
      : symptoms;
    
    // Build context from top matches
    const topMatches = datasetMatches.slice(0, 5);
    const diseaseContext = topMatches.map(m => 
      `- ${m.disease}: Common symptoms include ${m.symptoms.join(', ')}`
    ).join('\n');
    
    const prompt = `You are a medical triage AI assistant. Analyze the following symptoms and provide a professional assessment.

Patient Symptoms: ${symptomList}

${patientContext.age ? `Patient Age: ${patientContext.age}` : ''}
${patientContext.gender ? `Patient Gender: ${patientContext.gender}` : ''}

Related Conditions from Medical Database:
${diseaseContext || 'No direct matches found in database'}

Provide a structured analysis including:
1. Possible conditions (list 3-5 most likely based on symptoms)
2. Urgency level (Emergency, Urgent, Moderate, Low)
3. Recommended actions
4. When to seek immediate care
5. General advice

Format as JSON with keys: possibleConditions (array), urgencyLevel (string), urgencyScore (1-10), recommendedActions (array), seekImmediateCareIf (array), generalAdvice (string)`;

    const completion = await this.groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a medical triage assistant. Provide accurate, helpful medical guidance. Always remind users to consult healthcare professionals for proper diagnosis.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: this.model,
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from AI');
    }

    return JSON.parse(response);
  }

  /**
   * Format basic response without AI
   */
  _formatBasicResponse(symptoms, datasetMatches) {
    const topMatches = datasetMatches.slice(0, 5);
    
    return {
      success: true,
      analysis: {
        possibleConditions: topMatches.map(m => ({
          name: m.disease,
          matchScore: m.matchScore,
          symptoms: m.symptoms
        })),
        urgencyLevel: 'Moderate',
        urgencyScore: 5,
        recommendedActions: [
          'Monitor your symptoms',
          'Rest and stay hydrated',
          'Consult a healthcare provider if symptoms persist or worsen'
        ],
        seekImmediateCareIf: [
          'Symptoms suddenly worsen',
          'You experience difficulty breathing',
          'You have severe pain',
          'You develop a high fever'
        ],
        generalAdvice: 'Based on your symptoms, we recommend consulting with a healthcare professional for proper diagnosis and treatment.'
      },
      datasetMatches: topMatches,
      matchCount: datasetMatches.length,
      source: 'dataset-only'
    };
  }

  /**
   * Get medical recommendations using AI
   */
  async getMedicalRecommendations(symptoms, diagnosis, patientHistory = {}) {
    if (!this.groq) {
      return {
        success: false,
        message: 'AI service not available. Please configure GROQ_API_KEY.'
      };
    }

    try {
      const prompt = `Provide medical recommendations for a patient with the following:

Symptoms: ${Array.isArray(symptoms) ? symptoms.join(', ') : symptoms}
Potential Diagnosis: ${diagnosis}
${patientHistory.medications ? `Current Medications: ${patientHistory.medications}` : ''}
${patientHistory.allergies ? `Allergies: ${patientHistory.allergies}` : ''}

Provide recommendations including:
1. Lifestyle modifications
2. Home care strategies
3. When to follow up with a doctor
4. Warning signs to watch for

Format as JSON with keys: lifestyleModifications (array), homeCare (array), followUp (string), warningSigns (array)`;

      const completion = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are a medical assistant providing patient education and recommendations. Always emphasize the importance of professional medical advice.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        model: this.model,
        temperature: 0.4,
        max_tokens: 1500,
        response_format: { type: 'json_object' }
      });

      const response = completion.choices[0]?.message?.content;
      return {
        success: true,
        recommendations: JSON.parse(response)
      };
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return {
        success: false,
        message: 'Failed to generate recommendations'
      };
    }
  }

  /**
   * Search diseases semantically
   */
  async semanticSearch(query, limit = 10) {
    try {
      const symptoms = query.split(/,|\s+/).filter(s => s.length > 2);
      const matches = datasetService.searchBySymptoms(symptoms);
      
      return {
        success: true,
        results: matches.slice(0, limit),
        totalMatches: matches.length,
        query
      };
    } catch (error) {
      console.error('Semantic search error:', error);
      return {
        success: false,
        message: 'Search failed',
        error: error.message
      };
    }
  }

  /**
   * Get service status
   */
  getStatus() {
    const datasetStats = datasetService.getStats();
    
    return {
      ragService: 'running',
      aiEnabled: !!this.groq,
      dataset: datasetStats,
      model: this.model
    };
  }
}

// Singleton instance
const ragService = new RAGService();

module.exports = ragService;
