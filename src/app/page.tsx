'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FloatingNav } from '@/components/ui/floating-nav'
import { SidebarCards } from '@/components/ui/sidebar-cards'
import { SoundWaveBg } from '@/components/ui/sound-wave-bg'
import '../app/home.css'

// ─── Animation Variants ─────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] },
})

export default function HomePage() {
  return (
    <div className="home-root">
      {/* ── Sound Wave Background ──────────────────────────── */}
      <SoundWaveBg />

      {/* ── Navigation ─────────────────────────────────────── */}
      <FloatingNav />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="home-hero" aria-label="Hero section">

        {/* Left: Content */}
        <div className="home-hero-content">

          {/* Eyebrow */}
          <motion.div
            className="home-hero-eyebrow"
            {...fadeUp(0.2)}
          >
            Julian Kezy · Portfolio
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="home-hero-title"
            {...fadeUp(0.35)}
          >
            Building<br />
            Digital<br />
            Experiences.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="home-hero-sub"
            {...fadeUp(0.5)}
          >
            Software Engineer & AI Designer focused on
            high-fidelity products, cinematic visuals,
            and scalable digital solutions.
          </motion.p>

          {/* Skill Badges */}
          <motion.div
            className="home-badges"
            {...fadeUp(0.6)}
          >
            {['Software Engineer', 'Solutions Architect', 'AI Designer'].map((b) => (
              <span key={b} className="home-badge">{b}</span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeUp(0.75)}>
            <Link href="/nova-home" className="home-cta">
              View Portfolio
              <motion.span
                className="home-cta-arrow"
                initial={false}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Right: Hero Image */}
        <motion.div
          className="home-hero-image-wrap"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <img
            src="/porfolio/JB-vibecode.png"
            alt="Julian Kezy"
            className="home-hero-image"
          />
        </motion.div>

      </section>

      {/* ── Sidebar Cards ──────────────────────────────────── */}
      <SidebarCards />

      {/* ── Footer ─────────────────────────────────────────── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'fixed',
          bottom: '0.6rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.58rem',
          fontWeight: 700,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          zIndex: 50,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        © 2026 Julian Kezy
      </motion.footer>
    </div>
  )
}
