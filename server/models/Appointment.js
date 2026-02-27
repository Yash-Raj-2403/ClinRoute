/**
 * Appointment Model
 */

const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
    required: true
  },
  consultation: {
    type: mongoose.Schema.ObjectId,
    ref: 'Consultation'
  },
  date: {
    type: Date,
    required: [true, 'Please add an appointment date']
  },
  timeSlot: {
    start: {
      type: String,
      required: [true, 'Please add a start time']
    },
    end: {
      type: String,
      required: [true, 'Please add an end time']
    }
  },
  type: {
    type: String,
    enum: ['in-person', 'video', 'phone', 'follow-up'],
    default: 'in-person'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'checked-in', 'in-progress', 'completed', 'cancelled', 'no-show', 'rescheduled'],
    default: 'pending'
  },
  reason: {
    type: String,
    required: [true, 'Please add a reason for the appointment'],
    maxlength: [500, 'Reason cannot be more than 500 characters']
  },
  notes: {
    patient: String,
    doctor: String,
    internal: String
  },
  isNewPatient: {
    type: Boolean,
    default: false
  },
  reminders: {
    email: {
      sent: { type: Boolean, default: false },
      sentAt: Date
    },
    sms: {
      sent: { type: Boolean, default: false },
      sentAt: Date
    }
  },
  checkIn: {
    checkedInAt: Date,
    checkedInBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  },
  cancellation: {
    cancelledAt: Date,
    cancelledBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    reason: String
  },
  reschedule: {
    originalDate: Date,
    originalTimeSlot: {
      start: String,
      end: String
    },
    rescheduledAt: Date,
    rescheduledBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    reason: String
  },
  billing: {
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid', 'insurance', 'waived'],
      default: 'pending'
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
AppointmentSchema.index({ patient: 1, date: -1 });
AppointmentSchema.index({ doctor: 1, date: 1 });
AppointmentSchema.index({ date: 1, status: 1 });

// Virtual for formatted date
AppointmentSchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for full time slot
AppointmentSchema.virtual('timeRange').get(function() {
  return `${this.timeSlot.start} - ${this.timeSlot.end}`;
});

// Pre-save middleware to set isNewPatient
AppointmentSchema.pre('save', async function(next) {
  if (this.isNew) {
    const previousAppointment = await mongoose.model('Appointment').findOne({
      patient: this.patient,
      doctor: this.doctor,
      status: { $in: ['completed'] }
    });
    this.isNewPatient = !previousAppointment;
  }
  next();
});

// Static method to check availability
AppointmentSchema.statics.checkSlotAvailability = async function(doctorId, date, timeSlot) {
  const existingAppointment = await this.findOne({
    doctor: doctorId,
    date: {
      $gte: new Date(date).setHours(0, 0, 0, 0),
      $lt: new Date(date).setHours(23, 59, 59, 999)
    },
    'timeSlot.start': timeSlot.start,
    status: { $nin: ['cancelled', 'rescheduled'] }
  });
  
  return !existingAppointment;
};

// Static method to get doctor's appointments for a day
AppointmentSchema.statics.getDoctorDaySchedule = async function(doctorId, date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return await this.find({
    doctor: doctorId,
    date: { $gte: startOfDay, $lte: endOfDay },
    status: { $nin: ['cancelled'] }
  })
  .populate('patient', 'user')
  .sort({ 'timeSlot.start': 1 });
};

module.exports = mongoose.model('Appointment', AppointmentSchema);
