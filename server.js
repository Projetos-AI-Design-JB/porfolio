/**
 * server.js — Servidor Integrado (Next.js + Express API)
 * Gerencia rotas de API e serve o Frontend em um único processo.
 */

require('dotenv').config();

const express = require('express');
const next = require('next');
const cors = require('cors');
const { Pool } = require('pg');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3001;

// ── Pool de conexão PostgreSQL ─────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json());

  // ── Inicialização da tabela ──────────────────────────────────────
  const CREATE_TABLE_SQL = `
    CREATE TABLE IF NOT EXISTS projects (
      id          SERIAL PRIMARY KEY,
      title       TEXT        NOT NULL,
      description TEXT        NOT NULL,
      tech        TEXT[]      NOT NULL DEFAULT '{}',
      url         TEXT        NOT NULL DEFAULT '',
      image       TEXT        NOT NULL DEFAULT '',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ
    );
  `;
  pool.query(CREATE_TABLE_SQL).catch(err => console.error('DB Error:', err.message));

  // Helper para mapeamento
  const mapProject = (row) => ({
    id: row.id, title: row.title, description: row.description,
    tech: row.tech, url: row.url, image: row.image,
    createdAt: row.created_at, updatedAt: row.updated_at
  });

  // ── Rotas da API (Express) ───────────────────────────────────────
  
  server.get('/api/projects', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM projects ORDER BY id ASC');
      res.json({ success: true, data: rows.map(mapProject) });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  server.post('/api/projects', async (req, res) => {
    const { title, description, tech = [], url = '', image = '' } = req.body;
    try {
      const { rows } = await pool.query(
        'INSERT INTO projects (title, description, tech, url, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, description, tech, url, image]
      );
      res.status(201).json({ success: true, data: mapProject(rows[0]) });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  server.put('/api/projects/:id', async (req, res) => {
    const { title, description, tech, url, image } = req.body;
    try {
      const { rows } = await pool.query(
        'UPDATE projects SET title = COALESCE($1, title), description = COALESCE($2, description), tech = COALESCE($3, tech), url = COALESCE($4, url), image = COALESCE($5, image), updated_at = NOW() WHERE id = $6 RETURNING *',
        [title, description, tech, url, image, req.params.id]
      );
      res.json({ success: true, data: mapProject(rows[0]) });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  server.delete('/api/projects/:id', async (req, res) => {
    try {
      const { rows } = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [req.params.id]);
      res.json({ success: true, data: mapProject(rows[0]) });
    } catch (err) { res.status(500).json({ error: err.message }); }
  });

  // ── Rotas do Frontend (Next.js) ────────────────────────────────────
  // Tudo que não for /api/ será gerenciado pelo Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Servidor Pronto na porta ${port}`);
  });
});
