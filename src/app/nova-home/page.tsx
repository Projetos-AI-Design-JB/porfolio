import { Metadata } from "next";
import { BackgroundPaths } from "@/components/ui/background-paths";

export const metadata: Metadata = {
  title: "Nova Home - Julian",
};

export default function NovaHomePage() {
  return (
    <main className="w-full dark">
      <BackgroundPaths title="Portfolio" />
    </main>
  );
}
