"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera, Environment } from "@react-three/drei";
import Planet from "./Planet";
import * as THREE from "three";

export function UniverseContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 20]} fov={75} />
      
      {/* Deep Space Background */}
      <Stars 
        radius={300} 
        depth={60} 
        count={20000} 
        factor={7} 
        saturation={0} 
        fade 
        speed={1} 
      />
      
      {/* Central Anchor (Avatar Tron) */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial 
            color="#00f3ff" 
            emissive="#00f3ff" 
            emissiveIntensity={4} 
            wireframe
          />
        </mesh>
      </Float>

      {/* PROJECT PLANETS */}
      <Planet 
        position={[-8, 2, -5]} 
        size={1.2} 
        color="#22d3ee" 
        label="AI Art" 
        speed={1.2}
      />
      <Planet 
        position={[8, -2, -3]} 
        size={1.4} 
        color="#4ade80" 
        label="Oliveira" 
        speed={0.8}
        distort={0.4}
      />
      <Planet 
        position={[-4, -5, 5]} 
        size={1.1} 
        color="#818cf8" 
        label="Cosmos" 
        speed={1.5}
      />
      <Planet 
        position={[6, 4, 6]} 
        size={0.9} 
        color="#94a3b8" 
        label="Kanban" 
        speed={2}
        distort={0.2}
      />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00f3ff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      
      <Environment preset="night" />
    </>
  );
}

export default function Universe() {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <UniverseContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
