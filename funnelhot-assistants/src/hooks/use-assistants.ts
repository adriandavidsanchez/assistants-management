import { useQuery } from "@tanstack/react-query";
import { getAssistants } from "@/services/assistant.service";
import { useAssistantStore } from "@/store/assistant.store";

export const useAssistants = () => {
  const setAssistants = useAssistantStore(
    (state) => state.setAssistants
  );

  return useQuery({
    queryKey: ["assistants"],
    queryFn: async () => {
      const data = await getAssistants();
      setAssistants(data);
      return data;
    }
  });
};