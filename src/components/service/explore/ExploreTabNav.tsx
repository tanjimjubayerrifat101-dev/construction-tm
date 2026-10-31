"use client";

import { useLocale } from "next-intl";
import { getLocalizedService, type ServiceItemData } from "@/data/servicesData";

interface ExploreTabNavProps {
  services: ServiceItemData[];
  activeIndex: number;
  onSelectTab: (index: number) => void;
}

export default function ExploreTabNav({
  services,
  activeIndex,
  onSelectTab,
}: ExploreTabNavProps) {
  const isRtl = useLocale() === "ar";

  return (
    <div className="w-full mb-10 lg:mb-12">
      {/* Pill Navigation Tabs Bar */}
      <div className="relative w-full">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth">
          {services.map((service, index) => {
            const localizedService = getLocalizedService(service, isRtl);
            const Icon = localizedService.icon;
            const isActive = index === activeIndex;

            return (
              <button
                key={localizedService.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`service-panel-${localizedService.id}`}
                id={`service-tab-${localizedService.id}`}
                onClick={() => onSelectTab(index)}
                className={`
                  relative flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold
                  whitespace-nowrap transition-colors duration-200 ease-out cursor-pointer select-none shrink-0 border
                  ${
                    isActive
                      ? "bg-primary border-primary text-white"
                      : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200"
                  }
                `}
              >
                <Icon
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-slate-500"
                  }`}
                  strokeWidth={2}
                />
                <span>{localizedService.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
