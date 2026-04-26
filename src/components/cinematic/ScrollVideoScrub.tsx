
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import "./ScrollVideoScrub.css";

const ScrollVideoScrub: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  // ── SCROLL → VIDEO SCRUB (SMOOTH VERSION) ──────────────────
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // High-performance direct value since Lenis provides the smooth scroll
  const sp = scrollYProgress;

  const isReadyRef = useRef(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Total frames generated from the video
  const frameCount = 194; 

  // 1. Image Preloading Logic
  useEffect(() => {
    let loaded = 0;
    const preloadImages = () => {
      // Correct path for GitHub Pages sub-directory
      const basePath = process.env.NODE_ENV === 'production' ? '/porfolio' : '';
      
      // Clear array if running in strict mode
      imagesRef.current = []; 
      
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const frameStr = i.toString().padStart(4, "0");
        img.src = `${basePath}/assets/cables-scroll/frame_${frameStr}.jpg`;
        
        img.onload = () => {
          loaded++;
          // When all frames are loaded, start rendering
          if (loaded === frameCount) {
            isReadyRef.current = true;
            setIsReady(true); // For UI overlay only
            
            // Draw first frame immediately
            if (canvasRef.current && imagesRef.current[0]) {
              const ctx = canvasRef.current.getContext("2d");
              if (ctx) {
                ctx.drawImage(imagesRef.current[0], 0, 0, canvasRef.current.width, canvasRef.current.height);
              }
            }
          }
        };
        imagesRef.current.push(img);
      }
    };
    
    preloadImages();
  }, []);

  // 2. Animation Loop Logic (Canvas Frame Painting)
  useEffect(() => {
    let rafId: number;
    let currentLerp = 0; // Starts at frame 0

    const updateCanvas = () => {
      if (isReadyRef.current && canvasRef.current && imagesRef.current.length > 0) {
        // Map 0-1 scroll progress to 0-193 frames
        const targetFrame = sp.get() * (frameCount - 1);
        
        // Lerp for buttery smooth interpolation of the scroll value
        currentLerp += (targetFrame - currentLerp) * 0.15;
        
        // Get the exact integer frame to draw
        const frameIndex = Math.min(
          frameCount - 1,
          Math.max(0, Math.floor(currentLerp))
        );
        
        const ctx = canvasRef.current.getContext("2d");
        const img = imagesRef.current[frameIndex];
        
        if (ctx && img) {
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
      rafId = requestAnimationFrame(updateCanvas);
    };

    rafId = requestAnimationFrame(updateCanvas);
    return () => cancelAnimationFrame(rafId);
  }, [sp]); // Only depends on the scroll progress

  // ── SCROLL MAPPING ──────────────────────────────────────────
  // Container is 400vh. Sections are 100vh each.
  // sp = 0.00 -> Section 1
  // sp = 0.33 -> Section 2
  // sp = 0.66 -> Section 3
  // sp = 1.00 -> Section 4

  const h0 = useTransform(sp, [0.00, 0.15, 0.20], [1, 0, 0]);
  const h1 = useTransform(sp, [0.15, 0.33, 0.50], [0, 1, 0]);
  const h2 = useTransform(sp, [0.50, 0.66, 0.85], [0, 1, 0]);
  const h3 = useTransform(sp, [0.80, 0.95, 1.00], [0, 1, 1]);

  const latValue = useTransform(sp, [0, 1], [40.7128, 40.7589]);
  const longValue = useTransform(sp, [0, 1], [74.0060, 73.9851]);

  // ── PULSE GLOW LOGIC ──────────────────────────────────────────
  const pulseGlowOpacity = useTransform(sp, [0.80, 0.95, 1.00], [0, 1, 1]);

  // ── GLITCH LOGIC ──────────────────────────────────────────────
  const isGlitching = useTransform(sp, [0.12, 0.14, 0.45, 0.47, 0.88, 0.90], [true, false, true, false, true, false]);

  return (
    <div className="cv-root" ref={containerRef}>
      
      {/* ── SYSTEM LOADING OVERLAY ── */}
      {!isReady && (
        <div className="cv-loader-overlay">
          <div className="cv-loader-box">
            <span className="cv-overline">INITIALIZING_NEURAL_LINK</span>
            <div className="cv-loader-bar"><motion.div className="cv-loader-fill" animate={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut" }} /></div>
          </div>
        </div>
      )}

      {/* ── BACKDROP ── */}
      <div className="cv-backdrop">
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="cv-video"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="cv-vignette" />
        
        {/* ── CORE ENERGY PULSE ── */}
        <motion.div 
          className="cv-pulse-container"
          style={{ opacity: pulseGlowOpacity }}
        >
          <div className="cv-pulse-glow" />
        </motion.div>
        
        <div className="cv-scanline" />
        <div className="cv-crt-layer" />
        <div className="cv-crt-riscos" />
        <motion.div 
          className="cv-glitch" 
          style={{ 
            opacity: useTransform(sp, [0.12, 0.13, 0.14, 0.45, 0.46, 0.47, 0.88, 0.89, 0.90], [0, 1, 0, 0, 1, 0, 0, 1, 0]) 
          }} 
        />
      </div>

      {/* ── EDITORIAL CONTENT ── */}
      <div className="cv-content">

        <section className="cv-section">
          <motion.div className="cv-left" style={{ opacity: h0 }}>
            <span className="cv-overline">[ SYSTEM_INIT ]</span>
            <h1 className="cv-title">NEURAL<br />UNFOLD</h1>
          </motion.div>
          <div className="cv-mid" />
          <motion.div className="cv-right" style={{ opacity: h0 }}>
            <div className="cv-tag">[ PHASE_00 ]</div>
            <motion.div className="cv-coords" style={{ opacity: 0.6, marginTop: "1rem" }}>
              LAT: <motion.span>{latValue}</motion.span>° N<br />
              LONG: <motion.span>{longValue}</motion.span>° W
            </motion.div>
          </motion.div>
        </section>

        <section className="cv-section">
          <motion.div className="cv-left" style={{ opacity: h1 }}>
            <h2 className="cv-title">BUILDING<br />DIGITAL<br />EXPERIENCES.</h2>
          </motion.div>
          <div className="cv-mid" />
          <motion.div className="cv-right" style={{ opacity: h1 }}>
            <div className="cv-highlight-box">
              <p className="cv-body" style={{ textAlign: "right", opacity: 0.8, fontSize: "0.95rem" }}>
                Software Engineer & AI Designer focused on high-fidelity products, cinematic visuals, and scalable digital solutions.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="cv-section">
          <motion.div className="cv-left" style={{ opacity: h2 }}>
             <Link href="/star-forge/" style={{ textDecoration: "none" }}>
                <button className="cv-btn cv-btn-portfolio" style={{ fontSize: "1.2rem", padding: "1.6rem 4rem" }}>VIEW PORTFOLIO</button>
             </Link>
          </motion.div>
          <div className="cv-mid" />
          <motion.div className="cv-right" style={{ opacity: h2 }}>
            <div className="cv-highlight-box">
              <div className="cv-tag">[ SKILLS ]</div>
              <div className="cv-coords" style={{ fontSize: "0.75rem", lineHeight: "2.2", opacity: 0.8 }}>
                SOFTWARE ENGINEER<br />
                SOLUTIONS ARCHITECT<br />
                AI DESIGNER
              </div>
            </div>
          </motion.div>
        </section>

        <section className="cv-section">
          <motion.div className="cv-left" style={{ opacity: h3 }}>
            <h1 className="cv-title">GET IN<br />TOUCH</h1>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <a href="https://www.linkedin.com/in/juliano-bianchesi" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="cv-btn" style={{ marginTop: 0 }}>LINKEDIN</button>
              </a>
              <a href="https://upwork.com/freelancers/~01c619e33efa8638d3" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="cv-btn" style={{ marginTop: 0 }}>UPWORK</button>
              </a>
            </div>
          </motion.div>
          <div className="cv-mid" />
          <motion.div className="cv-right" style={{ opacity: h3 }}>
            <div className="cv-highlight-box">
              <div className="cv-coords" style={{ opacity: 0.5, fontSize: "0.75rem", letterSpacing: "0.2em" }}>
                DESIGNED BY<br />JULIAN KEZY
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};


export default ScrollVideoScrub;
