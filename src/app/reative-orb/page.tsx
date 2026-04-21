"use client";

import Link from 'next/link';
import Spline from '@splinetool/react-spline';
import { ClientOnly } from "@/components/client-only";

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <style>{`
        /* ... estilos mantidos ... */
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
          background: black;
        }
        .spline-wrapper {
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(1);
          transform-origin: center center;
        }
        @media (max-width: 768px) {
          .spline-wrapper {
            transform: scale(0.8);
          }
        }
      `}</style>
      
      <Link href="/clientes" className="back-btn">
        <span>←</span> Back to Portfolio
      </Link>
      
      <div className="spline-container">
        <div className="spline-wrapper">
          <ClientOnly>
            <Spline
              scene="https://prod.spline.design/M31FePNpu3XN1PtD/scene.splinecode" 
            />
          </ClientOnly>
        </div>
      </div>
    </main>
  );
}