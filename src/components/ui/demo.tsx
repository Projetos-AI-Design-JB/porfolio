"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col bg-white dark:bg-black">
      {/* Spacer to allow scrolling to start */}
      <div className="h-[50vh] flex items-center justify-center">
        <p className="text-zinc-500 animate-bounce">Scroll down to see the magic ↓</p>
      </div>

      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      {/* Footer spacer to ensure scroll ends properly */}
      <div className="h-[50vh] flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
        <p className="text-zinc-500">You've reached the end!</p>
      </div>
    </div>
  );
}
