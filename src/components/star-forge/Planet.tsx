"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface PlanetProps {
  position: [number, number, number];
  size: number;
  color: string;
  label: string;
  speed?: number;
  onClick?: () => void;
}

export default function Planet({ position, size, color, label, speed = 1, onClick }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmoRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(1);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003 * speed;
    }
    if (atmoRef.current) {
      // Pulse atmosphere glow
      const t = Date.now() * 0.001;
      const pulse = 1 + Math.sin(t * speed) * 0.03;
      atmoRef.current.scale.setScalar(pulse);
    }
    // Smooth scale on hover
    targetScale.current = hovered ? 1.12 : 1.0;
    if (meshRef.current) {
      meshRef.current.parent!.scale.lerp(
        new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current),
        0.08
      );
    }
  });

  const colorObj = new THREE.Color(color);

  return (
    <group position={position}>
      <Float speed={1.5 * speed} rotationIntensity={0.3} floatIntensity={0.4}>
        <group>
          {/* PLANET CORE */}
          <Sphere
            ref={meshRef}
            args={[size, 64, 64]}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer"; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto"; }}
            onClick={onClick}
          >
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 0.6 : 0.25}
              roughness={0.55}
              metalness={0.3}
            />
          </Sphere>

          {/* ATMOSPHERE GLOW (larger translucent sphere) */}
          <Sphere ref={atmoRef} args={[size * 1.18, 32, 32]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.4}
              transparent
              opacity={hovered ? 0.18 : 0.1}
              depthWrite={false}
              side={THREE.BackSide}
            />
          </Sphere>

          {/* THIN ORBIT RING */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 1.6, size * 1.62, 128]} />
            <meshBasicMaterial color={color} transparent opacity={0.25} side={THREE.DoubleSide} />
          </mesh>

          {/* HOLOGRAPHIC LABEL */}
          <Text
            position={[0, size + 0.9, 0]}
            fontSize={0.35}
            color={hovered ? "#ffffff" : color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#000000"
            letterSpacing={0.15}
          >
            {label.toUpperCase()}
          </Text>

          {/* Point light inside planet for inner glow */}
          <pointLight color={color} intensity={hovered ? 3 : 1.5} distance={size * 5} decay={2} />
        </group>
      </Float>
    </group>
  );
}
