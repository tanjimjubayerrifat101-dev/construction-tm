"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { JOB_POSITIONS } from "@/data/careersData";

interface CareerJobListProps {
  currentJobId: string;
}

export default function CareerJobList({ currentJobId }: CareerJobListProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const activeJob = list?.querySelector<HTMLElement>('[aria-current="page"]');

    if (list && activeJob) {
      list.scrollTo({
        top: activeJob.offsetTop - (list.clientHeight - activeJob.clientHeight) / 2,
        behavior: "smooth",
      });
    }
  }, [currentJobId]);

  return (
    <aside
      aria-label={isAr ? "الوظائف المتاحة" : "Open positions"}
      className="min-w-0 lg:sticky lg:top-24 lg:col-span-3"
    >
      <p className="mb-3 px-1 text-sm font-bold text-foreground">
        {isAr ? "الوظائف المتاحة" : "Open positions"} ({JOB_POSITIONS.length})
      </p>

      <div
        ref={listRef}
        className="relative flex max-h-64 flex-col gap-3 overflow-y-auto overscroll-y-contain p-1 pb-3 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] lg:max-h-[calc(100vh-7rem)] lg:pb-1"
      >
        {JOB_POSITIONS.map((job) => {
          const isActive = job.id === currentJobId;

          return (
            <Link
              key={job.id}
              href={`/careers/${job.id}`}
              aria-current={isActive ? "page" : undefined}
              className={`block w-full shrink-0 rounded-xl border bg-white p-4 transition-colors duration-200 dark:bg-card sm:p-5 ${
                isActive
                  ? "border-secondary shadow-md ring-1 ring-secondary/30"
                  : "border-gray-200/90 hover:border-secondary/50 dark:border-white/10"
              }`}
            >
              <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                {isAr ? job.title.ar : job.title.en}
              </h3>
              <div className="my-3 h-px bg-gray-100 dark:bg-white/10" />
              <p className="text-xs font-medium text-foreground/80">
                {isAr ? job.type.ar : job.type.en}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {isAr ? job.location.ar : job.location.en}
              </p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
