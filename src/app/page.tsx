'use client'

import './portfolio.css'
import { useEffect, useState } from 'react'
import { SplineScene } from '@/components/ui/splite'

// ── Types ───────────────────────────────────────────────────────────
interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  url: string
  image: string
  createdAt: string
  updatedAt?: string
}

const API = '/api/projects'

// ── Defaults ────────────────────────────────────────────────────────
const emptyForm = { title: '', description: '', tech: '', url: '' }

// ── Main Page ───────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState<number | null>(null)
  const [modal, setModal] = useState(false)
  const [error, setError] = useState('')

  // ── Fetch ──────────────────────────────────────────────────────────
  const fetchProjects = async () => {
    try {
      setLoading(true)
      const res = await fetch(API)
      const json = await res.json()
      setProjects(json.data ?? [])
    } catch {
      setError('API offline. Inicie o servidor: node server.js')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  // ── Create / Update ────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      title: form.title,
      description: form.description,
      tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean),
      url: form.url,
    }
    const url = editing ? `${API}/${editing}` : API
    const method = editing ? 'PUT' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setForm(emptyForm)
    setEditing(null)
    setModal(false)
    fetchProjects()
  }

  // ── Delete ─────────────────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    if (!confirm('Remover este projeto?')) return
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    fetchProjects()
  }

  // ── Edit setup ─────────────────────────────────────────────────────
  const openEdit = (p: Project) => {
    setForm({ title: p.title, description: p.description, tech: p.tech.join(', '), url: p.url })
    setEditing(p.id)
    setModal(true)
  }

  const openCreate = () => {
    setForm(emptyForm)
    setEditing(null)
    setModal(true)
  }

  // ── UI ─────────────────────────────────────────────────────────────
  return (
    <div className="portfolio-root">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-text">
          <span className="hero-badge">Open to work</span>
          <h1 className="hero-title">
            Criando experiências<br />
            <span className="gradient-text">digitais únicas</span>
          </h1>
          <p className="hero-sub">
            Desenvolvedor Full Stack · Designer · IA Generativa
          </p>
          <button className="btn-primary" onClick={openCreate}>
            + Novo Projeto
          </button>
        </div>

        {/* Spline 3D scene */}
        <div className="hero-scene">
          <SplineScene
            scene="https://prod.spline.design/ATIn6W-66-8H8W6E/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </section>

      {/* ── Projects grid ── */}
      <section className="projects-section">
        <h2 className="section-title">Projetos</h2>

        {error && <div className="api-error">{error}</div>}

        {loading ? (
          <div className="skeleton-grid">
            {[1, 2, 3].map((i) => <div key={i} className="skeleton-card" />)}
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((p) => (
              <article key={p.id} className="project-card">
                <div className="card-header">
                  <span className="card-id">#{p.id}</span>
                  <h3 className="card-title">{p.title}</h3>
                </div>
                <p className="card-desc">{p.description}</p>
                <div className="card-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="card-link">
                    Ver projeto ↗
                  </a>
                )}
                <div className="card-actions">
                  <button className="btn-edit" onClick={() => openEdit(p)}>Editar</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* ── Modal CRUD ── */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{editing ? 'Editar Projeto' : 'Novo Projeto'}</h2>
            <form onSubmit={handleSubmit} className="crud-form">
              <label>
                Título *
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ex: Kanban Board" />
              </label>
              <label>
                Descrição *
                <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descreva o projeto..." />
              </label>
              <label>
                Tecnologias <small>(separadas por vírgula)</small>
                <input value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} placeholder="React, Node.js, TypeScript" />
              </label>
              <label>
                URL
                <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://github.com/..." />
              </label>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setModal(false)}>Cancelar</button>
                <button type="submit" className="btn-primary">{editing ? 'Salvar' : 'Criar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
