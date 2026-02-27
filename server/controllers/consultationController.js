/**
 * Consultation Controller
 */

const Consultation = require('../models/Consultation');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

/**
 * @desc    Submit symptoms / Start consultation
 * @route   POST /api/consultations
 * @access  Private/Patient
 */
exports.submitSymptoms = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    const { symptoms, additionalNotes, attachments, preferredDoctor } = req.body;

    // Create consultation
    const consultation = await Consultation.create({
      patient: patient._id,
      doctor: preferredDoctor || null,
      symptoms,
      additionalNotes,
      attachments,
      status: 'pending'
    });

    // Assign to doctor if not specified
    if (!preferredDoctor) {
      // Auto-assign based on triage priority and doctor availability
      const availableDoctor = await Doctor.findOne({
        isAcceptingPatients: true,
        verificationStatus: 'verified'
      }).sort('currentPatientLoad');

      if (availableDoctor) {
        consultation.doctor = availableDoctor._id;
        await consultation.save();
      }
    }

    res.status(201).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get consultation by ID
 * @route   GET /api/consultations/:id
 * @access  Private
 */
exports.getConsultation = async (req, res, next) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'firstName lastName avatar' }
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'firstName lastName avatar' }
      });

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    // Check access
    const patient = await Patient.findOne({ user: req.user.id });
    const doctor = await Doctor.findOne({ user: req.user.id });

    const hasAccess = 
      (patient && consultation.patient._id.toString() === patient._id.toString()) ||
      (doctor && consultation.doctor && consultation.doctor._id.toString() === doctor._id.toString()) ||
      req.user.role === 'admin';

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this consultation'
      });
    }

    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update consultation
 * @route   PUT /api/consultations/:id
 * @access  Private
 */
exports.updateConsultation = async (req, res, next) => {
  try {
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
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
 * @desc    Add message to consultation
 * @route   POST /api/consultations/:id/messages
 * @access  Private
 */
exports.addMessage = async (req, res, next) => {
  try {
    const { content, attachments } = req.body;

    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    // Determine sender type
    const patient = await Patient.findOne({ user: req.user.id });
    const senderType = patient ? 'patient' : 'doctor';

    const message = {
      sender: req.user.id,
      senderType,
      content,
      attachments: attachments || [],
      timestamp: new Date()
    };

    consultation.messages.push(message);

    // Update first response time if doctor's first message
    if (senderType === 'doctor' && !consultation.firstResponseAt) {
      consultation.firstResponseAt = new Date();
      consultation.status = 'in-progress';
    }

    await consultation.save();

    // Emit socket event for real-time messaging
    if (req.io) {
      req.io.to(`consultation:${consultation._id}`).emit('newMessage', message);
    }

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get messages for consultation
 * @route   GET /api/consultations/:id/messages
 * @access  Private
 */
exports.getMessages = async (req, res, next) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .select('messages')
      .populate('messages.sender', 'firstName lastName avatar');

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: consultation.messages
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Start video session
 * @route   POST /api/consultations/:id/video/start
 * @access  Private/Doctor
 */
exports.startVideoSession = async (req, res, next) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    // Generate video session token (placeholder)
    const sessionToken = `video_${consultation._id}_${Date.now()}`;

    consultation.videoSession = {
      sessionId: sessionToken,
      startedAt: new Date(),
      startedBy: req.user.id
    };

    await consultation.save();

    // Notify patient via socket
    if (req.io) {
      req.io.to(`consultation:${consultation._id}`).emit('videoSessionStarted', {
        sessionId: sessionToken
      });
    }

    res.status(200).json({
      success: true,
      data: {
        sessionId: sessionToken,
        consultationId: consultation._id
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    End video session
 * @route   POST /api/consultations/:id/video/end
 * @access  Private
 */
exports.endVideoSession = async (req, res, next) => {
  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation || !consultation.videoSession) {
      return res.status(404).json({
        success: false,
        message: 'Video session not found'
      });
    }

    consultation.videoSession.endedAt = new Date();
    consultation.videoSession.duration = 
      (consultation.videoSession.endedAt - consultation.videoSession.startedAt) / 1000 / 60; // in minutes

    await consultation.save();

    // Notify via socket
    if (req.io) {
      req.io.to(`consultation:${consultation._id}`).emit('videoSessionEnded');
    }

    res.status(200).json({
      success: true,
      message: 'Video session ended'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Submit patient feedback
 * @route   POST /api/consultations/:id/feedback
 * @access  Private/Patient
 */
exports.submitFeedback = async (req, res, next) => {
  try {
    const { rating, comment, wouldRecommend } = req.body;

    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: 'Consultation not found'
      });
    }

    consultation.feedback = {
      rating,
      comment,
      wouldRecommend,
      submittedAt: new Date()
    };

    await consultation.save();

    // Update doctor's rating
    if (consultation.doctor) {
      const doctorConsultations = await Consultation.find({
        doctor: consultation.doctor,
        'feedback.rating': { $exists: true }
      });

      const totalRating = doctorConsultations.reduce((sum, c) => sum + c.feedback.rating, 0);
      const avgRating = totalRating / doctorConsultations.length;

      await Doctor.findByIdAndUpdate(consultation.doctor, {
        averageRating: avgRating,
        totalReviews: doctorConsultations.length
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Close consultation
 * @route   PUT /api/consultations/:id/close
 * @access  Private
 */
exports.closeConsultation = async (req, res, next) => {
  try {
    const { resolution, summary } = req.body;

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      {
        status: 'completed',
        closedAt: new Date(),
        resolution,
        summary
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
 * @desc    Cancel consultation
 * @route   PUT /api/consultations/:id/cancel
 * @access  Private
 */
exports.cancelConsultation = async (req, res, next) => {
  try {
    const { reason } = req.body;

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      {
        status: 'cancelled',
        cancelledAt: new Date(),
        cancellationReason: reason
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
 * @desc    Get all consultations (admin)
 * @route   GET /api/consultations
 * @access  Private/Admin
 */
exports.getAllConsultations = async (req, res, next) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const query = {};
    if (status) query.status = status;
    if (priority) query['triage.priority'] = priority;

    const consultations = await Consultation.find(query)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'firstName lastName' }
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'firstName lastName' }
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort('-createdAt');

    const total = await Consultation.countDocuments(query);

    res.status(200).json({
      success: true,
      count: consultations.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: consultations
    });
  } catch (error) {
    next(error);
  }
};
