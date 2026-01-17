import { z } from "zod";

// Paso 1: Datos básicos
export const assistantStep1Schema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  language: z.string().min(1, "Idioma requerido"),
  tone: z.string().min(1, "Tono requerido"),
});

// Paso 2: Configuración de respuestas
export const assistantStep2Schema = z.object({
  responseLength: z.object({
    short: z.number().min(0).max(100),
    medium: z.number().min(0).max(100),
    long: z.number().min(0).max(100),
  }).refine(
    (data) => data.short + data.medium + data.long === 100,
    {
      message: "La suma de los porcentajes debe ser exactamente 100%",
    }
  ),
  audioEnabled: z.boolean(),
});

// Schema completo
export const assistantSchema = assistantStep1Schema.merge(assistantStep2Schema);

export type AssistantStep1Values = z.infer<typeof assistantStep1Schema>;
export type AssistantStep2Values = z.infer<typeof assistantStep2Schema>;
export type AssistantFormValues = z.infer<typeof assistantSchema>;