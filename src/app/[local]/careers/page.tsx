import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CareersHero from "@/components/careers/CareersHero";
import WhyWorkWithUs from "@/components/careers/WhyWorkWithUs";
import OpenPositionsSection from "@/components/careers/OpenPositionsSection";
import HiringProcessSection from "@/components/careers/HiringProcessSection";
import CareersCtaBanner from "@/components/careers/CareersCtaBanner";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Careers");
  return {
    title: `${t("breadcrumb")} | TMYAZNA Construction`,
    description: t("subheading"),
  };
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">

      <CareersHero />
      
      <OpenPositionsSection />

      <WhyWorkWithUs />





      <HiringProcessSection />


      <CareersCtaBanner />
    </main>
  );
}
