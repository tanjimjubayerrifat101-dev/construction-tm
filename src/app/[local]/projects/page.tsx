import { getLocale, getTranslations } from "next-intl/server";
import Breadcrumbs from "@/utils/Breadcrumb";
import heroImg from "@/assets/service/srvice-home.png";
import ProjectsStats from "@/components/projects/ProjectsStats";
import FlagshipProject from "@/components/projects/FlagshipProject";
import ProjectsFilterGrid from "@/components/projects/ProjectsFilterGrid";
import ProjectsRegionCTA from "@/components/projects/ProjectsRegionCTA";

export default async function ProjectsPage() {
  const locale = await getLocale();
  const t = await getTranslations("Navigation");
  const isRtl = locale === "ar";

  const breadcrumbTitle = isRtl ? "المشاريع" : "Projects";
  const eyebrow = isRtl ? "مشاريعنا" : "OUR PROJECTS";
  const heading = isRtl
    ? "تنفيذ مشاريع المملكة الكبرى"
    : "Delivering the Kingdom's landmark projects";
  const description = isRtl
    ? "محفظة مشاريع متكاملة تغطي تكامل الأنظمة، الإنشاءات، المرافق، القوى العاملة والبيئة — بأعلى المعايير في المملكة."
    : "A portfolio spanning systems integration, construction, facilities, manpower and the environment — built to the highest standards across Saudi Arabia.";

  return (
    <main className="min-h-screen bg-[#fcfdff]">
      {/* Hero Banner utilizing existing Breadcrumbs component */}
      <Breadcrumbs
        title={breadcrumbTitle}
        eyebrow={eyebrow}
        heading={heading}
        description={description}
        image={heroImg}
        imageAlt="Delivering the Kingdom's Landmark Projects — TMYAZNA"
      />

      {/* Floating Key Metrics Strip */}
      <ProjectsStats isRtl={isRtl} />

      {/* Flagship Delivery Featured Card */}
      <FlagshipProject isRtl={isRtl} />

      {/* Filterable Portfolio Grid with Modern Hover Effects */}
      <ProjectsFilterGrid isRtl={isRtl} />

      {/* Regional Exploration CTA Banner */}
      <ProjectsRegionCTA isRtl={isRtl} />
    </main>
  );
}
