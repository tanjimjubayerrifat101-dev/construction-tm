"use client";

import { useTranslations } from "next-intl";
import SplitReveal from "@/utils/SplitReveal";
import FadeUp from "@/utils/FadeUp";

export default function ContactHero() {
  const t = useTranslations("Contact");

  return (
    <section className="relative w-full bg-[#002244] text-white pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background ambient radial gradients & subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(0, 134, 255, 0.4) 0%, transparent 45%),
            radial-gradient(circle at 85% 80%, rgba(0, 65, 135, 0.6) 0%, transparent 50%),
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Decorative dark overlay gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#001833]/70 via-transparent to-[#002244] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="max-w-3xl flex flex-col items-start gap-4">
          {/* Eyebrow with hairline indicator */}
          <FadeUp duration={0.6} y={15} threshold="top 95%">
            <div className="flex items-center gap-2.5 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest">
              <span className="w-8 h-[2px] bg-secondary" />
              <span>{t("eyebrow")}</span>
            </div>
          </FadeUp>

          {/* Heading with word-by-word SplitReveal like Home page Hero */}
          <div className="w-full">
            <SplitReveal
              as="h1"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[110%] rtl:leading-[125%]"
              stagger={0.06}
              duration={0.9}
            >
              {t("heading")}
            </SplitReveal>
          </div>

          {/* Subtitle with FadeUp */}
          <FadeUp delay={0.2} duration={0.8} y={25} threshold="top 95%">
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed mt-2 max-w-2xl">
              {t("subheading")}
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
