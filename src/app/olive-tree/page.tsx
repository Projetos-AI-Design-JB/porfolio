"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "./olive-tree.css";

/**
 * THE OLIVE TREE - Cinematic Skeleton Edition
 * 
 * Logic: High-DPI Canvas + Multi-section Editorial Layout.
 */
export default function TheOliveTreePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const frameCount = 145;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 40,
    restDelta: 0.0001
  });

  // Narrative Progressions - SYNCED FOR 350vh-600vh
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  
  // S1 (Blueprint) - Appears after Hero/Spacer zone
  const s1Opacity = useTransform(scrollYProgress, [0.18, 0.28, 0.42, 0.52], [0, 1, 1, 0]);
  
  // S2 (Neural) - Appears in the middle-late zone
  const s2Opacity = useTransform(scrollYProgress, [0.58, 0.68, 0.85, 0.92], [0, 1, 1, 0]);
  
  // Final - Stays visible from 94% onwards
  const finalOpacity = useTransform(scrollYProgress, [0.94, 0.98, 1], [0, 1, 1]);

  // Frame Progress: Start moving immediately
  const frameProgress = useTransform(smoothProgress, [0, 0.95, 1], [1, frameCount, frameCount]);

  // Pre-load images with resilience
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / frameCount) * 100);
      setLoadingProgress(progress);
      
      // Allow start after 40 frames (~30%) for better sequential feel
      if (loadedCount >= 40) {
        setIsLoading(false);
      }
    };

    const imagesTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `../assets/scroll/frame_${i.toString().padStart(4, "0")}.jpg`;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      loadedImages.push(img);
    }
    setImages(loadedImages);
    imagesRef.current = loadedImages;

    return () => clearTimeout(imagesTimeout);
  }, []);

  // High-DPI Render loop
  useEffect(() => {
    if (images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const render = () => {
      // Use floor and clamp for index stability
      const rawFrame = frameProgress.get();
      const currentFrame = Math.max(1, Math.min(frameCount, Math.floor(rawFrame)));
      const img = imagesRef.current[currentFrame - 1];
      
      if (img && img.complete && img.naturalWidth !== 0) {
        const { width, height } = canvas;
        const imgWidth = img.width;
        const imgHeight = img.height;
        
        const ratio = Math.max(width / imgWidth, height / imgHeight);
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        const x = (width - newWidth) / 2;
        const y = (height - newHeight) / 2;

        // Simplified render: No filters on mobile for glitch-free 60fps
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "medium"; // Medium is faster on mobile
        context.drawImage(img, x, y, newWidth, newHeight);
      }
      requestAnimationFrame(render);
    };

    const frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [images]);

  // High-DPI Resize Handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        canvas.style.willChange = "transform";
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="the-head-page" ref={containerRef}>
      <div className="canvas-fixed-container">
        {isLoading && (
          <div className="loading-state">
            <div className="loading-content">
              <span className="loading-text">ENHANCING RESOLUTION...</span>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${loadingProgress}%` }} />
              </div>
              <span className="progress-percent">{loadingProgress}%</span>
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="scroll-canvas" />
      </div>

      <div className="editorial-content">
        {/* 00: HERO (0-100vh) */}
        <section className="fold-section center">
          <motion.div style={{ opacity: heroOpacity }}>
            <span className="overline">PROJECT OLIVEIRA</span>
            <h1 className="display-title">THE<br/>ANCIENT</h1>
            <p className="lead-text">Convergence of biological legacy and digital future.</p>
          </motion.div>
        </section>

        {/* 01: SPACER (100-200vh) */}
        <section className="fold-section spacer" />

        {/* 02: BLUEPRINT (200-300vh) */}
        <section className="fold-section side">
          <motion.div className="glass-card-editorial" style={{ opacity: s1Opacity }}>
            <div className="card-header">
              <span className="index">01</span>
              <h3>THE BLUEPRINT</h3>
            </div>
            <p>Biological database storing centuries of environmental adaptation through ring-density encryption.</p>
            <div className="spec-grid">
              <div className="spec"><span>GENOME</span><span>OLEA EUROPAEA v2.0</span></div>
              <div className="spec"><span>DENSITY</span><span>980 KG/M³</span></div>
            </div>
          </motion.div>
        </section>

        {/* 03: SPACER (300-400vh) */}
        <section className="fold-section spacer" />

        {/* 04: NEURAL FIBER (400-500vh) */}
        <section className="fold-section side-right">
          <motion.div className="glass-card-editorial" style={{ opacity: s2Opacity }}>
            <div className="card-header">
              <span className="index">02</span>
              <h3>NEURAL FIBER</h3>
            </div>
            <p>Synthetic roots bypass organic decay, ensuring data persistence across the global neural network.</p>
            <div className="status-indicator">
              <div className="pulse-dot" />
              <span>UPGRADING CORE...</span>
            </div>
          </motion.div>
        </section>

        {/* 05: CONCLUSION (500-600vh) */}
        <section className="fold-section center">
          <motion.div style={{ opacity: finalOpacity }}>
            <h2 className="display-title small">LEGACY<br/>COMPLETE</h2>
            <button className="back-home" onClick={() => window.location.href = "/porfolio/"}>
              RETURN TO CORE
            </button>
          </motion.div>
        </section>
      </div>

      <div className="vignette-heavy" />
      <div className="scanline-overlay" />
    </main>
  );
}
