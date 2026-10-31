"use client";

import { useLocale, useTranslations } from "next-intl";
import { HIRING_STEPS } from "@/data/careersData";
import FadeUp from "@/utils/FadeUp";

export default function HiringProcessSection() {
  const t = useTranslations("Careers");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="relative w-full py-16 sm:py-24 bg-background overflow-hidden border-t border-gray-200/80 dark:border-white/10">
      <div className="container relative z-10">
        {/* Section Header (Centered) */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <FadeUp delay={0.1} y={20}>
            <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary mb-3">
              <span className="w-8 h-0.5 bg-secondary" />
              <span>{t("processEyebrow")}</span>
              <span className="w-8 h-0.5 bg-secondary" />
            </div>
          </FadeUp>

          <FadeUp delay={0.2} y={25}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[120%]">
              {t("processTitle")}
            </h2>
          </FadeUp>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {HIRING_STEPS.map((step, idx) => {
            const title = isAr ? step.title.ar : step.title.en;
            const desc = isAr ? step.description.ar : step.description.en;

            return (
              <FadeUp key={idx} delay={0.1 * idx} y={25}>
                <div className="group relative h-full p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Step Number Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl sm:text-4xl font-extrabold text-secondary/30 group-hover:text-secondary transition-colors duration-300 font-mono">
                        {step.number}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight group-hover:text-secondary transition-colors duration-200">
                      {title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Accent bottom line indicator */}
                  <div className="w-full h-1 bg-gray-100 dark:bg-white/5 group-hover:bg-secondary/30 rounded-full mt-6 overflow-hidden">
                    <div className="w-1/3 group-hover:w-full h-full bg-secondary rounded-full transition-all duration-500" />
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
