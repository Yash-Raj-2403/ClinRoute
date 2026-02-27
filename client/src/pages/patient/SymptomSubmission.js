import React, { useState } from 'react';
import './PatientDashboard.css';

const SymptomSubmission = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    primarySymptom: '',
    symptomDuration: '',
    severity: '',
    additionalSymptoms: [],
    description: '',
    medicalHistory: [],
    currentMedications: '',
    allergies: '',
    preferredConsultationType: 'video'
  });

  const symptoms = [
    { id: 'headache', label: 'Headache', icon: '🤕' },
    { id: 'chest-pain', label: 'Chest Pain', icon: '💔' },
    { id: 'fever', label: 'Fever', icon: '🌡️' },
    { id: 'cough', label: 'Cough', icon: '😷' },
    { id: 'fatigue', label: 'Fatigue', icon: '😴' },
    { id: 'stomach-pain', label: 'Stomach Pain', icon: '🤢' },
    { id: 'breathing', label: 'Breathing Issues', icon: '😮‍💨' },
    { id: 'joint-pain', label: 'Joint Pain', icon: '🦴' },
    { id: 'skin-issue', label: 'Skin Issues', icon: '🩹' },
    { id: 'anxiety', label: 'Anxiety/Stress', icon: '😰' },
    { id: 'dizziness', label: 'Dizziness', icon: '😵' },
    { id: 'other', label: 'Other', icon: '➕' }
  ];

  const additionalSymptomsList = [
    'Nausea', 'Vomiting', 'Loss of appetite', 'Sweating',
    'Chills', 'Weakness', 'Numbness', 'Blurred vision',
    'Rash', 'Swelling', 'Difficulty sleeping', 'Weight changes'
  ];

  const medicalConditions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma',
    'Arthritis', 'Cancer', 'Thyroid Disorder', 'None'
  ];

  const handleSymptomSelect = (symptomId) => {
    setFormData({ ...formData, primarySymptom: symptomId });
  };

  const handleAdditionalSymptom = (symptom) => {
    const current = formData.additionalSymptoms;
    if (current.includes(symptom)) {
      setFormData({ ...formData, additionalSymptoms: current.filter(s => s !== symptom) });
    } else {
      setFormData({ ...formData, additionalSymptoms: [...current, symptom] });
    }
  };

  const handleMedicalHistory = (condition) => {
    const current = formData.medicalHistory;
    if (current.includes(condition)) {
      setFormData({ ...formData, medicalHistory: current.filter(c => c !== condition) });
    } else {
      setFormData({ ...formData, medicalHistory: [...current, condition] });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="symptom-submission">
      {/* Progress Bar */}
      <div className="submission-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>
        <div className="progress-steps">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Symptoms</span>
          </div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Details</span>
          </div>
          <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">History</span>
          </div>
          <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
            <span className="step-number">4</span>
            <span className="step-label">Review</span>
          </div>
        </div>
      </div>

      {/* Step 1: Primary Symptom */}
      {step === 1 && (
        <div className="submission-step">
          <div className="step-header">
            <h2>What's your main concern today?</h2>
            <p>Select the symptom that's bothering you the most</p>
          </div>
          <div className="symptoms-grid">
            {symptoms.map(symptom => (
              <button
                key={symptom.id}
                className={`symptom-card ${formData.primarySymptom === symptom.id ? 'selected' : ''}`}
                onClick={() => handleSymptomSelect(symptom.id)}
              >
                <span className="symptom-icon">{symptom.icon}</span>
                <span className="symptom-label">{symptom.label}</span>
              </button>
            ))}
          </div>
          <div className="step-actions">
            <button 
              className="btn btn-primary"
              disabled={!formData.primarySymptom}
              onClick={nextStep}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Symptom Details */}
      {step === 2 && (
        <div className="submission-step">
          <div className="step-header">
            <h2>Tell us more about your symptoms</h2>
            <p>This helps our AI provide better recommendations</p>
          </div>
          
          <div className="form-section">
            <label>How long have you had this symptom?</label>
            <div className="duration-options">
              {['Less than a day', '1-3 days', '4-7 days', '1-2 weeks', 'More than 2 weeks'].map(duration => (
                <button
                  key={duration}
                  className={`option-btn ${formData.symptomDuration === duration ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, symptomDuration: duration })}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label>How severe is the symptom?</label>
            <div className="severity-scale">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                <button
                  key={level}
                  className={`severity-btn ${formData.severity === level ? 'selected' : ''} ${level <= 3 ? 'mild' : level <= 6 ? 'moderate' : 'severe'}`}
                  onClick={() => setFormData({ ...formData, severity: level })}
                >
                  {level}
                </button>
              ))}
              <div className="severity-labels">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>
          </div>

          <div className="form-section">
            <label>Are you experiencing any other symptoms?</label>
            <div className="additional-symptoms">
              {additionalSymptomsList.map(symptom => (
                <button
                  key={symptom}
                  className={`symptom-tag ${formData.additionalSymptoms.includes(symptom) ? 'selected' : ''}`}
                  onClick={() => handleAdditionalSymptom(symptom)}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label>Describe your symptoms in detail (optional)</label>
            <textarea
              className="form-textarea"
              placeholder="Please describe how you're feeling, when the symptoms started, what makes them better or worse..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="step-actions">
            <button className="btn btn-outline" onClick={prevStep}>Back</button>
            <button 
              className="btn btn-primary"
              disabled={!formData.symptomDuration || !formData.severity}
              onClick={nextStep}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Medical History */}
      {step === 3 && (
        <div className="submission-step">
          <div className="step-header">
            <h2>Medical History</h2>
            <p>This information helps provide personalized care</p>
          </div>

          <div className="form-section">
            <label>Do you have any of these conditions?</label>
            <div className="conditions-grid">
              {medicalConditions.map(condition => (
                <button
                  key={condition}
                  className={`condition-btn ${formData.medicalHistory.includes(condition) ? 'selected' : ''}`}
                  onClick={() => handleMedicalHistory(condition)}
                >
                  {condition}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label>Current medications (if any)</label>
            <textarea
              className="form-textarea"
              placeholder="List any medications you're currently taking..."
              value={formData.currentMedications}
              onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
              rows={3}
            />
          </div>

          <div className="form-section">
            <label>Known allergies (if any)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Penicillin, Peanuts, etc."
              value={formData.allergies}
              onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
            />
          </div>

          <div className="form-section">
            <label>Preferred consultation type</label>
            <div className="consultation-types">
              <button
                className={`type-card ${formData.preferredConsultationType === 'video' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, preferredConsultationType: 'video' })}
              >
                <span className="type-icon">📹</span>
                <span className="type-label">Video Call</span>
                <span className="type-desc">Speak face-to-face with a doctor</span>
              </button>
              <button
                className={`type-card ${formData.preferredConsultationType === 'chat' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, preferredConsultationType: 'chat' })}
              >
                <span className="type-icon">💬</span>
                <span className="type-label">Chat</span>
                <span className="type-desc">Text-based consultation</span>
              </button>
              <button
                className={`type-card ${formData.preferredConsultationType === 'in-person' ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, preferredConsultationType: 'in-person' })}
              >
                <span className="type-icon">🏥</span>
                <span className="type-label">In-Person</span>
                <span className="type-desc">Visit a clinic nearby</span>
              </button>
            </div>
          </div>

          <div className="step-actions">
            <button className="btn btn-outline" onClick={prevStep}>Back</button>
            <button className="btn btn-primary" onClick={nextStep}>
              Review & Submit
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div className="submission-step">
          <div className="step-header">
            <h2>Review Your Information</h2>
            <p>Please confirm all details are correct before submitting</p>
          </div>

          <div className="review-section">
            <div className="review-card">
              <div className="review-header">
                <h3>Symptoms</h3>
                <button className="edit-btn" onClick={() => setStep(1)}>Edit</button>
              </div>
              <div className="review-content">
                <div className="review-item">
                  <span className="review-label">Primary Symptom:</span>
                  <span className="review-value">
                    {symptoms.find(s => s.id === formData.primarySymptom)?.label}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Duration:</span>
                  <span className="review-value">{formData.symptomDuration}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Severity:</span>
                  <span className={`review-value severity ${formData.severity <= 3 ? 'mild' : formData.severity <= 6 ? 'moderate' : 'severe'}`}>
                    {formData.severity}/10
                  </span>
                </div>
                {formData.additionalSymptoms.length > 0 && (
                  <div className="review-item">
                    <span className="review-label">Additional Symptoms:</span>
                    <span className="review-value">{formData.additionalSymptoms.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="review-card">
              <div className="review-header">
                <h3>Medical History</h3>
                <button className="edit-btn" onClick={() => setStep(3)}>Edit</button>
              </div>
              <div className="review-content">
                <div className="review-item">
                  <span className="review-label">Conditions:</span>
                  <span className="review-value">
                    {formData.medicalHistory.length > 0 ? formData.medicalHistory.join(', ') : 'None reported'}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Medications:</span>
                  <span className="review-value">{formData.currentMedications || 'None'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Allergies:</span>
                  <span className="review-value">{formData.allergies || 'None'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Consultation Type:</span>
                  <span className="review-value capitalize">{formData.preferredConsultationType}</span>
                </div>
              </div>
            </div>

            {/* RAG Triage Preview */}
            <div className="ai-triage-preview">
              <div className="triage-header">
                <span className="ai-badge">🤖 RAG Analysis Preview</span>
              </div>
              <div className="triage-content">
                <div className="triage-priority moderate">
                  <span className="priority-label">Estimated Priority</span>
                  <span className="priority-value">Moderate</span>
                </div>
                <p className="triage-note">
                  Based on your symptoms, our RAG system will connect you with an appropriate specialist 
                  within 2-4 hours. A detailed analysis will be provided after submission.
                </p>
              </div>
            </div>
          </div>

          <div className="step-actions">
            <button className="btn btn-outline" onClick={prevStep}>Back</button>
            <button className="btn btn-primary btn-lg">
              <span>🚀</span>
              Submit for RAG Triage
            </button>
          </div>

          <p className="submission-note">
            By submitting, you agree to our Terms of Service and Privacy Policy. 
            Your data is encrypted and handled in compliance with HIPAA regulations.
          </p>
        </div>
      )}
    </div>
  );
};

export default SymptomSubmission;
