"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { AssistantFormValues } from "@/types/assistant.schema";

interface Props {
  register: UseFormRegister<AssistantFormValues>;
  errors: FieldErrors<AssistantFormValues>;
}

export default function AssistantFormStep1({ register, errors }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Nombre del asistente <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name")}
          placeholder="Ej: Asistente de Ventas"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Idioma <span className="text-red-500">*</span>
        </label>
        <select
          {...register("language")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar idioma</option>
          <option value="Español">Español</option>
          <option value="Inglés">Inglés</option>
          <option value="Portugués">Portugués</option>
        </select>
        {errors.language && (
          <p className="text-sm text-red-500 mt-1">
            {errors.language.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Tono <span className="text-red-500">*</span>
        </label>
        <select
          {...register("tone")}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccionar tono</option>
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Profesional">Profesional</option>
          <option value="Amigable">Amigable</option>
        </select>
        {errors.tone && (
          <p className="text-sm text-red-500 mt-1">
            {errors.tone.message}
          </p>
        )}
      </div>
    </div>
  );
}