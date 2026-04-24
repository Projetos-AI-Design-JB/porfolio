'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SidebarCards } from '@/components/ui/sidebar-cards'
import { SoundWaveBg } from '@/components/ui/sound-wave-bg'
import './the-head.css'

export default function TheHeadPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [loading, setLoading] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Mapeia o progresso do scroll para o index da imagem (assumindo 150 frames)
  const frameCount = 150
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1])

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = []
      const promises = []

      for (let i = 0; i <= frameCount; i++) {
        const img = new Image()
        const frameStr = i.toString().padStart(4, '0')
        img.src = `/assets/scroll/frame_${frameStr}.png`
        
        const promise = new Promise((resolve) => {
          img.onload = resolve
        })
        promises.push(promise)
        loadedImages.push(img)
      }

      await Promise.all(promises)
      setImages(loadedImages)
      setLoading(false)
    }
    loadImages()
  }, [])

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current
      if (!canvas || images.length === 0) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const index = Math.round(frameIndex.get())
      const img = images[index]
      if (img) {
        // Clear and Draw
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Aspect ratio cover logic
        const canvasAspect = canvas.width / canvas.height
        const imgAspect = img.width / img.height
        let drawWidth, drawHeight, offsetX, offsetY

        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width
          drawHeight = canvas.width / imgAspect
          offsetX = 0
          offsetY = (canvas.height - drawHeight) / 2
        } else {
          drawWidth = canvas.height * imgAspect
          drawHeight = canvas.height
          offsetX = (canvas.width - drawWidth) / 2
          offsetY = 0
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
      }
    }

    const unsubscribe = frameIndex.on("change", render)
    // Initial render
    if (!loading) render()
    
    return () => unsubscribe()
  }, [frameIndex, images, loading])

  return (
    <div className="head-root" ref={containerRef}>
      {/* ── Sound Wave Background (Ambient) ──────────────── */}
      <SoundWaveBg />

      {/* ── Scroll Canvas Container ───────────────────────── */}
      <div className="scroll-canvas-container">
        <canvas ref={canvasRef} className="scroll-canvas" width={1920} height={1080} />
        
        {loading && (
          <div style={{ position: 'absolute', color: 'var(--accent-cyan)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            SYNCHRONIZING NEURAL PATHS...
          </div>
        )}
      </div>

      {/* ── Scroll Content Layers ─────────────────────────── */}
      <section className="scroll-section">
        <motion.div 
          className="scroll-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="home-hero-eyebrow">Project: The Head</div>
          <h1 className="head-title">Neural<br/>Architect.</h1>
          <p className="head-sub">
            Exploring the intersection of cybernetic design and human interaction.
          </p>
        </motion.div>
      </section>

      <section className="scroll-section" style={{ justifyContent: 'flex-end' }}>
        <motion.div 
          className="scroll-content"
          style={{ textAlign: 'right' }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="home-hero-eyebrow">Phase: Evolution</div>
          <h1 className="head-title">Silicon<br/>Soul.</h1>
          <p className="head-sub" style={{ marginLeft: 'auto' }}>
            Where code becomes consciousness and wires become pathways.
          </p>
        </motion.div>
      </section>

      <section className="scroll-section">
        <motion.div 
          className="scroll-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="head-title" style={{ fontSize: '4rem' }}>Enter the<br/>Circle.</h1>
          <div className="home-cta" style={{ marginTop: '2rem' }}>
            Connect Now
          </div>
        </motion.div>
      </section>

      {/* ── Sidebar Cards ──────────────────────────────────── */}
      <SidebarCards />

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer style={{
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
      }}>
        © 2026 Julian Kezy · Experimental
      </footer>
    </div>
  )
}
