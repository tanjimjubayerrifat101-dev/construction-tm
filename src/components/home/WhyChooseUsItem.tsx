"use client";

import { useRef, MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";

interface ItemProps {
  title: string;
  description: string;
}

export default function WhyChooseUsItem({ title, description }: ItemProps) {
  const rowRef = useRef<HTMLDivElement>(null);

    const local = useLocale();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rowRef.current.style.setProperty("--mx", `${x}px`);
    rowRef.current.style.setProperty("--my", `${y}px`);
  };

  return (
    <div
      ref={rowRef}
      onMouseMove={handleMouseMove}
      className="why-list-row group relative flex items-center justify-between py-6 lg:py-8 border-b border-primary/20 cursor-pointer overflow-hidden transition-all duration-500"
    >
      {/* Background Spotlight Glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle 120px at var(--mx, 50%) var(--my, 50%), var(--color-secondary), transparent)"
        }}
      />
      
      {/* Accent Line */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-secondary w-0 group-hover:w-full transition-all duration-700 ease-out" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-2 transform transition-transform duration-500 group-hover:translate-x-3 pr-4">
        <h4 className="row-title text-lg lg:text-xl font-bold text-foreground">
          {title}
        </h4>
        <p className="row-desc text-[15px] text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Arrow Button */}
      <div className="row-arrow relative z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-primary/30 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-secondary group-hover:border-secondary group-hover:-rotate-45">
        <ArrowRight className={`w-5 h-5 text-primary group-hover:text-white transition-colors duration-500 ${local === "en" ? "rotate-0" :"rotate-180"}`} />
      </div>
    </div>
  );
}
