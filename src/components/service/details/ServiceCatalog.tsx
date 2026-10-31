"use client";

import Image from "next/image";
import { type CatalogItem } from "@/data/servicesData";

interface ServiceCatalogProps {
  heading?: string;
  items: CatalogItem[];
  isRtl?: boolean;
}

export default function ServiceCatalog({
  heading = "Catalog",
  items,
  isRtl = false,
}: ServiceCatalogProps) {
  if (!items || items.length === 0) return null;

  return (
    <aside id="service-catalog" className="w-full mt-10">
      <div className="mb-5 border-b border-slate-200 pb-4">
        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-secondary">
          {isRtl ? "الفهرس والحلول" : "EQUIPMENT & SOLUTIONS"}
        </span>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#001833] sm:text-3xl">
          {heading}
        </h2>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"
              />

              {item.badge && (
                <div className="absolute top-3.5 start-3.5 z-10">
                  <span className="inline-block rounded-full border border-white/20 bg-[#001833]/80 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white shadow-xs backdrop-blur-md">
                    {item.badge}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h4 className="mb-2 text-sm font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-secondary">
                {item.title}
              </h4>

              <p className="flex-1 text-xs leading-relaxed text-slate-600">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
