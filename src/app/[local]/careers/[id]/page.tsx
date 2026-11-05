import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { JOB_POSITIONS } from "@/data/careersData";
import CareerDetailClient from "@/components/careers/CareerDetailClient";
import Breadcrumbs from "@/utils/Breadcrumb";
import heroImg from "@/assets/home/why-choose/why3.png";

interface PageProps {
  params: Promise<{ id: string; local: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  let job = JOB_POSITIONS.find((j) => j.id === id);

  if (!job) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiUrl}/careers/jobs/${id}`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        job = json.data;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!job) {
    return {
      title: "Job Details | TMYAZNA Careers",
    };
  }

  const title = locale === "ar" ? job.title.ar : job.title.en;
  const desc = locale === "ar" ? job.overview.ar : job.overview.en;

  return {
    title: `${title} | TMYAZNA Careers`,
    description: desc,
  };
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const locale = await getLocale();
  const t = await getTranslations("Careers");
  let job = JOB_POSITIONS.find((j) => j.id === id);

  if (!job) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiUrl}/careers/jobs/${id}`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        job = json.data;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!job) {
    const defaultJob = JOB_POSITIONS[0];
    if (!defaultJob) notFound();
    return (
      <main className="min-h-screen bg-background">
        <Breadcrumbs
          title={t("breadcrumb")}
          eyebrow={t("applicationEyebrow")}
          heading={locale === "ar" ? defaultJob.title.ar : defaultJob.title.en}
          description={locale === "ar" ? defaultJob.overview.ar : defaultJob.overview.en}
          image={heroImg}
          imageAlt={defaultJob.title.en}
        />
        <CareerDetailClient jobId={defaultJob.id} />
      </main>
    );
  }

  const title = locale === "ar" ? job.title.ar : job.title.en;
  const desc = locale === "ar" ? job.overview.ar : job.overview.en;

  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs
        title={t("breadcrumb")}
        eyebrow={t("applicationEyebrow")}
        heading={title}
        description={desc}
        image={heroImg}
        imageAlt={title}
      />
      <CareerDetailClient jobId={id} />
    </main>
  );
}
