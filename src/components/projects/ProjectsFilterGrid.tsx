"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import {
  PROJECT_SECTORS,
  PROJECTS_LIST,
  getLocalizedProject,
  type ProjectSectorSlug,
} from "@/data/projectsData";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface ProjectsFilterGridProps {
  isRtl?: boolean;
}

const ITEMS_PER_PAGE = 12;

export default function ProjectsFilterGrid({
  isRtl = false,
}: ProjectsFilterGridProps) {
  const t = useTranslations("ProjectsPage");
  const [activeSector, setActiveSector] = useState<ProjectSectorSlug>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter projects by active sector
  const filteredProjects =
    activeSector === "all"
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) => p.sectorSlug === activeSector);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const localizedProjects = displayedProjects.map((project) =>
    getLocalizedProject(project, isRtl)
  );

  const handleSectorChange = (slug: ProjectSectorSlug) => {
    setActiveSector(slug);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.getElementById("all-projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Generate page numbers array for pagination
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section id="all-projects" className="container mb-24 lg:mb-32 scroll-mt-28">
      {/* Header and Filter Tabs */}
      <div className="flex flex-col  gap-6 mb-10 pb-6 border-b border-slate-200/80">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center w-full gap-2 mb-2">
            <span className="w-8 h-[2px] bg-secondary" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary">
              {isRtl ? "كافة المشاريع" : "ALL PROJECTS"}
            </span>
            <span className="w-8 h-[2px] bg-secondary" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001833] tracking-tight">
            {isRtl ? "استكشف المشاريع حسب القطاع" : "Filter the portfolio by sector"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
              {isRtl ? "ضبط عامل التصفية حسب المحفظة" : "Set filter by portfolio"}
            </p>
        </div>

        {/* Sector Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
          {PROJECT_SECTORS.map((sector) => {
            const isActive = activeSector === sector.slug;
            return (
              <button
                key={sector.slug}
                type="button"
                onClick={() => handleSectorChange(sector.slug)}
                className={`
                  px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap
                  transition-colors duration-200 cursor-pointer select-none border shrink-0
                  ${
                    isActive
                      ? "bg-primary border-primary text-white"
                      : "bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200"
                  }
                `}
              >
                {isRtl ? sector.labelAr : sector.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Modern Projects Grid (4 columns on 2xl devices as requested) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8">
        {localizedProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-2xl hover:border-slate-300 transition-all duration-500 hover:-translate-y-1.5 select-none"
          >
            {/* Taller Card Image Container with smooth hover zoom */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1536px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Scrims for contrast */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none"
              />

              {/* Top Sector Category Pill (Status badge removed as requested) */}
              {/* <div className="absolute top-3.5 start-3.5 z-10">
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-xs">
                  {project.sector}
                </span>
              </div> */}

              {/* Bottom Location Pin */}
              <div className="absolute bottom-3.5 start-3.5 z-10 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/95 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>{project.location}</span>
              </div>
            </div>

            {/* Card Content with Refined Font Size */}
            <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#001833] group-hover:text-secondary transition-colors duration-200 leading-snug mb-2.5 line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Redesigned Sleek Metrics & Progress Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {t("value")}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#001833]">
                      {project.value}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {t("year")}
                    </span>
                    <span className="text-base sm:text-lg font-semibold text-slate-700">
                      {project.year}
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {t("progress")}
                    </span>
                    <span
                      className={`text-base sm:text-lg font-bold ${
                        project.progress === 100 ? "text-emerald-600" : "text-secondary"
                      }`}
                    >
                      {project.progress}%
                    </span>
                  </div>
                </div>

                {/* Refined Slim Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      project.progress === 100
                        ? "bg-emerald-500"
                        : "bg-gradient-to-r from-primary to-secondary"
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shadcn Pagination: displayed when total items exceed 12 */}
      {filteredProjects.length > ITEMS_PER_PAGE && totalPages > 1 && (
        <div className="mt-12 sm:mt-16 flex justify-center">
          <Pagination>
            <PaginationContent className="gap-1 sm:gap-2">
              {/* Previous Button */}
              <PaginationItem>
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-primary hover:border-secondary hover:text-secondary hover:bg-secondary/5 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                  <span className="hidden sm:inline">
                    {isRtl ? "السابق" : "Previous"}
                  </span>
                </button>
              </PaginationItem>

              {/* Page Numbers */}
              {getPageNumbers().map((p, idx) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(p as number);
                      }}
                      href="#"
                      className={`h-11 w-11 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                        p === currentPage
                          ? "bg-primary text-white border-primary shadow-[0_4px_14px_rgba(0,65,135,0.25)] scale-105"
                          : "bg-white text-slate-700 border-slate-200 hover:border-secondary hover:text-secondary hover:bg-secondary/5"
                      }`}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              {/* Next Button */}
              <PaginationItem>
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-primary hover:border-secondary hover:text-secondary hover:bg-secondary/5 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
                >
                  <span className="hidden sm:inline">
                    {isRtl ? "التالي" : "Next"}
                  </span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}
