"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocale } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SlideHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  direction?: "left" | "right";
  distance?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  autoRtl?: boolean;
}



export default function SlideHeadingRight({
  children,
  className = "",
  as: Component = "h2",
  direction = "right",
  distance = 60,
  scrub = 1,
  start = "top 92%",
  end = "top 55%",
  autoRtl = true,
}: SlideHeadingProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const locale = useLocale();
  const isRtl = autoRtl && locale === "ar";

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Adjust distance on mobile/tablet to avoid overflow
      const isMobile = window.innerWidth < 768;
      const actualDistance = isMobile ? Math.min(distance, 35) : distance;

      let startX: number;
      if (direction === "left") {
        startX = isRtl ? actualDistance : -actualDistance;
      } else {
        startX = isRtl ? -actualDistance : actualDistance;
      }

      const tween = gsap.fromTo(
        containerRef.current,
        {
          x: startX,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: start,
            end: end,
            scrub: scrub,
            invalidateOnRefresh: true,
          },
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: containerRef, dependencies: [children, isRtl, direction, distance] }
  );

  return (
    <Component
      ref={containerRef}
      className={`will-change-transform max-w-full ${className}`}
    >
      {children}
    </Component>
  );
}
