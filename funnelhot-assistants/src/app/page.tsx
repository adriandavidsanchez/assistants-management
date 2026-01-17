import AssistantList from "@/components/assistants/assistant-list";
import AssistantModal from "@/components/assistants/assistant-modal";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Asistentes
      </h1>

      <AssistantList />
      <AssistantModal />
    </main>
  );
}
