"use client";

import { useTranslations } from "next-intl";
import SlideHeadingLeft from "@/utils/SlideHeading";
import SlideHeadingRight from "@/utils/SlideHeadingRight";
import { PARTNER_CATEGORIES } from "@/data/partners";
import PartnerItem from "./PartnerItem";

export default function PartnersSection() {
  const t = useTranslations("Partners");
  const categoriesWithLogos = PARTNER_CATEGORIES
    .map((category) => ({
      ...category,
      partners: category.partners.filter((partner) => partner.logo || partner.logoAr),
    }));

  return (
    <section className="relative w-full overflow-hidden bg-background py-20 md:py-24 lg:py-28">
      <div className="container relative z-10">
        <div className="mb-16 flex w-full flex-col items-center justify-center lg:mb-24">
          <div className="w-full text-center xl:w-[80%] 2xl:w-[60%]">
            <SlideHeadingLeft className="mb-3 text-4xl font-regular uppercase text-primary lg:text-5xl">
              {t("heading")}
            </SlideHeadingLeft>
            <SlideHeadingRight className="text-lg lg:text-xl">
              {t("subheading")}
            </SlideHeadingRight>
          </div>
        </div>

        <div className="mx-auto w-full xl:w-4/5">
          {categoriesWithLogos.map((category) => (
            <div
              key={category.id}
              className="grid grid-cols-1 items-center gap-3 border-t border-border/70 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6 md:py-6"
            >
              <h3 className="text-sm font-medium text-foreground/60 md:text-base">
                {t(`categories.${category.titleKey}`)}
              </h3>

              <div className="flex min-h-12 flex-wrap items-center justify-start gap-x-8 gap-y-6">
                {category.partners.map((partner) => (
                  <PartnerItem
                    key={`${category.id}-${partner.id}`}
                    partner={partner}
                    name={t(`partners.${partner.nameKey}`)}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-border/70" />
        </div>
      </div>
    </section>
  );
}
