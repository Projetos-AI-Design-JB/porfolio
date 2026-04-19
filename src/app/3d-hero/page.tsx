import { Metadata } from "next";
import { HeroSection } from "@/components/ui/hero-section";

export const metadata: Metadata = {
  title: "3D Cosmos Hero - Julian",
};

export default function HeroSectionPage() {
  return (
    <main className="w-full">
      <HeroSection />
    </main>
  );
}
