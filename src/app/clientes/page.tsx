'use client'

import '../portfolio.css'
import { useEffect, useState } from 'react'
import { SplineScene } from '@/components/ui/splite'

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  url: string
  image: string
}

const API = '/api/projects'

export default function ClientesPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    fetch(API).then(res => res.json()).then(json => {
      setProjects(json.data ?? [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setModal(false)
    }, 3000)
  }

  return (
    <div className="portfolio-root">
      {/* ── Client Hero ── */}
      <section className="hero">
        <div className="hero-text">
          <span className="hero-badge">Disponível para Projetos</span>
          <h1 className="hero-title">
            Transformando ideias em<br />
            <span className="gradient-text">software de elite</span>
          </h1>
          <p className="hero-sub">
            Explore meus trabalhos recentes e vamos construir algo incrível para sua empresa.
          </p>
          <button className="btn-primary" onClick={() => setModal(true)}>
            Solicitar Orçamento
          </button>
        </div>

        <div className="hero-scene">
          <SplineScene
            scene="https://prod.spline.design/6xHIfj9Hj-LnQE7J/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </section>

      {/* ── Projects View-Only ── */}
      <section className="projects-section">
        <h2 className="section-title">Case Studies</h2>
        <div className="projects-grid">
          {loading ? (
            [1, 2, 3].map(i => <div key={i} className="skeleton-card" />)
          ) : (
            projects.map(p => (
              <article key={p.id} className="project-card">
                <div className="card-header">
                  <span className="card-id">Case #{p.id}</span>
                  <h3 className="card-title">{p.title}</h3>
                </div>
                <p className="card-desc">{p.description}</p>
                <div className="card-tech">
                  {Array.isArray(p.tech) && p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="card-link">
                    Explorar Projeto ↗
                  </a>
                )}
              </article>
            ))
          )}
        </div>
      </section>

      {/* ── Contact Modal ── */}
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">Vamos conversar?</h2>
            {sent ? (
              <div className="sent-success">
                <div className="loader" style={{ borderColor: '#10b981', borderTopColor: 'transparent' }}></div>
                <p>Mensagem enviada com sucesso! Entrarei em contato em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleContact} className="crud-form">
                <label>
                  Seu Nome
                  <input required placeholder="Como devo te chamar?" />
                </label>
                <label>
                  E-mail Profissional
                  <input required type="email" placeholder="seu@email.com" />
                </label>
                <label>
                  Sobre o Projeto
                  <textarea required placeholder="Conte um pouco sobre sua ideia..." />
                </label>
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setModal(false)}>Voltar</button>
                  <button type="submit" className="btn-primary">Enviar Mensagem</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
