/**
 * Triage Controller - AI Triage Analysis
 */

const Consultation = require('../models/Consultation');
const Patient = require('../models/Patient');

/**
 * Triage Algorithm - Analyzes symptoms and returns triage assessment
 * This is a simplified rule-based system. In production, would integrate with AI/ML models.
 */
const analyzeSymptoms = (symptoms, patientData) => {
  // Priority scoring weights
  const severityWeights = {
    severity: 2,
    duration: 1.5,
    frequency: 1,
    urgentSymptoms: 3
  };

  // Urgent symptoms that increase priority
  const urgentSymptoms = [
    'chest pain', 'difficulty breathing', 'severe headache', 'loss of consciousness',
    'severe bleeding', 'high fever', 'confusion', 'seizure', 'severe allergic reaction',
    'stroke symptoms', 'heart attack symptoms', 'severe abdominal pain'
  ];

  // Calculate base score from symptoms
  let totalScore = 0;
  let maxPossibleScore = 0;
  const analyzedSymptoms = [];

  symptoms.forEach(symptom => {
    const severity = symptom.severity || 5;
    let symptomScore = severity * severityWeights.severity;

    // Check if symptom is urgent
    const isUrgent = urgentSymptoms.some(urgent => 
      symptom.name.toLowerCase().includes(urgent) || 
      (symptom.description && symptom.description.toLowerCase().includes(urgent))
    );

    if (isUrgent) {
      symptomScore += severityWeights.urgentSymptoms * 10;
    }

    // Duration factor
    if (symptom.duration) {
      if (symptom.duration.includes('hour')) symptomScore += 2;
      else if (symptom.duration.includes('day')) symptomScore += 3;
      else if (symptom.duration.includes('week')) symptomScore += 4;
    }

    totalScore += symptomScore;
    maxPossibleScore += 10 * severityWeights.severity + severityWeights.urgentSymptoms * 10 + 4;

    analyzedSymptoms.push({
      ...symptom,
      riskScore: symptomScore,
      isUrgent
    });
  });

  // Patient history factors
  if (patientData) {
    if (patientData.chronicConditions && patientData.chronicConditions.length > 0) {
      totalScore += 5; // Higher risk for patients with chronic conditions
    }
    if (patientData.age && patientData.age > 65) {
      totalScore += 3; // Higher risk for elderly
    }
    if (patientData.age && patientData.age < 5) {
      totalScore += 3; // Higher risk for young children
    }
  }

  // Normalize score to 0-100
  const normalizedScore = Math.min(100, (totalScore / maxPossibleScore) * 100);

  // Determine priority
  let priority;
  if (normalizedScore >= 80) priority = 'critical';
  else if (normalizedScore >= 60) priority = 'high';
  else if (normalizedScore >= 40) priority = 'medium';
  else priority = 'low';

  // Generate risk factors
  const riskFactors = [];
  if (symptoms.some(s => s.severity >= 8)) {
    riskFactors.push('High severity symptoms reported');
  }
  if (analyzedSymptoms.some(s => s.isUrgent)) {
    riskFactors.push('Urgent symptoms detected');
  }
  if (patientData?.chronicConditions?.length > 0) {
    riskFactors.push(`Patient has ${patientData.chronicConditions.length} chronic condition(s)`);
  }
  if (symptoms.length >= 5) {
    riskFactors.push('Multiple symptoms reported');
  }

  // Generate differential diagnosis suggestions
  const differentialDiagnosis = generateDifferentialDiagnosis(symptoms);

  // Generate recommended tests
  const recommendedTests = generateRecommendedTests(symptoms, differentialDiagnosis);

  // Generate recommended actions
  const recommendedActions = [];
  if (priority === 'critical') {
    recommendedActions.push('Immediate medical attention required');
    recommendedActions.push('Consider emergency services');
  } else if (priority === 'high') {
    recommendedActions.push('Schedule urgent consultation');
    recommendedActions.push('Monitor symptoms closely');
  } else if (priority === 'medium') {
    recommendedActions.push('Schedule routine consultation');
    recommendedActions.push('Track symptom progression');
  } else {
    recommendedActions.push('Self-care and monitoring recommended');
    recommendedActions.push('Consult if symptoms worsen');
  }

  return {
    priority,
    score: Math.round(normalizedScore),
    riskFactors,
    differentialDiagnosis,
    recommendedTests,
    recommendedActions,
    analyzedSymptoms,
    confidence: calculateConfidence(symptoms),
    timestamp: new Date()
  };
};

/**
 * Generate differential diagnosis based on symptoms
 */
const generateDifferentialDiagnosis = (symptoms) => {
  const symptomNames = symptoms.map(s => s.name.toLowerCase());
  const diagnoses = [];

  // Simplified symptom-to-diagnosis mapping
  const symptomDiagnoses = {
    'headache': ['Tension headache', 'Migraine', 'Cluster headache', 'Sinusitis'],
    'fever': ['Viral infection', 'Bacterial infection', 'COVID-19', 'Flu'],
    'cough': ['Upper respiratory infection', 'Bronchitis', 'Allergies', 'Pneumonia'],
    'chest pain': ['Angina', 'Musculoskeletal pain', 'GERD', 'Anxiety'],
    'abdominal pain': ['Gastritis', 'IBS', 'Appendicitis', 'Food poisoning'],
    'fatigue': ['Anemia', 'Thyroid disorder', 'Depression', 'Sleep disorder'],
    'shortness of breath': ['Asthma', 'COPD', 'Anxiety', 'Heart condition'],
    'nausea': ['Gastroenteritis', 'Food poisoning', 'Migraine', 'Pregnancy'],
    'dizziness': ['Vertigo', 'Low blood pressure', 'Dehydration', 'Anemia'],
    'back pain': ['Muscle strain', 'Herniated disc', 'Arthritis', 'Kidney stones']
  };

  // Collect potential diagnoses
  symptomNames.forEach(symptom => {
    Object.keys(symptomDiagnoses).forEach(key => {
      if (symptom.includes(key)) {
        symptomDiagnoses[key].forEach(diagnosis => {
          const existing = diagnoses.find(d => d.name === diagnosis);
          if (existing) {
            existing.confidence += 15;
          } else {
            diagnoses.push({
              name: diagnosis,
              confidence: 40 + Math.random() * 20
            });
          }
        });
      }
    });
  });

  // Sort by confidence and return top 5
  return diagnoses
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5)
    .map(d => ({
      ...d,
      confidence: Math.min(95, Math.round(d.confidence))
    }));
};

/**
 * Generate recommended tests based on symptoms and differential diagnosis
 */
const generateRecommendedTests = (symptoms, diagnoses) => {
  const tests = new Set();
  const symptomNames = symptoms.map(s => s.name.toLowerCase()).join(' ');

  // Basic tests
  if (diagnoses.length > 0) {
    tests.add('Complete Blood Count (CBC)');
    tests.add('Basic Metabolic Panel (BMP)');
  }

  // Symptom-specific tests
  if (symptomNames.includes('chest') || symptomNames.includes('heart')) {
    tests.add('ECG/EKG');
    tests.add('Cardiac enzymes');
    tests.add('Chest X-ray');
  }
  if (symptomNames.includes('fever') || symptomNames.includes('infection')) {
    tests.add('Blood culture');
    tests.add('Urinalysis');
  }
  if (symptomNames.includes('headache')) {
    tests.add('Neurological examination');
  }
  if (symptomNames.includes('abdominal')) {
    tests.add('Abdominal ultrasound');
    tests.add('Liver function tests');
  }
  if (symptomNames.includes('breathing') || symptomNames.includes('cough')) {
    tests.add('Chest X-ray');
    tests.add('Pulmonary function test');
    tests.add('Oxygen saturation');
  }
  if (symptomNames.includes('fatigue')) {
    tests.add('Thyroid panel');
    tests.add('Iron studies');
  }

  return Array.from(tests);
};

/**
 * Calculate confidence score for the analysis
 */
const calculateConfidence = (symptoms) => {
  let confidence = 70; // Base confidence

  // More detailed symptoms increase confidence
  symptoms.forEach(symptom => {
    if (symptom.description && symptom.description.length > 20) confidence += 2;
    if (symptom.duration) confidence += 2;
    if (symptom.severity) confidence += 1;
    if (symptom.location) confidence += 2;
  });

  return Math.min(95, confidence);
};

/**
 * @desc    Analyze symptoms (AI Triage)
 * @route   POST /api/triage/analyze
 * @access  Private
 */
exports.analyzeTriageSymptoms = async (req, res, next) => {
  try {
    const { symptoms, consultationId, patientId } = req.body;

    // Get patient data if available
    let patientData = null;
    if (patientId) {
      const patient = await Patient.findById(patientId)
        .populate('user', 'dateOfBirth');
      if (patient) {
        const age = patient.user.dateOfBirth 
          ? Math.floor((Date.now() - new Date(patient.user.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
          : null;
        patientData = {
          age,
          chronicConditions: patient.chronicConditions,
          allergies: patient.allergies,
          medications: patient.medications
        };
      }
    }

    // Perform triage analysis
    const triageResult = analyzeSymptoms(symptoms, patientData);

    // Update consultation if provided
    if (consultationId) {
      await Consultation.findByIdAndUpdate(consultationId, {
        triage: triageResult
      });
    }

    res.status(200).json({
      success: true,
      data: triageResult
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get triage insights for a consultation
 * @route   GET /api/triage/:consultationId/insights
 * @access  Private/Doctor
 */
exports.getTriageInsights = async (req, res, next) => {
  try {
    const consultation = await Consultation.findById(req.params.consultationId)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'dateOfBirth' }
      });

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    // Get patient's history for additional insights
    const patientHistory = await Consultation.find({
      patient: consultation.patient._id,
      _id: { $ne: consultation._id }
    })
      .select('symptoms diagnosis triage createdAt')
      .sort('-createdAt')
      .limit(10);

    // Analyze patterns
    const patterns = analyzePatientPatterns(consultation, patientHistory);

    res.status(200).json({
      success: true,
      data: {
        currentTriage: consultation.triage,
        historicalPatterns: patterns,
        recommendations: generateDoctorRecommendations(consultation, patterns)
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Analyze patient patterns from history
 */
const analyzePatientPatterns = (current, history) => {
  const patterns = {
    recurringSymptoms: [],
    consultationFrequency: 0,
    averagePriority: 0,
    trends: []
  };

  if (history.length === 0) return patterns;

  // Find recurring symptoms
  const symptomCount = {};
  history.forEach(h => {
    h.symptoms.forEach(s => {
      const name = s.name.toLowerCase();
      symptomCount[name] = (symptomCount[name] || 0) + 1;
    });
  });

  patterns.recurringSymptoms = Object.entries(symptomCount)
    .filter(([_, count]) => count >= 2)
    .map(([name, count]) => ({ name, occurrences: count }));

  // Calculate consultation frequency (per month)
  const oldestConsult = history[history.length - 1];
  const monthsDiff = (Date.now() - new Date(oldestConsult.createdAt)) / (30 * 24 * 60 * 60 * 1000);
  patterns.consultationFrequency = Math.round(history.length / Math.max(1, monthsDiff) * 10) / 10;

  // Average priority
  const priorityMap = { critical: 4, high: 3, medium: 2, low: 1 };
  const totalPriority = history.reduce((sum, h) => sum + (priorityMap[h.triage?.priority] || 2), 0);
  patterns.averagePriority = totalPriority / history.length;

  return patterns;
};

/**
 * Generate recommendations for doctors
 */
const generateDoctorRecommendations = (consultation, patterns) => {
  const recommendations = [];

  // Based on triage priority
  if (consultation.triage?.priority === 'critical') {
    recommendations.push({
      type: 'urgent',
      message: 'Immediate attention required. Consider emergency protocols.'
    });
  }

  // Based on recurring symptoms
  if (patterns.recurringSymptoms.length > 0) {
    recommendations.push({
      type: 'pattern',
      message: `Patient has recurring symptoms: ${patterns.recurringSymptoms.map(s => s.name).join(', ')}. Consider chronic condition evaluation.`
    });
  }

  // Based on consultation frequency
  if (patterns.consultationFrequency > 3) {
    recommendations.push({
      type: 'frequency',
      message: 'High consultation frequency detected. Consider comprehensive health review.'
    });
  }

  // Based on recommended tests
  if (consultation.triage?.recommendedTests?.length > 0) {
    recommendations.push({
      type: 'tests',
      message: `Recommended tests: ${consultation.triage.recommendedTests.join(', ')}`
    });
  }

  return recommendations;
};

/**
 * @desc    Get triage analytics (dashboard)
 * @route   GET /api/triage/analytics
 * @access  Private/Doctor/Admin
 */
exports.getTriageAnalytics = async (req, res, next) => {
  try {
    const { period = '30' } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Priority distribution
    const priorityDistribution = await Consultation.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: '$triage.priority', count: { $sum: 1 } } }
    ]);

    // Average triage scores over time
    const scoresTrend = await Consultation.aggregate([
      { $match: { createdAt: { $gte: startDate }, 'triage.score': { $exists: true } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          avgScore: { $avg: '$triage.score' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Most common symptoms
    const commonSymptoms = await Consultation.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $unwind: '$symptoms' },
      {
        $group: {
          _id: '$symptoms.name',
          count: { $sum: 1 },
          avgSeverity: { $avg: '$symptoms.severity' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Response time analysis
    const responseTimeStats = await Consultation.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          firstResponseAt: { $exists: true }
        }
      },
      {
        $project: {
          priority: '$triage.priority',
          responseTime: { $subtract: ['$firstResponseAt', '$createdAt'] }
        }
      },
      {
        $group: {
          _id: '$priority',
          avgResponseTime: { $avg: '$responseTime' },
          minResponseTime: { $min: '$responseTime' },
          maxResponseTime: { $max: '$responseTime' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        priorityDistribution,
        scoresTrend,
        commonSymptoms,
        responseTimeStats,
        period: parseInt(period)
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Real-time triage (quick check)
 * @route   POST /api/triage/quick-check
 * @access  Public
 */
exports.quickTriageCheck = async (req, res, next) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide symptoms for analysis'
      });
    }

    // Perform quick analysis without patient data
    const triageResult = analyzeSymptoms(symptoms, null);

    // Return simplified result for quick check
    res.status(200).json({
      success: true,
      data: {
        priority: triageResult.priority,
        score: triageResult.score,
        recommendedActions: triageResult.recommendedActions,
        seekEmergencyCare: triageResult.priority === 'critical',
        disclaimer: 'This is an automated assessment and does not replace professional medical advice. If you are experiencing a medical emergency, call emergency services immediately.'
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update triage assessment
 * @route   PUT /api/triage/:consultationId
 * @access  Private/Doctor
 */
exports.updateTriageAssessment = async (req, res, next) => {
  try {
    const { priority, notes, override } = req.body;

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.consultationId,
      {
        'triage.priority': priority,
        'triage.doctorOverride': override,
        'triage.doctorNotes': notes,
        'triage.updatedAt': new Date(),
        'triage.updatedBy': req.user.id
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: consultation.triage
    });
  } catch (error) {
    next(error);
  }
};
