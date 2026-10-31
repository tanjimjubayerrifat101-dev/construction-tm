"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowDown, Briefcase, MapPin, Target } from "lucide-react";
import Breadcrumbs from "@/utils/Breadcrumb";
import heroImg from "@/assets/home/why-choose/why3.png";

function StatCounter({
  target,
  hasStarted,
  duration = 1800,
}: {
  target: number;
  hasStarted: boolean;
  duration?: number;
}) {
  const [currentVal, setCurrentVal] = useState(0);

  useEffect(() => {
    if (!hasStarted) return;
    if (target <= 0) {
      setCurrentVal(target);
      return;
    }

    let start: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrentVal(Math.floor(ease * target));

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setCurrentVal(target);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [hasStarted, target, duration]);

  return <span>{currentVal.toLocaleString()}</span>;
}

export default function CareersHero() {
  const t = useTranslations("Careers");
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const node = bannerRef.current;
    if (!node) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleScrollToPositions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elem = document.getElementById("open-positions");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const stat1Val = parseInt(t("stat1.value") || "5", 10) || 5;
  const stat2Val = parseInt(t("stat2.value") || "900", 10) || 13;
  const stat3Val = parseInt(t("stat3.value") || "2030", 10) || 2030;

  return (
    <div className="relative">
      <Breadcrumbs
        title={t("breadcrumb")}
        eyebrow={t("eyebrow")}
        heading={t("heading")}
        description={t("subheading")}
        image={heroImg}
        imageAlt="Careers at TMYAZNA"
      />

      {/* Floating Action & Quick Stats Banner - Compact Width & Premium Design */}
      <div className="container relative z-20 -mt-12 sm:-mt-16 mb-16 lg:mb-20 px-4">
        <div
          ref={bannerRef}
          className="max-w-3xl lg:max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-5 sm:gap-6 bg-white/95 dark:bg-card/95 backdrop-blur-xl rounded-2xl md:rounded-full p-4 sm:p-5 md:px-8 md:py-4 border border-gray-200/90 dark:border-white/10 shadow-2xl shadow-primary/10 transition-all duration-300"
        >
          {/* Scroll to open positions button */}
          {/* <a
            href="#open-positions"
            onClick={handleScrollToPositions}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-secondary hover:bg-secondary/90 text-white font-bold text-xs sm:text-sm shadow-md shadow-secondary/25 transition-all duration-300 group hover:scale-[1.02] cursor-pointer shrink-0"
          >
            <span>{t("viewPositions")}</span>
            <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-1" />
          </a> */}

          {/* Key Quick Stats (Animated Counter) */}
          <div className="w-full md:w-auto grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 divide-x divide-gray-200/90 dark:divide-white/10 rtl:divide-x-reverse items-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center ps-2 sm:ps-4 first:ps-0">
              <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-1.5 font-mono">
                <Briefcase
                  size={17}
                  className="text-secondary shrink-0 hidden sm:inline"
                />
                <StatCounter target={stat1Val} hasStarted={hasStarted} />
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5 text-center">
                {t("stat1.label")}
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center px-2 sm:px-4">
              <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-1.5 font-mono">
                <MapPin
                  size={17}
                  className="text-secondary shrink-0 hidden sm:inline"
                />
                <StatCounter target={stat2Val} hasStarted={hasStarted} />
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5 text-center">
                {t("stat2.label")}
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center ps-2 sm:ps-4">
              <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-1.5 font-mono">
                <Target
                  size={17}
                  className="text-secondary shrink-0 hidden sm:inline"
                />
                <StatCounter target={stat3Val} hasStarted={hasStarted} />
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5 text-center">
                  {t("Day")}
                </span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5 text-center">
                {t("stat3.label")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
