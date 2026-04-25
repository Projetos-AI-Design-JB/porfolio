"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PlanetScene from "./PlanetScene";
import Link from "next/link";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function GalactusHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoverData, setHoverData] = useState<{ label: string | null, x: number, y: number }>({ label: null, x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setScrollProgress(self.progress),
      });

      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 2.5, ease: "expo.out" }
      );
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative bg-[#050505] cursor-default" style={{ height: "450vh" }}>
      
      {/* NOISE OVERLAY */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        
        {/* DESIGNER BACKGROUND */}
        <div ref={bgRef} className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#0f0f0f_0%,#050505_100%)]">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        </div>

        {/* 3D ENGINE */}
        <PlanetScene scrollProgress={scrollProgress} onHover={setHoverData} />

        {/* FLOATING PLANET LABEL */}
        {hoverData.label && (
          <div 
            className="absolute z-50 pointer-events-none flex items-center gap-4 transition-opacity duration-300"
            style={{ 
              left: hoverData.x, 
              top: hoverData.y,
              transform: "translate(40px, -50%)"
            }}
          >
            <div className="w-8 h-px bg-cyan-500/50" />
            <p className="text-[10px] md:text-[12px] font-light tracking-[0.5em] md:tracking-[1.5em] text-cyan-400 uppercase italic whitespace-nowrap">
              {hoverData.label}
            </p>
          </div>
        )}

        {/* ELEGANT BACK BUTTON (LEFT SIDE) */}
        <div className="absolute top-6 md:top-10 left-6 md:left-10 z-50">
          <Link href="/" className="group flex items-center gap-4">
            <div className="w-6 md:w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-white/60 transition-all duration-500" />
            <p className="text-[8px] md:text-[9px] font-mono text-white/40 group-hover:text-white transition-colors tracking-[0.5em] uppercase pl-2">
              Back to Core
            </p>
          </Link>
        </div>

        {/* HUD: TOP RIGHT SIGNATURE */}
        <div className="absolute top-6 md:top-10 right-6 md:right-10 z-50 opacity-25">
          <p className="text-[8px] md:text-[9px] font-mono text-white tracking-[0.3em] md:tracking-[0.8em] uppercase italic">Portfolio by Julian Kezy</p>
        </div>

        {/* CENTER TITLE & INSTRUCTION */}
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none px-6">
          <div ref={titleRef} className="flex flex-col items-center">
            <h1 className="text-[10px] md:text-[12px] font-light tracking-[1.5em] md:tracking-[3em] text-white/30 uppercase md:pl-[3em] text-center">
              Universal Forge
            </h1>
            <div className="w-px h-16 md:h-24 bg-gradient-to-b from-white/20 via-white/5 to-transparent mt-8" />
            <p className="text-[7px] md:text-[8px] font-mono text-white/10 tracking-[0.5em] md:tracking-[1em] mt-8 uppercase text-center">
              Scroll down to lock coordinates
            </p>
          </div>
        </div>

        {/* METADATA HUD (Responsive) */}
        <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 z-50 opacity-20 flex flex-col md:flex-row gap-4 md:gap-12">
          <div className="flex flex-col gap-1">
            <p className="text-[7px] md:text-[8px] font-mono text-white tracking-[0.3em] md:tracking-[0.5em]">ARC_SYS_v4.5</p>
            <p className="text-[7px] md:text-[8px] font-mono text-white tracking-[0.3em] md:tracking-[0.5em]">POS_IDX_{scrollProgress.toFixed(3)}</p>
          </div>
          <div className="flex flex-col gap-1 md:border-l border-white/10 md:pl-10">
            <p className="text-[7px] md:text-[8px] font-mono text-white tracking-[0.3em] md:tracking-[0.5em]">COORD_SYNC_{hoverData.label ? "LOCK" : "SCAN"}</p>
            <p className="text-[7px] md:text-[8px] font-mono text-white tracking-[0.3em] md:tracking-[0.5em]">GRID_STB_TRUE</p>
          </div>
        </div>

        {/* SIDE GUIDES */}
        <div className="absolute inset-x-6 md:inset-x-20 top-0 bottom-0 border-x border-white/[0.02] pointer-events-none" />

      </div>
    </div>
  );
}
