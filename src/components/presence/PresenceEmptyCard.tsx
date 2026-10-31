"use client";

import { MapPin, Globe } from "lucide-react";

interface PresenceEmptyCardProps {
  regionName: string;
  onReset: () => void;
  isRtl?: boolean;
}

export default function PresenceEmptyCard({
  regionName,
  onReset,
  isRtl = false,
}: PresenceEmptyCardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-md p-8 sm:p-14 text-center transition-all duration-300">
      {/* Circular Pin Icon Badge (matching Image 4) */}
      <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200/60 flex items-center justify-center mx-auto mb-5 text-slate-400 shadow-2xs">
        <MapPin className="w-7 h-7 text-slate-400" />
      </div>

      {/* Region Subtitle in Blue (matching Image 4) */}
      <span className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-primary mb-2">
        {regionName}
      </span>

      {/* Heading (matching Image 4) */}
      <h3 className="text-2xl sm:text-3xl font-bold text-[#001833] tracking-tight mb-3">
        {isRtl ? "لا توجد مشاريع نشطة بعد" : "No active projects yet"}
      </h3>

      {/* Description (matching Image 4) */}
      <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto leading-relaxed mb-8">
        {isRtl
          ? "ليس لدينا مشاريع منشورة في هذه المنطقة في الوقت الحالي. استكشف المناطق الأخرى على الخريطة."
          : "We have no published projects in this region at the moment. Explore other regions on the map."}
      </p>

      {/* Action Button */}
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors duration-200 cursor-pointer"
        >
          <Globe className="w-4 h-4 text-primary" />
          <span>{isRtl ? "عرض نظرة عامة على المناطق" : "View Region Overview"}</span>
        </button>
      </div>
    </div>
  );
}
