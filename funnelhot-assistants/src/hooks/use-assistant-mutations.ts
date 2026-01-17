import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAssistant,
  updateAssistant,
  deleteAssistant,
} from "@/services/assistant.service";
import { Assistant } from "@/types/assistant";

export function useCreateAssistant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAssistant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assistants"],
      });
    },
  });
}

export function useUpdateAssistant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAssistant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assistants"],
      });
    },
  });
}

export function useDeleteAssistant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAssistant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assistants"],
      });
    },
  });
}
