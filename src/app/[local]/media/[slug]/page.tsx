import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import Breadcrumbs from "@/utils/Breadcrumb";
import { BLOG_POSTS } from "@/data/blog";
import MediaDetailClient from "./MediaDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MediaDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const locale = await getLocale();
  const t = await getTranslations("Media");

  // Localised content (resolved server-side)
  const title    = locale === "ar" ? post.title.ar    : post.title.en;
  const excerpt  = locale === "ar" ? post.excerpt.ar  : post.excerpt.en;
  const body     = locale === "ar" ? post.body.ar     : post.body.en;
  const category = locale === "ar" ? post.category.ar : post.category.en;

  const formattedDate = new Intl.DateTimeFormat(
    locale === "ar" ? "ar-SA" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  ).format(new Date(post.date));

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero — post image as background */}
      <Breadcrumbs
        title={t("breadcrumb")}
        eyebrow={t("eyebrow")}
        heading={title}
        image={post.image}
        imageAlt={title}
      />

      {/* All interactive / animated UI lives in the client component */}
      <MediaDetailClient
        title={title}
        excerpt={excerpt}
        body={body}
        category={category}
        formattedDate={formattedDate}
        image={post.image}
        related={related}
        isRtl={locale === "ar"}
        labels={{
          backToMedia:     t("backToMedia"),
          publishedOn:     t("publishedOn"),
          relatedArticles: t("relatedArticles"),
        }}
      />
    </main>
  );
}
