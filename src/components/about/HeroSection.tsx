import Breadcrumbs from "@/utils/Breadcrumb";
import { getTranslations } from "next-intl/server";
import HeroImage from "@/assets/service/srvice-home.png";

export default async function HeroSection() {
  const t = await getTranslations("AboutPage");

  return (
    <Breadcrumbs
      title={t("breadcrumb")}
      eyebrow={t("eyebrow")}
      heading={t("heading")}
      description={t("subheading")}
      image={HeroImage}
      imageAlt={t("heroImageAlt")}
    />
  );
}
