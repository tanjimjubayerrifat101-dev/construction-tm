import { getTranslations } from "next-intl/server";
import Breadcrumbs from "@/utils/Breadcrumb";
import MediaSearchGrid from "@/components/media/MediaSearchGrid";
import heroImg from "@/assets/home/blog1.png";

export default async function MediaPage() {
  const t = await getTranslations("Media");

  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs
        title={t("breadcrumb")}
        eyebrow={t("eyebrow")}
        heading={t("heading")}
        description={t("subheading")}
        image={heroImg}
        imageAlt="Media Center — TMYAZNA News & Insights"
      />

      <MediaSearchGrid
        searchPlaceholder={t("searchPlaceholder")}
        prevLabel={t("prevPage")}
        nextLabel={t("nextPage")}
        pageLabel={t.raw("pageOf") as string}
        noResultsLabel={t("noResults")}
        noResultsSubLabel={t("noResultsSub")}
      />
    </main>
  );
}
