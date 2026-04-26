
import ScrollVideoScrub from "@/components/cinematic/ScrollVideoScrub";
import SmoothScroll from "@/components/cinematic/SmoothScroll";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Julian Kezy | Neural Unfold",
  description: "A cinematic scroll-driven journey through neural architecture and kinetic design.",
};

export default function HomePage() {
  return (
    <SmoothScroll>
      <main style={{ backgroundColor: "#000", margin: 0, padding: 0 }}>
        <ScrollVideoScrub />
      </main>
    </SmoothScroll>
  );
}
