import Hero from "@/components/ethereal/Hero";
import Content from "@/components/ethereal/Content";
import HorizontalGallery from "@/components/ethereal/HorizontalGallery";
import Footer from "@/components/ethereal/Footer";
import SmoothScroll from "@/components/ethereal/SmoothScroll";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethereal Origins | Cinematic Experience",
  description: "Dive into the void with the Ethereal Origins cinematic portfolio experience.",
};

export default function EtherealPage() {
  return (
    <SmoothScroll>
      <main className="bg-black">
        <Hero />
        <Content />
        <HorizontalGallery />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
