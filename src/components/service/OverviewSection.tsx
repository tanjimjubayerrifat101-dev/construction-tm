import {
  BuildingComplex,
  BuildingComplexPlus,
  Gauge,
  Leaf,
  Settings,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import visionImage from "@/assets/service/2030-img1.png";

const SERVICE_LINES: {
  key:
    | "construction"
    | "facility"
    | "maintenance"
    | "manpower"
    | "environmental";
  icon: LucideIcon;
}[] = [
  { key: "construction", icon: BuildingComplexPlus },
  { key: "facility", icon: Settings },
  { key: "maintenance", icon: Shield },
  { key: "manpower", icon: Gauge },
  { key: "environmental", icon: Leaf },
];

export default function OverviewSection() {
  const t = useTranslations("ServicePage");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <section
      aria-labelledby="service-overview-heading"
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-28"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container">
        <header className="mx-auto flex w-full flex-col items-center text-center xl:w-4/5 2xl:w-3/5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
            {t("overviewEyebrow")}
          </p>
          <h2
            id="service-overview-heading"
            className="mb-3 text-3xl font-medium uppercase text-primary sm:text-4xl lg:text-5xl"
          >
            {t("overviewHeading")}
          </h2>
          <p className="text-base leading-7 text-gray-600 sm:text-lg">
            {t("overviewSubheading")}
          </p>
        </header>

        <div className="mx-auto mt-10 grid w-full gap-8 lg:mt-14 lg:w-[92%] lg:grid lg:gap-10">
          <div className="flex gap-8 lg: gap-0 flex-col lg:flex-row justify-between ">
            <p className=" lg:w-[48%] border-s-4 border-secondary ps-5 text-base leading-8 text-gray-700 sm:text-lg">
              {t("overviewIntro")}
            </p>

            <p className="lg:w-[48%] border-s-4 border-secondary ps-5 text-base leading-8 text-gray-700 sm:text-lg">
              {t("overviewSupportingText")}
            </p>
            {/* 
            <div className="mt-7 rounded-2xl bg-[#F0F7FD] p-5 sm:mt-8 sm:p-8">
              <div className="flex items-start gap-4 sm:items-center sm:gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-secondary shadow-sm sm:h-16 sm:w-16">
                  <BuildingComplex
                    aria-hidden="true"
                    className="h-8 w-8 sm:h-9 sm:w-9"
                    strokeWidth={1.4}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold uppercase text-primary sm:text-xl">
                    {t("contractingHeading")}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                    {t("contractingDescription")}
                  </p>
                </div>
              </div>

              <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {SERVICE_LINES.map(({ key, icon: Icon }) => (
                  <li
                    key={key}
                    className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-blue-100 bg-white px-3 py-4 text-center transition-colors hover:border-secondary/40 hover:bg-blue-50/60"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-7 w-7 text-secondary sm:h-8 sm:w-8"
                      strokeWidth={1.5}
                    />
                    <span className="mt-3 text-xs font-medium leading-5 text-gray-700 sm:text-sm">
                      {t(`serviceLines.${key}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>

          <div className="flex flex-col">
            <div className="mt-7 flex-1 rounded-2xl bg-[#F0F7FD] p-5 sm:mt-8 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">
                    {t("visionEyebrow")}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-primary sm:text-3xl">
                    {t("visionHeading")}
                  </h3>
                </div>
                <Image
                  src={visionImage}
                  alt={t("visionImageAlt")}
                  className="h-auto w-36 object-contain sm:w-40"
                  sizes="(max-width: 640px) 144px, 160px"
                />
              </div>
              <p className="mt-5 text-base leading-8 text-gray-700">
                {t("visionDescription")}
              </p>
              <div className="mt-5">
                <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
                  {SERVICE_LINES.map(({ key, icon: Icon }) => (
                    <li
                      key={key}
                      className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-blue-100 bg-white px-3 py-4 text-center transition-colors hover:border-secondary/40 hover:bg-blue-50/60"
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-7 w-7 text-secondary sm:h-8 sm:w-8"
                        strokeWidth={1.5}
                      />
                      <span className="mt-3 text-xs font-medium leading-5 text-gray-700 sm:text-sm">
                        {t(`serviceLines.${key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
