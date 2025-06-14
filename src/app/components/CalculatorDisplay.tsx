"use client";

import { useEffect, useRef } from "react";

interface CalculatorDisplayProps {
  value: string;
  history?: string;
  className?: string;
}

export default function CalculatorDisplay({
  value,
  history,
  className = "",
}: CalculatorDisplayProps) {
  const displayRef = useRef<HTMLDivElement>(null);

  // Автоматическое масштабирование текста при переполнении
  useEffect(() => {
    const display = displayRef.current;
    if (!display) return;

    const resizeText = () => {
      const containerWidth = display.clientWidth;
      const textWidth = display.scrollWidth;
      
      if (textWidth > containerWidth) {
        const scale = Math.min(1, containerWidth / textWidth * 0.9);
        display.style.transform = `scale(${scale})`;
      } else {
        display.style.transform = "scale(1)";
      }
    };

    resizeText();
    window.addEventListener("resize", resizeText);
    
    return () => {
      window.removeEventListener("resize", resizeText);
    };
  }, [value]);

  return (
    <div className={`flex flex-col items-end p-4 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden ${className}`}>
      {history && (
        <div className="text-gray-500 dark:text-gray-400 text-sm min-h-[20px] mb-1">
          {history}
        </div>
      )}
      <div 
        ref={displayRef}
        className="text-3xl font-semibold text-gray-800 dark:text-white transition-transform duration-100 origin-right whitespace-nowrap"
      >
        {value || "0"}
      </div>
    </div>
  );
}