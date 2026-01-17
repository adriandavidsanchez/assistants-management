"use client";

import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { AssistantFormValues } from "@/types/assistant.schema";
import { useEffect, useState } from "react";

interface Props {
  register: UseFormRegister<AssistantFormValues>;
  errors: FieldErrors<AssistantFormValues>;
  watch: UseFormWatch<AssistantFormValues>;
}

export default function AssistantFormStep2({ register, errors, watch }: Props) {
  const short = watch("responseLength.short") || 0;
  const medium = watch("responseLength.medium") || 0;
  const long = watch("responseLength.long") || 0;
  
  const total = Number(short) + Number(medium) + Number(long);
  const isValid = total === 100;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Longitud de respuestas <span className="text-red-500">*</span>
        </label>
        <p className="text-sm text-gray-600 mb-3">
          Define el porcentaje de cada tipo de respuesta. La suma debe ser 100%.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Cortas (%)</label>
            <input
              type="number"
              {...register("responseLength.short", { valueAsNumber: true })}
              min="0"
              max="100"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Medianas (%)</label>
            <input
              type="number"
              {...register("responseLength.medium", { valueAsNumber: true })}
              min="0"
              max="100"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Largas (%)</label>
            <input
              type="number"
              {...register("responseLength.long", { valueAsNumber: true })}
              min="0"
              max="100"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className={`mt-3 p-3 rounded-lg ${isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`text-sm font-medium ${isValid ? 'text-green-700' : 'text-red-700'}`}>
            Total: {total}% {isValid ? '✓' : '(debe ser 100%)'}
          </p>
        </div>

        {errors.responseLength && (
          <p className="text-sm text-red-500 mt-1">
            {errors.responseLength.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("audioEnabled")}
            className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm font-medium">
            Habilitar respuestas de audio
          </span>
        </label>
      </div>
    </div>
  );
}