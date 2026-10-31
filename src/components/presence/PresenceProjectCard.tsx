"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { LocalizedProjectItem } from "@/data/projectsData";

interface PresenceProjectCardProps {
  projects: LocalizedProjectItem[];
  regionName: string;
  isRtl?: boolean;
}

export default function PresenceProjectCard({
  projects,
  regionName,
  isRtl = false,
}: PresenceProjectCardProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  // Status text color helper
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ongoing":
      case "قيد التنفيذ":
        return "text-emerald-600";
      case "completed":
      case "مكتمل":
        return "text-blue-600";
      case "planning":
      case "قيد التخطيط":
        return "text-amber-600";
      default:
        return "text-emerald-600";
    }
  };

  return (
    <div className="w-full">
      {/* Header: region name + project count */}
      <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="w-5 h-5 text-secondary shrink-0" />
          <h3 className="text-lg sm:text-xl font-bold text-[#001833] tracking-tight truncate">
            {regionName}
          </h3>
        </div>

        <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
          {isRtl
            ? `${projects.length} ${projects.length === 1 ? "مشروع" : "مشاريع"}`
            : `${projects.length} ${projects.length === 1 ? "Project" : "Projects"}`}
        </span>
      </div>

      {/* Grid: 1 col mobile, 2 sm, 3 md, 4 lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden transition-all duration-300"
          >
            {/* Image on top */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Scrim */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"
              />

              {/* Sector pill */}
              {/* <div className="absolute top-3 start-3 z-10">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-primary/90 text-white backdrop-blur-md shadow-sm border border-white/20">
                  {project.sector}
                </span>
              </div> */}
            </div>

            {/* Details below */}
            <div className="flex flex-col flex-1 p-4 sm:p-5">
              <h4 className="text-base font-bold text-[#001833] leading-snug tracking-tight mb-2 line-clamp-2">
                {project.title}
              </h4>

              <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Metrics pushed to the bottom so all cards align */}
              <div className="mt-auto pt-4 border-t border-slate-100">
                <div className="grid grid-cols-3 gap-2 text-start mb-4">
                  <div className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {isRtl ? "القيمة" : "VALUE"}
                    </span>
                    <span className="block text-sm font-bold text-[#001833] truncate">
                      {project.value}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {isRtl ? "السنة" : "YEAR"}
                    </span>
                    <span className="block text-sm font-semibold text-slate-700">
                      {project.year}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {isRtl ? "الحالة" : "STATUS"}
                    </span>
                    <span
                      className={`block text-sm font-bold truncate ${getStatusColor(
                        project.statusText
                      )}`}
                    >
                      {project.statusText}
                    </span>
                  </div>
                </div>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-secondary transition-colors"
                >
                  <span>{isRtl ? "استكشف في المشاريع" : "Explore Portfolio"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}