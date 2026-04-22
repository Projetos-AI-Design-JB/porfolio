"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 1, title: "Void Architect", category: "Spatial Design", img: "/porfolio/ethereal/images/proj1.png" },
  { id: 2, title: "Nebula Pulse", category: "Interactive", img: "/porfolio/ethereal/images/proj2.png" },
  { id: 3, title: "Obsidian Flow", category: "Motion", img: "/porfolio/ethereal/images/proj3.png" },
  { id: 4, title: "Crystal Soul", category: "Experience", img: "/porfolio/ethereal/images/proj4.png" },
];

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-300vw",
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    // Animate each item individually for a more dynamic feel
    const items = sectionRef.current.querySelectorAll(".gallery-item");
    items.forEach((item) => {
      gsap.fromTo(
        item.querySelector("img"),
        { scale: 1.5, filter: "grayscale(100%)" },
        {
          scale: 1,
          filter: "grayscale(0%)",
          ease: "none",
          scrollTrigger: {
            trigger: item,
            containerAnimation: pin,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        }
      );
    });

    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section className="overflow-hidden bg-black">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="h-screen w-[400vw] flex flex-row relative bg-black">
          {PROJECTS.map((project) => (
            <div key={project.id} className="gallery-item h-screen w-screen flex justify-center items-center p-4 md:p-32">
              <div className="relative w-full h-full max-w-5xl max-h-[70vh] md:max-h-[70vh] group overflow-hidden border border-white/5 shadow-2xl bg-neutral-900 rounded-2xl md:rounded-none">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-1000 ease-out"
                  quality={100}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                <div className="absolute bottom-8 left-6 md:bottom-20 md:left-20 text-white z-20 pr-6">
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.8em] text-white/40 mb-3 md:mb-6 font-light">{project.category}</p>
                  <h3 className="text-3xl md:text-9xl font-black uppercase tracking-tighter leading-none break-words max-w-[80vw] md:max-w-none">{project.title}</h3>
                  <div className="mt-6 md:mt-12 flex items-center gap-4 md:gap-6 group/btn cursor-pointer">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500">
                          <span className="text-lg md:text-xl">→</span>
                      </div>
                      <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/60 group-hover/btn:text-white transition-colors">View Case Study</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
