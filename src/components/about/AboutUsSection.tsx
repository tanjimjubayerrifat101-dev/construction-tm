"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle2, Award, ArrowUpRight } from "lucide-react";
import FadeUp from "@/utils/FadeUp";
import SlideHeadingLeft from "@/utils/SlideHeading";
import constructionImg from "@/assets/home/why-choose/why3.png";

export default function AboutUsSection() {
  const t = useTranslations("AboutPage.aboutSection");

  const checklistItems = [
    t("point1"),
    t("point2"),
    t("point3"),
  ];

  return (
    <section id="about-us" className="relative w-full overflow-hidden bg-background py-20 md:py-28 lg:py-32">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Content, Checklist, Signature */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow with accent bar */}
            <FadeUp delay={0.1} y={20}>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-0.5 w-10 bg-secondary" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary">
                  {t("eyebrow")}
                </span>
              </div>
            </FadeUp>

            {/* Section Title */}
            <SlideHeadingLeft className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[115%]">
              {t("headingPart1")}{" "}
              <span className="text-primary dark:text-secondary">
                {t("headingPart2")}
              </span>
            </SlideHeadingLeft>

            {/* Paragraphs from Image 2 */}
            <FadeUp delay={0.2} y={25}>
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <p>{t("p1")}</p>
                <p>{t("p2")}</p>
              </div>
            </FadeUp>

            {/* Checklist items */}
            {/* <FadeUp delay={0.3} y={25} className="mt-8">
              <ul className="space-y-3.5">
                {checklistItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3.5 group">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                      <CheckCircle2 size={16} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-foreground/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeUp> */}

            {/* Signature & Founder block */}

          </div>

          {/* Right Column: Imagery with Floating Badge (as in Image 1) */}
          <div className="lg:col-span-5 relative">
            <FadeUp delay={0.2} duration={1} y={35}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Card Image */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl group">
                  <Image
                    src={constructionImg}
                    alt={t("headingPart2")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  {/* Subtle Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Accent Card (Bottom corner overlay matching Image 1) */}
                {/* <div className="absolute -bottom-6 -start-4 sm:-bottom-8 sm:-start-6 max-w-[280px] sm:max-w-[310px] rounded-2xl bg-secondary p-5 sm:p-6 text-white shadow-xl shadow-secondary/25 transition-transform duration-300 hover:-translate-y-1 group/badge cursor-pointer">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <Award size={24} className="text-white" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300 group-hover/badge:translate-x-0.5 group-hover/badge:-translate-y-0.5 rtl:group-hover/badge:-translate-x-0.5">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base font-semibold leading-snug">
                    {t("badgeText")}
                  </p>
                </div> */}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
