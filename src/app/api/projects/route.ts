import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// ── Pool de conexão PostgreSQL (Supabase) ───────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Helper para mapear retorno
const mapProject = (row: any) => ({
  id: row.id, 
  title: row.title, 
  description: row.description,
  tech: row.tech, 
  url: row.url, 
  image: row.image,
  createdAt: row.created_at, 
  updatedAt: row.updated_at
});

// ── GET /api/projects ──────────────────────────────────────────────
export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    return NextResponse.json({ success: true, data: rows.map(mapProject) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── POST /api/projects ─────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const { title, description, tech = [], url = '', image = '' } = await request.json();
    const { rows } = await pool.query(
      'INSERT INTO projects (title, description, tech, url, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, tech, url, image]
    );
    return NextResponse.json({ success: true, data: mapProject(rows[0]) }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
