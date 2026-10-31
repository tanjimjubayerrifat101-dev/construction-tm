"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { FLAGSHIP_PROJECT, getLocalizedProject } from "@/data/projectsData";

interface FlagshipProjectProps {
  isRtl?: boolean;
}

export default function FlagshipProject({ isRtl = false }: FlagshipProjectProps) {
  const t = useTranslations("ProjectsPage");
  const project = getLocalizedProject(FLAGSHIP_PROJECT, isRtl);

  return (
    <section className="container mb-20 lg:mb-28">
      {/* Section Eyebrow Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-[2px] bg-secondary" />
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary">
          {isRtl ? "المشاريع الكبرى" : "FLAGSHIP DELIVERY"}
        </span>
      </div>

      {/* Modern Split Feature Card */}
      <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Image Column */}
          <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-slate-900">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            {/* Dark gradient scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"
            />

            {/* Badges on Image - status badge removed */}
            {/* <div className="absolute top-5 start-5 z-10">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#001833]/85 text-white backdrop-blur-md border border-white/20">
                {project.sector}
              </span>
            </div> */}

            {/* Location on Image Bottom */}
            <div className="absolute bottom-5 start-5 flex items-center gap-1.5 text-xs font-medium text-white/90 z-10 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>{project.location}</span>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-6 p-8 sm:p-10 lg:p-14 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#001833] leading-snug mb-4">
                {project.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-8">
                {project.description}
              </p>
            </div>

            {/* Metrics & Live Progress */}
            <div className="pt-6 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    {t("value")}
                  </span>
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-[#001833]">
                    {project.value}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    {t("year")}
                  </span>
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-[#001833]">
                    {project.year}
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    {t("progress")}
                  </span>
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-secondary">
                    {project.progress}%
                  </span>
                </div>
              </div>

              {/* Sleek Progress Bar */}
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
