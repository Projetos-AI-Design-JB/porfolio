import { Metadata } from "next";
import Link from "next/link";
import { BackgroundPaths } from "@/components/ui/background-paths";

export const metadata: Metadata = {
  title: "Nova Home - Julian",
};

export default function NovaHomePage() {
  return (
    <main className="w-full dark relative">
      <BackgroundPaths title="Portfolio" />
    </main>
  );
}
