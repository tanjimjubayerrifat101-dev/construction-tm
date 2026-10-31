"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import FadeUp from "@/utils/FadeUp";

export default function QuoteBannerSection() {
  const t = useTranslations("AboutPage.quoteBanner");

  return (
    <section className="relative w-full overflow-hidden py-14 sm:py-18 bg-gradient-to-r from-primary via-[#0055b3] to-secondary text-white isolate">
      {/* Decorative architectural grid background overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <FadeUp duration={0.8} y={30}>
          <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-start">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md shadow-inner text-white">
              <Quote size={36} className="rotate-180" />
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold leading-relaxed tracking-tight text-white drop-shadow-sm">
              &ldquo;{t("text")}&rdquo;
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
