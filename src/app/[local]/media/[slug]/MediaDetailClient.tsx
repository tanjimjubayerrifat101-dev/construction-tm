"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Calendar, Loader2 } from "lucide-react";

import { Link } from "@/i18n/navigation";
import Breadcrumbs from "@/utils/Breadcrumb";
import FadeUp from "@/utils/FadeUp";
import { BLOG_POSTS } from "@/data/blog";
import { useLazyGetMediaPostsQuery } from "@/redux/features/media/mediaApi";
import type { IMediaPostItem } from "@/redux/features/media/mediaTypes";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

interface MediaDetailClientProps {
  slug: string;
}

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  date: string;
  image?: string | StaticImageData;
}

function localize(value: { en: string; ar: string }, isRtl: boolean) {
  return isRtl ? value.ar || value.en : value.en || value.ar;
}

function formatDate(value: string, locale: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function RelatedArticleCard({
  post,
  isRtl,
}: {
  post: IMediaPostItem;
  isRtl: boolean;
}) {
  const title = localize(post.title, isRtl);
  const imageUrl = resolveImageUrl(post.image);
  const readMore = useTranslations("Blog")("readMore");

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <Link href={`/media/${post.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#001833] to-[#004187]">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-5">
          <h3 className="line-clamp-3 font-bold leading-snug text-foreground group-hover:text-primary">
            {title}
          </h3>
          <span className="mt-4 inline-block text-sm font-semibold text-primary">
            {readMore}
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function MediaDetailClient({ slug }: MediaDetailClientProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("Media");
  const [apiPost, setApiPost] = useState<IMediaPostItem | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<IMediaPostItem[]>([]);
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "error" | "not-found">(
    "loading",
  );
  const [getMediaPosts] = useLazyGetMediaPostsQuery();

  useEffect(() => {
    let cancelled = false;

    async function findPost() {
      try {
        let page = 1;
        while (!cancelled) {
          const result = await getMediaPosts({
            page,
            limit: 50,
            isPublished: "true",
          }).unwrap();
          const match = result.data.find((item) => item.slug === slug);

          if (match) {
            if (!cancelled) {
              setApiPost(match);
              setRelatedPosts(
                result.data.filter((item) => item.slug !== slug).slice(0, 3),
              );
              setLoadState("loaded");
            }
            return;
          }

          if (page >= result.meta.totalPage) break;
          page += 1;
        }

        if (!cancelled) setLoadState("not-found");
      } catch {
        if (!cancelled) setLoadState("error");
      }
    }

    void findPost();
    return () => {
      cancelled = true;
    };
  }, [getMediaPosts, slug]);

  const staticPost = BLOG_POSTS.find((item) => item.slug === slug);
  const article: Article | null = apiPost
    ? {
        slug: apiPost.slug,
        title: localize(apiPost.title, isRtl),
        excerpt: localize(apiPost.excerpt, isRtl),
        body: localize(apiPost.body, isRtl),
        category: localize(apiPost.category, isRtl),
        date: apiPost.date,
        image: resolveImageUrl(apiPost.image),
      }
    : staticPost
      ? {
          slug: staticPost.slug,
          title: localize(staticPost.title, isRtl),
          excerpt: localize(staticPost.excerpt, isRtl),
          body: localize(staticPost.body, isRtl),
          category: localize(staticPost.category, isRtl),
          date: staticPost.date,
          image: staticPost.image,
        }
      : null;

  if (loadState === "loading" && !article) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading article" />
      </div>
    );
  }

  if (!article) {
    return (
      <main className="container flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-primary">
          {loadState === "error"
            ? isRtl
              ? "تعذّر تحميل المقال."
              : "Failed to load this article."
            : isRtl
              ? "المقال غير موجود."
              : "Article not found."}
        </h1>
        <Link href="/media" className="font-semibold text-secondary hover:underline">
          {t("backToMedia")}
        </Link>
      </main>
    );
  }

  const formattedDate = formatDate(article.date, locale);
  const paragraphs = article.body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const imageUrl =
    typeof article.image === "string"
      ? resolveImageUrl(article.image)
      : article.image;
  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs
        title={t("breadcrumb")}
        eyebrow={t("eyebrow")}
        heading={article.title}
        image={article.image}
        imageAlt={article.title}
      />

      <section className="py-16 md:py-20 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <FadeUp duration={0.6} y={20} threshold="top 95%">
              <Link
                href="/media"
                className="group mb-10 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-secondary"
              >
                {isRtl ? (
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowLeft
                    className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                )}
                {t("backToMedia")}
              </Link>
            </FadeUp>

            <FadeUp duration={0.6} y={20} delay={0.05} threshold="top 95%">
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-sm text-slate-500">
                  <Calendar className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {t("publishedOn")} {formattedDate}
                  </span>
                </span>
                <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                  {article.category}
                </span>
              </div>
            </FadeUp>

            <FadeUp duration={0.7} y={25} delay={0.1} threshold="top 95%">
              <h1
                className={`mb-6 text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl ${
                  isRtl ? "rtl:leading-[1.35]" : ""
                }`}
              >
                {article.title}
              </h1>
              <p
                className={`mb-8 border-s-4 border-secondary ps-5 text-lg font-medium leading-relaxed text-slate-600 lg:text-xl ${
                  isRtl ? "rtl:leading-[1.8]" : ""
                }`}
              >
                {article.excerpt}
              </p>
            </FadeUp>

            <FadeUp duration={0.7} y={30} delay={0.2} threshold="top 95%">
              <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#001833] to-[#004187] shadow-xl">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    unoptimized={typeof imageUrl === "string"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </FadeUp>

            <FadeUp duration={0.7} y={25} delay={0.25} threshold="top 95%">
              <div
                dir={isRtl ? "rtl" : "ltr"}
                className="space-y-5 whitespace-pre-line text-base leading-relaxed text-slate-700 sm:text-lg"
              >
                {paragraphs.map((paragraph, index) => (
                  <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
                ))}
              </div>
            </FadeUp>

            <FadeUp duration={0.5} y={15} delay={0.3} threshold="top 95%">
              <div className="mb-4 mt-14 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </FadeUp>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="pb-20 md:pb-24">
          <div className="container">
            <FadeUp duration={0.6} y={20} threshold="top 95%">
              <h2 className="mb-10 text-center text-2xl font-bold text-primary md:text-3xl">
                {t("relatedArticles")}
              </h2>
            </FadeUp>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <RelatedArticleCard key={post._id} post={post} isRtl={isRtl} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
