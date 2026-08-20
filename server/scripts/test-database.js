/**
 * Database Testing Script
 * Tests connection, schema, insert, and fetch operations
 * 
 * Usage: node scripts/test-database.js
 */

const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function success(msg) {
  console.log(`${colors.green}✅ ${msg}${colors.reset}`);
}

function error(msg) {
  console.log(`${colors.red}❌ ${msg}${colors.reset}`);
}

function info(msg) {
  console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`);
}

function section(msg) {
  console.log(`\n${colors.blue}${'='.repeat(60)}`);
  console.log(`  ${msg}`);
  console.log(`${'='.repeat(60)}${colors.reset}\n`);
}

async function testDatabaseConnection() {
  section('TEST 1: Database Connection');
  
  try {
    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    success('Connected to Neon PostgreSQL');
    info(`Current Time: ${result.rows[0].current_time}`);
    info(`PostgreSQL Version: ${result.rows[0].pg_version.split(' ')[0]} ${result.rows[0].pg_version.split(' ')[1]}`);
    return true;
  } catch (err) {
    error(`Connection failed: ${err.message}`);
    return false;
  }
}

async function checkSchema() {
  section('TEST 2: Schema Verification');
  
  try {
    // Check if users table exists
    const usersTable = await pool.query(`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      ORDER BY ordinal_position
    `);
    
    if (usersTable.rows.length > 0) {
      success('Users table exists');
      console.log('\nUsers table columns:');
      usersTable.rows.forEach(col => {
        console.log(`  - ${col.column_name} (${col.data_type})`);
      });
    } else {
      error('Users table does not exist');
      info('Run: npm run init-db');
      return false;
    }
    
    // Check if patient_assessments table exists
    const assessmentsTable = await pool.query(`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'patient_assessments' 
      ORDER BY ordinal_position
    `);
    
    if (assessmentsTable.rows.length > 0) {
      success('Patient_assessments table exists');
      console.log('\nPatient_assessments table columns:');
      assessmentsTable.rows.forEach(col => {
        console.log(`  - ${col.column_name} (${col.data_type})`);
      });
    } else {
      error('Patient_assessments table does not exist');
      info('Run: npm run init-db');
      return false;
    }
    
    return true;
  } catch (err) {
    error(`Schema check failed: ${err.message}`);
    return false;
  }
}

async function testInsertUser() {
  section('TEST 3: Insert Test User');
  
  try {
    // Check if test user already exists
    const existing = await pool.query(
      'SELECT id, name, email FROM users WHERE email = $1',
      ['test@homaclinic.com']
    );
    
    if (existing.rows.length > 0) {
      info('Test user already exists, deleting...');
      await pool.query('DELETE FROM users WHERE email = $1', ['test@homaclinic.com']);
      success('Old test user deleted');
    }
    
    // Insert new test user
    const passwordHash = await bcrypt.hash('TestPass123!', 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, phone, created_at) 
       VALUES ($1, $2, $3, $4, NOW()) 
       RETURNING id, name, email, phone, created_at`,
      ['Dr. Test Patient', 'test@homaclinic.com', passwordHash, '9876543210']
    );
    
    const user = result.rows[0];
    success('Test user inserted successfully');
    console.log('\nUser Details:');
    console.log(`  ID: ${user.id}`);
    console.log(`  Name: ${user.name}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Phone: ${user.phone}`);
    console.log(`  Created: ${user.created_at}`);
    
    return user.id;
  } catch (err) {
    error(`User insert failed: ${err.message}`);
    return null;
  }
}

async function testInsertAssessment(userId) {
  section('TEST 4: Insert Test Assessment');
  
  if (!userId) {
    error('No user ID provided, skipping assessment insert');
    return null;
  }
  
  try {
    const result = await pool.query(
      `INSERT INTO patient_assessments (
        user_id, age, gender, height_cm, weight_kg, waist_cm,
        fbs, fasting_insulin, post_lunch_bs, hba1c,
        total_cholesterol, hdl, ldl, triglycerides,
        current_meds, procedures, post_menopausal, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, NOW())
      RETURNING *`,
      [
        userId,
        45,                                    // age
        'Male',                                // gender
        170.0,                                 // height_cm
        85.0,                                  // weight_kg
        102.0,                                 // waist_cm
        110.0,                                 // fbs
        15.0,                                  // fasting_insulin
        145.0,                                 // post_lunch_bs
        6.2,                                   // hba1c
        220.0,                                 // total_cholesterol
        40.0,                                  // hdl
        150.0,                                 // ldl
        180.0,                                 // triglycerides
        'Metformin 500mg BD, Atorvastatin 20mg OD',  // current_meds
        'CAG done in 2020',                    // procedures
        false                                  // post_menopausal
      ]
    );
    
    const assessment = result.rows[0];
    success('Test assessment inserted successfully');
    
    // Calculate metrics
    const heightM = assessment.height_cm / 100;
    const bmi = assessment.weight_kg / (heightM * heightM);
    const homaIR = (assessment.fbs * assessment.fasting_insulin) / 405;
    const tyg = Math.log((assessment.triglycerides * assessment.fbs) / 2);
    const whtr = assessment.waist_cm / assessment.height_cm;
    
    console.log('\nAssessment Details:');
    console.log(`  ID: ${assessment.id}`);
    console.log(`  Age: ${assessment.age} years`);
    console.log(`  Gender: ${assessment.gender}`);
    console.log(`  Height: ${assessment.height_cm} cm`);
    console.log(`  Weight: ${assessment.weight_kg} kg`);
    console.log(`  Waist: ${assessment.waist_cm} cm`);
    console.log(`  FBS: ${assessment.fbs} mg/dL`);
    console.log(`  Fasting Insulin: ${assessment.fasting_insulin} μU/mL`);
    console.log(`  HbA1c: ${assessment.hba1c}%`);
    console.log(`  Triglycerides: ${assessment.triglycerides} mg/dL`);
    
    console.log('\nCalculated Metrics:');
    console.log(`  BMI: ${bmi.toFixed(2)} (${bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'})`);
    console.log(`  HOMA-IR: ${homaIR.toFixed(2)} (${homaIR < 2 ? 'Normal' : homaIR < 2.9 ? 'Early IR' : 'Significant IR'})`);
    console.log(`  TyG Index: ${tyg.toFixed(2)} (${tyg < 8.5 ? 'Normal' : tyg < 8.8 ? 'Borderline' : 'Insulin Resistance'})`);
    console.log(`  WHtR: ${whtr.toFixed(3)} (${whtr < 0.5 ? 'Healthy' : 'At Risk'})`);
    
    return assessment.id;
  } catch (err) {
    error(`Assessment insert failed: ${err.message}`);
    return null;
  }
}

async function testFetchLatest(userId) {
  section('TEST 5: Fetch Latest Assessment');
  
  if (!userId) {
    error('No user ID provided, skipping fetch');
    return;
  }
  
  try {
    const result = await pool.query(
      `SELECT * FROM patient_assessments 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [userId]
    );
    
    if (result.rows.length === 0) {
      error('No assessment found for user');
      return;
    }
    
    success('Latest assessment fetched successfully');
    const assessment = result.rows[0];
    console.log(`\nFound assessment from: ${assessment.created_at}`);
    console.log(`  Waist: ${assessment.waist_cm} cm`);
    console.log(`  FBS: ${assessment.fbs} mg/dL`);
    console.log(`  HbA1c: ${assessment.hba1c}%`);
  } catch (err) {
    error(`Fetch latest failed: ${err.message}`);
  }
}

async function testFetchHistory(userId) {
  section('TEST 6: Fetch Assessment History');
  
  if (!userId) {
    error('No user ID provided, skipping history fetch');
    return;
  }
  
  try {
    const result = await pool.query(
      `SELECT id, created_at, waist_cm, fbs, hba1c 
       FROM patient_assessments 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );
    
    success(`Found ${result.rows.length} assessment(s) in history`);
    
    if (result.rows.length > 0) {
      console.log('\nAssessment History:');
      result.rows.forEach((row, index) => {
        console.log(`\n  ${index + 1}. ${row.created_at}`);
        console.log(`     Waist: ${row.waist_cm} cm`);
        console.log(`     FBS: ${row.fbs} mg/dL`);
        console.log(`     HbA1c: ${row.hba1c}%`);
      });
    }
  } catch (err) {
    error(`Fetch history failed: ${err.message}`);
  }
}

async function showDatabaseStats() {
  section('TEST 7: Database Statistics');
  
  try {
    const userCount = await pool.query('SELECT COUNT(*) as count FROM users');
    const assessmentCount = await pool.query('SELECT COUNT(*) as count FROM patient_assessments');
    
    success('Database statistics retrieved');
    console.log(`\n  Total Users: ${userCount.rows[0].count}`);
    console.log(`  Total Assessments: ${assessmentCount.rows[0].count}`);
    
    // Show all users
    const allUsers = await pool.query('SELECT id, name, email, phone FROM users ORDER BY created_at DESC');
    if (allUsers.rows.length > 0) {
      console.log('\n  All Users:');
      allUsers.rows.forEach((user, index) => {
        console.log(`    ${index + 1}. ${user.name} (${user.email})`);
      });
    }
  } catch (err) {
    error(`Stats retrieval failed: ${err.message}`);
  }
}

async function runAllTests() {
  console.log(`\n${colors.blue}╔═══════════════════════════════════════════════════════════╗`);
  console.log(`║  🩺 HOMA Clinic - Database Testing Suite                 ║`);
  console.log(`║  Dr. Muddu Surendra Nehru - Metabolic Remission MVP      ║`);
  console.log(`╚═══════════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  let userId = null;
  
  // Test 1: Connection
  const connectionOk = await testDatabaseConnection();
  if (!connectionOk) {
    error('Cannot proceed without database connection');
    process.exit(1);
  }
  
  // Test 2: Schema
  const schemaOk = await checkSchema();
  if (!schemaOk) {
    error('Schema not found. Please run: npm run init-db');
    process.exit(1);
  }
  
  // Test 3: Insert User
  userId = await testInsertUser();
  
  // Test 4: Insert Assessment
  await testInsertAssessment(userId);
  
  // Test 5: Fetch Latest
  await testFetchLatest(userId);
  
  // Test 6: Fetch History
  await testFetchHistory(userId);
  
  // Test 7: Stats
  await showDatabaseStats();
  
  // Final Summary
  section('TEST SUMMARY');
  success('All database tests completed successfully!');
  console.log('\n  Next steps:');
  console.log('  1. Start the server: npm run dev');
  console.log('  2. Test API endpoints with Postman/cURL');
  console.log('  3. Build the Next.js frontend\n');
  
  console.log(`${colors.cyan}Database Console: https://console.neon.tech/app/projects/proud-sunset-82737074${colors.reset}\n`);
  
  await pool.end();
}

// Run tests
runAllTests().catch(err => {
  error(`Fatal error: ${err.message}`);
  console.error(err);
  process.exit(1);
});

