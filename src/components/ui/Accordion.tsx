"use client";

import { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-text-primary hover:text-gold transition-colors"
      >
        {title}
        <svg
          className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[300px] pb-4" : "max-h-0"
        }`}
      >
        <div className="text-sm text-text-muted leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
