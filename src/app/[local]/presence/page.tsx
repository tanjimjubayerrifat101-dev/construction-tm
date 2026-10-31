import { getLocale, getTranslations } from "next-intl/server";
import Breadcrumbs from "@/utils/Breadcrumb";
import heroImg from "@/assets/home/blog3.png";
import PresenceSection from "@/components/presence/PresenceSection";
import ProjectsRegionCTA from "@/components/projects/ProjectsRegionCTA";

export default async function PresencePage() {
  const locale = await getLocale();
  const t = await getTranslations("Presence");
  const isRtl = locale === "ar";

  return (
    <main className="min-h-screen bg-[#fcfdff] pb-16 lg:pb-24">
      <Breadcrumbs
        title={t("breadcrumb")}
        eyebrow={t("eyebrow")}
        heading={t("heading")}
        description={t("subheading")}
        image={heroImg}
      />

      <PresenceSection isRtl={isRtl} />

      <ProjectsRegionCTA isRtl={isRtl} />
    </main>
  );
}
