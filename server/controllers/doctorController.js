/**
 * Doctor Controller
 */

const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Consultation = require('../models/Consultation');
const Appointment = require('../models/Appointment');

/**
 * @desc    Get doctor dashboard
 * @route   GET /api/doctors/dashboard
 * @access  Private/Doctor
 */
exports.getDashboard = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });

    // Get today's appointments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAppointments = await Appointment.find({
      doctor: doctor._id,
      dateTime: { $gte: today, $lt: tomorrow },
      status: { $in: ['scheduled', 'confirmed'] }
    })
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'firstName lastName avatar' }
      })
      .sort('dateTime');

    // Get pending queue
    const pendingQueue = await Consultation.find({
      doctor: doctor._id,
      status: { $in: ['pending', 'awaiting-response'] }
    })
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'firstName lastName avatar' }
      })
      .sort({ 'triage.priority': -1, createdAt: 1 })
      .limit(10);

    // Get stats
    const stats = {
      todayPatients: todayAppointments.length,
      pendingCases: await Consultation.countDocuments({
        doctor: doctor._id,
        status: 'pending'
      }),
      thisWeekConsultations: await Consultation.countDocuments({
        doctor: doctor._id,
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      }),
      avgRating: doctor.averageRating || 0
    };

    res.status(200).json({
      success: true,
      data: {
        todayAppointments,
        pendingQueue,
        stats,
        profile: doctor
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get patient queue
 * @route   GET /api/doctors/queue
 * @access  Private/Doctor
 */
exports.getPatientQueue = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });
    const { status, priority, search } = req.query;

    const query = { doctor: doctor._id };

    if (status) {
      query.status = status;
    } else {
      query.status = { $in: ['pending', 'in-progress', 'awaiting-response'] };
    }

    if (priority) {
      query['triage.priority'] = priority;
    }

    let consultations = await Consultation.find(query)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'firstName lastName avatar email' }
      })
      .sort({ 'triage.priority': -1, createdAt: 1 });

    // Filter by search if provided
    if (search) {
      consultations = consultations.filter(c => {
        const patientName = `${c.patient.user.firstName} ${c.patient.user.lastName}`.toLowerCase();
        return patientName.includes(search.toLowerCase()) ||
               c.consultationId.toLowerCase().includes(search.toLowerCase());
      });
    }

    res.status(200).json({
      success: true,
      count: consultations.length,
      data: consultations
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single case
 * @route   GET /api/doctors/cases/:id
 * @access  Private/Doctor
 */
exports.getCase = async (req, res, next) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'firstName lastName avatar email phone dateOfBirth gender' }
      });

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Case not found'
      });
    }

    // Get patient's full history
    const patientHistory = await Consultation.find({
      patient: consultation.patient._id,
      _id: { $ne: consultation._id }
    })
      .select('consultationId symptoms diagnosis status createdAt')
      .sort('-createdAt')
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        consultation,
        patientHistory
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update case status
 * @route   PUT /api/doctors/cases/:id/status
 * @access  Private/Doctor
 */
exports.updateCaseStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      {
        status,
        ...(notes && { doctorNotes: notes })
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add diagnosis
 * @route   PUT /api/doctors/cases/:id/diagnosis
 * @access  Private/Doctor
 */
exports.addDiagnosis = async (req, res, next) => {
  try {
    const { diagnosis } = req.body;

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      {
        diagnosis,
        diagnosedAt: new Date(),
        diagnosedBy: req.user.id
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add prescription
 * @route   POST /api/doctors/cases/:id/prescription
 * @access  Private/Doctor
 */
exports.addPrescription = async (req, res, next) => {
  try {
    const { prescriptions, instructions, followUp } = req.body;

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      {
        'treatment.prescriptions': prescriptions,
        'treatment.instructions': instructions,
        'treatment.followUp': followUp,
        status: 'completed'
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Order tests
 * @route   POST /api/doctors/cases/:id/tests
 * @access  Private/Doctor
 */
exports.orderTests = async (req, res, next) => {
  try {
    const { tests } = req.body;

    const consultation = await Consultation.findById(req.params.id);

    tests.forEach(test => {
      consultation.treatment.tests.push({
        name: test,
        orderedAt: new Date(),
        status: 'pending'
      });
    });

    await consultation.save();

    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get doctor profile
 * @route   GET /api/doctors/me
 * @access  Private/Doctor
 */
exports.getMyProfile = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id })
      .populate('user', 'firstName lastName email phone avatar');

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update doctor profile
 * @route   PUT /api/doctors/me
 * @access  Private/Doctor
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      'specialization',
      'subspecialties',
      'bio',
      'languages',
      'hospitalAffiliations',
      'practiceSettings',
      'appointmentTypes',
      'consultationFee',
      'acceptsInsurance',
      'acceptedInsurancePlans',
      'isAcceptingPatients'
    ];

    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const doctor = await Doctor.findOneAndUpdate(
      { user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update availability schedule
 * @route   PUT /api/doctors/schedule
 * @access  Private/Doctor
 */
exports.updateSchedule = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { user: req.user.id },
      { schedule: req.body.schedule },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: doctor.schedule
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get doctor analytics
 * @route   GET /api/doctors/analytics
 * @access  Private/Doctor
 */
exports.getAnalytics = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });
    const { period = '30' } = req.query;
    const periodDays = parseInt(period);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // Consultations by day
    const consultationsByDay = await Consultation.aggregate([
      {
        $match: {
          doctor: doctor._id,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Priority distribution
    const priorityDistribution = await Consultation.aggregate([
      {
        $match: {
          doctor: doctor._id,
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$triage.priority',
          count: { $sum: 1 }
        }
      }
    ]);

    // Average response time
    const avgResponseTime = await Consultation.aggregate([
      {
        $match: {
          doctor: doctor._id,
          status: 'completed',
          createdAt: { $gte: startDate }
        }
      },
      {
        $project: {
          responseTime: { $subtract: ['$firstResponseAt', '$createdAt'] }
        }
      },
      {
        $group: {
          _id: null,
          avgTime: { $avg: '$responseTime' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        consultationsByDay,
        priorityDistribution,
        avgResponseTime: avgResponseTime[0]?.avgTime || 0,
        totalConsultations: await Consultation.countDocuments({
          doctor: doctor._id,
          createdAt: { $gte: startDate }
        }),
        completedConsultations: await Consultation.countDocuments({
          doctor: doctor._id,
          status: 'completed',
          createdAt: { $gte: startDate }
        })
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all doctors (public)
 * @route   GET /api/doctors
 * @access  Public
 */
exports.getAllDoctors = async (req, res, next) => {
  try {
    const { specialty, search, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const query = {
      verificationStatus: 'verified',
      isAcceptingPatients: true
    };

    if (specialty) {
      query.specialization = specialty;
    }

    let doctors = await Doctor.find(query)
      .populate('user', 'firstName lastName avatar')
      .skip(skip)
      .limit(parseInt(limit))
      .sort('-averageRating');

    const total = await Doctor.countDocuments(query);

    res.status(200).json({
      success: true,
      count: doctors.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: doctors
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get doctor by ID (public)
 * @route   GET /api/doctors/:id
 * @access  Public
 */
exports.getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'firstName lastName avatar');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get doctor availability
 * @route   GET /api/doctors/:id/availability
 * @access  Public
 */
exports.getAvailability = async (req, res, next) => {
  try {
    const { date } = req.query;
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    const requestedDate = new Date(date);
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][requestedDate.getDay()];
    const daySchedule = doctor.schedule[dayOfWeek];

    if (!daySchedule || !daySchedule.isAvailable) {
      return res.status(200).json({
        success: true,
        data: {
          available: false,
          slots: []
        }
      });
    }

    // Get existing appointments for that day
    const startOfDay = new Date(requestedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(requestedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await Appointment.find({
      doctor: doctor._id,
      dateTime: { $gte: startOfDay, $lte: endOfDay },
      status: { $nin: ['cancelled', 'no-show'] }
    }).select('dateTime duration');

    // Generate available slots
    const slots = [];
    const slotDuration = 30; // minutes
    const [startHour, startMin] = daySchedule.startTime.split(':').map(Number);
    const [endHour, endMin] = daySchedule.endTime.split(':').map(Number);

    let currentTime = new Date(requestedDate);
    currentTime.setHours(startHour, startMin, 0, 0);

    const endTime = new Date(requestedDate);
    endTime.setHours(endHour, endMin, 0, 0);

    while (currentTime < endTime) {
      const slotTime = new Date(currentTime);
      const isBooked = existingAppointments.some(apt => 
        apt.dateTime.getTime() === slotTime.getTime()
      );

      if (!isBooked && slotTime > new Date()) {
        slots.push({
          time: slotTime.toISOString(),
          available: true
        });
      }

      currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
    }

    res.status(200).json({
      success: true,
      data: {
        available: true,
        slots
      }
    });
  } catch (error) {
    next(error);
  }
};
