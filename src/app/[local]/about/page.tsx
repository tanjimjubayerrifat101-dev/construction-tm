import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import HeroSection from "@/components/about/HeroSection";
import AboutUsSection from "@/components/about/AboutUsSection";
import StorySection from "@/components/about/StorySection";
import QuoteBannerSection from "@/components/about/QuoteBannerSection";
import LeadershipMessageSection from "@/components/about/LeadershipMessageSection";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import StatsCounterSection from "@/components/about/StatsCounterSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import TeamSection from "@/components/about/TeamSection";
import VideoReviewSection from "@/components/about/VideoReviewSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AboutPage");
  return {
    title: `${t("breadcrumb")} | TMYAZNA Construction`,
    description: t("subheading"),
  };
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />

      <AboutUsSection />

      <StorySection />

      {/* <QuoteBannerSection /> */}

      <LeadershipMessageSection />

      <MissionVisionSection />

      <StatsCounterSection />

      <CoreValuesSection />

      <TeamSection />
      <VideoReviewSection />
    </main>
  );
}
