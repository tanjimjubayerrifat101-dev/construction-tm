"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Briefcase, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CAREER_DEPARTMENTS, JOB_POSITIONS, type JobPosition } from "@/data/careersData";
import FadeUp from "@/utils/FadeUp";
import RollingButton from "@/utils/RollingButton";

type JobWithPurpose = JobPosition & {
  purpose?: { en: string; ar: string };
};

export default function OpenPositionsSection() {
  const t = useTranslations("Careers");
  const locale = useLocale();
  const isAr = locale === "ar";
  const [activeDepartment, setActiveDepartment] = useState<string>("all");
  const [showAllPositions, setShowAllPositions] = useState(false);
  const jobsToggleLabel = showAllPositions
    ? isAr
      ? "عرض أقل"
      : "Show less"
    : isAr
      ? "عرض جميع الوظائف"
      : "View all jobs";

  const filteredPositions = activeDepartment === "all"
    ? JOB_POSITIONS
    : JOB_POSITIONS.filter((pos) => pos.departmentId === activeDepartment);
  const visiblePositions = showAllPositions
    ? filteredPositions
    : filteredPositions.slice(0, 6);

  return (
    <section id="open-positions" className="relative w-full py-16 sm:py-24 bg-slate-50/60 dark:bg-card/40 scroll-mt-24">
      <div className="container relative z-10">
        {/* Section Header (Centered) */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <FadeUp delay={0.1} y={20}>
            <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary mb-3">
              <span className="w-8 h-0.5 bg-secondary" />
              <span>{t("openPositionsEyebrow")}</span>
              <span className="w-8 h-0.5 bg-secondary" />
            </div>
          </FadeUp>

          <FadeUp delay={0.2} y={25}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[120%] mb-3">
              {isAr ? "استكشف الفرص المهنية المناسبة لخبرتك" : "Explore Careers Shaping the Kingdom"}
            </h2>
          </FadeUp>

          <FadeUp delay={0.3} y={20}>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("filterByDept")}
            </p>
          </FadeUp>
        </div>

        {/* Department Filter Tabs */}
        <div className="w-full mb-10 sm:mb-14">
          <div className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth">
            {CAREER_DEPARTMENTS.map((dept) => {
              const Icon = dept.icon;
              const isActive = activeDepartment === dept.id;
              const label = isAr ? dept.ar : dept.en;

              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => {
                    setActiveDepartment(dept.id);
                    setShowAllPositions(false);
                  }}
                  className={`
                    relative flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold
                    whitespace-nowrap transition-all duration-200 ease-out cursor-pointer select-none shrink-0 border
                    ${
                      isActive
                        ? "bg-secondary border-secondary text-white shadow-md shadow-secondary/20 scale-[1.02]"
                        : "bg-white dark:bg-card hover:bg-slate-100 dark:hover:bg-card/80 text-foreground/80 hover:text-foreground border-gray-200 dark:border-white/10 shadow-xs"
                    }
                  `}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isActive ? "text-white" : "text-muted-foreground"
                    }`}
                    strokeWidth={2}
                  />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Job Positions Grid (3 per row) */}
        {filteredPositions.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visiblePositions.map((job, idx) => {
              const title = isAr ? job.title.ar : job.title.en;
              const department = isAr ? job.department.ar : job.department.en;
              const location = isAr ? job.location.ar : job.location.en;
              const empType = isAr ? job.type.ar : job.type.en;
              const purposeObj = (job as JobWithPurpose).purpose;
              const purpose = purposeObj ? (isAr ? purposeObj.ar : purposeObj.en) : department;

              const DeptIcon =
                CAREER_DEPARTMENTS.find((d) => d.id === job.departmentId)?.icon ?? Briefcase;

              return (
                <FadeUp key={job.id} delay={0.06 * (idx % 6)} y={20}>
                  <Link
                    href={`/careers/${job.id}`}
                    className="group flex h-full flex-col rounded-2xl border border-gray-200/90 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-secondary/60 hover:shadow-xl dark:border-white/10 dark:bg-card"
                  >
                    {/* Icon + Title */}
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-white">
                        <DeptIcon className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
                      </span>
                      <h3 className="text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
                        {title}
                      </h3>
                    </div>

                    {/* Purpose */}
                    <div className="mt-5 flex-1">
                      <p className="text-sm font-bold text-foreground">
                        {isAr ? "الغرض من الوظيفة / الهدف" : "Job Purpose / Objective"}
                      </p>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {purpose}
                      </p>
                    </div>

                    {/* Pills + Apply button */}
                    <div className="mt-6 flex items-end justify-between gap-3">
                      <div className="flex min-w-0 flex-col gap-2">
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-500 dark:bg-white/10 dark:text-white/60">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden="true" />
                          <span className="truncate">{location}</span>
                        </span>
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-500 dark:bg-white/10 dark:text-white/60">
                          <Briefcase className="h-3.5 w-3.5 shrink-0 text-secondary" aria-hidden="true" />
                          <span className="truncate">{empType}</span>
                        </span>
                      </div>

                      <span className="shrink-0 rounded-full border border-secondary px-5 py-2.5 text-sm font-semibold text-secondary transition-colors duration-200 group-hover:bg-secondary group-hover:text-white">
                        {isAr ? "قدّم الآن" : "Apply Now"}
                      </span>
                    </div>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-card rounded-2xl border border-gray-200 dark:border-white/10">
            <p className="text-muted-foreground text-base">
              {isAr ? "لا توجد وظائف شاغرة حالياً في هذا القسم." : "No active positions found in this department."}
            </p>
          </div>
        )}

        {filteredPositions.length > 6 && (
          <div className="mt-10 flex justify-center">
            <RollingButton
              text={jobsToggleLabel}
              onClick={() => setShowAllPositions((isShowingAll) => !isShowingAll)}
              variant="outline"
              ariaLabel={jobsToggleLabel}
            />
          </div>
        )}
      </div>
    </section>
  );
}