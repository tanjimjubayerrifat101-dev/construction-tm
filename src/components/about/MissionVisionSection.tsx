"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Compass, Eye, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import FadeUp from "@/utils/FadeUp";
import SlideHeadingLeft from "@/utils/SlideHeading";
import skylineImg from "@/assets/home/blog1.png";

export default function MissionVisionSection() {
  const t = useTranslations("AboutPage.missionVision");

  const dedicationPoints = [
    {
      num: "01",
      title: t("d1Title"),
      desc: t("d1Desc"),
      icon: ShieldCheck,
    },
    {
      num: "02",
      title: t("d2Title"),
      desc: t("d2Desc"),
      icon: Sparkles,
    },
    {
      num: "03",
      title: t("d3Title"),
      desc: t("d3Desc"),
      icon: Building2,
    },
  ];

  return (
    <section id="vision" className="relative w-full overflow-hidden bg-muted/20 py-20 md:py-28">
      <div className="container relative z-10">
        {/* Top Grid: Mission Card on Left + Dedicated To Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          {/* Mission Card (Deep Blue Brand Card) */}
          <div className="lg:col-span-5 flex">
            <FadeUp delay={0.1} y={30} className="w-full h-full">
              <div className="relative h-full flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-[#003875] to-[#002855] p-8 sm:p-10 text-white shadow-xl group">
                {/* Decorative watermarked icon */}
                <Compass
                  size={180}
                  className="absolute -bottom-10 -end-10 opacity-10 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md mb-6 shadow-inner text-secondary">
                    <Compass size={28} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-white">
                    {t("missionTitle")}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                    {t("missionDesc")}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-secondary text-sm font-semibold">
                  <span className="w-6 h-0.5 bg-secondary" />
                  <span>{t("strategicCommitment")}</span>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* "We Are Dedicated To" with 3 Numbered Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <FadeUp delay={0.15} y={20} className="mb-6">
              <SlideHeadingLeft as="h3" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {t("dedicatedHeading")}
              </SlideHeadingLeft>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 grow">
              {dedicationPoints.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <FadeUp key={item.num} delay={0.2 + idx * 0.1} y={25} className="flex">
                    <div className="group relative flex flex-col justify-between w-full rounded-2xl border border-primary/15 dark:border-white/10 bg-white dark:bg-card p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-secondary/60 overflow-hidden">
                      {/* Watermark Number in background */}
                      <span className="absolute -bottom-3 -end-2 text-7xl sm:text-8xl font-black text-primary/5 dark:text-white/5 pointer-events-none select-none group-hover:text-secondary/10 transition-colors font-mono">
                        {item.num}
                      </span>

                      <div>
                        {/* Top Accent Bar */}
                        <div className="w-10 h-1 bg-secondary rounded-full mb-5 transition-all duration-300 group-hover:w-16" />

                        {/* Number + Icon badge */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl sm:text-4xl font-extrabold text-primary dark:text-secondary group-hover:text-secondary transition-colors">
                            {item.num}
                          </span>
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 dark:bg-white/5 text-primary dark:text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-xs">
                            <IconComponent size={20} />
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                          {item.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      {/* Bottom Tag */}
                      <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between z-10">
                        <span className="text-[11px] uppercase tracking-wider font-bold text-primary dark:text-secondary">
                          {t("corePillar")}
                        </span>
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Banner: "Our Vision" Card with Modern Skyline */}
        <FadeUp delay={0.3} y={30}>
          <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-r from-[#001833] via-[#002b5c] to-primary p-8 sm:p-12 text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Vision Text */}
              <div className="lg:col-span-7 z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md text-secondary">
                    <Eye size={24} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary">
                    {t("lookingTowardsTomorrow")}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-white">
                  {t("visionTitle")}
                </h3>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                  {t("visionDesc")}
                </p>
              </div>

              {/* Vision Image Preview */}
              <div className="lg:col-span-5 relative aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/20 shadow-lg">
                <Image
                  src={skylineImg}
                  alt={t("visionTitle")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
