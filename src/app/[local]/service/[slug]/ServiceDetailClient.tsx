"use client";

import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getLocalizedService,
  SERVICES_DATA,
} from "@/data/servicesData";
import ServiceAreaTabs from "@/components/service/details/ServiceAreaTabs";
import StandardServiceDetail from "@/components/service/details/StandardServiceDetail";
import ServiceCTA from "@/components/service/details/ServiceCTA";

interface ServiceDetailClientProps {
  slug: string;
  isRtl?: boolean;
}

export default function ServiceDetailClient({
  slug,
  isRtl = false,
}: ServiceDetailClientProps) {
  const sourceService = SERVICES_DATA.find((s) => s.slug === slug);
  if (!sourceService) return null;
  const service = getLocalizedService(sourceService, isRtl);

  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#f8fbff]" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container">
        {/* Back navigation link to /service */}
        <div className="mb-8">
          <Link
            href="/service"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors duration-200 group"
          >
            {isRtl ? (
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            ) : (
              <ArrowLeft
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                aria-hidden="true"
              />
            )}
            <span>{isRtl ? "العودة إلى كافة الخدمات" : "Back to all services"}</span>
          </Link>
        </div>

        {service.subDisciplines && service.subDisciplines.length > 0 ? (
          <ServiceAreaTabs
            subDisciplines={service.subDisciplines}
            tabHeading={
              service.tabHeading ??
              (isRtl ? "مجالات الخدمة" : "Service Areas")
            }
            catalogHeading={service.catalogHeading || "Catalog"}
            catalogItems={service.catalogItems}
            isRtl={isRtl}
          />
        ) : (
          <StandardServiceDetail
            service={service}
            isRtl={isRtl}
          />
        )}

        {/* Bottom CTA Banner */}
        <ServiceCTA serviceName={service.name} isRtl={isRtl} />
      </div>
    </div>
  );
}
