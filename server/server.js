const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'HOMA Clinic Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Import routes with error handling
let authRoutes, assessmentRoutes, nutribotRoutes, galleryRoutes;

try {
  console.log('Loading routes...');
  authRoutes = require('./routes/auth');
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.error('❌ Failed to load auth routes:', error.message);
}

try {
  assessmentRoutes = require('./routes/assessments');
  console.log('✅ Assessment routes loaded');
} catch (error) {
  console.error('❌ Failed to load assessment routes:', error.message);
}

try {
  nutribotRoutes = require('./routes/nutribot');
  console.log('✅ NutriBot routes loaded');
} catch (error) {
  console.error('❌ Failed to load nutribot routes:', error.message);
}

try {
  galleryRoutes = require('./routes/gallery');
  console.log('✅ Gallery routes loaded');
} catch (error) {
  console.error('❌ Failed to load gallery routes:', error.message);
}

// API Routes - only register if loaded successfully
if (authRoutes) {
  app.use('/api/auth', authRoutes);
  console.log('✅ /api/auth routes registered');
}
if (assessmentRoutes) {
  app.use('/api/assessments', assessmentRoutes);
  console.log('✅ /api/assessments routes registered');
}
if (nutribotRoutes) {
  app.use('/api/nutribot', nutribotRoutes);
  console.log('✅ /api/nutribot routes registered');
}
if (galleryRoutes) {
  app.use('/api/gallery', galleryRoutes);
  console.log('✅ /api/gallery routes registered');
}

// Privacy Policy - Standalone HTML for Google Play compliance
app.get('/privacy-policyAll', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'privacy-policy.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('🩺 ========================================');
  console.log('   HOMA Health - Metabolic Remission MVP');
  console.log('   Dr. Muddu Surendra Nehru');
  console.log('========================================== 🩺');
  console.log('');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/auth/signup`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`📊 Assessment endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/assessments`);
  console.log(`   GET  http://localhost:${PORT}/api/assessments/latest`);
  console.log(`   GET  http://localhost:${PORT}/api/assessments/history`);
  console.log(`🤖 NutriBot endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/nutribot/tokens`);
  console.log(`   POST http://localhost:${PORT}/api/nutribot/use-token`);
  console.log(`   POST http://localhost:${PORT}/api/nutribot/recharge`);
  console.log(`📸 Gallery endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/gallery`);
  console.log(`   POST http://localhost:${PORT}/api/gallery (protected)`);
  console.log(`   PUT  http://localhost:${PORT}/api/gallery/:id (protected)`);
  console.log(`   DELETE http://localhost:${PORT}/api/gallery/:id (protected)`);
  console.log(`📄 Privacy Policy:`);
  console.log(`   GET  http://localhost:${PORT}/privacy-policyAll`);
  console.log('');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('==========================================');
  console.log('');
});

module.exports = app;