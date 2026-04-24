import { Metadata } from "next";
import Link from "next/link";
import { BackgroundPaths } from "@/components/ui/background-paths";

export const metadata: Metadata = {
  title: "Nova Home - Julian",
};

export default function NovaHomePage() {
  return (
    <main className="w-full dark relative">
      <div className="fixed bottom-8 left-8 z-50 flex gap-4">
        <a href="/porfolio/" className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 hover:-translate-y-0.5 transition-all backdrop-blur-md text-sm font-medium">
          ← Back to bio
        </a>
        <a href="/olive-tree/" className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-6 py-3 rounded-full hover:bg-cyan-500/20 hover:-translate-y-0.5 transition-all backdrop-blur-md text-sm font-medium shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          OLIVE TREE 🌳
        </a>
      </div>
      <BackgroundPaths title="Portfolio" />
    </main>
  );
}
