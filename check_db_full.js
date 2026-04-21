
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function checkAllTables() {
  try {
    const res = await pool.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema', 'pg_catalog')");
    console.log('Tables:', res.rows);
    
    for (const row of res.rows) {
      const { table_schema, table_name } = row;
      const countRes = await pool.query(`SELECT COUNT(*) FROM "${table_schema}"."${table_name}"`);
      console.log(`Table ${table_schema}.${table_name} has ${countRes.rows[0].count} rows`);
      
      const sampleRes = await pool.query(`SELECT * FROM "${table_schema}"."${table_name}" LIMIT 1`);
      if (sampleRes.rows.length > 0) {
        console.log(`Sample from ${table_schema}.${table_name}:`, JSON.stringify(sampleRes.rows[0]).substring(0, 200));
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

checkAllTables();
