"use client";

import React from "react";
import { motion } from "framer-motion";

// SVGs MANUAIS (SEGURANÇA TOTAL CONTRA ERROS DE IMPORTAÇÃO)
const IconHeart = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const IconPlay = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);
const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);
const IconInstagram = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const IconMail = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const IconCalendar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);

export default function MenopausePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    viewport: { once: true, amount: 0.2 },
  };

  const fadeInScale = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  return (
    <main className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] selection:bg-[#7D8F69]/20 overflow-x-hidden font-sans scroll-smooth">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        .font-serif-premium { font-family: 'Playfair Display', serif !important; }
        .font-sans-premium { font-family: 'Outfit', sans-serif !important; }
      `}} />
      
      {/* ── NAVIGATION ────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-8 flex justify-between items-center backdrop-blur-md bg-[#F9F7F2]/80 border-b border-[#7D8F69]/5">
        <div className="font-serif-premium text-2xl md:text-3xl font-bold tracking-tight text-[#7D8F69]">
          Wellness Sanctuary
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] opacity-60 font-sans-premium">
          <a href="#about" className="hover:text-[#7D8F69] transition-all hover:tracking-[0.5em]">About</a>
          <a href="#resources" className="hover:text-[#7D8F69] transition-all hover:tracking-[0.5em]">Resources</a>
          <a href="#work" className="hover:text-[#7D8F69] transition-all hover:tracking-[0.5em] text-[#7D8F69]">Work With Me</a>
        </div>
        <button className="md:hidden text-[#7D8F69]">
           <IconPlay size={28} />
        </button>
      </nav>

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-[#7D8F69]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-[#D4A373]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#7D8F69]/10 text-[#7D8F69] text-[9px] font-black uppercase tracking-[0.4em] font-sans-premium">
              Empowering Women Through Transition
            </div>
            <h1 className="font-serif-premium text-5xl sm:text-6xl md:text-8xl leading-[1] text-[#1A1A1A]">
              Reclaiming your <br />
              <span className="italic text-[#7D8F69] font-normal underline decoration-[#7D8F69]/20 decoration-4 underline-offset-8">vitality</span> during menopause.
            </h1>
            <p className="font-sans-premium text-lg md:text-2xl text-[#1A1A1A]/40 leading-relaxed max-w-xl font-light">
              Science-backed guidance for hormones, health, and holistic well-being. Navigate this transition with expert support.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-8 pt-6">
              <button className="bg-[#7D8F69] hover:bg-[#6A7B58] text-white px-12 py-6 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-[#7D8F69]/30 w-full sm:w-auto font-sans-premium transition-all hover:-translate-y-1 active:scale-95">
                Explore Resources
              </button>
              <button className="flex items-center gap-4 text-[#1A1A1A] font-bold text-[10px] uppercase tracking-[0.3em] font-sans-premium group">
                 Watch Intro <div className="w-12 h-12 rounded-full border border-[#D4A373]/30 flex items-center justify-center group-hover:bg-[#D4A373]/10 transition-all shadow-lg"><IconPlay size={20} /></div>
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInScale}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_60px_100px_-20px_rgba(125,143,105,0.2)] relative z-10 border-[16px] border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" 
                alt="Wellness" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute -bottom-12 -left-12 bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl z-20 hidden xl:block border border-white"
            >
              <div className="flex items-center gap-5 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#7D8F69]/10 flex items-center justify-center text-[#7D8F69]">
                   <IconHeart />
                </div>
                <div>
                   <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7D8F69] font-sans-premium">Holistic Care</div>
                   <div className="text-xl font-serif-premium font-bold italic">Expert Guided</div>
                </div>
              </div>
              <p className="font-sans-premium text-xs text-black/40 font-medium leading-relaxed tracking-wide">Tailored protocols for <br />your unique physiology.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── EDUCATIONAL PRODUCT ───────────────────────── */}
      <section id="resources" className="py-32 md:py-64 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              variants={fadeInScale}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
               <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-[#F9F7F2] cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000" 
                    alt="Education Video" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                     <div className="w-24 h-24 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#7D8F69] shadow-2xl group-hover:scale-110 transition-all">
                        <IconPlay size={40} />
                     </div>
                  </div>
               </div>
            </motion.div>

            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-10 order-1 lg:order-2">
              <motion.span variants={fadeInUp} className="text-[#D4A373] text-[10px] font-black uppercase tracking-[0.5em] font-sans-premium block">Masterclass Series</motion.span>
              <motion.h2 variants={fadeInUp} className="font-serif-premium text-5xl md:text-7xl leading-tight">
                The Menopause <br />Blueprint
              </motion.h2>
              <motion.p variants={fadeInUp} className="font-sans-premium text-lg md:text-xl text-[#1A1A1A]/40 font-light leading-relaxed">
                A 60-minute science-backed masterclass on hormonal health and metabolic vitality.
              </motion.p>
              <motion.ul variants={staggerContainer} className="space-y-6">
                {["Hormone Replacement Insights", "Metabolic Health Protocol"].map((item, i) => (
                  <motion.li variants={fadeInUp} key={i} className="flex items-center gap-5 text-sm font-bold text-[#7D8F69] font-sans-premium tracking-wide">
                    <div className="w-8 h-8 rounded-full bg-[#7D8F69]/10 flex items-center justify-center"><IconCheck /></div> {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.button variants={fadeInUp} className="bg-[#1A1A1A] hover:bg-black text-white px-12 py-6 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-5 font-sans-premium shadow-xl transition-all">
                Get Instant Access <IconArrowRight />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WORK WITH ME FORM ───────────────────────────────────────── */}
      <section id="work" className="py-32 md:py-64 px-6 bg-[#F9F7F2]">
        <div className="container mx-auto max-w-4xl text-center mb-24">
          <motion.div {...fadeInUp} className="space-y-8">
            <h2 className="font-serif-premium text-5xl md:text-8xl leading-none">Let's work <br /><span className="italic font-normal">together</span>.</h2>
            <p className="font-sans-premium text-xl text-[#1A1A1A]/40 font-light max-w-2xl mx-auto leading-relaxed">
              Personalized consultations for a science-backed health transition.
            </p>
          </motion.div>
        </div>

        <div className="container mx-auto max-w-3xl">
          <motion.form 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid gap-12 bg-white p-10 md:p-20 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.03)] border border-white"
          >
            <div className="grid md:grid-cols-2 gap-10">
               <motion.div variants={fadeInUp} className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8F69] ml-4 font-sans-premium">Full Name</label>
                  <input type="text" className="w-full bg-[#F9F7F2]/50 border border-[#7D8F69]/10 rounded-3xl p-7 focus:bg-white focus:ring-2 focus:ring-[#7D8F69]/20 outline-none transition-all font-sans-premium text-lg" placeholder="Jane Doe" />
               </motion.div>
               <motion.div variants={fadeInUp} className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8F69] ml-4 font-sans-premium">Email Address</label>
                  <input type="email" className="w-full bg-[#F9F7F2]/50 border border-[#7D8F69]/10 rounded-3xl p-7 focus:bg-white focus:ring-2 focus:ring-[#7D8F69]/20 outline-none transition-all font-sans-premium text-lg" placeholder="jane@example.com" />
               </motion.div>
            </div>
            <motion.div variants={fadeInUp} className="space-y-4">
               <label className="text-[9px] font-black uppercase tracking-[0.4em] text-[#7D8F69] ml-4 font-sans-premium">How can I help you?</label>
               <textarea rows={5} className="w-full bg-[#F9F7F2]/50 border border-[#7D8F69]/10 rounded-[2.5rem] p-10 focus:bg-white focus:ring-2 focus:ring-[#7D8F69]/20 outline-none transition-all font-sans-premium text-lg" placeholder="Tell me about your journey..." />
            </motion.div>
            <motion.button variants={fadeInUp} className="w-full bg-[#7D8F69] text-white py-8 rounded-full font-bold text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-[#7D8F69]/20 hover:bg-[#6A7B58] transition-all font-sans-premium active:scale-95">
              Send Application
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="py-32 px-6 border-t border-[#7D8F69]/10 text-center">
        <div className="container mx-auto space-y-20">
          <div className="font-serif-premium text-4xl md:text-5xl font-bold text-[#7D8F69]">Wellness Sanctuary</div>
          <div className="flex justify-center gap-12 text-[#1A1A1A]/20">
            <div className="hover:text-[#7D8F69] cursor-pointer transition-all hover:scale-125"><IconInstagram /></div>
            <div className="hover:text-[#7D8F69] cursor-pointer transition-all hover:scale-125"><IconMail /></div>
            <div className="hover:text-[#7D8F69] cursor-pointer transition-all hover:scale-125"><IconCalendar /></div>
          </div>
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.6em] font-black text-[#1A1A1A]/20 font-sans-premium">
              © 2026 Crafted with care by Julian Portfolio
            </p>
            <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]/10 font-sans-premium">
              Empowering Women Through Evidence-Based Wellness
            </p>
          </div>
        </div>
      </footer>

      {/* ── FIXED BACK BUTTON ────────────────────────────────────────── */}
      <div className="fixed bottom-10 right-10 z-50">
        <a 
          href="/star-forge/" 
          className="bg-white/90 backdrop-blur-md border border-[#7D8F69]/10 text-[#7D8F69] px-10 py-5 rounded-full shadow-2xl text-[9px] font-black uppercase tracking-[0.3em] font-sans-premium flex items-center gap-4 hover:bg-white hover:-translate-y-1 transition-all"
        >
          <div className="rotate-180"><IconArrowRight /></div> Back to Portfolio
        </a>
      </div>
    </main>
  );
}
