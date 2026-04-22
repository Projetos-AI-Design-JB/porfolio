import { Metadata } from "next";
import Link from "next/link";
import { BackgroundPaths } from "@/components/ui/background-paths";

export const metadata: Metadata = {
  title: "Nova Home - Julian",
};

export default function NovaHomePage() {
  return (
    <main className="w-full dark relative">
      <Link href="/porfolio/" className="fixed bottom-8 left-8 z-50 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 hover:-translate-y-0.5 transition-all backdrop-blur-md">
        ← Back to bio
      </Link>
      <BackgroundPaths title="Portfolio" />
    </main>
  );
}
