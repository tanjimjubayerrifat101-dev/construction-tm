"use client";

import Image, { type StaticImageData } from "next/image";
import { House, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import SplitReveal from "@/utils/SplitReveal";
import FadeUp from "@/utils/FadeUp";
import defaultBg from "@/assets/home/blog1.png";

export type BreadcrumbsProps = {

  title: string;
  eyebrow?: string;
  heading: string;
  description?: string;
  image?: StaticImageData | string;
  imageAlt?: string;

  homeLabel?: string;
  centered?: boolean;
};


export default function Breadcrumbs({
  title,
  eyebrow,
  heading,
  description,
  image = defaultBg,
  imageAlt = "Page Banner",
  homeLabel,
  centered = false,
}: BreadcrumbsProps) {
  const locale = useLocale();
  const localizedHomeLabel = homeLabel ?? (locale === "ar" ? "الرئيسية" : "Home");
  const isRtl = locale === "ar";

  return (
    <section className="relative overflow-hidden pt-36 md:pt-44 pb-20 md:pb-28 text-white isolate">

      {/* Background Image */}
            <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-linear-to-b from-black/60 via-black/40 to-transparent"
      />
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className={`object-cover -z-20 scale-105 transition-transform duration-1000 ${isRtl ? "-scale-x-100" : ""}`}
      />

      {/* Rich Brand-Blue / Dark architectural gradient scrim */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#001833]/95 via-[#002b5c]/45 to-[#004187]/40 -z-10"
        aria-hidden="true"
      />

      {/* Subtle architectural grid pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div
          className={`max-w-3xl flex flex-col gap-4 ${
            centered ? "mx-auto items-center text-center" : "items-start"
          }`}
        >
          {/* Eyebrow badge or accent line */}
          {eyebrow && (
            <FadeUp duration={0.6} y={15} threshold="top 95%">
              <div className="flex items-center gap-2.5 text-secondary text-xs sm:text-sm font-bold uppercase tracking-widest">
                <span className="w-8 h-[2px] bg-secondary" />
                <span>{eyebrow}</span>
              </div>
            </FadeUp>
          )}

          {/* Main Heading with Home Hero's SplitReveal animation */}
          <div className="w-full">
            <SplitReveal
              as="h1"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[110%] rtl:leading-[125%]"
              stagger={0.06}
              duration={0.9}
            >
              {heading}
            </SplitReveal>
          </div>

          {/* Subtitle with FadeUp */}
          {description && (
            <FadeUp delay={0.2} duration={0.8} y={25} threshold="top 95%">
              <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed mt-1 max-w-2xl">
                {description}
              </p>
            </FadeUp>
          )}

          {/* Breadcrumb Navigation Pill */}
          <FadeUp delay={0.3} duration={0.8} y={25} threshold="top 95%">
            <nav
              aria-label="Breadcrumb"
              className={`mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium shadow-lg ${
                centered ? "mx-auto" : ""
              }`}
            >
              <Link
                href="/"
                className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
              >
                <House size={14} className="text-secondary" />
                <span>{localizedHomeLabel}</span>
              </Link>

              <ChevronRight
                size={14}
                className="text-white/40 rtl:rotate-180 shrink-0"
              />

              <span className="text-secondary font-semibold">
                {title}
              </span>
            </nav>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}