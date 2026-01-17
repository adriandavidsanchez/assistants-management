"use client";

import { toast } from "sonner";
import { useAssistants } from "@/hooks/use-assistants";
import { useDeleteAssistant } from "@/hooks/use-assistant-mutations";
import { useAssistantStore } from "@/store/assistant.store";

export default function AssistantList() {
  const { data, isLoading, isError } = useAssistants();
  const deleteMutation = useDeleteAssistant();

  const openEditModal = useAssistantStore(
    (state) => state.openEditModal
  );

  if (isLoading) {
    return <p className="text-center mt-10">Cargando asistentes...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error al cargar asistentes
      </p>
    );
  }

  const handleDelete = (id: string) => {
    const confirmed = confirm(
      "¿Seguro que deseas eliminar este asistente?"
    );

    if (!confirmed) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Asistente eliminado");
      },
      onError: () => {
        toast.error("Error al eliminar el asistente");
      },
    });
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map((assistant) => (
        <div
          key={assistant.id}
          className="border rounded-xl p-4 shadow-sm"
        >
          <h3 className="text-lg font-semibold">
            {assistant.name}
          </h3>

          <p className="text-sm text-gray-500">
            Idioma: {assistant.language}
          </p>

          <p className="text-sm text-gray-500">
            Tono: {assistant.tone}
          </p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => openEditModal(assistant)}
              className="flex-1 bg-black text-white py-2 rounded-lg"
            >
              Editar
            </button>

            <button
              onClick={() => handleDelete(assistant.id)}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
