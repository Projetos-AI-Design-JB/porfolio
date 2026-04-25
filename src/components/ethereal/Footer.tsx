"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-black py-40 px-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-start text-left gap-10">
        <h2 className="text-5xl md:text-8xl font-black text-white/10 uppercase tracking-tighter leading-none select-none">
          Ethereal Origins
        </h2>
        
        <div className="pt-6">
          {/* Force white color and premium styling */}
          <a 
            href="/porfolio/star-forge/" 
            style={{ color: 'white', textDecoration: 'none' }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-white/5 border border-white/20 rounded-full backdrop-blur-xl hover:bg-white/10 hover:scale-105 transition-all duration-500 group shadow-2xl"
          >
            <span className="text-white !text-white text-sm font-semibold tracking-tighter flex items-center gap-3">
              <span className="text-xl">←</span> Back to Portfolio
            </span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/40 uppercase tracking-[0.5em] font-medium">
        <p>© 2026 Julian Kezy Portfolio. All Rights Reserved.</p>
        <p>Built with ❤️ by Julian</p>
      </div>

      {/* Decorative Ambience */}
      <div className="absolute -bottom-20 -right-20 w-[60vw] h-[60vw] bg-white/5 rounded-full blur-[150px] pointer-events-none opacity-20" />
    </footer>
  );
}
