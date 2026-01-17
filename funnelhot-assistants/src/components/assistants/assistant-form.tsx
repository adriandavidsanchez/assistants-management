"use client";

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

export default function AssistantForm() {
  const { selectedAssistant, closeModal } =
    useAssistantStore();

  const isEdit = Boolean(selectedAssistant);

  const createMutation = useCreateAssistant();
  const updateMutation = useUpdateAssistant();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssistantFormValues>({
    resolver: zodResolver(assistantSchema),
    defaultValues: {
      name: selectedAssistant?.name ?? "",
      language: selectedAssistant?.language ?? "",
      tone: selectedAssistant?.tone ?? "",
    },
  });

  const onSubmit = (data: AssistantFormValues) => {
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
          toast.success("Asistente actualizado");
          closeModal();
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
        responseLength: {
          short: 33,
          medium: 34,
          long: 33,
        },
        audioEnabled: false,
        rules: "",
      },
      {
        onSuccess: () => {
          toast.success("Asistente creado");
          closeModal();
        },
        onError: () => {
          toast.error("Error al crear el asistente");
        },
      }
    );
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium">
          Nombre
        </label>
        <input
          {...register("name")}
          className="w-full border rounded-lg px-3 py-2"
        />
        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">
          Idioma
        </label>
        <select
          {...register("language")}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Seleccionar</option>
          <option value="Español">Español</option>
          <option value="Inglés">Inglés</option>
        </select>
        {errors.language && (
          <p className="text-sm text-red-500">
            {errors.language.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">
          Tono
        </label>
        <select
          {...register("tone")}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="">Seleccionar</option>
          <option value="Formal">Formal</option>
          <option value="Amigable">Amigable</option>
        </select>
        {errors.tone && (
          <p className="text-sm text-red-500">
            {errors.tone.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={
          createMutation.isPending ||
          updateMutation.isPending
        }
        className="w-full bg-black text-white py-2 rounded-lg disabled:opacity-50"
      >
        {isEdit
          ? "Guardar cambios"
          : "Crear asistente"}
      </button>
    </form>
  );
}

