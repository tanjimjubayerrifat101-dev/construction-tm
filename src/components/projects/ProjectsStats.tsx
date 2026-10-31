"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS_STATS } from "@/data/projectsData";

function AnimatedStatCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  hasStarted,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  hasStarted: boolean;
}) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic: 1 - (1 - t)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const val = easeProgress * target;

      setCurrentValue(val);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrentValue(target);
      }
    };

    const animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [hasStarted, target]);

  const formatted = decimals > 0 ? currentValue.toFixed(decimals) : Math.round(currentValue).toString();
  // const formatted =
  //   decimals > 0
  //     ? currentValue.toFixed(decimals)
  //     : Math.round(currentValue).toLocaleString("en-US");

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

interface ProjectsStatsProps {
  isRtl?: boolean;
}

export default function ProjectsStats({ isRtl = false }: ProjectsStatsProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative -mt-10 sm:-mt-14 z-20 container mb-16 lg:mb-20"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl">
        {PROJECTS_STATS.map((stat, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center lg:items-start text-center lg:text-start ${
              idx !== PROJECTS_STATS.length - 1
                ? "lg:border-e lg:border-slate-100 lg:pe-6"
                : ""
            }`}
          >
            <span className="flex flex-wrap items-baseline gap-x-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#001833] leading-none mb-2 font-mono">
              <span className="whitespace-nowrap">
                <AnimatedStatCounter
                  target={stat.target}
                  prefix={isRtl ? (stat.prefixAr ?? stat.prefix) : stat.prefix}
                  suffix={isRtl ? (stat.suffixAr ?? stat.suffix) : stat.suffix}
                  decimals={stat.decimals}
                  hasStarted={hasAnimated}
                />
              </span>
              {(isRtl ? stat.unitAr : stat.unit) && (
                <span className="text-sm sm:text-base font-medium text-slate-500 whitespace-nowrap">
                  {isRtl ? stat.unitAr : stat.unit}
                </span>
              )}
            </span>

            <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
              {isRtl ? stat.labelAr : stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
