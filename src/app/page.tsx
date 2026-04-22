'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import { 
  FaLinkedin, 
  FaWhatsapp 
} from 'react-icons/fa'
import { SiUpwork } from 'react-icons/si'

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-6 overflow-hidden font-syne selection:bg-cyan-500/30">
      {/* Background Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_#1f2937_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,_#111827_0%,_transparent_50%)] pointer-events-none opacity-50" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-2xl flex flex-col items-center"
      >
        {/* Avatar Section */}
        <motion.div variants={itemVariants} className="relative mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1.5 ring-4 ring-cyan-500/30 overflow-hidden bg-slate-900 border-2 border-cyan-400/80 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
            <img 
              src="/porfolio/JB-vibecode.png" 
              alt="Julian Kezy"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Online Status Dot */}
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#22c55e] rounded-full border-4 border-[#020617] shadow-[0_0_15px_#22c55e]" />
        </motion.div>

        {/* Name and Titles */}
        <motion.div variants={itemVariants} className="text-center mb-10 px-4">
          <h1 className="text-3xl md:text-6xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 font-syne">
            Julian Kezy
          </h1>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            <span className="px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-slate-800/40 border border-slate-700/50 text-[10px] md:text-xs font-semibold backdrop-blur-md text-slate-300 uppercase tracking-widest">
              Software Engineer
            </span>
            <span className="px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-slate-800/40 border border-slate-700/50 text-[10px] md:text-xs font-semibold backdrop-blur-md text-slate-300 uppercase tracking-widest">
              Solutions Architect
            </span>
            <span className="px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-slate-800/40 border border-slate-700/50 text-[10px] md:text-xs font-semibold backdrop-blur-md text-slate-300 uppercase tracking-widest">
              AI Designer
            </span>
          </div>
        </motion.div>

        {/* Social Icons */}
        <motion.div variants={itemVariants} className="flex gap-4 mb-16">
          <SocialIcon 
            icon={<SiUpwork size={20} />} 
            href="https://www.upwork.com/freelancers/~01c619e33efa8638d3" 
          />
          <SocialIcon icon={<FaLinkedin size={22} />} href="https://www.linkedin.com/in/juliano-bianchesi" />
          <SocialIcon icon={<FaWhatsapp size={22} />} href="#" highlight />
        </motion.div>

        {/* Action Button Section */}
        <motion.div variants={itemVariants} className="w-full">
          
          <Link href="/nova-home">
            <motion.div 
              whileHover={{ scale: 1.01, backgroundColor: 'rgba(30, 41, 59, 0.6)' }}
              whileTap={{ scale: 0.99 }}
              className="group relative w-full p-5 md:p-10 rounded-[1.5rem] md:rounded-[2rem] bg-slate-800/30 border border-slate-700/40 backdrop-blur-xl flex items-center justify-between transition-all duration-500 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex items-center gap-4 md:gap-8 relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-cyan-950/50 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-500">
                  <ExternalLink size={20} className="md:w-7 md:h-7" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 md:gap-3">
                    <h3 className="text-xl md:text-4xl font-bold text-white font-syne tracking-tight">Portfolio</h3>
                    <span className="px-1.5 md:px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 text-[8px] md:text-[10px] font-black uppercase tracking-tighter">
                      Live
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs md:text-lg mt-0.5 md:mt-1 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    Explore my recent projects
                  </p>
                </div>
              </div>
              
              <div className="text-slate-500 group-hover:text-white transition-all duration-500 translate-x-0 group-hover:translate-x-1 relative z-10">
                <ChevronRight size={24} className="md:w-8 md:h-8" strokeWidth={1.5} />
              </div>

              {/* Decorative border glow */}
              <div className="absolute inset-px rounded-[1.9rem] pointer-events-none border border-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer / Copyright */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-auto pt-16 text-slate-600 text-[10px] font-bold tracking-[0.4em] uppercase"
      >
        © 2026 Crafted by Julian Kezy
      </motion.div>
    </main>
  )
}

function SocialIcon({ icon, href, highlight = false }: { icon: React.ReactNode, href: string, highlight?: boolean }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`
        w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300
        ${highlight 
          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.3)]' 
          : 'bg-slate-800/40 text-slate-400 border border-slate-700/50 hover:bg-slate-700/60 hover:text-white'
        }
      `}
    >
      {icon}
    </motion.a>
  )
}
