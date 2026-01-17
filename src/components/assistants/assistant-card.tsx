// src/components/assistants/assistant-card.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Volume2, MoreVertical } from "lucide-react";
import type { Assistant } from "@/types/assistant";

interface AssistantCardProps {
  assistant: Assistant;
  onEdit: () => void;
  onDelete: () => void;
  onTrain: () => void;
}

export default function AssistantCard({
  assistant,
  onEdit,
  onDelete,
  onTrain,
}: AssistantCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const getBadgeColor = (language: string) => {
    switch (language) {
      case "Español":
        return "bg-blue-100 text-blue-700";
      case "Inglés":
        return "bg-purple-100 text-purple-700";
      case "Portugués":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{assistant.name}</h3>
        
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 hover:bg-gray-100 rounded-full transition"
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1">
              <button
                onClick={() => {
                  onEdit();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </button>
              
              <button
                onClick={() => {
                  onTrain();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Entrenar
              </button>

              <hr className="my-1 border-gray-200" />
              
              <button
                onClick={() => {
                  onDelete();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${getBadgeColor(assistant.language)}`}>
          <Globe className="w-3 h-3" />
          {assistant.language}
        </span>
        
        {assistant.audioEnabled && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700">
            <Volume2 className="w-3 h-3" />
            Audio
          </span>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-500 mb-2">
          LONGITUD DE RESPUESTAS
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 rounded-full overflow-hidden flex">
            <div 
              className="bg-teal-500 h-full" 
              style={{ width: `${assistant.responseLength.short}%` }}
            />
            <div 
              className="bg-blue-500 h-full" 
              style={{ width: `${assistant.responseLength.medium}%` }}
            />
            <div 
              className="bg-purple-500 h-full" 
              style={{ width: `${assistant.responseLength.long}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
          <span>Cortas {assistant.responseLength.short}%</span>
          <span>Medianas {assistant.responseLength.medium}%</span>
          <span>Largas {assistant.responseLength.long}%</span>
        </div>
      </div>

      <button
        onClick={onTrain}
        className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-lg font-medium text-sm transition"
      >
        Abrir Entrenamiento
      </button>
    </div>
  );
}