import { Assistant } from "@/types/assistant";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

let assistants: Assistant[] = [
  {
    id: "1",
    name: "Asistente de Ventas",
    language: "Español",
    tone: "Profesional",
    responseLength: { short: 30, medium: 50, long: 20 },
    audioEnabled: true,
    rules:
      "Eres un asistente especializado en ventas. Siempre sé cordial y enfócate en identificar necesidades del cliente.",
  },
  {
    id: "2",
    name: "Soporte Técnico",
    language: "Inglés",
    tone: "Amigable",
    responseLength: { short: 20, medium: 30, long: 50 },
    audioEnabled: false,
    rules:
      "Ayudas a resolver problemas técnicos de manera clara y paso a paso.",
  },
];

// GET
export const getAssistants = async (): Promise<Assistant[]> => {
  await delay(400);
  return assistants;
};

// CREATE
export const createAssistant = async (
  data: Omit<Assistant, "id">
): Promise<Assistant> => {
  await delay(400);

  const newAssistant: Assistant = {
    ...data,
    id: crypto.randomUUID(),
  };

  assistants.push(newAssistant);
  return newAssistant;
};

// UPDATE
export const updateAssistant = async (
  assistant: Assistant
): Promise<Assistant> => {
  await delay(400);

  assistants = assistants.map((a) =>
    a.id === assistant.id ? assistant : a
  );

  return assistant;
};

// DELETE (con error aleatorio como pide la prueba)
export const deleteAssistant = async (id: string): Promise<void> => {
  await delay(400);

  // 10% de probabilidad de error
  if (Math.random() < 0.1) {
    throw new Error("Error al eliminar el asistente");
  }

  assistants = assistants.filter((a) => a.id !== id);
};
