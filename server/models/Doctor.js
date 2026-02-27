/**
 * Doctor Model
 */

const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  title: {
    type: String,
    enum: ['Dr.', 'Prof.', 'Mr.', 'Ms.'],
    default: 'Dr.'
  },
  specialty: {
    type: String,
    required: [true, 'Please add a specialty']
  },
  subspecialty: String,
  credentials: {
    licenseNumber: {
      type: String,
      required: [true, 'Please add a license number']
    },
    npi: String,
    deaNumber: String,
    yearsExperience: Number
  },
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  boardCertifications: [{
    name: String,
    issuingBody: String,
    year: Number,
    expirationDate: Date
  }],
  languages: [{
    type: String
  }],
  hospitalAffiliations: [{
    name: String,
    address: String,
    department: String
  }],
  practiceSettings: {
    acceptingNewPatients: {
      type: Boolean,
      default: true
    },
    virtualConsultations: {
      type: Boolean,
      default: true
    },
    consultationFee: {
      type: Number,
      default: 0
    },
    followUpFee: {
      type: Number,
      default: 0
    },
    insuranceAccepted: [String]
  },
  schedule: {
    monday: {
      available: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endTime: { type: String, default: '17:00' },
      breaks: [{
        start: String,
        end: String
      }]
    },
    tuesday: {
      available: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endTime: { type: String, default: '17:00' },
      breaks: []
    },
    wednesday: {
      available: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endTime: { type: String, default: '17:00' },
      breaks: []
    },
    thursday: {
      available: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endTime: { type: String, default: '17:00' },
      breaks: []
    },
    friday: {
      available: { type: Boolean, default: true },
      startTime: { type: String, default: '09:00' },
      endTime: { type: String, default: '17:00' },
      breaks: []
    },
    saturday: {
      available: { type: Boolean, default: false },
      startTime: String,
      endTime: String,
      breaks: []
    },
    sunday: {
      available: { type: Boolean, default: false },
      startTime: String,
      endTime: String,
      breaks: []
    }
  },
  appointmentTypes: [{
    name: {
      type: String,
      enum: ['in-person', 'video', 'phone', 'follow-up', 'new-patient']
    },
    duration: Number, // in minutes
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  blockedTimeSlots: [{
    date: Date,
    startTime: String,
    endTime: String,
    reason: String
  }],
  bio: {
    type: String,
    maxlength: [2000, 'Bio cannot be more than 2000 characters']
  },
  rating: {
    average: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  stats: {
    totalPatients: { type: Number, default: 0 },
    totalConsultations: { type: Number, default: 0 },
    completedConsultations: { type: Number, default: 0 },
    averageWaitTime: { type: Number, default: 0 }, // in minutes
    responseRate: { type: Number, default: 100 }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDocuments: [{
    type: {
      type: String,
      enum: ['license', 'certification', 'id', 'other']
    },
    url: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name with title
DoctorSchema.virtual('displayName').get(function() {
  if (this.user) {
    return `${this.title} ${this.user.firstName} ${this.user.lastName}`;
  }
  return this.title;
});

// Index for searching
DoctorSchema.index({
  specialty: 'text',
  subspecialty: 'text',
  bio: 'text',
  'hospitalAffiliations.name': 'text'
});

// Index for geospatial queries (for nearby doctors feature)
DoctorSchema.index({ 'hospitalAffiliations.location': '2dsphere' });

// Populate user info by default
DoctorSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName email phone avatar address'
  });
  next();
});

// Calculate average rating after review
DoctorSchema.statics.calculateAverageRating = async function(doctorId) {
  const Review = mongoose.model('Review');
  const result = await Review.aggregate([
    { $match: { doctor: doctorId } },
    {
      $group: {
        _id: '$doctor',
        averageRating: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);

  try {
    if (result.length > 0) {
      await this.findByIdAndUpdate(doctorId, {
        'rating.average': Math.round(result[0].averageRating * 10) / 10,
        'rating.count': result[0].count
      });
    }
  } catch (err) {
    console.error('Error calculating average rating:', err);
  }
};

module.exports = mongoose.model('Doctor', DoctorSchema);
