"use client";

import React, { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera, Environment, useTexture } from "@react-three/drei";
import Planet from "./Planet";
import * as THREE from "three";
import gsap from "gsap";

function UniverseContent({ isScanning }: { isScanning: boolean }) {
  const { camera } = useThree();
  const architectTexture = useTexture(`${process.env.NODE_ENV === 'production' ? '/porfolio' : ''}/assets/the-architect.png`);

  useEffect(() => {
    if (isScanning) {
      // Cinematic Zoom Out to reveal the system
      gsap.to(camera.position, {
        x: 0,
        y: 12,
        z: 30,
        duration: 3,
        ease: "power3.inOut"
      });
      
      gsap.to(camera.rotation, {
        x: -0.3,
        duration: 3,
        ease: "power3.inOut"
      });
    }
  }, [isScanning, camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={75} />
      
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
      
      {/* THE ARCHITECT (Central Core) */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group>
          {/* Avatar Sprite */}
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[5, 5]} />
            <meshBasicMaterial 
              map={architectTexture} 
              transparent 
              opacity={1} 
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Core Glow Aura */}
          <mesh position={[0, 0, -0.1]}>
            <circleGeometry args={[3.5, 64]} />
            <meshBasicMaterial color="#00f3ff" transparent opacity={0.15} />
          </mesh>
          
          {/* Inner Circuit Glow */}
          <mesh position={[0, 0, -0.05]}>
            <ringGeometry args={[2.5, 2.6, 64]} />
            <meshBasicMaterial color="#00f3ff" transparent opacity={0.5} />
          </mesh>
        </group>
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

export default function Universe({ isScanning }: { isScanning: boolean }) {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <UniverseContent isScanning={isScanning} />
        </Suspense>
      </Canvas>
    </div>
  );
}
