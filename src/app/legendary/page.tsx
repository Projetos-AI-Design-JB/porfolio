"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Zap, 
  Crown, 
  Star, 
  ArrowRight,
  ChevronRight,
  Globe,
  Lock
} from "lucide-react";

export default function LegendaryPage() {
  return (
    <main className="min-h-screen bg-black text-white font-outfit selection:bg-yellow-500/30 overflow-x-hidden">
      
      {/* ── NAVIGATION / BACK BUTTON ──────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center pointer-events-none">
        <a 
          href="/porfolio/nova-home/" 
          className="pointer-events-auto bg-white/5 border border-white/10 text-white/80 px-6 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all backdrop-blur-xl text-xs font-bold tracking-widest uppercase flex items-center gap-2"
        >
          ← Back to Portfolio
        </a>
        <div className="pointer-events-auto flex items-center gap-8 text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 hidden md:flex">
          <span className="text-yellow-500/60 cursor-pointer hover:text-yellow-500 transition-colors">Manifesto</span>
          <span className="cursor-pointer hover:text-white transition-colors">Chapters</span>
          <span className="cursor-pointer hover:text-white transition-colors">The Legion</span>
          <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
            <Lock size={14} />
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Cinematic Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-yellow-500/10 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-[40vw] h-[40vw] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/5 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-12">
            <Crown size={12} /> Established in 2026
          </div>
          <h1 className="font-syne text-6xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500">
            Legendary<br />
            <span className="text-yellow-500">Architecture.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/40 text-sm md:text-xl font-light leading-relaxed tracking-wide mb-12">
            Where elite engineering meets cinematic storytelling. We don't just build software; we architect the digital legacy of the next generation.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all transform hover:scale-105 shadow-[0_0_50px_rgba(234,179,8,0.3)]">
              Join the Legion
            </button>
            <button className="text-white/60 hover:text-white px-8 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 group">
              Explore History <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Floating Decoration */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20 animate-bounce">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Scroll to Enter</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ── MANIFESTO SECTION (High Contrast) ───────────────────────── */}
      <section className="relative py-40 px-6 bg-white text-black">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-400 mb-12 block">The Manifesto</span>
            <h2 className="font-playfair italic text-3xl md:text-6xl leading-tight mb-20">
              "Technology is no longer a tool; it is a medium for human transcendence. We believe in the friction between the digital and the physical, where the legendary is born from the mundane."
            </h2>
            <div className="grid md:grid-cols-3 gap-16 text-left">
              <div className="space-y-4">
                <h4 className="font-syne font-black uppercase text-xs tracking-widest">01. Precision</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">Absolute control over every pixel, every frame, and every line of code. No compromises.</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-syne font-black uppercase text-xs tracking-widest">02. Immersion</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">Designing experiences that capture the soul before they capture the click.</p>
              </div>
              <div className="space-y-4">
                <h4 className="font-syne font-black uppercase text-xs tracking-widest">03. Legacy</h4>
                <p className="text-sm text-neutral-500 leading-relaxed">Building systems that transcend trends and define new standards for the industry.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CHAPTERS / TRACKS ───────────────────────────────────────── */}
      <section className="py-40 px-6 bg-[#080808]">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Our Programs</span>
              <h2 className="font-syne text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                The Path to<br />Excellence.
              </h2>
            </div>
            <p className="max-w-sm text-white/40 text-sm font-light leading-relaxed">
              Curated tracks designed for the 1% of developers and designers who seek to master the cinematic web.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TrackCard 
              icon={<Shield size={24} />}
              title="Sentinel"
              desc="Architecture and security for high-stake systems."
            />
            <TrackCard 
              icon={<Zap size={24} />}
              title="Flash"
              desc="High-performance animation and motion design."
              active
            />
            <TrackCard 
              icon={<Star size={24} />}
              title="Nova"
              desc="Next-generation UI/UX with AI integration."
            />
            <TrackCard 
              icon={<Globe size={24} />}
              title="Orbit"
              desc="Global scaling and international infrastructure."
            />
          </div>
        </div>
      </section>

      {/* ── FOOTER / CTA ────────────────────────────────────────────── */}
      <footer className="py-40 px-6 border-t border-white/5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] bg-yellow-500/10 rounded-full blur-[180px] pointer-events-none" />
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="font-syne text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-16 opacity-10">
            Legendary
          </h2>
          <div className="mb-20">
             <h3 className="text-xl md:text-3xl font-light text-white/60 mb-8 uppercase tracking-[0.3em]">Are you ready to be legendary?</h3>
             <button className="bg-white text-black px-16 py-6 rounded-full font-bold text-xs uppercase tracking-[0.3em] hover:bg-yellow-500 transition-colors duration-500">
               Apply to Join
             </button>
          </div>
          <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-medium">
            © 2026 Developed for Julian Kezy Portfolio
          </p>
        </div>
      </footer>
    </main>
  );
}

function TrackCard({ icon, title, desc, active = false }: { icon: React.ReactNode, title: string, desc: string, active?: boolean }) {
  return (
    <div className={`p-10 rounded-[2.5rem] border transition-all duration-500 group cursor-pointer ${
      active 
        ? "bg-yellow-500 border-yellow-500 text-black shadow-[0_0_50px_rgba(234,179,8,0.2)]" 
        : "bg-white/5 border-white/5 hover:border-white/20 text-white"
    }`}>
      <div className={`mb-12 transition-transform duration-500 group-hover:-translate-y-2 ${active ? "text-black" : "text-yellow-500"}`}>
        {icon}
      </div>
      <h3 className="font-syne text-2xl font-black uppercase tracking-tighter mb-4">{title}</h3>
      <p className={`text-xs font-medium leading-relaxed mb-10 ${active ? "text-black/60" : "text-white/40"}`}>{desc}</p>
      <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${active ? "text-black" : "text-white"}`}>
        Enroll <ChevronRight size={14} />
      </div>
    </div>
  );
}
