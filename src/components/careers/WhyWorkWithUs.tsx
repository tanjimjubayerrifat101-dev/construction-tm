"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { CAREER_BENEFITS } from "@/data/careersData";
import FadeUp from "@/utils/FadeUp";
import heroWorkforce from "@/assets/home/hero1.png";
import systemsImg from "@/assets/service/srvice-home.png";
import engineeringInspection from "@/assets/service/service3.png";

export default function WhyWorkWithUs() {
  const t = useTranslations("Careers");
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="relative w-full py-16 sm:py-24 bg-background overflow-hidden">
      <div className="container relative z-10">
        {/* Section Header (Centered) */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <FadeUp delay={0.1} y={20}>
            <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary mb-3">
              <span className="w-8 h-0.5 bg-secondary" />
              <span>{t("whyUsEyebrow")}</span>
              <span className="w-8 h-0.5 bg-secondary" />
            </div>
          </FadeUp>

          <FadeUp delay={0.2} y={25}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[120%]">
              {t("whyUsTitle")}
            </h2>
          </FadeUp>
        </div>

        {/* 6 Benefit Cards Grid (2x3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 lg:mb-24">
          {CAREER_BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            const title = isAr ? benefit.title.ar : benefit.title.en;
            const desc = isAr ? benefit.description.ar : benefit.description.en;

            return (
              <FadeUp key={idx} delay={0.1 * (idx % 3)} y={25}>
                <div className="group h-full p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-card border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    {/* Icon Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 dark:bg-secondary/20 text-secondary flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <Icon size={28} strokeWidth={2} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-secondary transition-colors duration-200">
                      {title}
                    </h3>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Bottom Accent line */}
                  <div className="w-8 group-hover:w-16 h-1 bg-secondary/40 group-hover:bg-secondary rounded-full mt-6 transition-all duration-300" />
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Life at TMYAZNA Photo Showcase */}
        <FadeUp delay={0.2} y={30}>
          <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-gray-200/80 dark:border-white/10 shadow-2xl bg-card">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 sm:p-6 bg-slate-900">
              {/* Main wide image */}
              <div className="relative lg:col-span-7 h-[300px] sm:h-[400px] lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden group">
                <Image
                  src={heroWorkforce}
                  alt="Life at TMYAZNA - Civil workforce"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-6 sm:bottom-8 start-6 sm:start-8 end-6 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-wider mb-2">
                    {t("lifeAtTitle")}
                  </span>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight drop-shadow-sm">
                    {t("lifeAtSubtitle")}
                  </h4>
                </div>
              </div>

              {/* Right 2 images stacked */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 h-[300px] sm:h-auto lg:h-[460px]">
                <div className="relative h-full min-h-[140px] sm:min-h-[190px] rounded-2xl sm:rounded-3xl overflow-hidden group">
                  <Image
                    src={systemsImg}
                    alt="TMYAZNA Technical Systems"
                    fill
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  <div className="absolute bottom-4 start-4 text-white">
                    <p className="text-xs sm:text-sm font-semibold tracking-wide">
                      {isAr ? "أنظمة وتقنيات هندسية متطورة" : "Advanced Engineering Systems"}
                    </p>
                  </div>
                </div>

                <div className="relative h-full min-h-[140px] sm:min-h-[190px] rounded-2xl sm:rounded-3xl overflow-hidden group">
                  <Image
                    src={engineeringInspection}
                    alt="Quality Control & Standards"
                    fill
                    sizes="(max-width: 1024px) 50vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  <div className="absolute bottom-4 start-4 text-white">
                    <p className="text-xs sm:text-sm font-semibold tracking-wide">
                      {isAr ? "معايير جودة ورقابة فائقة" : "Uncompromising Quality Control"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
