"use client";

import React, { useEffect } from "react";
import { Presentation } from "@/types";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

interface PresentationViewerProps {
  presentation: Presentation | null;
  onDownload: () => void;
  isDownloading: boolean;
}

export default function PresentationViewer({
  presentation,
  onDownload,
  isDownloading,
}: PresentationViewerProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  if (!presentation) {
    return (
      <div className="flex items-center justify-center h-full text-gray-300 select-none">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">
            No presentation generated yet
          </p>
          <p className="text-sm">
            Type a topic and press <span className="font-bold">Send</span> to
            get started!
          </p>
        </div>
      </div>
    );
  }

  const totalSlides = presentation.slides.length;
  const slide = presentation.slides[currentSlide];

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlide, totalSlides]);

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border-b bg-white border-gray-200">
        <div className="flex-1 mb-4 sm:mb-0">
          <h2 className="font-semibold text-gray-900 text-xl md:text-2xl">
            {presentation.title}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            {totalSlides} slide{totalSlides !== 1 ? "s" : ""} • Slide{" "}
            {currentSlide + 1} of {totalSlides}
          </p>
        </div>
        <button
          onClick={onDownload}
          disabled={isDownloading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 md:px-6 py-2 md:py-2.5 rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-medium text-sm md:text-base"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? "Downloading..." : "Download"}
        </button>
      </div>

      {/* Slide Viewer */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto flex items-center justify-center">
        <div className="w-full max-w-5xl">
          <div
            className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-center"
            style={{
              aspectRatio: "16/9",
              backgroundColor: slide.backgroundColor || "#FFFFFF",
            }}
          >
            {slide.layout === "title" ? (
              <div className="flex flex-col items-center justify-center h-full px-8 md:px-16 py-12 text-center space-y-6">
                <div className="space-y-4">
                  <h1
                    className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
                      slide.backgroundColor === "#0F172A"
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {slide.title}
                  </h1>
                  {slide.content[0] && (
                    <p
                      className={`text-xl md:text-2xl lg:text-3xl font-light ${
                        slide.backgroundColor === "#0F172A"
                          ? "text-gray-200"
                          : "text-gray-600"
                      }`}
                    >
                      {slide.content[0]}
                    </p>
                  )}
                </div>
                <div
                  className={`w-24 h-1 rounded-full ${
                    slide.backgroundColor === "#0F172A"
                      ? "bg-blue-400"
                      : "bg-blue-600"
                  }`}
                />
              </div>
            ) : (
              <div className="h-full px-8 md:px-14 py-10 md:py-14 flex flex-col justify-center overflow-hidden">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-10 md:mb-12">
                  {slide.title}
                </h2>
                <ul className="space-y-5 md:space-y-6">
                  {slide.content.map((item, index) => (
                    <li key={index} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-3 group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="px-4 md:px-8 py-6 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto flex flex-col space-y-4">
          {/* Slide Indicators */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {presentation.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "w-8 h-3 bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="group flex items-center gap-2 px-4 md:px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 font-medium text-sm"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Previous
            </button>

            <div className="px-3 md:px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm md:text-base font-semibold text-blue-700">
                {currentSlide + 1} / {totalSlides}
              </span>
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="group flex items-center gap-2 px-4 md:px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white rounded-lg disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-medium text-sm"
            >
              Next
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-xs text-gray-400">
            💡 Use arrow keys or buttons to navigate slides
          </p>
        </div>
      </div>
    </div>
  );
}
