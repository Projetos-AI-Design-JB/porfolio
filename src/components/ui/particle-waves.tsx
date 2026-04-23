"use client"

import React, { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function WaveParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 80 // Mais partículas para maior densidade
  const sep = 2.0 // Menor separação para parecer uma malha contínua

  const [positions, setPositions] = useMemo(() => {
    const positions = new Float32Array(count * count * 3)
    let i = 0
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        positions[i++] = x * sep - (count * sep) / 2
        positions[i++] = 0
        positions[i++] = z * sep - (count * sep) / 2
      }
    }
    return [positions]
  }, [count, sep])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const posAttribute = pointsRef.current?.geometry.getAttribute("position") as THREE.BufferAttribute
    
    if (posAttribute) {
      let i = 0
      for (let x = 0; x < count; x++) {
        for (let z = 0; z < count; z++) {
          // Ondas mais altas e dinâmicas
          const y = Math.sin(x * 0.2 + time) * 2.5 + Math.sin(z * 0.2 + time) * 2.5
          posAttribute.setY(i, y)
          i++
        }
      }
      posAttribute.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#06b6d4"
        size={0.4}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function ParticleWaves() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
      <Canvas camera={{ position: [50, 40, 50], fov: 45 }}>
        <fog attach="fog" args={["#020617", 30, 90]} />
        <ambientLight intensity={0.5} />
        <WaveParticles />
      </Canvas>
    </div>
  )
}
