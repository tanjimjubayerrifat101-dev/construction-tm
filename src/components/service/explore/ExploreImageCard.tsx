"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { type ServiceItemData } from "@/data/servicesData";

interface ExploreImageCardProps {
  service: ServiceItemData;
}

export default function ExploreImageCard({ service }: ExploreImageCardProps) {
  const [isZooming, setIsZooming] = useState(true);

  // Trigger zoom-out animation whenever service changes
  useEffect(() => {
    setIsZooming(true);
    const timer = setTimeout(() => {
      setIsZooming(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [service.id]);

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Decorative Layered Backdrop matching design */}
      <div
        aria-hidden="true"
        className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-3/4 h-full bg-[#EBF3FB] rounded-[32px] -z-10 transition-transform duration-700"
      />

      {/* Decorative Dot Matrix on bottom right */}
      <div
        aria-hidden="true"
        className="absolute -bottom-6 -right-6 w-32 h-32 opacity-30 pointer-events-none -z-10"
        style={{
          backgroundImage: "radial-gradient(#004187 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Main Image Container Card */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/11] w-full rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-2xl bg-slate-900 border border-slate-100">
        {/* Animated Image with Zoom-Out Effect */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            key={service.id}
            src={service.image}
            alt={service.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            priority
            className={`
              object-cover transition-all duration-700 ease-out
              ${isZooming ? "scale-110 opacity-90" : "scale-100 opacity-100"}
            `}
          />

          {/* Bottom Gradient Scrim for crisp text contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"
          />

          {/* Image Overlay: ONLY TITLE AS REQUESTED */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between z-10">
            <div className="animate-fadeIn">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide drop-shadow-md">
                {service.shortTitle}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
