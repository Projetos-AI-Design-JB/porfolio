import { Metadata } from "next";
import { Kanban } from "@/components/kanban";

export const metadata: Metadata = {
  title: "Kanban Produção - Animepocky",
};

export default function KanbanProducaoPage() {
  return (
    <main className="w-full h-screen relative bg-neutral-900">
      <Kanban />
    </main>
  );
}
