
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function checkTables() {
  try {
    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables:', res.rows.map(r => r.table_name));
    
    for (const table of res.rows) {
      const countRes = await pool.query(`SELECT COUNT(*) FROM ${table.table_name}`);
      console.log(`Table ${table.table_name} has ${countRes.rows[0].count} rows`);
      
      const sampleRes = await pool.query(`SELECT * FROM ${table.table_name} LIMIT 1`);
      if (sampleRes.rows.length > 0) {
        console.log(`Sample from ${table.table_name}:`, JSON.stringify(sampleRes.rows[0]).substring(0, 200));
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

checkTables();
