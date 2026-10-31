"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Search, X, ChevronLeft, ChevronRight, FileSearch, ArrowRight } from "lucide-react";

import BlogCard from "@/components/home/BlogCard";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { BLOG_POSTS } from "@/data/blog";

const POSTS_PER_PAGE = 12;

interface MediaSearchGridProps {
  searchPlaceholder: string;
  prevLabel: string;
  nextLabel: string;
  pageLabel: string; // "Page {current} of {total}"
  noResultsLabel: string;
  noResultsSubLabel: string;
}

export default function MediaSearchGrid({
  searchPlaceholder,
  prevLabel,
  nextLabel,
  pageLabel,
  noResultsLabel,
  noResultsSubLabel,
}: MediaSearchGridProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const locale = useLocale();
  const isRtl = locale === "ar";
  const blogTranslations = useTranslations("Blog");

  const latestPost = useMemo(
    () =>
      BLOG_POSTS.reduce((latest, post) =>
        post.date > latest.date ? post : latest
      ),
    []
  );

  // Feature the latest post by default; search still includes every post.
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const archivePosts = BLOG_POSTS.filter(
      (post) => post.slug !== latestPost.slug
    );
    if (!q) return archivePosts;
    return BLOG_POSTS.filter((post) => {
      const fields = [
        post.title.en,
        post.title.ar,
        post.category.en,
        post.category.ar,
        post.excerpt.en,
        post.excerpt.ar,
      ];
      return fields.some((f) => f.toLowerCase().includes(q));
    });
  }, [latestPost, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));

  // Reset to page 1 whenever search changes
  const handleSearch = useCallback((val: string) => {
    setQuery(val);
    setPage(1);
  }, []);

  const pagePosts = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  // Build page numbers with ellipsis
  const pageNumbers = useMemo((): (number | "ellipsis")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "ellipsis")[] = [1];
    if (page > 3) pages.push("ellipsis");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  }, [page, totalPages]);

  const pageLabelStr = pageLabel
    .replace("{current}", String(page))
    .replace("{total}", String(totalPages));

  const latestTitle = latestPost
    ? isRtl
      ? latestPost.title.ar
      : latestPost.title.en
    : "";
  const dateObj = latestPost ? new Date(latestPost.date) : null;
  const latestDate = dateObj
    ? new Intl.DateTimeFormat(isRtl ? "ar-SA" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(dateObj)
    : "";

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="container">
        {latestPost && !query.trim() && (
          <article
            className="mb-12 grid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-secondary hover:shadow-[inset_0_12px_40px_rgba(0,134,255,0.12)] md:grid-cols-2"
            dir="ltr"
          >
            <div className="group relative min-h-64 overflow-hidden md:min-h-96">
              <Image
                src={latestPost.image}
                alt={latestTitle}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                placeholder="blur"
              />
            </div>

            <div
              className="flex flex-col justify-center p-6 sm:p-8 lg:p-12"
              dir={isRtl ? "rtl" : "ltr"}
            >
              <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                {/* <span className="rounded-full bg-secondary/10 px-3 py-1 font-semibold text-primary">
                  {isRtl ? latestPost.category.ar : latestPost.category.en}
                </span> */}
                <time dateTime={latestPost.date} className="text-slate-500">
                  {latestDate}
                </time>
              </div>

              <h2 className="mb-4 text-2xl font-bold leading-snug text-foreground sm:text-3xl lg:text-4xl">
                {latestTitle}
              </h2>
              <p className="mb-7 text-sm leading-7 text-slate-600 sm:text-base">
                {isRtl ? latestPost.excerpt.ar : latestPost.excerpt.en}
              </p>

              <Link
                href={`/media/${latestPost.slug}`}
                aria-label={`${blogTranslations("readMore")} — ${latestTitle}`}
                className="group/link inline-flex w-fit items-center gap-2 font-semibold text-primary transition-colors hover:text-secondary"
              >
                <span>{blogTranslations("readMore")}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>
        )}

        {/* ── Search bar ── */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            {/* Blue glow ring on focus — pure CSS */}
            <div
              className="
                absolute -inset-0.5 rounded-2xl pointer-events-none
                bg-gradient-to-r from-primary/30 via-secondary/40 to-primary/30
                opacity-0 group-focus-within:opacity-100
                transition-opacity duration-500 blur-sm
              "
              aria-hidden="true"
            />

            <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden group-focus-within:border-secondary/60 transition-colors duration-300">
              <Search
                className="absolute start-4 w-5 h-5 text-slate-400 group-focus-within:text-secondary transition-colors duration-300 pointer-events-none shrink-0"
                aria-hidden="true"
              />

              <Input
                id="media-search"
                type="search"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="
                  !border-0 !ring-0 !shadow-none !rounded-none !outline-none
                  bg-transparent
                  h-14 ps-12 pe-12
                  text-base text-slate-800 placeholder:text-slate-400
                "
                aria-label={searchPlaceholder}
              />

              {/* Clear button — CSS only visibility */}
              <button
                onClick={() => handleSearch("")}
                aria-label="Clear search"
                type="button"
                className={`
                  absolute end-4 flex items-center justify-center w-7 h-7
                  rounded-full bg-slate-100 hover:bg-red-100
                  text-slate-400 hover:text-red-500
                  transition-all duration-200
                  ${query ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"}
                `}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Result count */}
          <p
            className={`
              text-sm text-slate-500 mt-3 text-center
              transition-opacity duration-200
              ${query ? "opacity-100" : "opacity-0 select-none"}
            `}
          >
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        </div>

        {/* ── Posts grid ── */}
        {pagePosts.length > 0 ? (
          <div
            key={`${page}-${query}`}
            className="grid gap-7 animate-fadeIn"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))" }}
          >
            {pagePosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-2">
              <FileSearch className="w-9 h-9 text-slate-400" />
            </div>
            <p className="text-xl font-semibold text-primary">{noResultsLabel}</p>
            <p className="text-slate-500 text-sm max-w-xs">{noResultsSubLabel}</p>
            <button
              onClick={() => handleSearch("")}
              className="mt-2 text-sm font-semibold text-secondary hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="mt-14 flex flex-col items-center gap-4">
            {/* Page counter label */}
            <p className="text-sm text-slate-500 font-medium">{pageLabelStr}</p>

            <Pagination>
              <PaginationContent className="gap-1 flex-wrap justify-center">
                {/* Previous */}
                <PaginationItem>
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    aria-label="Previous page"
                    className="
                      inline-flex items-center gap-1.5
                      h-10 px-4 rounded-xl text-sm font-semibold
                      border border-slate-200 bg-white text-primary
                      hover:border-secondary hover:text-secondary hover:bg-secondary/5
                      disabled:opacity-40 disabled:pointer-events-none
                      transition-all duration-200
                    "
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{prevLabel}</span>
                  </button>
                </PaginationItem>

                {/* Page numbers */}
                {pageNumbers.map((p, i) =>
                  p === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={p === page}
                        onClick={(e) => { e.preventDefault(); setPage(p as number); }}
                        href="#"
                        className={`
                          h-10 w-10 rounded-xl text-sm font-semibold border
                          transition-all duration-200
                          ${p === page
                            ? "bg-primary text-white border-primary shadow-[0_4px_14px_rgba(0,65,135,0.25)] scale-105"
                            : "bg-white text-slate-700 border-slate-200 hover:border-secondary hover:text-secondary hover:bg-secondary/5"
                          }
                        `}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                {/* Next */}
                <PaginationItem>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    aria-label="Next page"
                    className="
                      inline-flex items-center gap-1.5
                      h-10 px-4 rounded-xl text-sm font-semibold
                      border border-slate-200 bg-white text-primary
                      hover:border-secondary hover:text-secondary hover:bg-secondary/5
                      disabled:opacity-40 disabled:pointer-events-none
                      transition-all duration-200
                    "
                  >
                    <span className="hidden sm:inline">{nextLabel}</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
}
