import { Metadata } from "next";
import { HeroWrapper } from "@/components/ui/hero-wrapper";

export const metadata: Metadata = {
  title: "3D Cosmos Hero - Julian",
};

export default function HeroSectionPage() {
  return (
    <main className="w-full">
      <HeroWrapper />
    </main>
  );
}
