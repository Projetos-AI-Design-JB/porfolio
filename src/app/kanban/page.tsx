import { Metadata } from "next";
import { KanbanDemo } from "@/components/ui/kanban-demo";

export const metadata: Metadata = {
  title: "Kanban - Julian",
};

export default function Home() {
  return (
    <main className="w-full">
      <KanbanDemo />
    </main>
  );
}
