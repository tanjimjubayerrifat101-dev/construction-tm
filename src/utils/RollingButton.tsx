import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ComponentProps, ReactNode } from "react";

export type RollingButtonVariant = "primary" | "secondary" | "outline" | "white";

export interface RollingButtonProps {
  /** The button or link text */
  text: string;
  /** Destination link (if provided, renders as Next.js Link) */
  href?: ComponentProps<typeof Link>["href"];
  /** Click handler (if provided without href, renders as button) */
  onClick?: () => void;
  /** Visual style variant */
  variant?: RollingButtonVariant;
  /** Whether to show the animated arrow icon (default: true) */
  showArrow?: boolean;
  /** Custom icon override */
  icon?: ReactNode;
  /** Additional custom classes */
  className?: string;
  /** Accessible label */
  ariaLabel?: string;
}

const variantStyles: Record<RollingButtonVariant, string> = {
  outline:
    "border border-primary/35 bg-white text-primary hover:bg-primary hover:text-white hover:border-primary hover:shadow-[0_8px_25px_rgba(0,65,135,0.2)]",
  primary:
    "border border-primary bg-primary text-white hover:bg-secondary hover:border-secondary hover:shadow-[0_8px_25px_rgba(0,134,255,0.3)]",
  secondary:
    "border border-secondary bg-secondary text-white hover:bg-primary hover:border-primary hover:shadow-[0_8px_25px_rgba(0,65,135,0.3)]",
  white:
    "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-primary hover:border-white hover:shadow-[0_8px_25px_rgba(255,255,255,0.2)]",
};

/**
 * RollingButton — premium interactive CTA component.
 *
 * Features:
 * - Rolling Text Effect: on hover, active text slides DOWN out of frame,
 *   while the identical text drops in from the TOP into place.
 * - Animated Arrow: smooth forward nudge on hover (RTL-aware).
 * - Subtle Corner Radius: modern 12px (rounded-xl) with refined borders.
 * - Dual Mode: renders as Next.js <Link> if href is provided, or <button> otherwise.
 */
export default function RollingButton({
  text,
  href,
  onClick,
  variant = "outline",
  showArrow = true,
  icon,
  className = "",
  ariaLabel,
}: RollingButtonProps) {
  const baseClasses = `
    group relative inline-flex items-center justify-center gap-3
    px-7 py-3.5 rounded-xl
    text-sm font-semibold tracking-wide
    transition-all duration-300 ease-out
    active:scale-[0.98] cursor-pointer select-none
    ${variantStyles[variant]}
    ${className}
  `.trim();

  const content = (
    <>
      {/* ── Rolling Text Container ── */}
      <span className="relative block overflow-hidden h-[22px] leading-[22px]">
        {/* Active text: slides DOWN on hover */}
        <span className="block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-full">
          {text}
        </span>
        {/* Duplicate text: enters from TOP on hover */}
        <span
          className="absolute inset-0 block -translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0"
          aria-hidden="true"
        >
          {text}
        </span>
      </span>

      {/* ── Animated Arrow Icon (RTL-aware) ── */}
      {showArrow && (
        icon || (
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 rtl:rotate-180 shrink-0"
            aria-hidden="true"
          />
        )
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} aria-label={ariaLabel || text}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel || text}
    >
      {content}
    </button>
  );
}
