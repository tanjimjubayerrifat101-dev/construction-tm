"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { getLocalizedService, SERVICES_DATA } from "@/data/servicesData";
import ExploreTabNav from "./explore/ExploreTabNav";
import ExploreContent from "./explore/ExploreContent";
import ExploreImageCard from "./explore/ExploreImageCard";

export default function ExploreSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const locale = useLocale();
  const isRtl = locale === "ar";

  const activeService = SERVICES_DATA[activeIndex] || SERVICES_DATA[0];
  const localizedActiveService = getLocalizedService(activeService, isRtl);

  return (
    <section
      id="explore-services"
      aria-label="Explore TMYAZNA Services"
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-[#fbfdff] overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container">
        {/* Top Service Lines Navigation Pills */}
        <ExploreTabNav
          services={SERVICES_DATA}
          activeIndex={activeIndex}
          onSelectTab={setActiveIndex}
        />

        {/* 2-Column Content + Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, Description, Read More CTA */}
          <div className="lg:col-span-6 xl:col-span-7">
            <ExploreContent service={localizedActiveService} />
          </div>

          {/* Right Column: Animated Image Card with Zoom-Out & Title-Only Overlay */}
          <div className="lg:col-span-6 xl:col-span-5">
            <ExploreImageCard service={localizedActiveService} />
          </div>
        </div>
      </div>
    </section>
  );
}