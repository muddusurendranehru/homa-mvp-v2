// Migration script to add Blood Pressure columns
// Run this ONCE to add bp_systolic and bp_diastolic columns

const pool = require('../config/database');
require('dotenv').config();

async function migrateBP() {
  console.log('🩺 Adding Blood Pressure columns to patient_assessments...\n');

  try {
    // Add bp_systolic column
    console.log('1. Adding bp_systolic column...');
    await pool.query(`
      ALTER TABLE patient_assessments 
      ADD COLUMN IF NOT EXISTS bp_systolic INT
    `);
    console.log('   ✅ bp_systolic added\n');

    // Add bp_diastolic column
    console.log('2. Adding bp_diastolic column...');
    await pool.query(`
      ALTER TABLE patient_assessments 
      ADD COLUMN IF NOT EXISTS bp_diastolic INT
    `);
    console.log('   ✅ bp_diastolic added\n');

    // Verify columns exist
    console.log('3. Verifying columns...');
    const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'patient_assessments' 
      AND column_name IN ('bp_systolic', 'bp_diastolic')
    `);

    console.log('   Found columns:');
    result.rows.forEach(row => {
      console.log(`   - ${row.column_name}: ${row.data_type}`);
    });

    if (result.rows.length === 2) {
      console.log('\n✅ Blood Pressure migration completed successfully!');
      console.log('\n📊 BP ranges:');
      console.log('   Normal: <120/<80 mmHg');
      console.log('   Elevated: 120-129/<80 mmHg');
      console.log('   High Stage 1: 130-139/80-89 mmHg');
      console.log('   High Stage 2: ≥140/≥90 mmHg');
    } else {
      console.log('\n⚠️ Warning: Expected 2 columns, found', result.rows.length);
    }

  } catch (error) {
    console.error('❌ Migration error:', error.message);
  } finally {
    await pool.end();
  }
}

migrateBP();

