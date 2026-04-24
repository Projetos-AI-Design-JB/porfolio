"use client";

import React from 'react';
import { motion } from 'framer-motion';
import './skeleton-clone.css';

export default function SkeletonClone() {
  return (
    <div className="skeleton-body">
      {/* Navigation */}
      <motion.nav 
        className="nav-container"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <a href="#" className="nav-link active" aria-current="page">Home</a>
        <a href="#" className="nav-link">Work</a>
        <a href="#" className="nav-link">About</a>
        <a href="#" className="nav-link">Contact</a>
      </motion.nav>

      {/* Main Content */}
      <main className="hero-section">
        <div className="hero-content">
          <motion.h1 
            className="hero-title outfit-font"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Digital <br />
            Beauty <br />
            Refined.
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            A new perspective on aesthetics and digital experiences. 
            Blending soft light with architectural precision to create 
            lasting visual impact.
          </motion.p>

          <motion.div 
            style={{ marginTop: '3rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button className="nav-link active" style={{ fontSize: '1rem', padding: '1rem 2.5rem', cursor: 'pointer', border: 'none' }}>
              Explore Gallery
            </button>
          </motion.div>
        </div>

        {/* Hero Image - Alterado conforme solicitado */}
        <motion.div 
          className="hero-image-container"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <img src="/ethereal/images/hero.png" alt="Ethereal Beauty" className="hero-image" />
        </motion.div>
      </main>

      {/* Sidebar Info */}
      <aside className="sidebar">
        <motion.div 
          className="sidebar-item"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="item-label">Focus</div>
          <div className="item-value">Digital Portraits</div>
        </motion.div>

        <motion.div 
          className="sidebar-item"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="item-label">Vibe</div>
          <div className="item-value">Ethereal & Minimal</div>
        </motion.div>

        <motion.div 
          className="sidebar-item"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <div className="item-label">Status</div>
          <div className="item-value">In Exhibition</div>
        </motion.div>
      </aside>

      {/* Background Decor */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: -1
      }} />
    </div>
  );
}