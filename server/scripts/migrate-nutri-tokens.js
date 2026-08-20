// Script to add nutri_tokens columns to users table
const pool = require('../config/database');

async function migrateNutriTokens() {
  console.log('🔄 Adding nutri_tokens columns to users table...\n');

  try {
    // Add nutri_tokens_remaining column
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS nutri_tokens_remaining INT DEFAULT 10
    `);
    console.log('✅ Added nutri_tokens_remaining column (default: 10)');

    // Add nutri_tokens_purchased column
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS nutri_tokens_purchased INT DEFAULT 0
    `);
    console.log('✅ Added nutri_tokens_purchased column (default: 0)');

    // Verify columns exist
    const result = await pool.query(`
      SELECT column_name, data_type, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name LIKE 'nutri%'
    `);

    console.log('\n📊 NutriBot columns in users table:');
    result.rows.forEach(row => {
      console.log(`   - ${row.column_name}: ${row.data_type} (default: ${row.column_default})`);
    });

    // Show sample user data
    const users = await pool.query(`
      SELECT id, email, nutri_tokens_remaining, nutri_tokens_purchased 
      FROM users 
      LIMIT 3
    `);

    console.log('\n👥 Sample user tokens:');
    users.rows.forEach(user => {
      console.log(`   - ${user.email}: ${user.nutri_tokens_remaining} tokens remaining`);
    });

    console.log('\n✅ Migration complete!');
    console.log('🤖 NutriBot is ready to use with database-backed tokens.\n');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    await pool.end();
  }
}

migrateNutriTokens();

