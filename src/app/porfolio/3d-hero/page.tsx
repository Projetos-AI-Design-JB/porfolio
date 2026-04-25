import { Metadata } from "next";
import { HeroWrapper } from "@/components/ui/hero-wrapper";
import { ClientOnly } from "@/components/client-only";

export const metadata: Metadata = {
  title: "3D Cosmos Hero - Julian",
};

export const dynamic = "force-static";

export default function HeroSectionPage() {
  return (
    <main className="w-full">
      <ClientOnly>
        <HeroWrapper />
      </ClientOnly>
    </main>
  );
}
