import { Metadata } from "next";
import Link from "next/link";
import { BackgroundPaths } from "@/components/ui/background-paths";

export const metadata: Metadata = {
  title: "Nova Home - Julian",
};

export default function NovaHomePage() {
  return (
    <main className="w-full dark relative">
      <a href="/porfolio/" className="fixed bottom-8 left-8 z-50 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 hover:-translate-y-0.5 transition-all backdrop-blur-md text-sm font-medium">
        ← Back to bio
      </a>
      <BackgroundPaths title="Portfolio" />
      <a href="/gallery/" className="fixed bottom-8 right-8 z-50 bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/20 hover:-translate-y-0.5 transition-all backdrop-blur-md text-sm font-medium flex items-center gap-2">
        AI ART <div className="w-2 h-2 rounded-full bg-[#31b8c6] animate-pulse" />
      </a>
    </main>
  );
}
