import { Metadata } from "next";
import { KanbanDemo } from "@/components/ui/kanban-demo";

export const metadata: Metadata = {
  title: "Kanban - Julian",
};

export default function Home() {
  return (
    <main className="w-full relative">
      <a href="/porfolio/nova-home/" className="fixed bottom-8 left-8 z-50 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 hover:-translate-y-0.5 transition-all backdrop-blur-md">
        ← Back to Portfolio
      </a>
      <KanbanDemo />
    </main>
  );
}
