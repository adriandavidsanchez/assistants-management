"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { Assistant } from "@/types/assistant";

import {
  assistantSchema,
  AssistantFormValues,
} from "@/types/assistant.schema";

import { useAssistantStore } from "@/store/assistant.store";
import {
  useCreateAssistant,
  useUpdateAssistant,
} from "@/hooks/use-assistant-mutations";

import AssistantFormStep1 from "./assistant-form-step1";
import AssistantFormStep2 from "./assistant-form-step2";

export default function AssistantForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const { selectedAssistant, closeModal } = useAssistantStore();

  const isEdit = Boolean(selectedAssistant);

  const createMutation = useCreateAssistant();
  const updateMutation = useUpdateAssistant();

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<AssistantFormValues>({
    resolver: zodResolver(assistantSchema),
    mode: "onChange",
    defaultValues: {
      name: selectedAssistant?.name ?? "",
      language: selectedAssistant?.language ?? "",
      tone: selectedAssistant?.tone ?? "",
      responseLength: selectedAssistant?.responseLength ?? {
        short: 33,
        medium: 34,
        long: 33,
      },
      audioEnabled: selectedAssistant?.audioEnabled ?? false,
    },
  });

const handleNext = async (e?: React.MouseEvent) => {
  e?.preventDefault(); // ← AGREGAR ESTO
  const isValid = await trigger(["name", "language", "tone"]);
  if (isValid) {
    setCurrentStep(2);
  }
};

  const handleBack = () => {
    setCurrentStep(1);
  };

  const onSubmit = async (data: AssistantFormValues) => {
    // Si estamos en paso 1, no hacer submit, solo validar
    if (currentStep === 1) {
      return;
    }

    // Validar que los porcentajes sumen 100
    const total = data.responseLength.short + data.responseLength.medium + data.responseLength.long;
    if (total !== 100) {
      toast.error("Los porcentajes deben sumar exactamente 100%");
      return;
    }

    const parsedData = {
      ...data,
      language: data.language as Assistant["language"],
      tone: data.tone as Assistant["tone"],
    };

    if (isEdit && selectedAssistant) {
      updateMutation.mutate(
        {
          ...selectedAssistant,
          ...parsedData,
        },
        {
          onSuccess: () => {
            toast.success("Asistente actualizado correctamente");
            closeModal();
            setCurrentStep(1);
          },
          onError: () => {
            toast.error("Error al actualizar el asistente");
          },
        }
      );
    } else {
      createMutation.mutate(
        {
          ...parsedData,
          rules: "",
        },
        {
          onSuccess: () => {
            toast.success("Asistente creado correctamente");
            closeModal();
            setCurrentStep(1);
          },
          onError: () => {
            toast.error("Error al crear el asistente");
          },
        }
      );
    }
  };

  return (
    <div>
      {/* Indicador de pasos */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              currentStep === 1
                ? "bg-blue-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {currentStep === 1 ? "1" : "✓"}
          </div>
          <div className="w-24 h-1 bg-gray-300 relative overflow-hidden">
            <div
              className={`h-full transition-all duration-300 absolute left-0 ${
                currentStep === 2 ? "w-full bg-blue-600" : "w-0 bg-blue-600"
              }`}
            />
          </div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              currentStep === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            2
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          {currentStep === 1 ? "Datos Básicos del Asistente" : "Configuración de Respuestas"}
        </h3>
        <p className="text-sm text-gray-600">
          {currentStep === 1
            ? "Completa la información básica"
            : "Define cómo responderá el asistente"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 1 ? (
          <AssistantFormStep1 register={register} errors={errors} />
        ) : (
          <AssistantFormStep2 register={register} errors={errors} watch={watch} />
        )}

        <div className="flex gap-3 pt-4">
          {currentStep === 2 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              ← Atrás
            </button>
          )}

          {currentStep === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Siguiente →
            </button>
          ) : (
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Guardando..."
                : isEdit
                ? "💾 Guardar cambios"
                : "✨ Crear asistente"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}