"use client";

import type { LucideIcon } from "lucide-react";

interface ValueCardProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  barHoverClass: string;
  iconBgClass: string;
}

export default function ValueCard({
  title,
  desc,
  icon: Icon,
  barHoverClass,
  iconBgClass,
}: ValueCardProps) {
  return (
    <div className="group w-full lg:hover:shadow-[inset_0_0_30px_rgba(0,0,0,0.06)] duration-400 transition-all cursor-pointer min-h-[240px] md:min-h-[250px] border-b border-e border-gray-200/80 dark:border-white/10 flex justify-between items-start flex-col p-8 bg-white dark:bg-card relative">
      {/* Top indicator bar (expands & turns colored on hover, matching home service cards) */}
      <div className="w-full">
        <div
          className={`w-[15%] group-hover:w-[35%] ${barHoverClass} duration-400 transition-all rounded-full h-1 bg-gray-400/30 mb-5`}
        />

        <h3 className="text-2xl lg:text-3xl font-medium text-light-black dark:text-white mb-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 pe-6">
          {desc}
        </p>
      </div>

      {/* 45-degree rotated diamond icon badge at bottom-right (matching home service card) */}
      <div className="flex relative z-10 justify-end items-center w-full mt-4">
        <div
          className={`w-14 h-14 sm:w-15 sm:h-15 absolute -top-5 sm:-top-6 rotate-45 flex items-center ${iconBgClass} justify-center transition-transform duration-300 group-hover:scale-110 end-0 shadow-sm`}
        >
          <Icon
            className="text-white -rotate-45"
            size={28}
            strokeWidth={1.5}
          />
        </div>
      </div>
    </div>
  );
}
