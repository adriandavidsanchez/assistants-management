"use client";

import { useState, useRef, useEffect } from "react";
import { useAssistantStore } from "@/store/assistant.store";
import { getRandomResponse } from "@/constants/chat-responses";
import { ChatMessage } from "@/types/assistant";

interface Props {
  assistantId: string;
}

export default function ChatSimulator({ assistantId }: Props) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { chatHistory, addChatMessage, clearChat } = useAssistantStore();
  const messages = chatHistory[assistantId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    addChatMessage(assistantId, userMessage);
    setInput("");
    setIsTyping(true);

    // Simular delay de respuesta del asistente (1-2 segundos)
    const delay = Math.random() * 1000 + 1000;
    
    await new Promise((resolve) => setTimeout(resolve, delay));

    const assistantMessage: ChatMessage = {
      role: "assistant",
      content: getRandomResponse(),
    };

    addChatMessage(assistantId, assistantMessage);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    if (messages.length > 0) {
      const confirmed = confirm("¿Deseas reiniciar la conversación?");
      if (confirmed) {
        clearChat(assistantId);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[500px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Chat Simulado</h3>
          <p className="text-xs text-gray-500">
            Las respuestas son simuladas
          </p>
        </div>
        <button
          onClick={handleReset}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Reiniciar
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-sm">Inicia una conversación</p>
            <p className="text-xs mt-1">Escribe un mensaje para probar el asistente</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            disabled={isTyping}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}