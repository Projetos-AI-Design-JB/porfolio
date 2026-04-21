import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const mapProject = (row: any) => ({
  id: row.id, title: row.title, description: row.description,
  tech: row.tech, url: row.url, image: row.image,
  createdAt: row.created_at, updatedAt: row.updated_at
});

// ── PUT /api/projects/[id] ──────────────────────────────────────────
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { title, description, tech, url, image } = await request.json();
    const { rows } = await pool.query(
      'UPDATE projects SET title = COALESCE($1, title), description = COALESCE($2, description), tech = COALESCE($3, tech), url = COALESCE($4, url), image = COALESCE($5, image), updated_at = NOW() WHERE id = $6 RETURNING *',
      [title, description, tech, url, image, id]
    );
    return NextResponse.json({ success: true, data: mapProject(rows[0]) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── DELETE /api/projects/[id] ───────────────────────────────────────
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { rows } = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    return NextResponse.json({ success: true, data: mapProject(rows[0]) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
