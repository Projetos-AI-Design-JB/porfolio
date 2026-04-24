'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  baseY: number
  speed: number
  size: number
  opacity: number
  color: string
  phase: number
  amplitude: number
  frequency: number
}

// Paleta de cores do mar — cyan, azul, teal
const SEA_COLORS = [
  'rgba(34, 211, 238,',  // cyan-400
  'rgba(6, 182, 212,',   // cyan-500
  'rgba(8, 145, 178,',   // cyan-600
  'rgba(59, 130, 246,',  // blue-500
  'rgba(96, 165, 250,',  // blue-400
  'rgba(14, 165, 233,',  // sky-500
  'rgba(2, 132, 199,',   // sky-600
  'rgba(125, 211, 252,', // sky-300
]

// Configuração das camadas de onda — do fundo ao topo
const WAVE_LAYERS = [
  // Camada de fundo — onda lenta e alta, muito sutil
  { yRatio: 0.88, amplitude: 55, frequency: 0.008, speed: 0.15, density: 0.18, opacityRange: [0.04, 0.12], sizeRange: [1, 2] },
  // Camada 2 — onda média
  { yRatio: 0.82, amplitude: 45, frequency: 0.011, speed: 0.28, density: 0.22, opacityRange: [0.08, 0.22], sizeRange: [1, 2.5] },
  // Camada 3 — onda principal
  { yRatio: 0.76, amplitude: 38, frequency: 0.014, speed: 0.45, density: 0.28, opacityRange: [0.14, 0.40], sizeRange: [1.5, 3] },
  // Camada de frente — onda rápida e brilhante
  { yRatio: 0.70, amplitude: 28, frequency: 0.018, speed: 0.65, density: 0.25, opacityRange: [0.20, 0.55], sizeRange: [1, 2.5] },
  // Espuma no topo — partículas menores e mais claras
  { yRatio: 0.65, amplitude: 18, frequency: 0.024, speed: 0.90, density: 0.18, opacityRange: [0.10, 0.32], sizeRange: [0.5, 1.5] },
]

export function SoundWaveBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []
    let t = 0

    const buildParticles = (w: number, h: number) => {
      particles = []
      WAVE_LAYERS.forEach((layer) => {
        const count = Math.floor(w * layer.density)
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * w,
            y: 0,
            baseY: h * layer.yRatio,
            speed: layer.speed * (0.5 + Math.random() * 1.0),
            size: layer.sizeRange[0] + Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]),
            opacity: layer.opacityRange[0] + Math.random() * (layer.opacityRange[1] - layer.opacityRange[0]),
            color: SEA_COLORS[Math.floor(Math.random() * SEA_COLORS.length)],
            phase: Math.random() * Math.PI * 2,
            amplitude: layer.amplitude * (0.55 + Math.random() * 0.9),
            frequency: layer.frequency * (0.75 + Math.random() * 0.5),
          })
        }
      })
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      buildParticles(canvas.width, canvas.height)
    }

    const draw = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)
      t += 0.006 // Velocidade global da onda

      for (const p of particles) {
        // Move partícula para a esquerda
        p.x -= p.speed
        if (p.x < -p.size * 2) p.x = width + p.size

        // Posição Y na onda seno (dupla frequência para cristas irregulares)
        const wave1 = Math.sin(p.x * p.frequency + p.phase + t) * p.amplitude
        const wave2 = Math.sin(p.x * p.frequency * 1.7 + p.phase * 1.3 + t * 1.4) * (p.amplitude * 0.3)
        p.y = p.baseY + wave1 + wave2

        // Modulação de opacidade pela posição na onda (mais brilhante no pico)
        const waveNorm = (Math.sin(p.x * p.frequency + p.phase + t) + 1) / 2
        const dynamicOpacity = p.opacity * (0.6 + waveNorm * 0.6)

        // --- Glow halo (partículas maiores ou nos picos) ---
        if (dynamicOpacity > 0.18) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5)
          grad.addColorStop(0, `${p.color}${Math.min(dynamicOpacity * 0.45, 0.3)})`)
          grad.addColorStop(1, `${p.color}0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }

        // --- Partícula central ---
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${Math.min(dynamicOpacity, 0.9)})`
        ctx.fill()
      }

      // --- Linha de onda sutil para cada camada (dá sensação de continuidade) ---
      WAVE_LAYERS.forEach((layer, li) => {
        const baseY = canvas.height * layer.yRatio
        const freq = layer.frequency
        const amp = layer.amplitude * 0.7

        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = baseY
            + Math.sin(x * freq + t * (0.8 + li * 0.12)) * amp
            + Math.sin(x * freq * 1.6 + t * 1.3) * (amp * 0.25)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.03 + li * 0.012})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
