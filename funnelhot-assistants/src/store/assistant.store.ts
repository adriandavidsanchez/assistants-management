import { create } from "zustand";
import { Assistant, ChatMessage } from "@/types/assistant";

interface AssistantState {
  assistants: Assistant[];
  selectedAssistant: Assistant | null;
  isModalOpen: boolean;
  modalMode: "create" | "edit";
  chatHistory: Record<string, ChatMessage[]>;

  setAssistants: (assistants: Assistant[]) => void;
  setSelectedAssistant: (assistant: Assistant | null) => void;

  openCreateModal: () => void;
  openEditModal: (assistant: Assistant) => void;
  closeModal: () => void;

  addChatMessage: (assistantId: string, message: ChatMessage) => void;
  clearChat: (assistantId: string) => void;
}

export const useAssistantStore = create<AssistantState>((set) => ({
  assistants: [],
  selectedAssistant: null,
  isModalOpen: false,
  modalMode: "create",
  chatHistory: {},

  setAssistants: (assistants) => set({ assistants }),

  setSelectedAssistant: (assistant) =>
    set({ selectedAssistant: assistant }),

  openCreateModal: () =>
    set({ isModalOpen: true, modalMode: "create", selectedAssistant: null }),

  openEditModal: (assistant) =>
    set({
      isModalOpen: true,
      modalMode: "edit",
      selectedAssistant: assistant
    }),

  closeModal: () =>
    set({ isModalOpen: false, selectedAssistant: null }),

  addChatMessage: (assistantId, message) =>
    set((state) => ({
      chatHistory: {
        ...state.chatHistory,
        [assistantId]: [
          ...(state.chatHistory[assistantId] || []),
          message
        ]
      }
    })),

  clearChat: (assistantId) =>
    set((state) => ({
      chatHistory: {
        ...state.chatHistory,
        [assistantId]: []
      }
    }))
}));