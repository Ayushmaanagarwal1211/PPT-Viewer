"use client";

import { ThoughtStep } from "@/types";
import { CheckCircle2, Circle, Loader2, Sparkles } from "lucide-react";

interface ThoughtsProps {
  steps: ThoughtStep[];
}

export default function Thoughts({ steps }: ThoughtsProps) {
  if (steps.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 mb-4 border border-purple-100 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-950">Thoughts</h3>
      </div>

      <div className="space-y-4 relative">
        <div className="absolute left-2.5 top-10 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 to-purple-100" />

        {steps.map((step) => (
          <div key={step.id} className="flex items-start gap-4 relative z-10">
            <div className="mt-0.5 flex-shrink-0">
              {step.status === "completed" ? (
                <div className="p-0.5 bg-green-50 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              ) : step.status === "in-progress" ? (
                <div className="p-0.5 bg-purple-50 rounded-full">
                  <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
                </div>
              ) : (
                <div className="p-0.5 bg-gray-50 rounded-full">
                  <Circle className="w-5 h-5 text-gray-300" />
                </div>
              )}
            </div>

            <div className="flex-1 pt-0.5">
              <div
                className={`p-3 rounded-lg transition-all ${
                  step.status === "in-progress"
                    ? "bg-purple-50 border border-purple-200"
                    : step.status === "completed"
                    ? "bg-green-50 border border-green-100"
                    : "bg-gray-50 border border-gray-100"
                }`}
              >
                <p
                  className={`font-medium text-sm ${
                    step.status === "in-progress"
                      ? "text-purple-950"
                      : step.status === "completed"
                      ? "text-green-950"
                      : "text-gray-700"
                  }`}
                >
                  {step.title}
                </p>
                <p
                  className={`text-xs/relaxed mt-1 ${
                    step.status === "in-progress"
                      ? "text-purple-700"
                      : step.status === "completed"
                      ? "text-green-700"
                      : "text-gray-500"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>

            {step.status === "completed" && (
              <div className="text-xs/relaxed font-medium text-green-600 mt-1 flex-shrink-0">
                Done
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
