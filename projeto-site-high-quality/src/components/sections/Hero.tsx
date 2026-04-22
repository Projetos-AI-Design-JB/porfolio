"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const statueRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        pin: true,
      },
    });

    tl.to(bgRef.current, { scale: 1.2, y: 50, ease: "none" }, 0)
      .to(characterRef.current, { y: -150, scale: 1.1, opacity: 0.5, ease: "none" }, 0)
      .to(statueRef.current, { y: -400, x: -100, rotate: -20, scale: 1.2, ease: "none" }, 0)
      .to(titleRef.current, { y: -200, scale: 0.8, ease: "none" }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Background Layer (Deepest) */}
      <div ref={bgRef} className="absolute inset-0 z-0">
         <Image
            src="/images/bg.png"
            alt="Cosmic Cathedral"
            fill
            className="object-cover opacity-40"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black z-10" />
      </div>

      {/* Title Layer (Top-most for legibility) */}
      <div 
        ref={titleRef}
        className="relative z-50 text-center px-4 select-none pointer-events-none"
      >
        <h1 className="text-[14vw] font-black text-white uppercase tracking-tighter leading-[0.75] drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          Ethereal<br />Origins
        </h1>
        <p className="text-white/60 text-lg md:text-2xl tracking-[0.5em] uppercase mt-10 font-extralight">
          The Void is Calling
        </p>
      </div>

      {/* Character Layer */}
      <div
        ref={characterRef}
        className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none"
      >
        <div className="relative w-full h-[140%] -bottom-[20%]">
          <Image
            src="/images/hero.png"
            alt="Hero Character"
            fill
            className="object-contain object-bottom filter brightness-50"
            priority
          />
        </div>
      </div>

      {/* Foreground Statue Layer */}
      <div
        ref={statueRef}
        className="absolute -left-[10vw] -bottom-[10vh] z-30 w-[50vw] aspect-square pointer-events-none"
      >
        <Image
          src="/images/statue.png"
          alt="Foreground Statue"
          fill
          className="object-contain filter brightness-110 contrast-125 drop-shadow-[0_0_100px_rgba(0,0,0,1)]"
        />
      </div>

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
    </section>
  );
}
