"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAssistants } from "@/hooks/use-assistants";
import { useUpdateAssistant } from "@/hooks/use-assistant-mutations";
import ChatSimulator from "@/components/assistants/chat-simulator";

export default function AssistantTrainingPage() {
  const params = useParams();
  const router = useRouter();
  const assistantId = params.id as string;

  const { data: assistants, isLoading } = useAssistants();
  const updateMutation = useUpdateAssistant();

  const [rules, setRules] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const assistant = assistants?.find((a) => a.id === assistantId);

  useEffect(() => {
    if (assistant) {
      setRules(assistant.rules || "");
    }
  }, [assistant]);

  const handleSave = async () => {
    if (!assistant) return;

    setIsSaving(true);

    updateMutation.mutate(
      {
        ...assistant,
        rules,
      },
      {
        onSuccess: () => {
          toast.success("Entrenamiento guardado correctamente");
          setIsSaving(false);
        },
        onError: () => {
          toast.error("Error al guardar el entrenamiento");
          setIsSaving(false);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!assistant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Asistente no encontrado
          </h2>
          <p className="text-gray-600 mb-6">
            El asistente que buscas no existe
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 hover:text-blue-700 font-medium mb-4 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a asistentes
          </button>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {assistant.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {assistant.language}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                {assistant.tone}
              </span>
              {assistant.audioEnabled && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  🎵 Audio habilitado
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Entrenamiento del Asistente
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Define las instrucciones y reglas que el asistente debe seguir al interactuar con los usuarios.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prompts / Instrucciones
              </label>
              <textarea
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                placeholder="Ejemplo: Eres un asistente especializado en ventas. Siempre sé cordial y enfócate en identificar necesidades del cliente..."
                rows={12}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Guardando..." : "💾 Guardar Entrenamiento"}
            </button>

            {rules && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Instrucciones actuales:</strong> {rules.length} caracteres
                </p>
              </div>
            )}
          </div>
          <div>
            <ChatSimulator assistantId={assistantId} />
          </div>
        </div>
      </div>
    </div>
  );
}