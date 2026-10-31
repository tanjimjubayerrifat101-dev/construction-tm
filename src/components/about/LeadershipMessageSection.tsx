"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShieldCheck, Award } from "lucide-react";
import FadeUp from "@/utils/FadeUp";
import SlideHeadingLeft from "@/utils/SlideHeading";
import leaderImg from "@/assets/about/ceo.png";
import QuoteBannerAboutSection from "./QuoteBannerAboutSection";

export default function LeadershipMessageSection() {
  const t = useTranslations("AboutPage.leadership");

  return (
    <section className="relative w-full overflow-hidden bg-background py-20 md:py-28">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Portrait Card */}
          <div className="lg:col-span-4">
            <FadeUp delay={0.15} y={30}>
              <div className="group relative mx-auto max-w-sm rounded-2xl border border-border/70 bg-card shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={leaderImg}
                    alt={t("leaderName")}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="mt-5 p-4 text-center">
                  <h3 className="text-xl font-bold text-foreground">
                    {t("leaderName")}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-secondary">
                    {t("leaderRole")}
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: Two-Column Letter / Message */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <FadeUp delay={0.1} y={20}>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary mb-3">
                <Award size={16} />
                <span>{t("eyebrow")}</span>
              </div>
            </FadeUp>
{/* 
            <SlideHeadingLeft className="mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[115%]">
              {t("headingPart1")}{" "}
              <span className="text-primary dark:text-secondary">
                {t("headingPart2")}
              </span>
            </SlideHeadingLeft> */}
            <SlideHeadingLeft>
              <QuoteBannerAboutSection/>
            </SlideHeadingLeft>

            <FadeUp delay={0.25} y={25}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-muted-foreground leading-relaxed">
                <div className="rounded-xl border border-border/50 bg-muted/20 p-6">
                  <p className="whitespace-pre-line">{t("col1")}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-muted/20 p-6">
                  <p className="whitespace-pre-line">{t("col2")}</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
