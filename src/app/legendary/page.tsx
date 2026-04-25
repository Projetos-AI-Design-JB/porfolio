"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Zap, 
  Crown, 
  Star, 
  ArrowRight, 
  ChevronRight, 
  Globe, 
  Lock, 
  Quote 
} from "lucide-react";

export default function LegendaryPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "The architecture behind Legendary isn't just code; it's a structural masterpiece that redefined our scaling strategy.",
      author: "Marcus Thorne",
      role: "CTO, Neural Nexus"
    },
    {
      quote: "Rarely do you find this level of cinematic polish combined with industrial-grade performance. Simply unparalleled.",
      author: "Elena Vance",
      role: "Director of Experience, Aetheric"
    },
    {
      quote: "They don't build features; they build legacies. The immersion level of their interfaces is the new gold standard.",
      author: "Julian Drax",
      role: "Founder, Silicon Vault"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="min-h-screen bg-black text-white font-outfit selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* ── DECORATIVE CASCADE (Right Margin) ─────────────────────── */}
      <div className="fixed top-0 right-4 md:right-12 w-6 h-full z-0 pointer-events-none overflow-hidden opacity-40 md:opacity-80">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "-100%" }}
            animate={{ y: "200%" }}
            transition={{
              duration: 3 + i * 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1
            }}
            className="absolute top-0 w-[2px] md:w-[3px] h-64 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            style={{ left: `${i * 6}px` }}
          />
        ))}
      </div>

      {/* ── FIXED BACK BUTTON (Bottom Left) ────────────────────────── */}
      <a 
        href="/porfolio/star-forge/" 
        className="fixed bottom-6 left-6 z-50 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all backdrop-blur-md text-[11px] md:text-[13px] font-medium shadow-2xl flex items-center gap-2"
      >
        ← Portfolio
      </a>

      {/* ── NAVIGATION (Top Right) ─────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-6 md:py-8 flex justify-end items-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-4 md:gap-8 text-[9px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 bg-black/20 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none px-4 py-2 rounded-full md:p-0">
          <a href="#manifesto" className="text-cyan-400/80 hover:text-cyan-400 transition-colors hidden sm:block">Manifesto</a>
          <a href="#gallery" className="hover:text-white transition-colors hidden sm:block">Gallery</a>
          <a href="#chapters" className="hover:text-white transition-colors hidden sm:block">Chapters</a>
          <a href="#legion" className="hover:text-white transition-colors">The Legion</a>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Lock size={12} />
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-6 overflow-hidden pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-cyan-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 w-full max-w-6xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-[9px] md:text-xs font-bold uppercase tracking-[0.4em] mb-6 md:mb-12">
            <Crown size={12} /> Established in 2026
          </div>
          <h1 className="font-syne text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1] mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500 break-words px-2">
            Legendary<br />
            <span className="text-cyan-400 font-black">Architecture.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-white/50 text-xs sm:text-sm md:text-lg font-medium leading-relaxed tracking-wide mb-8 md:mb-16 px-4 md:px-12">
            Where elite engineering meets cinematic storytelling. We don't just build software; we architect the digital legacy of the next generation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 px-6">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 md:px-12 py-4 md:py-6 rounded-full font-bold text-[10px] md:text-sm uppercase tracking-[0.2em] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.3)] w-full sm:w-auto">
              Join the Legion
            </button>
            <button className="text-white/60 hover:text-white px-6 md:px-8 py-4 md:py-6 rounded-full font-bold text-[10px] md:text-sm uppercase tracking-[0.2em] transition-all flex items-center gap-3 group">
              Explore History <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ── MANIFESTO SECTION (High Contrast) ───────────────────────── */}
      <section id="manifesto" className="relative py-20 md:py-48 px-4 md:px-6 bg-white text-black">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div {...fadeInUp}>
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-neutral-400 mb-8 md:mb-16 block">The Manifesto</span>
            <h2 className="font-playfair italic text-xl sm:text-3xl md:text-5xl leading-tight mb-16 md:mb-32 break-words px-2 max-w-[90vw] mx-auto">
              "Technology is no longer a tool; it is a medium for human transcendence. We believe in the friction between the digital and the physical, where the legendary is born from the mundane."
            </h2>
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-10 md:gap-20 text-left px-4"
            >
              {[
                { num: "01", title: "Precision", desc: "Absolute control over every pixel, every frame, and every line of code. No compromises." },
                { num: "02", title: "Immersion", desc: "Designing experiences that capture the soul before they capture the click." },
                { num: "03", title: "Legacy", desc: "Building systems that transcend trends and define new standards for the industry." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="space-y-4 md:space-y-6">
                  <div className="w-10 md:w-12 h-0.5 bg-black/10" />
                  <h4 className="font-syne font-black uppercase text-[10px] md:text-sm tracking-widest">{item.num}. {item.title}</h4>
                  <p className="text-[12px] md:text-base text-neutral-500 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CINEMATIC GALLERY ────────────────────────────────────────── */}
      <section id="gallery" className="py-20 md:py-48 px-4 md:px-6 bg-black">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="mb-12 md:mb-32 text-center md:text-left">
            <span className="text-cyan-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-4 md:mb-6 block">Visual Imprint</span>
            <h2 className="font-syne text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none break-words px-2">The Aesthetic of<br />Obsidian.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
             <GalleryImage src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" span="sm:col-span-2 md:row-span-2 aspect-square md:aspect-auto" />
             <GalleryImage src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" span="aspect-video sm:aspect-square" />
             <GalleryImage src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" span="aspect-video sm:aspect-square" />
             <GalleryImage src="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&q=80&w=800" span="sm:col-span-2 aspect-video" />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────── */}
      <section className="py-20 md:py-48 px-4 md:px-6 bg-white text-black relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10 px-4">
          <div className="flex justify-center mb-10 md:mb-16">
            <Quote size={32} className="text-cyan-500/20 md:w-12 md:h-12" />
          </div>
          
          <div className="min-h-[250px] md:min-h-[300px] flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 md:space-y-8"
              >
                <p className="font-playfair italic text-lg sm:text-2xl md:text-4xl leading-snug break-words max-w-[85vw] mx-auto">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="space-y-1 md:space-y-2">
                  <h4 className="font-syne font-black uppercase text-[10px] md:text-sm tracking-widest">
                    {testimonials[activeTestimonial].author}
                  </h4>
                  <p className="text-[8px] md:text-xs uppercase tracking-widest text-neutral-400 font-bold">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 md:gap-4 mt-12 md:mt-20">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-8 h-1 transition-all duration-500 ${i === activeTestimonial ? "bg-black w-12 md:w-24" : "bg-neutral-200"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTERS / TRACKS ───────────────────────────────────────── */}
      <section id="chapters" className="py-20 md:py-48 px-4 md:px-6 bg-[#050505]">
        <div className="container mx-auto max-w-7xl">
          <motion.div {...fadeInUp} className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-32 gap-6 md:gap-10">
            <div className="max-w-2xl px-2">
              <span className="text-cyan-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-4 md:mb-6 block">Our Programs</span>
              <h2 className="font-syne text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none break-words">
                The Path to<br />Excellence.
              </h2>
            </div>
            <p className="max-w-md text-white/50 text-xs md:text-lg font-medium leading-relaxed px-4">
              Curated tracks designed for the 1% of developers and designers who seek to master the cinematic web.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-2"
          >
            <TrackCard icon={<Shield size={24} />} title="Sentinel" desc="Architecture and security for high-stake systems." />
            <TrackCard icon={<Zap size={24} />} title="Flash" desc="High-performance animation and motion design." />
            <TrackCard icon={<Star size={24} />} title="Nova" desc="Next-generation UI/UX with AI integration." />
            <TrackCard icon={<Globe size={24} />} title="Orbit" desc="Global scaling and international infrastructure." />
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER / CTA ────────────────────────────────────────────── */}
      <footer id="legion" className="py-24 md:py-48 px-4 md:px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[100vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[100px] md:blur-[180px] pointer-events-none" />
        
        <div className="container mx-auto text-center relative z-10 px-4">
          <motion.div {...fadeInUp}>
            <h2 className="font-syne text-4xl sm:text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-none mb-12 md:mb-24 opacity-[0.03] select-none break-words px-4">
              Legendary
            </h2>
            <div className="mb-20 md:mb-40">
               <h3 className="text-lg md:text-3xl font-bold text-white/80 mb-8 md:mb-12 uppercase tracking-[0.1em] md:tracking-[0.2em] px-4 break-words">Are you ready to be legendary?</h3>
               <button className="bg-white text-black px-10 md:px-20 py-5 md:py-8 rounded-full font-bold text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] hover:bg-cyan-500 transition-all duration-500 transform hover:scale-105 shadow-2xl w-full sm:w-auto">
                 Apply to Join
               </button>
            </div>
            <p className="text-[9px] md:text-xs text-white/20 uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold">
              © 2026 Developed by Julian Kezy Portfolio
            </p>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}

function GalleryImage({ src, span = "" }: { src: string, span?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-[1rem] md:rounded-[2.5rem] bg-neutral-900 group ${span}`}
    >
      <img 
        src={src} 
        alt="gallery" 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

function TrackCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  const cardAnim = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <motion.div 
      variants={cardAnim}
      className="p-6 md:p-12 rounded-[1.5rem] md:rounded-[3rem] border border-white/5 bg-white/[0.03] hover:border-cyan-500/40 text-white transition-all duration-500 group cursor-pointer"
    >
      <div className="mb-8 md:mb-16 transition-transform duration-500 group-hover:-translate-y-2 text-cyan-400">
        {icon}
      </div>
      <h3 className="font-syne text-xl md:text-3xl font-black uppercase tracking-tighter mb-4">{title}</h3>
      <p className="text-[12px] md:text-sm font-medium leading-relaxed mb-10 md:mb-16 text-white/40">{desc}</p>
      <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400">
        Enroll Now <ChevronRight size={14} />
      </div>
    </motion.div>
  );
}
