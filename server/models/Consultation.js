/**
 * Consultation Model
 */

const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  consultationId: {
    type: String,
    unique: true
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor'
  },
  type: {
    type: String,
    enum: ['ai-triage', 'video', 'in-person', 'chat', 'phone'],
    default: 'ai-triage'
  },
  status: {
    type: String,
    enum: ['submitted', 'in-queue', 'assigned', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'submitted'
  },
  symptoms: {
    primary: {
      type: String,
      required: [true, 'Please add a primary symptom']
    },
    severity: {
      type: Number,
      min: 1,
      max: 10,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    additional: [String],
    description: {
      type: String,
      maxlength: [2000, 'Description cannot exceed 2000 characters']
    }
  },
  patientVitals: {
    bloodPressure: String,
    heartRate: Number,
    temperature: Number,
    respiratoryRate: Number,
    oxygenSaturation: Number,
    recordedAt: Date
  },
  triage: {
    priority: {
      type: String,
      enum: ['critical', 'urgent', 'moderate', 'routine'],
      default: 'routine'
    },
    score: {
      type: Number,
      min: 1,
      max: 10
    },
    recommendation: String,
    riskFactors: [String],
    differentialDiagnosis: [{
      condition: String,
      probability: {
        type: String,
        enum: ['high', 'moderate', 'low']
      }
    }],
    recommendedTests: [{
      name: String,
      urgency: {
        type: String,
        enum: ['stat', 'urgent', 'routine']
      },
      ordered: {
        type: Boolean,
        default: false
      }
    }],
    aiConfidence: Number,
    analyzedAt: Date
  },
  queuePosition: Number,
  estimatedWaitTime: Number, // in minutes
  startedAt: Date,
  completedAt: Date,
  duration: Number, // in minutes
  diagnosis: {
    primary: String,
    secondary: [String],
    notes: String,
    icd10Codes: [String]
  },
  treatment: {
    plan: String,
    prescriptions: [{
      medication: String,
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String
    }],
    procedures: [String],
    referrals: [{
      specialty: String,
      reason: String,
      urgency: String
    }],
    followUp: {
      required: Boolean,
      timeframe: String,
      notes: String
    }
  },
  notes: [{
    content: String,
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    isPrivate: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  attachments: [{
    name: String,
    type: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  messages: [{
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    content: String,
    type: {
      type: String,
      enum: ['text', 'image', 'file', 'system'],
      default: 'text'
    },
    readAt: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  videoSession: {
    sessionId: String,
    startedAt: Date,
    endedAt: Date,
    duration: Number,
    recording: {
      enabled: Boolean,
      url: String
    }
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    wouldRecommend: Boolean,
    submittedAt: Date
  },
  billing: {
    consultationFee: Number,
    additionalCharges: [{
      description: String,
      amount: Number
    }],
    totalAmount: Number,
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'waived'],
      default: 'pending'
    },
    paymentMethod: String,
    invoiceId: String
  },
  flags: {
    isUrgent: { type: Boolean, default: false },
    isFollowUp: { type: Boolean, default: false },
    requiresSpecialist: { type: Boolean, default: false },
    hasAllergies: { type: Boolean, default: false }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate unique consultation ID before saving
ConsultationSchema.pre('save', async function(next) {
  if (!this.consultationId) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Consultation').countDocuments();
    this.consultationId = `CLN-${year}-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Calculate duration when completed
ConsultationSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed' && this.startedAt) {
    this.completedAt = new Date();
    this.duration = Math.round((this.completedAt - this.startedAt) / (1000 * 60));
  }
  next();
});

// Indexes
ConsultationSchema.index({ patient: 1, createdAt: -1 });
ConsultationSchema.index({ doctor: 1, status: 1 });
ConsultationSchema.index({ status: 1, 'triage.priority': 1 });
ConsultationSchema.index({ consultationId: 1 });

// Statics
ConsultationSchema.statics.getQueueStats = async function() {
  return await this.aggregate([
    { $match: { status: { $in: ['submitted', 'in-queue'] } } },
    {
      $group: {
        _id: '$triage.priority',
        count: { $sum: 1 }
      }
    }
  ]);
};

module.exports = mongoose.model('Consultation', ConsultationSchema);
