// src/app/page.tsx
"use client";

import AssistantList from "@/components/assistants/assistant-list";
import AssistantModal from "@/components/assistants/assistant-modal";
import Header from "@/components/layout/header";
import { useAssistantStore } from "@/store/assistant.store";

export default function Home() {
  const openCreateModal = useAssistantStore((state) => state.openCreateModal);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateClick={openCreateModal} />
      
      <main className="max-w-7xl mx-auto p-6">
        <AssistantList />
        <AssistantModal />
      </main>
    </div>
  );
}