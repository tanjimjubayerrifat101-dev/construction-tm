"use client";

import { REGION_TABS, SAUDI_REGIONS } from "@/data/saudiMapData";

interface PresenceRegionTabsProps {
  selectedRegionId: string | null;
  onSelectRegion: (regionId: string) => void;
  isRtl?: boolean;
}

export default function PresenceRegionTabs({
  selectedRegionId,
  onSelectRegion,
  isRtl = false,
}: PresenceRegionTabsProps) {
  return (
    <div className="w-full mb-8 sm:mb-12 relative">
      <div
        className="flex flex-nowrap items-center gap-2 sm:gap-2.5 px-2 py-2 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {REGION_TABS.map((tab) => {
          const isActive =
            (selectedRegionId === null && tab.id === "all") ||
            selectedRegionId === tab.id;

          const region = SAUDI_REGIONS.find((r) => r.id === tab.id);
          const hasProjects = tab.id === "all" || region?.hasProjects;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectRegion(tab.id)}
              className={`
                group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap
                transition-all duration-200 cursor-pointer select-none border shrink-0
                ${
                  isActive
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200/90 hover:border-slate-300 shadow-xs"
                }
              `}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                  isActive
                    ? "bg-white"
                    : hasProjects
                    ? "bg-secondary"
                    : "bg-slate-300"
                }`}
              />

              <span>{isRtl ? tab.labelAr : tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}