"use client";

import Image, { type StaticImageData } from "next/image";
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react";

import { Link } from "@/i18n/navigation";
import BlogCard from "@/components/home/BlogCard";
import FadeUp from "@/utils/FadeUp";
import type { BlogPost } from "@/data/blog";

interface Labels {
  backToMedia: string;
  publishedOn: string;
  relatedArticles: string;
}

interface MediaDetailClientProps {
  title: string;
  excerpt: string;
  body: string;
  category: string;
  formattedDate: string;
  image: StaticImageData;
  related: BlogPost[];
  isRtl: boolean;
  labels: Labels;
}

export default function MediaDetailClient({
  title,
  excerpt,
  body,
  category,
  formattedDate,
  image,
  related,
  isRtl,
  labels,
}: MediaDetailClientProps) {
  return (
    <>
      {/* ── Article body ── */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">

            {/* Back link */}
            <FadeUp duration={0.6} y={20} threshold="top 95%">
              <Link
                href="/media"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors duration-300 mb-10 group"
              >
                {isRtl ? (
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowLeft
                    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                )}
                {labels.backToMedia}
              </Link>
            </FadeUp>

            {/* Meta row — category + date */}
            <FadeUp duration={0.6} y={20} delay={0.05} threshold="top 95%">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Category badge */}
                {/* <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/25 text-secondary text-xs font-semibold uppercase tracking-wider">
                  <Tag className="w-3 h-3" aria-hidden="true" />
                  {category}
                </span> */}

                {/* Date */}
                <span className="inline-flex items-center gap-1.5 text-slate-500 text-sm">
                  <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>
                    {labels.publishedOn} {formattedDate}
                  </span>
                </span>
              </div>
            </FadeUp>

            {/* Article title */}
            <FadeUp duration={0.7} y={25} delay={0.1} threshold="top 95%">
              <h1
                className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-6 ${
                  isRtl ? "rtl:leading-[1.35]" : ""
                }`}
              >
                {title}
              </h1>
            </FadeUp>

            {/* Excerpt / lead paragraph */}
            <FadeUp duration={0.7} y={25} delay={0.15} threshold="top 95%">
              <p
                className={`text-lg lg:text-xl text-slate-600 leading-relaxed mb-8 font-medium border-s-4 border-secondary ps-5 ${
                  isRtl ? "rtl:leading-[1.8]" : ""
                }`}
              >
                {excerpt}
              </p>
            </FadeUp>

            {/* Hero image */}
            <FadeUp duration={0.7} y={30} delay={0.2} threshold="top 95%">
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-xl mb-10"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
                  className="object-cover"
                  priority
                  placeholder="blur"
                />
                {/* Subtle gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 55%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </FadeUp>

            {/* Body text */}
            <FadeUp duration={0.7} y={25} delay={0.25} threshold="top 95%">
              <div
                className={`space-y-5 text-slate-700 text-base sm:text-lg leading-relaxed ${
                  isRtl ? "rtl:text-right rtl:leading-[1.9]" : ""
                }`}
              >
                {body.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </FadeUp>

            {/* Divider */}
            <FadeUp duration={0.5} y={15} delay={0.3} threshold="top 95%">
              <div className="mt-14 mb-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Related Articles ── */}
      {related.length > 0 && (
        <section className="pb-20 md:pb-24">
          <div className="container">
            <FadeUp duration={0.6} y={20} threshold="top 95%">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-10 text-center">
                {labels.relatedArticles}
              </h2>
            </FadeUp>

            <div
              className="grid gap-7"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              }}
            >
              {related.map((relPost) => (
                <BlogCard key={relPost.slug} post={relPost} />
              ))}
            </div>

            {/* Back to Media Center CTA */}
            <FadeUp duration={0.6} y={20} delay={0.1} threshold="top 95%">
              <div className="flex justify-center mt-12">
                <Link
                  href="/media"
                  className="
                    inline-flex items-center gap-2.5
                    px-8 py-4 rounded-xl
                    bg-primary text-white font-semibold text-sm
                    hover:bg-secondary transition-all duration-300
                    shadow-[0_4px_20px_rgba(0,65,135,0.25)]
                    hover:shadow-[0_6px_28px_rgba(0,134,255,0.35)]
                    hover:-translate-y-0.5
                    group
                  "
                >
                  {isRtl ? (
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowLeft
                      className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                  )}
                  {labels.backToMedia}
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      )}
    </>
  );
}
