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
          top: 1.5rem; 
          left: 1.5rem; 
          z-index: 50; 
          background: rgba(255,255,255,0.1); 
          border: 1px solid rgba(255,255,255,0.2); 
          color: white; 
          padding: 0.6rem 1.2rem; 
          border-radius: 2rem; 
          cursor: pointer; 
          transition: all 0.3s ease; 
          backdrop-filter: blur(10px);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: sans-serif;
          font-size: 0.9rem;
        }
        @media (min-width: 768px) {
          .back-btn {
            top: 2rem;
            left: 2rem;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
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
          overflow: hidden;
        }
        .spline-wrapper {
          width: 100%;
          height: 100%;
          transform: scale(0.8);
          transform-origin: center center;
        }
        @media (max-width: 768px) {
          .spline-wrapper {
            transform: scale(0.6) translateX(-10%);
          }
        }
      `}</style>
      
      <a href="/nova-home" className="back-btn">
        <span>←</span> Back to Portfolio
      </a>
      
      <div className="spline-container">
        <div className="spline-wrapper">
          <Spline
            scene="https://prod.spline.design/M31FePNpu3XN1PtD/scene.splinecode" 
          />
        </div>
      </div>
    </main>
  );
}