/**
 * Patient Model
 */

const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  medicalHistory: {
    conditions: [{
      name: String,
      diagnosedDate: Date,
      status: {
        type: String,
        enum: ['active', 'resolved', 'managed'],
        default: 'active'
      }
    }],
    allergies: [{
      allergen: String,
      severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe'],
        default: 'moderate'
      },
      reaction: String
    }],
    medications: [{
      name: String,
      dosage: String,
      frequency: String,
      startDate: Date,
      endDate: Date,
      prescribedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor'
      }
    }],
    surgeries: [{
      name: String,
      date: Date,
      hospital: String,
      notes: String
    }],
    familyHistory: [{
      relation: String,
      condition: String
    }]
  },
  vitals: {
    bloodType: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']
    },
    height: Number, // in cm
    weight: Number, // in kg
    lastUpdated: Date
  },
  insurance: {
    provider: String,
    policyNumber: String,
    groupNumber: String,
    expirationDate: Date
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  primaryCarePhysician: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor'
  },
  favoriteDoctors: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor'
  }],
  healthMetrics: [{
    type: {
      type: String,
      enum: ['blood_pressure', 'heart_rate', 'weight', 'blood_glucose', 'temperature']
    },
    value: mongoose.Schema.Types.Mixed,
    unit: String,
    recordedAt: {
      type: Date,
      default: Date.now
    }
  }],
  documents: [{
    name: String,
    type: {
      type: String,
      enum: ['lab_report', 'imaging', 'prescription', 'consultation_note', 'other']
    },
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    consultation: {
      type: mongoose.Schema.ObjectId,
      ref: 'Consultation'
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual to get age
PatientSchema.virtual('age').get(function() {
  if (!this.user || !this.user.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.user.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual to get BMI
PatientSchema.virtual('bmi').get(function() {
  if (!this.vitals.height || !this.vitals.weight) return null;
  const heightInMeters = this.vitals.height / 100;
  return (this.vitals.weight / (heightInMeters * heightInMeters)).toFixed(1);
});

// Populate user info by default
PatientSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName email phone avatar dateOfBirth gender address'
  });
  next();
});

module.exports = mongoose.model('Patient', PatientSchema);
