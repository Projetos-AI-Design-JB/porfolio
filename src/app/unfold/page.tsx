

import ScrollVideoScrub from "@/components/cinematic/ScrollVideoScrub";
import SmoothScroll from "@/components/cinematic/SmoothScroll";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unfold | Cinematic Experience",
  description: "A scroll-driven journey through neural architecture and kinetic design.",
};

export default function UnfoldPage() {
  return (
    <SmoothScroll>
      <main style={{ backgroundColor: "#000", margin: 0, padding: 0 }}>
        <ScrollVideoScrub />
      </main>
    </SmoothScroll>
  );
}

