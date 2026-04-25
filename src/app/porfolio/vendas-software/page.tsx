"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ClientOnly } from "@/components/client-only";
import { ScrollSpiral } from "@/components/ui/scroll-spiral";
import { 
  Play, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Globe2, 
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";

// Removendo o dynamic import que causou erro de exportação
// const Spline = dynamic(() => import("@splinetool/react-spline"), {
//   ssr: false,
// });

export default function VendasSoftwarePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 font-syne selection:bg-cyan-500/30 overflow-x-hidden">
      {/* ── BACK BUTTON ────────────────────────────────────────────── */}
      <a 
        href="/porfolio/nova-home/" 
        className="fixed bottom-6 left-6 z-50 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all backdrop-blur-md text-[13px] font-medium"
      >
        ← Portfolio
      </a>

      {/* ── BACKGROUND 3D SPIRAL ────────────────────────────────────── */}
      <ScrollSpiral />

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 bg-[radial-gradient(circle_at_50%_0%,_#0c1428_0%,_#020617_70%)]">
        
        <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Zap size={14} /> Inscrições Abertas
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
              DOMINE O CÓDIGO DO <span className="text-cyan-400 font-black">FUTURO.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-xl mb-10 font-medium leading-relaxed">
              Aprenda a construir arquiteturas escaláveis, designs cinematográficos e sistemas de IA com a metodologia que as Big Techs não querem que você saiba.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-[#020617] font-bold rounded-2xl px-8 h-14 text-lg shadow-[0_0_30px_rgba(6,182,212,0.3)] w-full sm:w-auto">
                Quero Minha Vaga <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white font-bold rounded-2xl px-8 h-14 text-lg backdrop-blur-md w-full sm:w-auto">
                Ver Módulos
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VSL SECTION ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Assista e Surpreenda-se</h2>
            <p className="text-slate-400">Descubra em 5 minutos como transformaremos sua carreira.</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-[2rem] border border-white/10 overflow-hidden bg-slate-900/50 shadow-2xl backdrop-blur-3xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent pointer-events-none" />
            <div className="w-full h-full flex items-center justify-center bg-black/60">
               {/* Placeholder para o Vídeo */}
               <div className="relative z-10 text-center">
                 <motion.button 
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-[#020617] shadow-[0_0_50px_rgba(255,255,255,0.2)] mb-6 mx-auto"
                 >
                   <Play size={40} fill="currentColor" />
                 </motion.button>
                 <p className="text-lg font-bold text-white tracking-widest uppercase">Iniciar Apresentação</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES SECTION ────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-950/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Code2 className="text-cyan-400" size={32} />}
              title="Fullstack Cinema"
              desc="Frontend que parece interface de filme e backend que aguenta milhões de requisições."
            />
            <FeatureCard 
              icon={<Cpu className="text-cyan-400" size={32} />}
              title="IA Agentic Deep Dive"
              desc="Construa seus próprios agentes de IA para automatizar 90% do seu fluxo de trabalho."
            />
            <FeatureCard 
              icon={<Globe2 className="text-cyan-400" size={32} />}
              title="Global Networking"
              desc="Acesso exclusivo à nossa comunidade de desenvolvedores operando no mercado internacional."
            />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / CTA ──────────────────────────────────────── */}
      <section className="py-32 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-20 rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 backdrop-blur-xl"
          >
            <h2 className="text-2xl md:text-6xl font-black mb-8 leading-tight uppercase tracking-tighter md:tracking-normal">PRONTO PARA O SEU PRÓXIMO <span className="text-cyan-400">NÍVEL?</span></h2>
            <div className="flex flex-col items-center gap-6">
              <div className="flex -space-x-3 mb-4 scale-75 md:scale-100">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#020617] bg-slate-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="aluno" />
                  </div>
                ))}
              </div>
              <p className="text-slate-400 mb-4 font-medium text-[10px] md:text-base">+1.500 desenvolvedores já estão no futuro.</p>
              <Button size="lg" className="bg-white text-black hover:bg-slate-200 font-bold rounded-2xl px-6 md:px-12 h-14 md:h-16 text-[12px] md:text-xl w-full md:w-auto uppercase tracking-tighter md:tracking-normal shadow-xl">
                GARANTIR ACESSO IMEDIATO
              </Button>
              <div className="flex items-center gap-2 text-slate-500 text-[9px] md:text-sm font-bold">
                <ShieldCheck size={16} /> Pagamento 100% Seguro • 7 Dias de Garantia
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-slate-600 text-[10px] tracking-[0.4em] uppercase font-bold">
        © 2026 Developed by sdd-creator for Julian Kezy Portfolio
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-300"
    >
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-medium">{desc}</p>
    </motion.div>
  );
}
