"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera, useTexture } from "@react-three/drei";
import Planet from "./Planet";
import * as THREE from "three";
import gsap from "gsap";

function ArchitectSprite() {
  const tex = useTexture("/assets/the-architect.png");
  const width = 5.5;
  const height = width * (1376 / 768);

  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.35}>
      <group>
        <mesh>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            map={tex}
            transparent
            alphaTest={0.05}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* Halo behind figure */}
        <mesh position={[0, 0, -0.2]}>
          <circleGeometry args={[3.8, 64]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={0.06} />
        </mesh>

        {/* Inner ring */}
        <mesh position={[0, 0, -0.15]}>
          <ringGeometry args={[3.6, 3.65, 128]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={0.5} />
        </mesh>

        {/* Outer ring */}
        <mesh position={[0, 0, -0.15]}>
          <ringGeometry args={[4.2, 4.24, 128]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={0.2} />
        </mesh>

        <pointLight color="#00f3ff" intensity={2.5} distance={12} decay={2} />
      </group>
    </Float>
  );
}

// Wrapper to animate planet reveal
function PlanetWrapper({ isScanning, delay, children }: { isScanning: boolean; delay: number; children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;
    if (isScanning) {
      gsap.fromTo(groupRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1.2, delay, ease: "back.out(1.4)" }
      );
    } else {
      gsap.to(groupRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.3 });
    }
  }, [isScanning, delay]);

  return <group ref={groupRef} scale={[0, 0, 0]}>{children}</group>;
}

function UniverseContent({ isScanning }: { isScanning: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    if (isScanning) {
      // Phase 2: Pull back to reveal the system
      gsap.to(camera.position, { x: 0, y: 10, z: 32, duration: 3.5, ease: "power3.inOut" });
      gsap.to(camera.rotation, { x: -0.18, duration: 3.5, ease: "power3.inOut" });
    } else {
      // Phase 1: Close focus on Architect
      gsap.to(camera.position, { x: 0, y: 0, z: 14, duration: 1, ease: "power2.out" });
    }
  }, [isScanning, camera]);

  return (
    <>
      <color attach="background" args={["#000008"]} />
      {/* Phase 1: close shot of Architect */}
      <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={70} />

      <Stars radius={300} depth={60} count={18000} factor={7} saturation={0} fade speed={0.6} />

      {/* THE ARCHITECT — centered, dominant */}
      <ArchitectSprite />

      {/* PLANETS — hidden until scan, then revealed with stagger */}
      <PlanetWrapper isScanning={isScanning} delay={0.8}>
        <Planet position={[-10, 2, -3]} size={2.1} color="#22d3ee" label="AI Art"   speed={1.0} />
      </PlanetWrapper>
      <PlanetWrapper isScanning={isScanning} delay={1.1}>
        <Planet position={[10,  2, -3]} size={2.3} color="#4ade80" label="Oliveira" speed={0.8} />
      </PlanetWrapper>
      <PlanetWrapper isScanning={isScanning} delay={1.4}>
        <Planet position={[-6, -5,  2]} size={1.7} color="#818cf8" label="Cosmos"   speed={1.4} />
      </PlanetWrapper>
      <PlanetWrapper isScanning={isScanning} delay={1.7}>
        <Planet position={[ 6, -5,  2]} size={1.5} color="#94a3b8" label="Kanban"   speed={1.8} />
      </PlanetWrapper>

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.0} />
      <pointLight position={[0, 0, 10]} intensity={0.8} color="#00f3ff" distance={30} decay={1.5} />
    </>
  );
}

export default function Universe({ isScanning }: { isScanning: boolean }) {
  return (
    <div className="absolute inset-0 z-0 bg-[#000008]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <Suspense fallback={<color attach="background" args={["#000008"]} />}>
          <UniverseContent isScanning={isScanning} />
        </Suspense>
      </Canvas>
    </div>
  );
}
