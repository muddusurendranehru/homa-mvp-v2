/**
 * Show Exact Current Database Schema
 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function showSchema() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║  EXACT CURRENT DATABASE SCHEMA                             ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  try {
    // Show users table schema
    console.log('📋 USERS TABLE:\n');
    const usersSchema = await pool.query(`
      SELECT column_name, data_type, is_nullable, ordinal_position
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `);
    
    usersSchema.rows.forEach(col => {
      const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
      console.log(`  ${col.ordinal_position}. ${col.column_name.padEnd(20)} ${col.data_type.padEnd(30)} ${nullable}`);
    });
    
    // Show patient_assessments table schema
    console.log('\n📋 PATIENT_ASSESSMENTS TABLE:\n');
    const assessmentsSchema = await pool.query(`
      SELECT column_name, data_type, is_nullable, ordinal_position
      FROM information_schema.columns
      WHERE table_name = 'patient_assessments'
      ORDER BY ordinal_position
    `);
    
    assessmentsSchema.rows.forEach(col => {
      const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
      const marker = col.column_name === 'vldl' ? ' ← NEW!' : '';
      console.log(`  ${col.ordinal_position.toString().padStart(2)}. ${col.column_name.padEnd(20)} ${col.data_type.padEnd(30)} ${nullable}${marker}`);
    });
    
    // Show indexes
    console.log('\n📋 INDEXES:\n');
    const indexes = await pool.query(`
      SELECT tablename, indexname
      FROM pg_indexes
      WHERE tablename IN ('users', 'patient_assessments')
      ORDER BY tablename, indexname
    `);
    
    indexes.rows.forEach(idx => {
      console.log(`  ${idx.tablename.padEnd(25)} → ${idx.indexname}`);
    });
    
    // Show counts
    console.log('\n📊 CURRENT DATA:\n');
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    const assessmentCount = await pool.query('SELECT COUNT(*) FROM patient_assessments');
    const vldlCount = await pool.query('SELECT COUNT(*) FROM patient_assessments WHERE vldl IS NOT NULL');
    
    console.log(`  Total Users: ${userCount.rows[0].count}`);
    console.log(`  Total Assessments: ${assessmentCount.rows[0].count}`);
    console.log(`  Assessments with VLDL: ${vldlCount.rows[0].count}`);
    console.log(`  Assessments without VLDL: ${assessmentCount.rows[0].count - vldlCount.rows[0].count} (old records - safe!)`);
    
    console.log('\n✅ Schema displayed successfully!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

showSchema();

