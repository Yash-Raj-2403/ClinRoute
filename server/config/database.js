/**
 * MongoDB Database Configuration
 * MongoDB is optional - the application primarily uses Supabase (PostgreSQL)
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  // Check if MongoDB URI is provided
  if (!process.env.MONGODB_URI) {
    console.log('MongoDB URI not provided. Using Supabase as primary database.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Mongoose 6+ no longer requires these options, but keeping for compatibility
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });

  } catch (error) {
    console.warn('MongoDB connection failed:', error.message);
    console.log('Continuing with Supabase as primary database...');
  }
};

module.exports = connectDB;
