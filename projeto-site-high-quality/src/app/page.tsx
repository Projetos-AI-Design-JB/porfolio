import Hero from "@/components/sections/Hero";
import Content from "@/components/sections/Content";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import Footer from "@/components/sections/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="bg-black min-h-screen">
        <Hero />
        <Content />
        <HorizontalGallery />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
