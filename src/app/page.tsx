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
      setError('Database is offline. Please check your connection or deployment.')
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
    if (!confirm('Are you sure you want to delete this project?')) return
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
            Crafting unique<br />
            <span className="gradient-text">digital experiences</span>
          </h1>
          <p className="hero-sub">
            Full Stack Developer · UI/UX Designer · Generative AI
          </p>
          <button className="btn-primary" onClick={openCreate}>
            + New Project
          </button>
        </div>

        {/* Spline 3D scene */}
        <div className="hero-scene">
          <SplineScene
            scene="https://prod.spline.design/6xHIfj9Hj-LnQE7J/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </section>

      {/* ── Projects grid ── */}
      <section className="projects-section">
        <h2 className="section-title">Projects</h2>

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
                  {Array.isArray(p.tech) && p.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="card-link">
                    View Project ↗
                  </a>
                )}
                <div className="card-actions">
                  <button className="btn-edit" onClick={() => openEdit(p)}>Edit</button>
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
            <h2 className="modal-title">{editing ? 'Edit Project' : 'New Project'}</h2>
            <form onSubmit={handleSubmit} className="crud-form">
              <label>
                Title *
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="E.g. Kanban Board" />
              </label>
              <label>
                Description *
                <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the project..." />
              </label>
              <label>
                Technologies <small>(comma-separated)</small>
                <input value={form.tech} onChange={(e) => setForm({ ...form, tech: e.target.value })} placeholder="React, Node.js, TypeScript" />
              </label>
              <label>
                URL
                <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://github.com/..." />
              </label>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">{editing ? 'Save' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
