import { Metadata } from "next";
import { BackgroundPaths } from "@/components/ui/background-paths";

export const metadata: Metadata = {
  title: "Background Paths - Julian",
};

export default function BackgroundPathsPage() {
  return (
    <main className="w-full dark">
      <BackgroundPaths title="Animated Background Paths" />
    </main>
  );
}
