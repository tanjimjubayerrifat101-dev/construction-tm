"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SAUDI_REGIONS } from "@/data/saudiMapData";
import { PROJECTS_LIST, getLocalizedProject, type ProjectItem } from "@/data/projectsData";
import SaudiArabiaMap from "./SaudiArabiaMap";
import PresenceRegionTabs from "./PresenceRegionTabs";
import PresenceActivitiesOverview from "./PresenceActivitiesOverview";
import PresenceProjectCard from "./PresenceProjectCard";
import PresenceEmptyCard from "./PresenceEmptyCard";

interface PresenceSectionProps {
  isRtl?: boolean;
}

export default function PresenceSection({ isRtl = false }: PresenceSectionProps) {
  const t = useTranslations("Presence");
  // selectedRegionId: null = "all" / overview, or a specific region ID like "eastern-province", "riyadh", etc.
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);

  // Handle region selection from map, tabs or overview list
  const handleSelectRegion = (regionId: string) => {
    if (regionId === "all") {
      setSelectedRegionId(null);
    } else {
      setSelectedRegionId(regionId);
    }
  };

  const handleReset = () => {
    setSelectedRegionId(null);
  };

  // Find currently selected region data
  const selectedRegion = selectedRegionId
    ? SAUDI_REGIONS.find((r) => r.id === selectedRegionId)
    : null;

  // Retrieve projects for this region
  const regionProjects = selectedRegion
    ? selectedRegion.projectIds
        .map((id) => PROJECTS_LIST.find((p) => p.id === id))
        .filter((p): p is ProjectItem => Boolean(p))
        .map((p) => getLocalizedProject(p, isRtl))
    : [];

  const regionDisplayName = selectedRegion
    ? isRtl
      ? selectedRegion.nameAr
      : selectedRegion.name
    : "";

  return (
    <section className="container mx-auto py-12 sm:py-16 lg:py-20">
      {/* 1. Header with Eyebrow & Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-[2px] bg-secondary" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary">
            {t("eyebrow")}
          </span>
          <span className="w-8 h-[2px] bg-secondary" />
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001833] tracking-tight mb-4">
          {t("heading")}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          {t("subheading")}
        </p>
      </div>

      {/* 2. Region Tabs */}
      <PresenceRegionTabs
        selectedRegionId={selectedRegionId}
        onSelectRegion={handleSelectRegion}
        isRtl={isRtl}
      />

      {/* 3. Map (larger) + Overview (smaller) side by side on desktop, stacked on small screens */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 mb-12 sm:mb-16">
        {/* Map: larger share on desktop, full width on small screens */}
        <div className="relative w-full lg:flex-[1.6] min-w-0 rounded-3xl bg-gradient-to-b from-slate-50/90 via-slate-50/50 to-white border border-slate-200/80 shadow-xs p-4 sm:p-8 lg:p-10 overflow-hidden">
          {/* Subtle decorative grid background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 65, 135, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 65, 135, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: "28px 28px",
            }}
          />

          <SaudiArabiaMap
            selectedRegionId={selectedRegionId}
            onSelectRegion={handleSelectRegion}
            hoveredRegionId={hoveredRegionId}
            onHoverRegion={setHoveredRegionId}
            isRtl={isRtl}
          />
        </div>

        {/* Overview: smaller share on desktop, full width below the map on small screens */}
        <div className="w-full lg:flex-1 min-w-0">
          <PresenceActivitiesOverview
            onSelectRegion={handleSelectRegion}
            onHoverRegion={setHoveredRegionId}
            isRtl={isRtl}
          />
        </div>
      </div>

      {/* 4. Project card / empty card stays below */}
      <div className="w-full">
        {selectedRegion && selectedRegion.hasProjects && (
          <PresenceProjectCard
            projects={regionProjects}
            regionName={regionDisplayName}
            isRtl={isRtl}
          />
        )}

        {selectedRegion && !selectedRegion.hasProjects && (
          <PresenceEmptyCard
            regionName={regionDisplayName}
            onReset={handleReset}
            isRtl={isRtl}
          />
        )}
      </div>
    </section>
  );
}