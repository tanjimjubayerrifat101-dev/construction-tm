"use client";

import Image, { type StaticImageData } from "next/image";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio?: string;
  image: StaticImageData | string;
}

export default function TeamMemberCard({
  name,
  role,
  bio = "Committed to engineering excellence, rigorous project delivery, and sustainable development across the Kingdom of Saudi Arabia.",
  image,
}: TeamMemberCardProps) {
  return (
    <div className="group relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900 shadow-md border border-border/40 cursor-pointer select-none">
      {/* Background portrait image — subtle zoom on hover */}
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Bottom vignette for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

      {/* ── DEFAULT BADGE ── solid brand-blue pill at bottom */}
      <div
        className="
          absolute inset-x-4 bottom-4 z-10
          bg-primary/95 backdrop-blur-sm border border-white/10
          py-2.5 px-3 text-center text-white shadow-lg rounded-lg
          transition-all duration-500 ease-in-out
          group-hover:translate-y-8 group-hover:opacity-0
          pointer-events-none
        "
      >
        <h4 className="text-base sm:text-lg font-bold leading-tight text-white drop-shadow-sm">
          {name}
        </h4>
        <p className="mt-1 text-xs sm:text-[13px] font-medium text-white/80">
          {role}
        </p>
      </div>

      {/* ── HOVER OVERLAY ── slides up from bottom, brand gradient */}
      <div
        className="
          absolute inset-0 z-20
          flex flex-col items-center justify-center
          bg-gradient-to-t from-primary via-[#003875] to-[#004a99]/95
          p-4 text-center text-white
          translate-y-full
          transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:translate-y-0
        "
      >
        <h4 className="text-base sm:text-lg font-bold leading-tight mb-1 text-white">
          {name}
        </h4>
        <p className="text-[11px] sm:text-xs font-semibold text-white/70 mb-2">
          {role}
        </p>
        <p className="text-[11px] sm:text-[12px] text-white/80 leading-relaxed px-2 mb-3 line-clamp-4">
          {bio}
        </p>

        {/* Social icon row */}
        <div className="flex items-center justify-center gap-2">
          {/* LinkedIn */}
          <a
            href="#linkedin"
            aria-label={`${name} LinkedIn`}
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:bg-secondary hover:scale-110 shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.02-3.28 1.64 1.64 0 0 0 .02 3.28m1.4 9.74v-8.37H5.06v8.37z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="#facebook"
            aria-label={`${name} Facebook`}
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:bg-secondary hover:scale-110 shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* X / Twitter */}
          <a
            href="#twitter"
            aria-label={`${name} Twitter`}
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:bg-secondary hover:scale-110 shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="#instagram"
            aria-label={`${name} Instagram`}
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:bg-secondary hover:scale-110 shadow-sm"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
