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

export function generateStaticParams() {
  return JOB_POSITIONS.map((job) => ({
    id: job.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  const job = JOB_POSITIONS.find((j) => j.id === id);

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
  const job = JOB_POSITIONS.find((j) => j.id === id);

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


