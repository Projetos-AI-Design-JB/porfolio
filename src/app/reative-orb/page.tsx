"use client";

import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <style>{`
        .back-btn { 
          position: fixed; 
          top: 2rem; 
          left: 2rem; 
          z-index: 50; 
          background: rgba(255,255,255,0.1); 
          border: 1px solid rgba(255,255,255,0.2); 
          color: white; 
          padding: 0.75rem 1.5rem; 
          border-radius: 2rem; 
          cursor: pointer; 
          transition: all 0.3s ease; 
          backdrop-filter: blur(10px);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: sans-serif;
        }
        .back-btn:hover { 
          background: rgba(255,255,255,0.2); 
          transform: translateY(-2px); 
        }
        .spline-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      
      <a href="/nova-home" className="back-btn">
        <span>←</span> Back to Portfolio
      </a>
      
      <div className="spline-container">
        <Spline
          scene="https://prod.spline.design/M31FePNpu3XN1PtD/scene.splinecode" 
        />
      </div>
    </main>
  );
}