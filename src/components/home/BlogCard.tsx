"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/data/blog";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}


export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("Blog");
  const tMedia = useTranslations("Media");

  // Localise date
  const dateObj = new Date(post.date);
  const dayStr = new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    day: "numeric",
  }).format(dateObj);
  const monthYearStr = new Intl.DateTimeFormat(
    locale === "ar" ? "ar-SA" : "en-GB",
    { month: "short", year: "numeric" }
  ).format(dateObj);
  const formattedDate = new Intl.DateTimeFormat(
    locale === "ar" ? "ar-SA" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  ).format(dateObj);

  const title = locale === "ar" ? post.title.ar : post.title.en;
  const excerpt = locale === "ar" ? post.excerpt.ar : post.excerpt.en;

  // Detail page — /media/[slug]
  const href = `/media/${post.slug}`;

  return (
    <article
      dir={featured ? "ltr" : undefined}
      className={`blog-card group relative ${
        featured
          ? "flex flex-col gap-6 overflow-hidden rounded-2xl border border-gray-100 bg-background p-4 sm:p-6 md:flex-row md:items-stretch"
          : "flex flex-col bg-background rounded-2xl border border-gray-100 p-4 sm:p-5 motion-safe:transition-all motion-safe:duration-300 hover:border-secondary hover:-translate-y-1.5 hover:shadow-[inset_0_12px_40px_rgba(0,134,255,0.15)] focus-within:border-secondary focus-within:-translate-y-1.5 focus-within:shadow-[inset_0_12px_40px_rgba(0,134,255,0.15)] h-full"
      }`}
    >
      {/* ── Media area ── */}
      <div
        className={`relative overflow-hidden rounded-xl isolate ${
          featured ? "w-full shrink-0 md:w-1/2" : ""
        }`}
        style={{ aspectRatio: featured ? "16 / 9" : "4 / 3" }}
      >
        {!featured && (
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.10) 45%, transparent 100%)",
            }}
            aria-hidden="true"
          />
        )}

        {/* Image — scales on card hover only, clipped by overflow:hidden */}
        <Image
          src={post.image}
          alt={locale === "ar" ? post.title.ar : post.title.en}
          fill
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="
            object-cover
            motion-safe:transition-transform motion-safe:duration-900 motion-safe:ease-out
            group-hover:scale-110
          "
          loading="lazy"
          placeholder="blur"
        />

        {!featured && (
          <div className="blog-card-bar absolute inset-x-3 bottom-3 z-20 flex items-center justify-between rounded-xl border border-white/25 bg-neutral-950/45 px-4 py-3 shadow-[0_8px_25px_rgba(0,0,0,0.28)] backdrop-blur-xl saturate-150 motion-safe:transition-all motion-safe:duration-550 motion-safe:ease-out">
            <div className="flex shrink-0 flex-col leading-none">
              <span
                className={`text-2xl font-bold leading-none text-white ${
                  !isRtl ? "uppercase tracking-tight" : ""
                }`}
              >
                {dayStr}
              </span>
              <span
                className={`mt-1 text-[11px] font-medium text-white/80 ${
                  !isRtl ? "uppercase tracking-wider" : ""
                }`}
              >
                {monthYearStr}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div
        dir={featured ? (isRtl ? "rtl" : "ltr") : undefined}
        className={`flex flex-col flex-1 gap-4 sm:gap-5 ${
          featured ? "justify-center py-2 md:py-6 md:px-2" : "pt-5 pb-2 px-1"
        }`}
      >
        {featured && (
          <p className="text-sm font-medium text-slate-500">
            {tMedia("publishedOn")}{" "}
            <time dateTime={post.date} className="font-semibold text-primary">
              {formattedDate}
            </time>
          </p>
        )}

        {/* Title — 3-line clamp, turns brand-blue on hover */}
        <h3
          className="
            text-base lg:text-lg font-bold leading-snug
            text-foreground
            line-clamp-3
            motion-safe:transition-colors motion-safe:duration-300
            group-hover:text-primary
            rtl:leading-relaxed
            flex-1
          "
        >
          {title}
        </h3>

        {featured && (
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            {excerpt}
          </p>
        )}

        {/* Read more row with left-to-right animated underline */}
        <div className="flex items-center justify-between pt-2 mt-auto">
          <Link
            href={href}
            aria-label={`${t("readMore")} — ${title}`}
            className="
              stretched-link group/link
              relative inline-flex items-center gap-2
              text-sm font-semibold text-primary
              transition-colors duration-300
              hover:text-secondary
              focus-visible:outline-none
            "
          >
            <span className="relative inline-block py-0.5">
              <span>{t("readMore")}</span>
              {/* Smooth animated underline starting exactly from the start of "Read more" text */}
              <span
                className="
                  absolute -bottom-0.5 left-0 rtl:left-auto rtl:right-0
                  h-[2px] w-0 bg-primary
                  transition-all duration-300 ease-out
                  group-hover:w-full group-hover/link:w-full
                  group-hover:bg-secondary
                "
                aria-hidden="true"
              />
            </span>

            <ArrowRight
              className="
                w-4 h-4 text-primary
                transition-all duration-300 ease-out
                group-hover:translate-x-1.5 group-hover:text-secondary
                rtl:rotate-180 rtl:group-hover:-translate-x-1.5
              "
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
