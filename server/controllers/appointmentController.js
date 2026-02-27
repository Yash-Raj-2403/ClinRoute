/**
 * Appointment Controller
 */

const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

/**
 * @desc    Book appointment
 * @route   POST /api/appointments
 * @access  Private/Patient
 */
exports.bookAppointment = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });
    
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    const { doctor, dateTime, type, reason, duration, notes } = req.body;

    // Verify doctor exists and is accepting patients
    const doctorDoc = await Doctor.findById(doctor);
    if (!doctorDoc || !doctorDoc.isAcceptingPatients) {
      return res.status(400).json({
        success: false,
        message: 'Doctor is not available for appointments'
      });
    }

    // Check for conflicting appointments
    const conflictingAppointment = await Appointment.findOne({
      doctor,
      dateTime: new Date(dateTime),
      status: { $nin: ['cancelled', 'no-show'] }
    });

    if (conflictingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patient: patient._id,
      doctor,
      dateTime: new Date(dateTime),
      type: type || 'consultation',
      reason,
      duration: duration || 30,
      notes,
      status: 'scheduled'
    });

    await appointment.populate([
      { path: 'doctor', populate: { path: 'user', select: 'firstName lastName' } }
    ]);

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get appointment by ID
 * @route   GET /api/appointments/:id
 * @access  Private
 */
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'firstName lastName avatar phone email' }
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'firstName lastName avatar' }
      });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update appointment
 * @route   PUT /api/appointments/:id
 * @access  Private
 */
exports.updateAppointment = async (req, res, next) => {
  try {
    const { dateTime, reason, notes } = req.body;

    // If rescheduling, check for conflicts
    if (dateTime) {
      const appointment = await Appointment.findById(req.params.id);
      const conflicting = await Appointment.findOne({
        doctor: appointment.doctor,
        dateTime: new Date(dateTime),
        _id: { $ne: req.params.id },
        status: { $nin: ['cancelled', 'no-show'] }
      });

      if (conflicting) {
        return res.status(400).json({
          success: false,
          message: 'This time slot is already booked'
        });
      }
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { dateTime, reason, notes },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel appointment
 * @route   PUT /api/appointments/:id/cancel
 * @access  Private
 */
exports.cancelAppointment = async (req, res, next) => {
  try {
    const { reason } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'cancelled',
        cancellationReason: reason,
        cancelledBy: req.user.id,
        cancelledAt: new Date()
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Confirm appointment
 * @route   PUT /api/appointments/:id/confirm
 * @access  Private/Doctor
 */
exports.confirmAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'confirmed',
        confirmedAt: new Date()
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Complete appointment
 * @route   PUT /api/appointments/:id/complete
 * @access  Private/Doctor
 */
exports.completeAppointment = async (req, res, next) => {
  try {
    const { notes, followUp } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: 'completed',
        completedAt: new Date(),
        appointmentNotes: notes,
        followUpRequired: !!followUp,
        followUpDate: followUp
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark as no-show
 * @route   PUT /api/appointments/:id/no-show
 * @access  Private/Doctor
 */
exports.markNoShow = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'no-show' },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get my appointments (patient)
 * @route   GET /api/appointments/my
 * @access  Private/Patient
 */
exports.getMyAppointments = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id });
    const { status, upcoming } = req.query;

    const query = { patient: patient._id };

    if (status) {
      query.status = status;
    }

    if (upcoming === 'true') {
      query.dateTime = { $gte: new Date() };
      query.status = { $in: ['scheduled', 'confirmed'] };
    }

    const appointments = await Appointment.find(query)
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'firstName lastName avatar' }
      })
      .sort('dateTime');

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get doctor appointments
 * @route   GET /api/appointments/doctor
 * @access  Private/Doctor
 */
exports.getDoctorAppointments = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });
    const { date, status, page = 1, limit = 20 } = req.query;

    const query = { doctor: doctor._id };

    if (status) {
      query.status = status;
    }

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.dateTime = { $gte: startDate, $lte: endDate };
    }

    const skip = (page - 1) * limit;

    const appointments = await Appointment.find(query)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'firstName lastName avatar phone' }
      })
      .skip(skip)
      .limit(parseInt(limit))
      .sort('dateTime');

    const total = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      count: appointments.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get calendar view
 * @route   GET /api/appointments/calendar
 * @access  Private
 */
exports.getCalendarView = async (req, res, next) => {
  try {
    const { start, end } = req.query;
    
    let query = {
      dateTime: {
        $gte: new Date(start),
        $lte: new Date(end)
      }
    };

    // Filter by user role
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user.id });
      query.patient = patient._id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user.id });
      query.doctor = doctor._id;
    }

    const appointments = await Appointment.find(query)
      .populate({
        path: 'patient',
        populate: { path: 'user', select: 'firstName lastName' }
      })
      .populate({
        path: 'doctor',
        populate: { path: 'user', select: 'firstName lastName' }
      })
      .sort('dateTime');

    // Format for calendar
    const events = appointments.map(apt => ({
      id: apt._id,
      title: req.user.role === 'doctor' 
        ? `${apt.patient?.user?.firstName} ${apt.patient?.user?.lastName}` 
        : `Dr. ${apt.doctor?.user?.lastName}`,
      start: apt.dateTime,
      end: new Date(apt.dateTime.getTime() + apt.duration * 60000),
      type: apt.type,
      status: apt.status,
      reason: apt.reason
    }));

    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Reschedule appointment
 * @route   PUT /api/appointments/:id/reschedule
 * @access  Private
 */
exports.rescheduleAppointment = async (req, res, next) => {
  try {
    const { newDateTime, reason } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check for conflicts
    const conflicting = await Appointment.findOne({
      doctor: appointment.doctor,
      dateTime: new Date(newDateTime),
      _id: { $ne: req.params.id },
      status: { $nin: ['cancelled', 'no-show'] }
    });

    if (conflicting) {
      return res.status(400).json({
        success: false,
        message: 'New time slot is not available'
      });
    }

    // Store reschedule history
    if (!appointment.rescheduleHistory) {
      appointment.rescheduleHistory = [];
    }
    
    appointment.rescheduleHistory.push({
      previousDateTime: appointment.dateTime,
      newDateTime: new Date(newDateTime),
      reason,
      rescheduledBy: req.user.id,
      rescheduledAt: new Date()
    });

    appointment.dateTime = new Date(newDateTime);
    appointment.status = 'scheduled'; // Reset to scheduled

    await appointment.save();

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get appointment slots for a date
 * @route   GET /api/appointments/slots
 * @access  Public
 */
exports.getAvailableSlots = async (req, res, next) => {
  try {
    const { doctorId, date } = req.query;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    const requestedDate = new Date(date);
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][requestedDate.getDay()];
    const schedule = doctor.schedule[dayOfWeek];

    if (!schedule || !schedule.isAvailable) {
      return res.status(200).json({
        success: true,
        data: {
          available: false,
          message: 'Doctor is not available on this day',
          slots: []
        }
      });
    }

    // Get booked slots
    const startOfDay = new Date(requestedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(requestedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedAppointments = await Appointment.find({
      doctor: doctorId,
      dateTime: { $gte: startOfDay, $lte: endOfDay },
      status: { $nin: ['cancelled', 'no-show'] }
    }).select('dateTime duration');

    const bookedTimes = bookedAppointments.map(apt => apt.dateTime.getTime());

    // Generate slots
    const slots = [];
    const [startHour, startMin] = schedule.startTime.split(':').map(Number);
    const [endHour, endMin] = schedule.endTime.split(':').map(Number);
    const slotDuration = 30; // minutes

    let current = new Date(requestedDate);
    current.setHours(startHour, startMin, 0, 0);

    const end = new Date(requestedDate);
    end.setHours(endHour, endMin, 0, 0);

    while (current < end) {
      const slotTime = new Date(current);
      const isBooked = bookedTimes.includes(slotTime.getTime());
      const isPast = slotTime < new Date();

      slots.push({
        time: slotTime.toISOString(),
        displayTime: slotTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        available: !isBooked && !isPast,
        isBooked,
        isPast
      });

      current.setMinutes(current.getMinutes() + slotDuration);
    }

    res.status(200).json({
      success: true,
      data: {
        available: true,
        date: requestedDate.toISOString().split('T')[0],
        doctorId,
        slots
      }
    });
  } catch (error) {
    next(error);
  }
};
