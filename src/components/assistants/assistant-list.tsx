// src/components/assistants/assistant-list.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAssistants } from "@/hooks/use-assistants";
import { useDeleteAssistant } from "@/hooks/use-assistant-mutations";
import { useAssistantStore } from "@/store/assistant.store";
import AssistantCard from "./assistant-card";

export default function AssistantList() {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useAssistants();
  const deleteMutation = useDeleteAssistant();

  const openEditModal = useAssistantStore((state) => state.openEditModal);
  const openCreateModal = useAssistantStore((state) => state.openCreateModal);
  const isModalOpen = useAssistantStore((state) => state.isModalOpen);

  useEffect(() => {
    if (!isModalOpen) {
      refetch();
    }
  }, [isModalOpen, refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 font-semibold">Error al cargar asistentes</p>
        <p className="text-red-600 text-sm mt-1">
          Por favor, intenta recargar la página
        </p>
      </div>
    );
  }

  const handleDelete = (id: string, name: string) => {
    const confirmed = confirm(
      `¿Estás seguro de eliminar el asistente "${name}"?`
    );

    if (!confirmed) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Asistente eliminado correctamente");
      },
      onError: () => {
        toast.error("Error al eliminar el asistente. Intenta nuevamente.");
      },
    });
  };

  const handleTrain = (id: string) => {
    router.push(`/assistant/${id}`);
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No hay asistentes creados
          </h3>
          <p className="text-gray-600 mb-6">
            Comienza creando tu primer asistente IA para automatizar interacciones
          </p>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Crear mi primer asistente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Tus Asistentes</h2>
        <p className="text-gray-600">
          Gestiona y entrena tus asistentes de IA para automatizar interacciones.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((assistant) => (
          <AssistantCard
            key={assistant.id}
            assistant={assistant}
            onEdit={() => openEditModal(assistant)}
            onDelete={() => handleDelete(assistant.id, assistant.name)}
            onTrain={() => handleTrain(assistant.id)}
          />
        ))}
      </div>
    </div>
  );
}