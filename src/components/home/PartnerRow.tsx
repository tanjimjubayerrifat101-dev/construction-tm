"use client";

import { useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { PartnerCategory } from "@/data/partners";

interface PartnerRowProps {
  category: PartnerCategory;
  index: number;
  isActive: boolean;
  isOpen: boolean;          // mobile accordion state
  isMobile: boolean;
  onActivate: (id: string) => void;
  onToggle: (id: string) => void;
  children: React.ReactNode; // partner items injected by parent
}

/**
 * A single category row used in the "Our Partners" list.
 *
 * Desktop: hover/click activates the left panel; shows a progress line while
 * auto-advancing.
 * Mobile: tapping toggles an accordion that expands partner items beneath the row.
 *
 * Design mirrors WhyChooseUsItem: spotlight glow, circular arrow, border-b hairline.
 */
export default function PartnerRow({
  category,
  index,
  isActive,
  isOpen,
  isMobile,
  onActivate,
  onToggle,
  children,
}: PartnerRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("Partners");

  // Partner count label
  const count = category.partners.length;
  const countLabel = t("partnerCount", { count });

  // Preview line: "A · B · C · +more"
  const MAX_PREVIEW = 3;
  const partnerNames = category.partners.map((p) =>
    t(`partners.${p.nameKey}`)
  );
  const previewNames = partnerNames.slice(0, MAX_PREVIEW).join(" · ");
  const remaining = count - MAX_PREVIEW;
  const previewLine =
    remaining > 0
      ? `${previewNames} · ${t("more", { count: remaining })}`
      : previewNames;

  // Spotlight glow tracking
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!rowRef.current) return;
      const rect = rowRef.current.getBoundingClientRect();
      rowRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      rowRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
    },
    []
  );

  const handleClick = useCallback(() => {
    if (isMobile) {
      onToggle(category.id);
    } else {
      onActivate(category.id);
    }
  }, [isMobile, category.id, onActivate, onToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  const categoryTitle = t(`categories.${category.titleKey}`);

  // Formatted index: 01–07
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="partners-row-wrap border-b border-primary/20 last:border-b-0">
      {/* ── Row header ── */}
      <div
        ref={rowRef}
        role="button"
        tabIndex={0}
        aria-expanded={isMobile ? isOpen : undefined}
        aria-controls={`partners-panel-${category.id}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => !isMobile && onActivate(category.id)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`
          partners-list-row
          group relative flex items-center justify-between
          py-6 lg:py-8
          cursor-pointer overflow-hidden
          transition-all duration-500
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-secondary
        `}
      >
        {/* Spotlight glow (desktop active/hover) */}
        <div
          className={`
            pointer-events-none absolute inset-0 transition-opacity duration-500
            ${isActive ? "opacity-10" : "opacity-0 group-hover:opacity-6"}
          `}
          style={{
            background:
              "radial-gradient(circle 140px at var(--mx,50%) var(--my,50%), var(--color-secondary), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Progress line (desktop: fills bottom border while active) */}
        {!isMobile && (
          <div
            className="partners-progress-line absolute bottom-0 inset-inline-start-0 h-[1.5px] bg-secondary"
            style={{
              width: isActive ? "100%" : "0%",
              transition: isActive
                ? "width 6s linear"
                : "width 0.3s ease-out",
            }}
            aria-hidden="true"
          />
        )}

        {/* Content */}
        <div
          className={`
            relative z-10 flex flex-col gap-1
            transition-transform duration-500
            ${isActive && !isMobile ? (isRtl ? "-translate-x-3" : "translate-x-3") : ""}
          `}
        >
          {/* Index + title */}
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-mono text-primary/40 tabular-nums"
              aria-hidden="true"
            >
              {num}
            </span>
            <h4
              className={`
                row-title text-lg lg:text-xl font-bold
                transition-colors duration-300
                ${isActive ? "text-primary" : "text-foreground group-hover:text-primary"}
              `}
            >
              {categoryTitle}
            </h4>
          </div>

          {/* Preview line — hidden while mobile accordion is open */}
          {(!isMobile || !isOpen) && (
            <p className="row-desc text-[13px] text-foreground/45 leading-relaxed ps-[2.1rem] truncate max-w-[30ch] lg:max-w-[38ch]">
              {previewLine}
            </p>
          )}
        </div>

        {/* Circular arrow button */}
        <div
          className={`
            row-arrow relative z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full
            border flex items-center justify-center shrink-0
            ms-4
            transition-all duration-500
            ${
              isActive && !isMobile
                ? "bg-secondary border-secondary"
                : "border-primary/30 group-hover:bg-secondary group-hover:border-secondary"
            }
            ${isMobile && isOpen ? "bg-secondary border-secondary" : ""}
          `}
          aria-hidden="true"
        >
          <ArrowRight
            className={`
              w-5 h-5 transition-all duration-500
              ${
                isActive && !isMobile
                  ? "text-white " + (isRtl ? "rotate-[135deg]" : "-rotate-45")
                  : "text-primary group-hover:text-white " + (isRtl ? "rotate-180" : "")
              }
              ${isMobile && isOpen ? (isRtl ? "rotate-[90deg]" : "rotate-90 text-white") : ""}
              ${isMobile && !isOpen ? (isRtl ? "rotate-180" : "") : ""}
            `}
          />
        </div>
      </div>

      {/* ── Mobile accordion panel ── */}
      {isMobile && (
        <div
          id={`partners-panel-${category.id}`}
          className="partners-accordion-panel overflow-hidden transition-all"
          style={{
            maxHeight: isOpen ? "600px" : "0px",
            opacity: isOpen ? 1 : 0,
            transitionDuration: "450ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className="pb-6 pt-2">
            <p className="text-xs text-foreground/50 mb-4">
              {countLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
