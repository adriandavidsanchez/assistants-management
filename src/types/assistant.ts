export type Language = "Español" | "Inglés" | "Portugués";
export type Tone = "Formal" | "Casual" | "Profesional" | "Amigable";

export interface ResponseLength {
  short: number;
  medium: number;
  long: number;
}

export interface Assistant {
  id: string;
  name: string;
  language: Language;
  tone: Tone;
  responseLength: ResponseLength;
  audioEnabled: boolean;
  rules?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}