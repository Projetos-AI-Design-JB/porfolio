/**
 * server.js — API REST do Portfólio
 * Porta: 3001  |  Banco: PostgreSQL (Supabase via DATABASE_URL)
 */

require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const { Pool } = require('pg');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Pool de conexão PostgreSQL ─────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }   // Supabase exige SSL em produção
    : false,
});

// Testa a conexão ao inicializar
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err.message);
    console.error('   Verifique a variável DATABASE_URL no arquivo .env');
    return;
  }
  release();
  console.log('✅ Conectado ao PostgreSQL (Supabase)');
});

// ── Middleware ─────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Inicialização da tabela ────────────────────────────────────────
// SERIAL        → auto-incremento nativo do PostgreSQL
// TEXT[]        → array de strings nativo do PostgreSQL
// TIMESTAMPTZ   → timestamp com fuso horário
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

(async () => {
  try {
    await pool.query(CREATE_TABLE_SQL);
    console.log('📋 Tabela "projects" pronta');
  } catch (err) {
    console.error('❌ Erro ao criar tabela:', err.message);
  }
})();

// ── Helper: mapeia snake_case → camelCase para o cliente ───────────
function mapProject(row) {
  return {
    id:          row.id,
    title:       row.title,
    description: row.description,
    tech:        row.tech,
    url:         row.url,
    image:       row.image,
    createdAt:   row.created_at,
    updatedAt:   row.updated_at ?? undefined,
  };
}

// ── Rotas ─────────────────────────────────────────────────────────

// GET /  → health-check
app.get('/', (req, res) => {
  res.json({ message: 'Servidor Rodando', status: 'ok', port: PORT, db: 'PostgreSQL' });
});

// GET /api/projects  → listar todos
app.get('/api/projects', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects ORDER BY id ASC');
    res.json({ success: true, data: rows.map(mapProject), total: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/projects/:id  → buscar por ID
app.get('/api/projects/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Projeto não encontrado.' });
    res.json({ success: true, data: mapProject(rows[0]) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/projects  → criar novo projeto
// PostgreSQL: parâmetros com $1, $2 ...  |  RETURNING * devolve a linha inserida
app.post('/api/projects', async (req, res) => {
  const { title, description, tech = [], url = '', image = '' } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, message: 'Campos obrigatórios: title, description.' });
  }

  try {
    const sql = `
      INSERT INTO projects (title, description, tech, url, image)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const { rows } = await pool.query(sql, [title, description, tech, url, image]);
    res.status(201).json({ success: true, data: mapProject(rows[0]) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/projects/:id  → atualizar projeto
// NOW() atualiza o updated_at automaticamente
app.put('/api/projects/:id', async (req, res) => {
  const { title, description, tech, url, image } = req.body;

  try {
    // Busca o registro atual para não sobrescrever campos não enviados
    const current = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (!current.rows.length) {
      return res.status(404).json({ success: false, message: 'Projeto não encontrado.' });
    }

    const old = current.rows[0];
    const sql = `
      UPDATE projects
      SET
        title       = $1,
        description = $2,
        tech        = $3,
        url         = $4,
        image       = $5,
        updated_at  = NOW()
      WHERE id = $6
      RETURNING *
    `;
    const values = [
      title       ?? old.title,
      description ?? old.description,
      tech        ?? old.tech,
      url         ?? old.url,
      image       ?? old.image,
      req.params.id,
    ];

    const { rows } = await pool.query(sql, values);
    res.json({ success: true, data: mapProject(rows[0]) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/projects/:id  → remover projeto
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Projeto não encontrado.' });
    res.json({ success: true, message: `Projeto "${rows[0].title}" removido.`, data: mapProject(rows[0]) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── Start ──────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor Rodando em http://localhost:${PORT}`);
  console.log(`   GET    /api/projects`);
  console.log(`   GET    /api/projects/:id`);
  console.log(`   POST   /api/projects`);
  console.log(`   PUT    /api/projects/:id`);
  console.log(`   DELETE /api/projects/:id\n`);
});
