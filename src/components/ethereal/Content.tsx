"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Content() {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const innerImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      },
    });

    // Cinematic "Portal" opening effect
    tl.fromTo(portalRef.current, 
      { clipPath: "circle(20% at 50% 50%)", scale: 0.8 }, 
      { clipPath: "circle(100% at 50% 50%)", scale: 1, ease: "none" }
    )
    .fromTo(innerImgRef.current,
      { scale: 2, filter: "blur(10px) brightness(0.5)" },
      { scale: 1, filter: "blur(0px) brightness(1)", ease: "none" },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />

      {/* The Cinematic Portal */}
      <div 
        ref={portalRef}
        className="relative w-full h-full z-10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]"
      >
        <div ref={innerImgRef} className="absolute inset-0">
          <Image 
            src="/ethereal/images/landscape.png" 
            alt="Cinematic Landscape" 
            fill 
            className="object-cover"
            quality={100} 
          />
          {/* Subtle Parallax Label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="text-white/20 text-[20vw] font-black uppercase tracking-[-0.05em] translate-y-[20%]">
                CORE
             </div>
          </div>
          {/* Depth Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
        </div>
      </div>

      {/* Frame Decorations */}
      <div className="absolute inset-0 z-20 pointer-events-none border-[1px] border-white/5 m-10" />
    </section>
  );
}
