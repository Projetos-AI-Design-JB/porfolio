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
      const kanbanProject = {
        id: 999,
        title: 'Kanban IA System',
        description: 'Advanced Kanban board with Drag and Drop capabilities and AI-ready architecture. Features sticky columns, smooth animations, and isolated micro-frontend routing.',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
        url: '/kanban',
        image: ''
      }
      const backgroundPathsProject = {
        id: 998,
        title: 'Animated Background Paths',
        description: 'A stunning, interactive floating SVG paths animation built with Framer Motion, perfect for hero sections.',
        tech: ['Next.js', 'React', 'Tailwind', 'Framer Motion'],
        url: '/background-paths',
        image: ''
      }
      const heroProject = {
        id: 997,
        title: '3D Cosmos Experiential Hero',
        description: 'Immersive cinematic WebGL hero section featuring GSAP scroll-triggered parallax, volumetric atmosphere, and dynamic procedural stars.',
        tech: ['Three.js', 'GSAP', 'WebGL', 'React'],
        url: '/3d-hero',
        image: ''
      }
      setProjects([kanbanProject, backgroundPathsProject, heroProject, ...(json.data ?? [])])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    const subject = encodeURIComponent(`New Project Inquiry from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nProject Details:\n${message}`)
    
    window.location.href = `mailto:jb.mktdigital@gmail.com?subject=${subject}&body=${body}`

    setSent(true)
    setTimeout(() => {
      setSent(false)
      setModal(false)
    }, 5000)
  }

  return (
    <div className="portfolio-root">
      {/* ── Client Hero ── */}
      <section className="hero">
        <div className="hero-text">
          <span className="hero-badge">Available for Projects</span>
          <h1 className="hero-title">
            Transforming ideas into<br />
            <span className="gradient-text">elite software</span>
          </h1>
          <p className="hero-sub">
            Explore my recent work and let's build something amazing for your business.
          </p>
          <button className="btn-primary" onClick={() => setModal(true)}>
            Request a Quote
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
                    Explore Project ↗
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
            <h2 className="modal-title">Let's talk?</h2>
            {sent ? (
              <div className="sent-success">
                <div className="loader" style={{ borderColor: '#10b981', borderTopColor: 'transparent' }}></div>
                <p>Message sent successfully! I will reach out soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContact} className="crud-form">
                <label>
                  Your Name
                  <input name="name" required placeholder="What should I call you?" />
                </label>
                <label>
                  Work Email
                  <input name="email" required type="email" placeholder="you@company.com" />
                </label>
                <label>
                  About the Project
                  <textarea name="message" required placeholder="Tell me a bit about your idea..." />
                </label>
                <div className="form-actions">
                  <button type="button" className="btn-cancel" onClick={() => setModal(false)}>Back</button>
                  <button type="submit" className="btn-primary">Send Message</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
