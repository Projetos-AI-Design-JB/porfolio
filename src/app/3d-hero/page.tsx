import { Metadata } from "next";
import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("@/components/ui/hero-section").then((mod) => mod.HeroSection),
  { ssr: false }
);

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
