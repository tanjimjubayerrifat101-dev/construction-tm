"use client";

import { useState } from "react";
import { SAUDI_REGIONS, SAUDI_MAP_VIEWBOX, type SaudiRegion } from "@/data/saudiMapData";

interface SaudiArabiaMapProps {
  selectedRegionId: string | null;
  onSelectRegion: (regionId: string) => void;
  hoveredRegionId: string | null;
  onHoverRegion: (regionId: string | null) => void;
  isRtl?: boolean;
}

export default function SaudiArabiaMap({
  selectedRegionId,
  onSelectRegion,
  hoveredRegionId,
  onHoverRegion,
  isRtl = false,
}: SaudiArabiaMapProps) {
  const [internalHover, setInternalHover] = useState<string | null>(null);

  const activeHover = hoveredRegionId ?? internalHover;
  const hoveredRegion = SAUDI_REGIONS.find((r) => r.id === activeHover);

  return (
    <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center p-2 sm:p-6 select-none">
      {/* Ambient background glow effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-radial from-secondary/10 via-transparent to-transparent blur-3xl pointer-events-none"
      />

      <div className="relative w-full aspect-[860/723] max-h-[640px]">
        <svg
          viewBox={SAUDI_MAP_VIEWBOX}
          className="w-full h-full drop-shadow-xl transition-all duration-300"
          style={{ filter: "drop-shadow(0 14px 28px rgba(0, 30, 65, 0.08))" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Filter for smooth pin drop shadow */}
            <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#001833" floodOpacity="0.25" />
            </filter>

            {/* Linear gradient for active region */}
            <linearGradient id="activeRegionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>

            {/* Hover gradient for regions with projects */}
            <linearGradient id="hoverRegionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>

          {/* Region Paths */}
          <g stroke="#FFFFFF" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
            {SAUDI_REGIONS.map((region) => {
              const isSelected = selectedRegionId === region.id;
              const isHovered = activeHover === region.id;

              // Color resolution matching the reference images:
              // 1. Selected: Deep royal blue (#2563eb / #1d4ed8)
              // 2. Hovered with projects: Bright vibrant blue (#3b82f6)
              // 3. Hovered with NO projects: Dark muted slate (#52637a) (Image 4!)
              // 4. Default with projects: Soft sky light blue (#bfd7ed) (Image 1!)
              // 5. Default with NO projects: Lighter subtle slate blue (#dce4ec)
              let fillColor = "#DCE4EC";
              if (isSelected) {
                fillColor = "url(#activeRegionGradient)";
              } else if (isHovered) {
                fillColor = region.hasProjects ? "url(#hoverRegionGradient)" : "#52637A";
              } else if (region.hasProjects) {
                fillColor = "#BFD7ED";
              }

              return (
                <path
                  key={region.id}
                  id={`region-${region.id}`}
                  d={region.path}
                  fill={fillColor}
                  className="transition-colors duration-250 cursor-pointer outline-hidden"
                  onClick={() => onSelectRegion(region.id)}
                  onMouseEnter={() => {
                    setInternalHover(region.id);
                    onHoverRegion(region.id);
                  }}
                  onMouseLeave={() => {
                    setInternalHover(null);
                    onHoverRegion(null);
                  }}
                  style={{
                    transformOrigin: `${region.pin.x}px ${region.pin.y}px`,
                  }}
                />
              );
            })}
          </g>

          {/* Interactive Map Pins for regions with projects */}
          {SAUDI_REGIONS.filter((r) => r.hasProjects).map((region) => {
            const isSelected = selectedRegionId === region.id;
            const isHovered = activeHover === region.id;

            return (
              <g
                key={`pin-${region.id}`}
                className="cursor-pointer transition-transform duration-200"
                style={{
                  transformOrigin: `${region.pin.x}px ${region.pin.y}px`,
                  transform: isHovered || isSelected ? "scale(1.2)" : "scale(1)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRegion(region.id);
                }}
                onMouseEnter={() => {
                  setInternalHover(region.id);
                  onHoverRegion(region.id);
                }}
                onMouseLeave={() => {
                  setInternalHover(null);
                  onHoverRegion(null);
                }}
              >
                {/* Clickable hit area */}
                <circle cx={region.pin.x} cy={region.pin.y} r={18} fill="transparent" />

                {/* Selected state: White outer ring with dark core (matching Image 3!) */}
                {isSelected ? (
                  <>
                    <circle
                      cx={region.pin.x}
                      cy={region.pin.y}
                      r={10}
                      fill="#FFFFFF"
                      filter="url(#pin-shadow)"
                    />
                    <circle
                      cx={region.pin.x}
                      cy={region.pin.y}
                      r={6}
                      fill="#0F172A"
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                    />
                  </>
                ) : (
                  /* Standard / Hover pin: Blue core with white ring (matching Image 1!) */
                  <>
                    {/* Subtle pulse ring on hover */}
                    {isHovered && (
                      <circle
                        cx={region.pin.x}
                        cy={region.pin.y}
                        r={12}
                        fill="#2563EB"
                        opacity={0.25}
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={region.pin.x}
                      cy={region.pin.y}
                      r={6.5}
                      fill="#FFFFFF"
                      filter="url(#pin-shadow)"
                    />
                    <circle
                      cx={region.pin.x}
                      cy={region.pin.y}
                      r={4.2}
                      fill={isHovered ? "#2563EB" : "#1E40AF"}
                    />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip matching Image 2 & Image 4 */}
        {hoveredRegion && (
          <div
            className="absolute pointer-events-none z-30 transition-all duration-200 -translate-x-1/2 -translate-y-full mb-3"
            style={{
              left: `${(hoveredRegion.pin.x / 860) * 100}%`,
              top: `${(hoveredRegion.pin.y / 723) * 100}%`,
            }}
          >
            <div className="relative bg-[#001833] text-white px-4 py-2 rounded-xl shadow-2xl border border-white/10 whitespace-nowrap text-center">
              <span className="block text-xs sm:text-sm font-bold text-white tracking-wide">
                {isRtl ? hoveredRegion.nameAr : hoveredRegion.name}
              </span>

              <span
                className={`block text-[11px] font-medium mt-0.5 ${
                  hoveredRegion.hasProjects ? "text-sky-300" : "text-slate-400"
                }`}
              >
                {hoveredRegion.hasProjects
                  ? isRtl
                    ? `${hoveredRegion.defaultSectorAr} · ${hoveredRegion.defaultStatusAr}`
                    : `${hoveredRegion.defaultSector} · ${hoveredRegion.defaultStatus}`
                  : isRtl
                  ? "لا توجد مشاريع نشطة"
                  : "No active projects"}
              </span>

              {/* Tooltip downward pointer triangle */}
              <div
                aria-hidden="true"
                className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#001833]"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
