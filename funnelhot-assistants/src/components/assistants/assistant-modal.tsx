"use client";

import { useAssistantStore } from "@/store/assistant.store";
import AssistantForm from "@/components/assistants/assistant-form";

export default function AssistantModal() {
  const {
    isModalOpen,
    closeModal,
    modalMode,
  } = useAssistantStore();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {modalMode === "create"
              ? "Crear asistente"
              : "Editar asistente"}
          </h2>

          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* FORMULARIO */}
        <AssistantForm />
      </div>
    </div>
  );
}
