"use client";

import AssistantList from "@/components/assistants/assistant-list";
import AssistantModal from "@/components/assistants/assistant-modal";
import { useAssistantStore } from "@/store/assistant.store";

export default function Home() {
  const openCreateModal = useAssistantStore((state) => state.openCreateModal);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Asistentes IA
            </h1>
            <p className="text-gray-600 mt-1">
              Gestiona tus asistentes virtuales
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
            + Crear Asistente
          </button>
        </div>

        <AssistantList />
        <AssistantModal />
      </div>
    </main>
  );
}