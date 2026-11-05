"use client";

import { useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, Cpu, Layers } from "lucide-react";
import {
  getLocalizedService,
  SERVICES_DATA,
} from "@/data/servicesData";
import ServiceAreaTabs from "@/components/service/details/ServiceAreaTabs";
import StandardServiceDetail from "@/components/service/details/StandardServiceDetail";
import ServiceCTA from "@/components/service/details/ServiceCTA";
import { useGetServiceBySlugQuery } from "@/redux/features/service/serviceApi";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

interface ServiceDetailClientProps {
  slug: string;
  isRtl?: boolean;
}

export default function ServiceDetailClient({
  slug,
  isRtl = false,
}: ServiceDetailClientProps) {
  const { data: apiData } = useGetServiceBySlugQuery({ slug });

  const service = useMemo(() => {
    if (apiData?.data) {
      const item = apiData.data;
      return {
        id: item.slug,
        number: item.number,
        name: isRtl ? (item.name?.ar || item.name?.en) : (item.name?.en || item.name?.ar),
        shortTitle: isRtl ? (item.shortTitle?.ar || item.shortTitle?.en) : (item.shortTitle?.en || item.shortTitle?.ar),
        heading: isRtl ? (item.heading?.ar || item.heading?.en) : (item.heading?.en || item.heading?.ar),
        description: isRtl ? (item.description?.ar || item.description?.en) : (item.description?.en || item.description?.ar),
        tabHeading: item.tabHeading ? (isRtl ? (item.tabHeading.ar || item.tabHeading.en) : (item.tabHeading.en || item.tabHeading.ar)) : (isRtl ? "مجالات الخدمة" : "Service Areas"),
        catalogHeading: item.catalogHeading ? (isRtl ? (item.catalogHeading.ar || item.catalogHeading.en) : (item.catalogHeading.en || item.catalogHeading.ar)) : (isRtl ? "كتالوج التجهيزات" : "Catalog"),
        coreCapabilitiesHeading: item.coreCapabilitiesHeading ? (isRtl ? (item.coreCapabilitiesHeading.ar || item.coreCapabilitiesHeading.en) : (item.coreCapabilitiesHeading.en || item.coreCapabilitiesHeading.ar)) : undefined,
        coreDescription: item.coreDescription ? (isRtl ? (item.coreDescription.ar || item.coreDescription.en) : (item.coreDescription.en || item.coreDescription.ar)) : undefined,
        coreCapabilities: isRtl ? (item.coreCapabilities?.ar || item.coreCapabilities?.en || []) : (item.coreCapabilities?.en || item.coreCapabilities?.ar || []),
        subDisciplines: (item.subDisciplines || []).map((sub) => ({
          id: sub.id,
          tabTitle: isRtl ? (sub.tabTitle?.ar || sub.tabTitle?.en) : (sub.tabTitle?.en || sub.tabTitle?.ar),
          heading: isRtl ? (sub.heading?.ar || sub.heading?.en) : (sub.heading?.en || sub.heading?.ar),
          description: isRtl ? (sub.description?.ar || sub.description?.en) : (sub.description?.en || sub.description?.ar),
          capabilitiesHeading: sub.capabilitiesHeading ? (isRtl ? (sub.capabilitiesHeading.ar || sub.capabilitiesHeading.en) : (sub.capabilitiesHeading.en || sub.capabilitiesHeading.ar)) : (isRtl ? "القدرات الرئيسية" : "Core Capabilities"),
          capabilities: isRtl ? (sub.capabilities?.ar || sub.capabilities?.en || []) : (sub.capabilities?.en || sub.capabilities?.ar || []),
          icon: Cpu,
        })),
        catalogItems: (item.catalogItems || []).map((cat) => ({
          id: cat.id,
          title: isRtl ? (cat.title?.ar || cat.title?.en) : (cat.title?.en || cat.title?.ar),
          description: isRtl ? (cat.description?.ar || cat.description?.en) : (cat.description?.en || cat.description?.ar),
          badge: cat.badge ? (isRtl ? (cat.badge.ar || cat.badge.en) : (cat.badge.en || cat.badge.ar)) : undefined,
          image: resolveImageUrl(cat.image) || "/placeholder-service.jpg",
        })),
      };
    }

    const sourceService = SERVICES_DATA.find((s) => s.slug === slug);
    if (sourceService) {
      return getLocalizedService(sourceService, isRtl);
    }
    return null;
  }, [apiData, slug, isRtl]);

  if (!service) return null;

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
            subDisciplines={service.subDisciplines as any}
            tabHeading={
              service.tabHeading ??
              (isRtl ? "مجالات الخدمة" : "Service Areas")
            }
            catalogHeading={service.catalogHeading || "Catalog"}
            catalogItems={service.catalogItems as any}
            isRtl={isRtl}
          />
        ) : (
          <StandardServiceDetail
            service={service as any}
            isRtl={isRtl}
          />
        )}

        {/* Bottom CTA Banner */}
        <ServiceCTA serviceName={service.name} isRtl={isRtl} />
      </div>
    </div>
  );
}
