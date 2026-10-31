"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Calendar, Building2, Users, MapPin } from "lucide-react";
import CounterItem from "./CounterItem";
import FadeUp from "@/utils/FadeUp";
import bgCounter from "@/assets/home/hero1.png";

export default function StatsCounterSection() {
  const t = useTranslations("AboutPage.stats");
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  const getStatValue = (key: string, fallback: number): number => {
    try {
      const raw = t.raw ? t.raw(`${key}.value`) : t(`${key}.value`);
      const parsed = Number(raw);
      return Number.isFinite(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const getStatSuffix = (key: string, fallback: string = ""): string => {
    try {
      return t(`${key}.suffix`) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const getStatLabel = (key: string, fallback: string): string => {
    try {
      return t(`${key}.label`) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const stats = [
    {
      value: getStatValue("stat1", 2022),
      suffix: getStatSuffix("stat1", ""),
      label: getStatLabel("stat1", "Year Established"),
      icon: Calendar,
    },
    {
      value: getStatValue("stat2", 150),
      suffix: getStatSuffix("stat2", "+"),
      label: getStatLabel("stat2", "Completed Projects"),
      icon: Building2,
    },
    {
      value: getStatValue("stat3", 1200),
      suffix: getStatSuffix("stat3", "+"),
      label: getStatLabel("stat3", "Professional Workforce"),
      icon: Users,
    },
    {
      value: getStatValue("stat4", 5),
      suffix: getStatSuffix("stat4", ""),
      label: getStatLabel("stat4", "Branches Across KSA"),
      icon: MapPin,
    },
  ];

  const bgImageUrl = typeof bgCounter === "string" ? bgCounter : bgCounter.src;

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 lg:py-32 text-white isolate overflow-hidden [clip-path:inset(0)] bg-fixed bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      {/* Hardware-accelerated viewport-locked fixed background for smooth parallax */}
      <div
        className="fixed inset-0 -z-30 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url(${bgImageUrl})`,
        }}
      />

      {/* Balanced architectural dark scrim overlay so the background image is clearly visible */}
      <div
        className="absolute inset-0 bg-slate-950/70 -z-20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/85 -z-10"
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <FadeUp duration={0.8} y={30}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-center justify-center">
            {stats.map((stat, idx) => (
              <CounterItem
                key={idx}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
                duration={2200}
                hasStarted={hasStarted}
              />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

