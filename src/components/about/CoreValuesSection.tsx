"use client";

import { useTranslations } from "next-intl";
import {
  Users,
  Compass,
  HeartHandshake,
  Award,
  Sparkles,
  Trophy,
  HardHat,
  Scale,
  Lightbulb,
} from "lucide-react";
import ValueCard from "./ValueCard";
import FadeUp from "@/utils/FadeUp";
import SlideHeadingLeft from "@/utils/SlideHeading";
import SlideHeadingRight from "@/utils/SlideHeadingRight";

export default function CoreValuesSection() {
  const t = useTranslations("AboutPage.values");

  const valuesList = [
    {
      title: t("clientFirst.title"),
      desc: t("clientFirst.desc"),
      icon: Users,
      barHoverClass: "lg:group-hover:bg-primary",
      iconBgClass: "bg-primary", // Dark Blue
    },
    {
      title: t("flexibility.title"),
      desc: t("flexibility.desc"),
      icon: Compass,
      barHoverClass: "lg:group-hover:bg-secondary",
      iconBgClass: "bg-secondary", // Light Blue
    },
    {
      title: t("teamwork.title"),
      desc: t("teamwork.desc"),
      icon: HeartHandshake,
      barHoverClass: "lg:group-hover:bg-light-black",
      iconBgClass: "bg-light-black", // Light Black
    },
    {
      title: t("quality.title"),
      desc: t("quality.desc"),
      icon: Award,
      barHoverClass: "lg:group-hover:bg-[#B049F4]",
      iconBgClass: "bg-[#B049F4]", // Purple
    },
    {
      title: t("empowerment.title"),
      desc: t("empowerment.desc"),
      icon: Sparkles,
      barHoverClass: "lg:group-hover:bg-[#21C697]",
      iconBgClass: "bg-[#21C697]", // Emerald
    },
    {
      title: t("excellence.title"),
      desc: t("excellence.desc"),
      icon: Trophy,
      barHoverClass: "lg:group-hover:bg-[#F59E0B]",
      iconBgClass: "bg-[#F59E0B]", // Amber
    },
    {
      title: t("safety.title"),
      desc: t("safety.desc"),
      icon: HardHat,
      barHoverClass: "lg:group-hover:bg-[#EF4444]",
      iconBgClass: "bg-[#EF4444]", // Red
    },
    {
      title: t("integrity.title"),
      desc: t("integrity.desc"),
      icon: Scale,
      barHoverClass: "lg:group-hover:bg-[#0284C7]",
      iconBgClass: "bg-[#0284C7]", // Sky Blue
    },
    {
      title: t("innovation.title"),
      desc: t("innovation.desc"),
      icon: Lightbulb,
      barHoverClass: "lg:group-hover:bg-[#8B5CF6]",
      iconBgClass: "bg-[#8B5CF6]", // Violet
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-background py-20 md:py-24 lg:py-28">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header (Consistent with Home Services Section) */}
        <div className="mb-14 flex w-full flex-col items-center justify-center text-center">
          <div className="w-full xl:w-[80%] 2xl:w-[60%]">
            <FadeUp delay={0.1} y={15}>
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary mb-3">
                <span className="w-6 h-0.5 bg-secondary" />
                <span>{t("eyebrow")}</span>
                <span className="w-6 h-0.5 bg-secondary" />
              </div>
            </FadeUp>

            {/* <SlideHeadingLeft className="mb-3 text-4xl lg:text-5xl font-regular uppercase text-primary">
              {t("headingPart1")}{" "}
              <span className="text-secondary">{t("headingPart2")}</span>
            </SlideHeadingLeft> */}

            <SlideHeadingRight className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              {t("subtitle")}
            </SlideHeadingRight>
          </div>
        </div>

        {/* Core Values Card Matrix (same design & border structure as Home ServiceCard) */}
        <div className="mx-auto w-full xl:w-[90%] 2xl:w-[70%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap- border-t border-s border-gray-200/80 dark:border-white/10 shadow-sm rounded-lg">
            {valuesList.map((val, idx) => (
              <ValueCard
                key={idx}
                title={val.title}
                desc={val.desc}
                icon={val.icon}
                barHoverClass={val.barHoverClass}
                iconBgClass={val.iconBgClass}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
