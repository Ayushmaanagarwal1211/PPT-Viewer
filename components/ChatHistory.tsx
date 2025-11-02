"use client";

import { Message } from "@/types";

interface ChatHistoryProps {
  messages: Message[];
}

export default function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="flex-1 overflow-y-auto px-2 py-2 md:px-4 md:py-4 space-y-4 w-full">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400 select-none">
          <p className="text-lg font-semibold mb-2">
            Start a conversation to generate your presentation
          </p>
          <p className="text-sm">
            Try:
            <span className="italic text-gray-500">
              Create a presentation about Artificial Intelligence
            </span>
          </p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-3 shadow-sm text-base md:text-sm ${
                message.role === "user"
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-gray-100 text-gray-800 rounded-bl-md"
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
              <p className="text-xs mt-1 opacity-60 text-right">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
