"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

function SpiralGeometry({ scrollYProgress }: { scrollYProgress: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Criação dos pontos da espiral
  const points = useMemo(() => {
    const p = [];
    const pointsCount = 200;
    const radius = 2;
    const height = 15;
    const turns = 8;

    for (let i = 0; i <= pointsCount; i++) {
      const t = i / pointsCount;
      const angle = t * Math.PI * 2 * turns;
      const x = Math.cos(angle) * radius * (1 - t * 0.5); // Estreita no final
      const z = Math.sin(angle) * radius * (1 - t * 0.5);
      const y = (t - 0.5) * height;
      p.push(new THREE.Vector3(x, y, z));
    }
    return p;
  }, []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Reação ao scroll real da página
      const offset = scrollYProgress.get();
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.y += offset * 0.05;
      
      // Movimento suave vertical baseado no scroll real
      groupRef.current.position.y = -offset * 12 + 6;
    }
    
    if (meshRef.current) {
        // Pulsação sutil
        const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <tubeGeometry args={[curve, 200, 0.02, 8, false]} />
        <meshStandardMaterial 
          color="#1e3a8a" 
          emissive="#1e40af" 
          emissiveIntensity={2} 
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Partículas flutuantes ao redor da espiral */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x + (Math.random()-0.5), p.y, p.z + (Math.random()-0.5)]))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#3b82f6" transparent opacity={0.4} />
      </points>
    </group>
  );
}

export function ScrollSpiral() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <SpiralGeometry scrollYProgress={smoothProgress} />
      </Canvas>
    </div>
  );
}
