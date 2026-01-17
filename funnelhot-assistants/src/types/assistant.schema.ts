import { z } from "zod";

export const assistantSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  language: z.string().min(1, "Idioma requerido"),
  tone: z.string().min(1, "Tono requerido"),
});

export type AssistantFormValues = z.infer<typeof assistantSchema>;
