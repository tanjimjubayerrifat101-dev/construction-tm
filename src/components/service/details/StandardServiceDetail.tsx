"use client";

import { type ServiceItemData } from "@/data/servicesData";
import ServiceCatalog from "./ServiceCatalog";

interface StandardServiceDetailProps {
  service: ServiceItemData;
  isRtl?: boolean;
}

export default function StandardServiceDetail({
  service,
  isRtl = false,
}: StandardServiceDetailProps) {
  return (
    <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(220px,3fr)]">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-10 lg:p-14">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#001833] sm:text-3xl lg:text-4xl">
          {service.heading}
        </h2>

        <p className="mb-10 max-w-4xl text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
          {service.coreDescription || service.description}
        </p>

        {service.coreCapabilitiesHeading && service.coreCapabilities && (
          <div className="border-t border-slate-100 pt-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 sm:text-sm">
                {service.coreCapabilitiesHeading}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-4 xl:grid-cols-2">
              {service.coreCapabilities.map((capability, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-slate-50"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 select-none text-sm font-bold text-secondary transition-transform group-hover:scale-125"
                  >
                    ◆
                  </span>
                  <span className="text-sm font-medium leading-snug text-slate-700 lg:whitespace-nowrap xl:text-sm">
                    {capability}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ServiceCatalog
        heading={service.catalogHeading || "Catalog"}
        items={service.catalogItems}
        isRtl={isRtl}
      />
    </div>
  );
}
