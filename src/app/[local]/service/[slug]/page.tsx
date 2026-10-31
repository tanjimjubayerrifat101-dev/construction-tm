import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Breadcrumbs from "@/utils/Breadcrumb";
import { getLocalizedService, SERVICES_DATA } from "@/data/servicesData";
import ServiceDetailClient from "./ServiceDetailClient";

interface PageProps {
  params: Promise<{ slug: string; local: string }>;
}

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  const locale = await getLocale();
  const t = await getTranslations("ServicePage");
  const isRtl = locale === "ar";
  const localizedService = getLocalizedService(service, isRtl);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner utilizing existing Breadcrumbs component */}
      <Breadcrumbs
        title={localizedService.name}
        eyebrow={t("eyebrow") || "OUR SERVICES"}
        heading={localizedService.heading}
        description={localizedService.description}
        image={service.image}
        imageAlt={`${localizedService.name} — TMYAZNA Company Limited`}
      />

      {/* Main Service Details Content */}
      <ServiceDetailClient slug={service.slug} isRtl={isRtl} />
    </main>
  );
}
