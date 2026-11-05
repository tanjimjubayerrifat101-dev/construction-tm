import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Breadcrumbs from "@/utils/Breadcrumb";
import { getLocalizedService, SERVICES_DATA } from "@/data/servicesData";
import ServiceDetailClient from "./ServiceDetailClient";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

interface PageProps {
  params: Promise<{ slug: string; local: string }>;
}

export const dynamic = "force-dynamic";

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("ServicePage");
  const isRtl = locale === "ar";

  let staticService = SERVICES_DATA.find((s) => s.slug === slug);
  let serviceData: any = null;

  if (staticService) {
    const localized = getLocalizedService(staticService, isRtl);
    serviceData = {
      name: localized.name,
      heading: localized.heading,
      description: localized.description,
      image: staticService.image,
      slug: staticService.slug,
    };
  } else {
    // Attempt backend fetch
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiUrl}/services/${slug}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        const apiItem = json?.data;
        if (apiItem) {
          serviceData = {
            name: isRtl ? (apiItem.name?.ar || apiItem.name?.en) : (apiItem.name?.en || apiItem.name?.ar),
            heading: isRtl ? (apiItem.heading?.ar || apiItem.heading?.en) : (apiItem.heading?.en || apiItem.heading?.ar),
            description: isRtl ? (apiItem.description?.ar || apiItem.description?.en) : (apiItem.description?.en || apiItem.description?.ar),
            image: resolveImageUrl(apiItem.image) || "/placeholder-service.jpg",
            slug: apiItem.slug,
          };
        }
      }
    } catch (err) {
      // Backend fetch failed or not running
    }
  }

  if (!serviceData) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner utilizing existing Breadcrumbs component */}
      <Breadcrumbs
        title={serviceData.name}
        eyebrow={t("eyebrow") || "OUR SERVICES"}
        heading={serviceData.heading}
        description={serviceData.description}
        image={serviceData.image}
        imageAlt={`${serviceData.name} — TMYAZNA Company Limited`}
      />

      {/* Main Service Details Content */}
      <ServiceDetailClient slug={serviceData.slug} isRtl={isRtl} />
    </main>
  );
}
