/**
 * ClinRoute Server
 * AI-Powered Hospital Triage and Clinical Workflow Automation Platform
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Load environment variables from root .env file
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const consultationRoutes = require('./routes/consultations');
const appointmentRoutes = require('./routes/appointments');
const triageRoutes = require('./routes/triage');

// Initialize Express app
const app = express();
const httpServer = createServer(app);

// Socket.IO setup for real-time features
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  }
});
app.use('/api/', limiter);

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ClinRoute API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/triage', triageRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join room based on user type and ID
  socket.on('join-room', (data) => {
    const { userId, userType } = data;
    socket.join(`${userType}-${userId}`);
    console.log(`User ${userId} joined room: ${userType}-${userId}`);
  });

  // Handle real-time consultation updates
  socket.on('consultation-update', (data) => {
    io.to(`doctor-${data.doctorId}`).emit('new-consultation', data);
    io.to(`patient-${data.patientId}`).emit('consultation-status', data);
  });

  // Handle real-time queue updates
  socket.on('queue-update', (data) => {
    io.emit('queue-changed', data);
  });

  // Handle video call signaling
  socket.on('call-initiate', (data) => {
    io.to(`${data.targetType}-${data.targetId}`).emit('incoming-call', data);
  });

  socket.on('call-accept', (data) => {
    io.to(`${data.callerType}-${data.callerId}`).emit('call-accepted', data);
  });

  socket.on('call-reject', (data) => {
    io.to(`${data.callerType}-${data.callerId}`).emit('call-rejected', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io accessible in routes
app.set('io', io);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   🏥 ClinRoute API Server                                 ║
  ║   AI-Powered Hospital Triage Platform                     ║
  ║                                                           ║
  ║   Server running on port ${PORT}                            ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}                          ║
  ║                                                           ║
  ║   Health Check: http://localhost:${PORT}/health              ║
  ║   API Base URL: http://localhost:${PORT}/api                 ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err.message);
  httpServer.close(() => process.exit(1));
});

module.exports = { app, httpServer };
