"use client";

import RollingButton from "@/utils/RollingButton";

interface ProjectsRegionCTAProps {
  isRtl?: boolean;
}

export default function ProjectsRegionCTA({
  isRtl = false,
}: ProjectsRegionCTAProps) {
  return (
    <section className="container mb-20 lg:mb-28">
      <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-r from-[#00142b] via-[#00285a] to-[#004187] p-8 sm:p-12 lg:p-16 text-white border border-white/10 shadow-2xl">
        {/* Subtle decorative grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient lighting glow */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -end-24 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-2">
              {isRtl ? "استكشف حسب المنطقة" : "EXPLORE BY REGION"}
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
              {isRtl
                ? "شاهد مشاريعنا عبر كافة مناطق المملكة"
                : "See our projects on the interactive map"}
            </h3>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
              {isRtl
                ? "تنتشر فرقنا الهندسية ومشاريعنا الرائدة في 13 منطقة بالمملكة العربية السعودية لتقديم حلول متكاملة تتماشى مع رؤية 2030."
                : "Explore how TMYAZNA is delivering transformative systems, civil infrastructure, and facility excellence across all 13 administrative regions of Saudi Arabia."}
            </p>
          </div>

          <div className="shrink-0">
            <RollingButton
              text={isRtl ? "افتح الخريطة" : "Open The Map"}
              href="/presence"
              variant="secondary"
              className="shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
