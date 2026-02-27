/**
 * Patient Controller
 */

const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Consultation = require('../models/Consultation');
const Appointment = require('../models/Appointment');

/**
 * @desc    Get patient dashboard
 * @route   GET /api/patients/dashboard
 * @access  Private/Patient
 */
exports.getDashboard = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });
    
    // Get upcoming appointments
    const upcomingAppointments = await Appointment.find({
      patient: patient._id,
      status: 'scheduled',
      dateTime: { $gte: new Date() }
    })
      .populate('doctor', 'specialization')
      .limit(5)
      .sort('dateTime');

    // Get recent consultations
    const recentConsultations = await Consultation.find({
      patient: patient._id
    })
      .populate('doctor', 'specialization')
      .limit(5)
      .sort('-createdAt');

    // Get active consultations
    const activeConsultations = await Consultation.countDocuments({
      patient: patient._id,
      status: { $in: ['pending', 'in-progress', 'awaiting-response'] }
    });

    res.status(200).json({
      success: true,
      data: {
        upcomingAppointments,
        recentConsultations,
        activeConsultations,
        profile: patient
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get patient profile
 * @route   GET /api/patients/me
 * @access  Private/Patient
 */
exports.getMyProfile = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id })
      .populate('user', 'firstName lastName email phone');

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update patient profile
 * @route   PUT /api/patients/me
 * @access  Private/Patient
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      'bloodType',
      'allergies',
      'chronicConditions',
      'medications',
      'emergencyContact',
      'insurance',
      'primaryCarePhysician'
    ];

    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const patient = await Patient.findOneAndUpdate(
      { user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get medical history
 * @route   GET /api/patients/medical-history
 * @access  Private/Patient
 */
exports.getMedicalHistory = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id })
      .select('medicalHistory allergies chronicConditions medications surgicalHistory familyHistory');

    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update medical history
 * @route   PUT /api/patients/medical-history
 * @access  Private/Patient
 */
exports.updateMedicalHistory = async (req, res, next) => {
  try {
    const { allergies, chronicConditions, medications, surgicalHistory, familyHistory } = req.body;

    const patient = await Patient.findOneAndUpdate(
      { user: req.user.id },
      {
        allergies,
        chronicConditions,
        medications,
        surgicalHistory,
        familyHistory
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: patient
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add medical record
 * @route   POST /api/patients/records
 * @access  Private/Patient
 */
exports.addMedicalRecord = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });

    patient.medicalHistory.push(req.body);
    await patient.save();

    res.status(201).json({
      success: true,
      data: patient.medicalHistory
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get medical records
 * @route   GET /api/patients/records
 * @access  Private/Patient
 */
exports.getMedicalRecords = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id })
      .select('medicalHistory');

    res.status(200).json({
      success: true,
      data: patient.medicalHistory
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload document
 * @route   POST /api/patients/documents
 * @access  Private/Patient
 */
exports.uploadDocument = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });

    const document = {
      type: req.body.type,
      name: req.body.name,
      url: req.body.url, // Would be handled by file upload middleware
      uploadedAt: new Date()
    };

    patient.documents.push(document);
    await patient.save();

    res.status(201).json({
      success: true,
      data: document
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get documents
 * @route   GET /api/patients/documents
 * @access  Private/Patient
 */
exports.getDocuments = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id })
      .select('documents');

    res.status(200).json({
      success: true,
      data: patient.documents
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete document
 * @route   DELETE /api/patients/documents/:id
 * @access  Private/Patient
 */
exports.deleteDocument = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });

    patient.documents = patient.documents.filter(
      doc => doc._id.toString() !== req.params.id
    );
    await patient.save();

    res.status(200).json({
      success: true,
      message: 'Document deleted'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update vitals
 * @route   PUT /api/patients/vitals
 * @access  Private/Patient
 */
exports.updateVitals = async (req, res, next) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { user: req.user.id },
      {
        vitals: {
          ...req.body,
          lastUpdated: new Date()
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: patient.vitals
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get nearby doctors
 * @route   GET /api/patients/nearby-doctors
 * @access  Private/Patient
 */
exports.getNearbyDoctors = async (req, res, next) => {
  try {
    const { specialty, lat, lng, distance = 10 } = req.query;

    const query = {
      isAcceptingPatients: true,
      'verificationStatus': 'verified'
    };

    if (specialty) {
      query.specialization = specialty;
    }

    // For simplicity, just return all matching doctors
    // In production, would use geospatial queries
    const doctors = await Doctor.find(query)
      .populate('user', 'firstName lastName avatar')
      .limit(20);

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get consultation history
 * @route   GET /api/patients/consultations
 * @access  Private/Patient
 */
exports.getConsultationHistory = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });
    
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const consultations = await Consultation.find({ patient: patient._id })
      .populate('doctor', 'specialization')
      .skip(skip)
      .limit(limit)
      .sort('-createdAt');

    const total = await Consultation.countDocuments({ patient: patient._id });

    res.status(200).json({
      success: true,
      count: consultations.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: consultations
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get prescriptions
 * @route   GET /api/patients/prescriptions
 * @access  Private/Patient
 */
exports.getPrescriptions = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });

    const consultations = await Consultation.find({
      patient: patient._id,
      'treatment.prescriptions': { $exists: true, $ne: [] }
    })
      .populate('doctor', 'specialization')
      .select('treatment.prescriptions createdAt doctor')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      data: consultations
    });
  } catch (error) {
    next(error);
  }
};
