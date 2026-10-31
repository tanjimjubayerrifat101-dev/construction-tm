"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import FadeUp from "@/utils/FadeUp";
import SlideHeadingLeft from "@/utils/SlideHeading";
import SlideHeadingRight from "@/utils/SlideHeadingRight";
import blueprintImg from "@/assets/home/blog2.png";
import projectImg from "@/assets/service/service2.png";

export default function StorySection() {
  const t = useTranslations("AboutPage.storySection");

  return (
    <section className="relative w-full overflow-hidden bg-muted/30 py-20 md:py-28">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Block: Blueprint Image + Founding Story */}
          <div className="flex flex-col gap-8">
            <FadeUp delay={0.1} y={30}>
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg">
                <Image
                  src={blueprintImg}
                  alt={t("companyName")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </FadeUp>

            <FadeUp delay={0.25} y={25}>
              <div className="flex flex-col gap-4">
                {/* <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-secondary">
                  <span className="h-0.5 w-6 bg-secondary" />
                  <span>{t("eyebrow")}</span>
                </div> */}
                <SlideHeadingLeft as="h3" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {t("headingPart1")}{" "}
                  <span className="text-primary dark:text-secondary">{t("companyName")}</span>{" "}
                  {t("headingPart2")}
                </SlideHeadingLeft>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {t("p1")}
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Right Block: Standards Heading + Modern Architecture Photo */}
          <div className="flex flex-col gap-8 lg:pt-8">
            <FadeUp delay={0.15} y={25}>
              <div className="flex flex-col gap-4">
                <SlideHeadingRight as="h3" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {t("modernHeadingPart1")}{" "}
                  <span className="text-primary dark:text-secondary">
                    {t("modernHeadingPart2")}
                  </span>
                </SlideHeadingRight>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {t("p2")}
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.3} y={30}>
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg">
                <Image
                  src={projectImg}
                  alt={t("modernHeadingPart2")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
