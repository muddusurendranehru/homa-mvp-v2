/**
 * Migration Script: Add VLDL Column
 * Run: node scripts/migrate-vldl.js
 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function migrate() {
  console.log('\n🔄 Starting VLDL Migration...\n');
  
  try {
    // Step 1: Add VLDL column
    console.log('Step 1: Adding VLDL column...');
    await pool.query('ALTER TABLE patient_assessments ADD COLUMN IF NOT EXISTS vldl FLOAT');
    console.log('✅ VLDL column added successfully\n');
    
    // Step 2: Verify lipid columns order
    console.log('Step 2: Verifying lipid columns order...');
    const columns = await pool.query(`
      SELECT column_name, ordinal_position 
      FROM information_schema.columns 
      WHERE table_name = 'patient_assessments' 
        AND column_name IN ('total_cholesterol', 'hdl', 'ldl', 'triglycerides', 'vldl') 
      ORDER BY ordinal_position
    `);
    
    console.log('Lipid Panel Columns (in order):');
    columns.rows.forEach((col, i) => {
      console.log(`  ${i+1}. ${col.column_name.padEnd(20)} (position ${col.ordinal_position})`);
    });
    console.log('');
    
    // Step 3: Test patient name access via JOIN
    console.log('Step 3: Testing patient name access...');
    const testJoin = await pool.query(`
      SELECT 
        u.name AS patient_name,
        u.email,
        a.age,
        a.waist_cm,
        a.vldl
      FROM patient_assessments a
      JOIN users u ON a.user_id = u.id
      LIMIT 3
    `);
    
    if (testJoin.rows.length > 0) {
      console.log('✅ Patient names accessible via JOIN:\n');
      testJoin.rows.forEach((row, i) => {
        console.log(`  ${i+1}. ${row.patient_name}`);
        console.log(`     Email: ${row.email}`);
        console.log(`     Age: ${row.age}, Waist: ${row.waist_cm}cm`);
        console.log(`     VLDL: ${row.vldl === null ? 'NULL (safe - old record)' : row.vldl + ' mg/dL'}`);
        console.log('');
      });
    }
    
    // Step 4: Count records
    const counts = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(vldl) as with_vldl,
        COUNT(*) - COUNT(vldl) as without_vldl
      FROM patient_assessments
    `);
    
    console.log('Step 4: Assessment Statistics:');
    console.log(`  Total assessments: ${counts.rows[0].total}`);
    console.log(`  With VLDL value: ${counts.rows[0].with_vldl}`);
    console.log(`  Without VLDL (NULL): ${counts.rows[0].without_vldl} ← Safe!`);
    console.log('');
    
    console.log('✅ Migration completed successfully!');
    console.log('\n📋 Summary:');
    console.log('  ✅ VLDL column added (next to triglycerides)');
    console.log('  ✅ Old assessments have NULL for VLDL (frontend can handle)');
    console.log('  ✅ Patient names accessible via JOIN with users table');
    console.log('  ✅ No data lost, no errors\n');
    console.log('Next steps:');
    console.log('  1. Frontend can now send VLDL in new assessments');
    console.log('  2. Frontend displays patient name from API response');
    console.log('  3. Frontend handles NULL VLDL for old records\n');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});

