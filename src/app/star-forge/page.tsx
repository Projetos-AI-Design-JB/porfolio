"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Universe from "@/components/star-forge/Universe";
import "./star-forge.css";

export default function StarForgePage() {
  const [bootSequence, setBootSequence] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white font-syne">
      {/* 3D UNIVERSE LAYER */}
      <Universe />

      {/* BOOT OVERLAY */}
      <AnimatePresence>
        {bootSequence && (
          <motion.div 
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.div 
              className="text-cyan-400 tracking-[1em] font-bold text-sm mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              INITIALIZING STAR-FORGE KERNEL
            </motion.div>
            <div className="w-48 h-[1px] bg-cyan-900 relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-cyan-400"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 2.5, ease: "circOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UI HUD OVERLAY */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12">
        <div className="flex justify-between items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.5 }}
          >
            <div className="text-xs text-cyan-500/50 mb-1">SYSTEM_STATUS</div>
            <div className="text-sm font-bold tracking-widest text-cyan-400">ONLINE // MASTER_CORE</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.7 }}
            className="text-right"
          >
            <div className="text-xs text-cyan-500/50 mb-1">COORDINATES</div>
            <div className="text-sm font-mono text-cyan-400">0.00.12.8 // NGC-442</div>
          </motion.div>
        </div>

        <div className="flex flex-col items-center mb-12">
          <motion.h1 
            className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4, duration: 1 }}
          >
            THE<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">UNIVERSE</span>
          </motion.h1>
          <motion.p 
            className="text-cyan-500/60 max-w-md text-center text-sm tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5 }}
          >
            Navigate through planetary clusters to explore individual project architectures and narrative worlds.
          </motion.p>
          
          <motion.div 
            className="mt-8 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5 }}
          >
             <button className="px-8 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 hover:bg-cyan-500/20 transition-all backdrop-blur-md">
                INITIATE SCAN
             </button>
          </motion.div>
        </div>
      </div>

      {/* SCANLINE EFFECTS */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </main>
  );
}
