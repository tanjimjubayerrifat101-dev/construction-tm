"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  FileSearch,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useGetMediaPostsQuery } from "@/redux/features/media/mediaApi";
import type { IMediaPostItem } from "@/redux/features/media/mediaTypes";
import { resolveImageUrl } from "@/utils/resolveImageUrl";

const POSTS_PER_PAGE = 12;

interface MediaSearchGridProps {
  searchPlaceholder: string;
  prevLabel: string;
  nextLabel: string;
  pageLabel: string;
  noResultsLabel: string;
  noResultsSubLabel: string;
}

function MediaCard({ post }: { post: IMediaPostItem }) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("Blog");
  const tMedia = useTranslations("Media");

  const title = isRtl ? post.title.ar : post.title.en;
  const excerpt = isRtl ? post.excerpt.ar : post.excerpt.en;
  const imageUrl = resolveImageUrl(post.image);
  const dateObj = new Date(post.date);

  const dayStr = new Intl.DateTimeFormat(isRtl ? "ar-SA" : "en-GB", {
    day: "numeric",
  }).format(dateObj);
  const monthYearStr = new Intl.DateTimeFormat(isRtl ? "ar-SA" : "en-GB", {
    month: "short",
    year: "numeric",
  }).format(dateObj);

  const href = `/media/${post.slug}`;

  return (
    <article className="blog-card group relative flex flex-col bg-background rounded-2xl border border-gray-100 p-4 sm:p-5 motion-safe:transition-all motion-safe:duration-300 hover:border-secondary hover:-translate-y-1.5 hover:shadow-[inset_0_12px_40px_rgba(0,134,255,0.15)] focus-within:border-secondary focus-within:-translate-y-1.5 focus-within:shadow-[inset_0_12px_40px_rgba(0,134,255,0.15)] h-full">
      {/* Media area */}
      <div className="relative overflow-hidden rounded-xl isolate" style={{ aspectRatio: "4 / 3" }}>
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.10) 45%, transparent 100%)",
          }}
          aria-hidden="true"
        />
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-900 motion-safe:ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#001833] to-[#004187] flex items-center justify-center">
            <span className="text-white/20 text-4xl font-black">TM</span>
          </div>
        )}

        <div className="blog-card-bar absolute inset-x-3 bottom-3 z-20 flex items-center justify-between rounded-xl border border-white/25 bg-neutral-950/45 px-4 py-3 shadow-[0_8px_25px_rgba(0,0,0,0.28)] backdrop-blur-xl saturate-150 motion-safe:transition-all motion-safe:duration-550 motion-safe:ease-out">
          <div className="flex shrink-0 flex-col leading-none">
            <span className={`text-2xl font-bold leading-none text-white ${!isRtl ? "uppercase tracking-tight" : ""}`}>
              {dayStr}
            </span>
            <span className={`mt-1 text-[11px] font-medium text-white/80 ${!isRtl ? "uppercase tracking-wider" : ""}`}>
              {monthYearStr}
            </span>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 gap-4 sm:gap-5 pt-5 pb-2 px-1">
        <h3 className="text-base lg:text-lg font-bold leading-snug text-foreground line-clamp-3 motion-safe:transition-colors motion-safe:duration-300 group-hover:text-primary rtl:leading-relaxed flex-1">
          {title}
        </h3>

        <div className="flex items-center justify-between pt-2 mt-auto">
          <Link
            href={href}
            aria-label={`${t("readMore")} — ${title}`}
            className="stretched-link group/link relative inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors duration-300 hover:text-secondary focus-visible:outline-none"
          >
            <span className="relative inline-block py-0.5">
              <span>{t("readMore")}</span>
              <span
                className="absolute -bottom-0.5 left-0 rtl:left-auto rtl:right-0 h-[2px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full group-hover/link:w-full group-hover:bg-secondary"
                aria-hidden="true"
              />
            </span>
            <ArrowRight
              className="w-4 h-4 text-primary transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:text-secondary rtl:rotate-180 rtl:group-hover:-translate-x-1.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
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
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const tMedia = useTranslations("Media");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, isError } = useGetMediaPostsQuery({
    page,
    limit: POSTS_PER_PAGE,
    isPublished: "true",
    searchTerm: debouncedQuery || undefined,
  });

  // Separate featured (latest) post for the hero featured section
  const { data: featuredData } = useGetMediaPostsQuery({
    page: 1,
    limit: 1,
    isPublished: "true",
  });

  const latestPost = featuredData?.data?.[0] ?? null;
  const posts = data?.data ?? [];
  const totalPages = data?.meta?.totalPage ?? 1;
  const totalResults = data?.meta?.total ?? 0;

  const handleSearch = useCallback((val: string) => {
    setQuery(val);
    setPage(1);
  }, []);

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
  const latestImageUrl = resolveImageUrl(latestPost?.image);
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
        {/* Featured Latest Post */}
        {latestPost && !query.trim() && page === 1 && (
          <article
            className="mb-12 grid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:border-secondary hover:shadow-[inset_0_12px_40px_rgba(0,134,255,0.12)] md:grid-cols-2"
            dir="ltr"
          >
            <div className="group relative min-h-64 overflow-hidden md:min-h-96">
              {latestImageUrl ? (
                <Image
                  src={latestImageUrl}
                  alt={latestTitle}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#001833] to-[#004187] flex items-center justify-center">
                  <span className="text-white/20 text-6xl font-black">TM</span>
                </div>
              )}
            </div>

            <div
              className="flex flex-col justify-center p-6 sm:p-8 lg:p-12"
              dir={isRtl ? "rtl" : "ltr"}
            >
              <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
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
                aria-label={`Read more — ${latestTitle}`}
                className="group/link inline-flex w-fit items-center gap-2 font-semibold text-primary transition-colors hover:text-secondary"
              >
                <span>{tMedia("readMore") ?? "Read more"}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>
        )}

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div
              className="absolute -inset-0.5 rounded-2xl pointer-events-none bg-gradient-to-r from-primary/30 via-secondary/40 to-primary/30 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm"
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
                className="!border-0 !ring-0 !shadow-none !rounded-none !outline-none bg-transparent h-14 ps-12 pe-12 text-base text-slate-800 placeholder:text-slate-400"
                aria-label={searchPlaceholder}
              />

              <button
                onClick={() => handleSearch("")}
                aria-label="Clear search"
                type="button"
                className={`absolute end-4 flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 hover:bg-red-100 text-slate-400 hover:text-red-500 transition-all duration-200 ${query ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Result count */}
          <p
            className={`text-sm text-slate-500 mt-3 text-center transition-opacity duration-200 ${query ? "opacity-100" : "opacity-0 select-none"}`}
          >
            {totalResults} result{totalResults !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <AlertCircle className="w-10 h-10 text-rose-500" />
            <p className="text-sm font-semibold text-slate-600">
              {isRtl ? "تعذّر تحميل المقالات." : "Failed to load articles."}
            </p>
          </div>
        )}

        {/* Posts grid */}
        {!isLoading && !isError && (
          <>
            {posts.length > 0 ? (
              <div
                key={`${page}-${debouncedQuery}`}
                className="grid gap-7 animate-fadeIn"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))" }}
              >
                {posts.map((post) => (
                  <MediaCard key={post._id} post={post} />
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-14 flex flex-col items-center gap-4">
                <p className="text-sm text-slate-500 font-medium">{pageLabelStr}</p>

                <Pagination>
                  <PaginationContent className="gap-1 flex-wrap justify-center">
                    <PaginationItem>
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        aria-label="Previous page"
                        className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-primary hover:border-secondary hover:text-secondary hover:bg-secondary/5 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                        <span className="hidden sm:inline">{prevLabel}</span>
                      </button>
                    </PaginationItem>

                    {pageNumbers.map((p, i) =>
                      p === "ellipsis" ? (
                        <PaginationItem key={`ellipsis-${i}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={p}>
                          <PaginationLink
                            isActive={p === page}
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(p as number);
                            }}
                            href="#"
                            className={`h-10 w-10 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                              p === page
                                ? "bg-primary text-white border-primary shadow-[0_4px_14px_rgba(0,65,135,0.25)] scale-105"
                                : "bg-white text-slate-700 border-slate-200 hover:border-secondary hover:text-secondary hover:bg-secondary/5"
                            }`}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        aria-label="Next page"
                        className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-primary hover:border-secondary hover:text-secondary hover:bg-secondary/5 disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
                      >
                        <span className="hidden sm:inline">{nextLabel}</span>
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
