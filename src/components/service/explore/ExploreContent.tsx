"use client";

import { useLocale } from "next-intl";
import RollingButton from "@/utils/RollingButton";
import { getLocalizedService, type ServiceItemData } from "@/data/servicesData";

interface ExploreContentProps {
  service: ServiceItemData;
}

export default function ExploreContent({ service }: ExploreContentProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const localizedService = getLocalizedService(service, isRtl);

  // Split heading to colorize "Expertise" in accent blue if present
  const headingWords = localizedService.heading.split(" ");
  const lastWord = headingWords[headingWords.length - 1];
  const headingPrefix = headingWords.slice(0, -1).join(" ");
  const hasExpertiseAccent = lastWord?.toLowerCase() === "expertise";

  return (
    <div
      key={localizedService.id}
      id={`service-panel-${localizedService.id}`}
      role="tabpanel"
      aria-labelledby={`service-tab-${localizedService.id}`}
      className="flex flex-col justify-center animate-fadeIn"
    >
      {/* Index Counter */}
      {/* <div className="flex items-center gap-2 mb-4 text-sm font-bold tracking-widest text-secondary">
        <span className="w-8 h-[2px] bg-secondary" />
        <span>{localizedService.number}</span>
      </div> */}

      {/* Main Heading with Accent Text */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#001833] leading-[115%] mb-6">
        {hasExpertiseAccent ? (
          <>
            <span>{headingPrefix}</span>
            <span className="text-secondary block mt-1">{lastWord}</span>
          </>
        ) : (
          localizedService.heading
        )}
      </h2>

      {/* Description Paragraph */}
      <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl font-normal">
        {localizedService.description}
      </p>

      {/* Single Read More CTA Button using website standard RollingButton */}
      <div className="pt-2">
        <RollingButton
          text={isRtl ? "اقرأ المزيد" : "Read more"}
          href={`/service/${localizedService.slug}`}
          variant="primary"
          className="shadow-md"
        />
      </div>
    </div>
  );
}
