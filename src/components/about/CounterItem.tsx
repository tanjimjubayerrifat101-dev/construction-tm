"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface CounterItemProps {
  value: number;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  duration?: number;
  hasStarted?: boolean;
}

export default function CounterItem({
  value,
  suffix = "",
  label,
  icon: Icon,
  duration = 2000,
  hasStarted: propHasStarted,
}: CounterItemProps) {
  const [count, setCount] = useState(0);
  const [internalStarted, setInternalStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isStarted = propHasStarted !== undefined ? propHasStarted : internalStarted;

  useEffect(() => {
    if (propHasStarted !== undefined) return;

    const node = containerRef.current;
    if (!node || internalStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInternalStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [internalStarted, propHasStarted]);

  useEffect(() => {
    if (!isStarted) return;

    const targetVal = Number.isFinite(value) ? value : 0;
    if (targetVal <= 0) {
      setCount(targetVal);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Smooth ease-out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * targetVal);

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(targetVal);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isStarted, value, duration]);

  const formattedCount = String(Number.isFinite(count) ? count : 0);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center text-center group cursor-default"
    >
      {/* Circular Glowing Icon Badge */}
      <div className="relative mb-6 flex h-20 w-20 sm:h-22 sm:w-22 items-center justify-center rounded-full bg-secondary text-white shadow-lg shadow-secondary/30 transition-transform duration-500 ease-out group-hover:scale-110">
        <Icon size={34} strokeWidth={2} className="text-white drop-shadow" />
        <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse pointer-events-none" />
      </div>

      {/* Animated Number */}
      <div className="flex items-baseline justify-center text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
        <span>{formattedCount}</span>
        {suffix && <span className="text-secondary ms-1">{suffix}</span>}
      </div>

      {/* Subtitle with accent line/dot */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
          {label}
        </p>
      </div>
    </div>
  );
}
