"use client";

import Image from "next/image";
import type { Partner } from "@/data/partners";

interface PartnerItemProps {
  partner: Partner;
  name: string;
}

export default function PartnerItem({ partner, name }: PartnerItemProps) {
  const logoSrc = partner.logoAr ?? partner.logo;

  if (!logoSrc) return null;

  const image = (
    <Image
      src={logoSrc}
      alt={name}
      width={logoSrc.width}
      height={logoSrc.height}
      sizes="(max-width: 640px) 112px, 144px"
      className="h-10 w-28 object-contain sm:h-12 sm:w-32"
    />
  );

  return partner.href ? (
    <a
      href={partner.href}
      target="_blank"
      rel="noreferrer"
      aria-label={name}
      className="inline-flex items-center justify-center"
    >
      {image}
    </a>
  ) : (
    image
  );
}
