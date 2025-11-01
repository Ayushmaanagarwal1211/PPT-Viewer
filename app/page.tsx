"use client";

import React, { useState } from "react";
import { Message, Presentation, ThoughtStep } from "@/types";
import ChatHistory from "@/components/ChatHistory";
import PresentationViewer from "@/components/PresentationViewer";
import Thoughts from "@/components/Thoughts";
import { downloadPPT } from "@/lib/pptGenerator";
import { Send } from "lucide-react";

export default function Home() {
  // For demo, use a static username. Replace with auth if needed.
  const username = "piyuindia4";
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [thoughts, setThoughts] = useState<ThoughtStep[]>([]);

  const addMessage = (role: "user" | "assistant", content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const generatePresentation = async (
    prompt: string,
    isEdit: boolean = false
  ) => {
    setIsLoading(true);

    // Show thoughts
    const thoughtSteps: ThoughtStep[] = [
      {
        id: "1",
        title: isEdit ? "Understanding edit request" : "Searching the web",
        description: isEdit
          ? "Analyzing your edit instructions..."
          : "Gathering information to create a comprehensive presentation...",
        status: "in-progress",
      },
      {
        id: "2",
        title: isEdit ? "Updating slides" : "Reading website",
        description: isEdit
          ? "Modifying the presentation based on your request..."
          : "Extracting relevant content from sources...",
        status: "pending",
      },
      {
        id: "3",
        title: "Generating presentation",
        description: "Creating slides with proper structure...",
        status: "pending",
      },
    ];

    setThoughts(thoughtSteps);

    try {
      // Step 1
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setThoughts((prev) =>
        prev.map((step, i) =>
          i === 0 ? { ...step, status: "completed" } : step
        )
      );

      // Step 2
      setThoughts((prev) =>
        prev.map((step, i) =>
          i === 1 ? { ...step, status: "in-progress" } : step
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setThoughts((prev) =>
        prev.map((step, i) =>
          i === 1 ? { ...step, status: "completed" } : step
        )
      );

      // Step 3
      setThoughts((prev) =>
        prev.map((step, i) =>
          i === 2 ? { ...step, status: "in-progress" } : step
        )
      );

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          currentPresentation: isEdit ? presentation : null,
          action: isEdit ? "edit" : "create",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate presentation");
      }

      const data = await response.json();
      setPresentation(data.presentation);

      setThoughts((prev) =>
        prev.map((step, i) =>
          i === 2 ? { ...step, status: "completed" } : step
        )
      );

      addMessage(
        "assistant",
        isEdit
          ? "I've updated your presentation based on your request. You can preview it on the right and download it when ready."
          : `I've created a presentation titled "${data.presentation.title}" with ${data.presentation.slides.length} slides. You can preview it on the right and download it when ready.`
      );

      // Clear thoughts after a delay
      setTimeout(() => setThoughts([]), 3000);
    } catch (error) {
      console.error("Error:", error);
      addMessage(
        "assistant",
        "Sorry, I encountered an error while generating the presentation. Please try again."
      );
      setThoughts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userPrompt = inputValue.trim();
    setInputValue("");
    addMessage("user", userPrompt);

    const isEdit = presentation !== null;
    await generatePresentation(userPrompt, isEdit);
  };

  const handleDownload = async () => {
    if (!presentation) return;

    setIsDownloading(true);
    try {
      await downloadPPT(presentation);
      addMessage(
        "assistant",
        "Your presentation has been downloaded successfully!"
      );
    } catch (error) {
      console.error("Error downloading presentation:", error);
      addMessage(
        "assistant",
        "Sorry, there was an error downloading the presentation."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Chat Section - Animated */}
      <div
        className={`flex flex-col transition-all duration-500 ease-out ${
          presentation ? "w-1/2" : "w-full"
        } bg-white border-r border-gray-200`}
      >
        {/* Header */}
        <div className="px-6 py-8 border-b border-gray-200 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hello, {username}!
          </h1>
          <p className="text-gray-600 text-base">
            What do you want me to generate today?
          </p>
        </div>
        {thoughts.length > 0 && (
          <div className="w-full max-w-lg mx-auto mb-4">
            <Thoughts steps={thoughts} />
          </div>
        )}
        <div className="w-full flex-1 flex flex-col justify-end">
          <ChatHistory messages={messages} />
        </div>
        {/* Chat input box */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-2xl px-5 py-4 focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-300 transition">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none mr-4 flex-shrink-0"
              disabled
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21.44 11.05 12.99 19.5a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 1 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Start with a topic, we'll turn it into slides!"
              className="flex-1 bg-transparent border-none outline-none text-gray-700 text-sm placeholder-gray-400"
              disabled={isLoading}
            />

            <button
              onClick={handleSubmit}
              disabled={isLoading || !inputValue.trim()}
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col transition-all duration-500 ease-out overflow-hidden ${
          presentation ? "w-1/2 opacity-100 translate-x-0" : "w-0 opacity-0"
        }`}
      >
        {presentation && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-white rounded-2xl shadow-xl px-6 py-8 h-full min-h-[420px] flex flex-col">
              <PresentationViewer
                presentation={presentation}
                onDownload={handleDownload}
                isDownloading={isDownloading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
