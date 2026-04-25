"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  label: string;
  speed?: number;
  distort?: number;
}

export default function Planet({ position, size, color, label, speed = 1, distort = 0.3 }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Subtle rotation
      meshRef.current.rotation.y += 0.005 * speed;
    }
  });

  return (
    <group position={position}>
      <Float speed={2 * speed} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere 
          ref={meshRef} 
          args={[size, 64, 64]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => console.log(`Navigating to ${label}`)}
        >
          <MeshDistortMaterial 
            color={hovered ? "#ffffff" : color} 
            speed={2} 
            distort={distort} 
            radius={size}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
        
        {/* Holographic Label */}
        <Text
          position={[0, size + 0.8, 0]}
          fontSize={0.4}
          color="#00f3ff"
          font="https://fonts.gstatic.com/s/syne/v22/8vIJ7w0mK0jy8m9f2W69.woff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {label.toUpperCase()}
        </Text>

        {/* Orbit Ring (Decorative) */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.5, size * 1.52, 64]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </Float>
    </group>
  );
}
