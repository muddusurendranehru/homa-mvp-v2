/**
 * Database Initialization Script
 * Run this to set up tables in Neon PostgreSQL
 * 
 * Usage: node scripts/init-db.js
 */

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

async function initializeDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔄 Connecting to Neon PostgreSQL...');
    
    // Read schema file
    const schemaPath = path.join(__dirname, '..', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('📋 Executing schema...');
    await pool.query(schema);
    
    console.log('✅ Database initialized successfully!');
    console.log('');
    console.log('Tables created:');
    console.log('  - users');
    console.log('  - patient_assessments');
    console.log('');
    console.log('You can now start the server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Error initializing database:');
    console.error(error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run initialization
initializeDatabase();

