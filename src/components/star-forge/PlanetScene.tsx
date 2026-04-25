"use client";
// HMR Trigger: Asset Redundancy Sync

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const PLANETS_DATA = [
  { id: "ai-art",   label: "AI ART",   color: "#b0a59f", size: 1.1, radiusX: 5.5, radiusY: 2.8, startAngle: 1.5, disp: 0.2, rot: [0,0,0] },
  { id: "oliveira", label: "OLIVEIRA", color: "#84a59d", size: 1.4, radiusX: 7.5, radiusY: 3.8, startAngle: -0.5, disp: 0.3, rot: [Math.PI/2,0,0] },
  { id: "cosmos",   label: "COSMOS",   color: "#f2cc8f", size: 0.9, radiusX: 4.0, radiusY: 2.0, startAngle: 3.2, disp: 0.5, rot: [0,Math.PI/4,0] },
  { id: "kanban",   label: "KANBAN",   color: "#3d405b", size: 0.8, radiusX: 9.5, radiusY: 4.8, startAngle: 0.8, disp: 0.15, ring: true, rot: [0,0,Math.PI/2] },
];

function DebrisField({ count = 2000 }) {
  const points = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 40;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 40;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!points.current) return;
    points.current.rotation.y += 0.0002;
    points.current.rotation.x += 0.0001;
  });

  return (
    <Points ref={points} positions={particles} stride={3}>
      <PointMaterial transparent color="#ffffff" size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.2} />
    </Points>
  );
}

function SinglePlanet({ data, scrollProgress, index, onHover }: { 
  data: any, 
  scrollProgress: number, 
  index: number, 
  onHover: (info: { label: string | null, x: number, y: number } ) => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera, size, raycaster } = useThree();
  const stoneTexture = useTexture("/porfolio/p-stone.png");

  // Update cursor on hover
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "default";
    return () => { document.body.style.cursor = "default"; };
  }, [hovered]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const angle = data.startAngle + (scrollProgress * Math.PI * 1.5);
    const ox = Math.cos(angle) * data.radiusX;
    const oy = Math.sin(angle) * data.radiusY;
    const endFactor = Math.max(0, Math.min(1, (scrollProgress - 0.88) * 8));
    const gx = (index % 2 === 0 ? -5 : 5);
    const gy = (index < 2 ? -3 : 3);
    const target = new THREE.Vector3(
      ox * (1 - endFactor) + gx * endFactor,
      oy * (1 - endFactor) + gy * endFactor,
      Math.sin(angle) * 3.5 * (1 - endFactor)
    );
    meshRef.current.position.lerp(target, 0.1);
    if (ringRef.current) ringRef.current.position.copy(meshRef.current.position);
    meshRef.current.rotation.y += 0.001;

    const intersects = raycaster.intersectObject(meshRef.current);
    const isNowHovered = intersects.length > 0;

    if (isNowHovered !== hovered) {
      setHovered(isNowHovered);
      if (!isNowHovered) onHover({ label: null, x: 0, y: 0 });
    }

    if (isNowHovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      const vector = new THREE.Vector3();
      meshRef.current.getWorldPosition(vector);
      vector.project(camera);
      onHover({ label: data.label, x: (vector.x * 0.5 + 0.5) * size.width, y: (-(vector.y * 0.5) + 0.5) * size.height });
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} rotation={data.rot}>
        <sphereGeometry args={[data.size, 128, 128]} />
        <meshStandardMaterial 
          color={data.color}
          displacementMap={stoneTexture}
          displacementScale={data.disp}
          roughness={0.9}
          metalness={0.1}
          flatShading={true}
          emissive={data.color}
          emissiveIntensity={hovered ? 0.6 : 0.05}
        />
      </mesh>
      {data.ring && (
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[data.size * 1.6, 0.005, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
}

export default function PlanetScene({ scrollProgress, onHover }: { 
  scrollProgress: number, 
  onHover: (info: { label: string | null, x: number, y: number } ) => void 
}) {
  return (
    <div className="absolute inset-0 z-20">
      <Canvas camera={{ position: [0, 0, 18], fov: 45 }} dpr={[1, 2]} alpha>
        <ambientLight intensity={0.4} />
        <directionalLight position={[-15, 10, 10]} intensity={2.5} color="#ffffff" />
        <pointLight position={[10, -10, 10]} intensity={1} color="#ffffff" />
        <DebrisField count={3000} />
        {PLANETS_DATA.map((p, i) => (
          <React.Suspense key={p.id} fallback={null}>
            <SinglePlanet data={p} scrollProgress={scrollProgress} index={i} onHover={onHover} />
          </React.Suspense>
        ))}
      </Canvas>
    </div>
  );
}
