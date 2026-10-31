"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import FadeUp from "@/utils/FadeUp";

export default function ContactInfoCards() {
  const t = useTranslations("Contact");

  const cards = [
    {
      icon: Phone,
      label: t("fields.phone"),
      value: t("phoneVal"),
      href: `tel:${t("phoneVal").replace(/\s+/g, "")}`,
    },
    {
      icon: Mail,
      label: t("fields.email"),
      value: t("emailVal"),
      href: `mailto:${t("emailVal")}`,
    },
    {
      icon: Clock,
      label: t("headOffice"),
      value: t("hoursVal"),
      href: null,
    },
    {
      icon: MapPin,
      label: t("mapEyebrow"),
      value: t("address"),
      href: "https://maps.google.com/?q=Al-Narjis+District+Anas+Ibn+Malik+St+Riyadh",
    },
  ];

  return (
    <section className="relative z-20 -mt-10 sm:-mt-12 mb-12 sm:mb-16">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((item, idx) => {
            const Icon = item.icon;
            const CardWrapper = item.href ? "a" : "div";

            return (
              <FadeUp
                key={idx}
                delay={idx * 0.1}
                duration={0.7}
                y={30}
                className="h-full"
              >
                <CardWrapper
                  {...(item.href ? { href: item.href, target: item.href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" } : {})}
                  className="
                    group relative flex flex-col justify-between
                    h-full p-6 sm:p-7
                    bg-white rounded-2xl
                    border border-gray-100
                    shadow-[0_4px_20px_rgba(0,0,0,0.04)]
                    transition-all duration-300 ease-out
                    hover:border-secondary hover:-translate-y-1.5
                    hover:shadow-[0_12px_32px_rgba(0,134,255,0.12)]
                  "
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="
                      w-12 h-12 rounded-xl
                      bg-primary/10 text-primary
                      flex items-center justify-center shrink-0
                      transition-all duration-300
                      group-hover:bg-primary group-hover:text-white
                    ">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                      {item.label}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {item.value}
                  </p>
                </CardWrapper>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
