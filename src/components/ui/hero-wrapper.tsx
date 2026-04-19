"use client";

import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("./hero-section").then((mod) => mod.HeroSection),
  { ssr: false }
);

export function HeroWrapper() {
  return <HeroSection />;
}
