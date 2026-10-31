"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import SlideHeadingLeft from "@/utils/SlideHeading";
import SlideHeadingRight from "@/utils/SlideHeadingRight";
import img1 from "@/assets/home/why-choose/why2.png";
import img2 from "@/assets/home/why-choose/why3.png";

const images = [img1, img2, img1, img2, img1];

export default function WhyChooseUs() {
  const t = useTranslations("WhyChooseUs");
  const locale = useLocale();
  const swiperRef = useRef<SwiperInstance | null>(null);
  const isRtl = locale === "ar";

  const listData = Array.from({ length: 5 }, (_, index) => {
    const itemKey = `items.item${index + 1}`;

    return {
      title: t(`${itemKey}.title`),
      description: t(`${itemKey}.description`),
      img: images[index],
    };
  });

  return (
    <section className="why-choose-section relative w-full overflow-hidden bg-background py-20 md:py-24 lg:py-28">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 flex w-full flex-col items-center justify-center lg:mb-24">
          <div className="w-full text-center xl:w-[80%] 2xl:w-[60%]">
            <SlideHeadingLeft className="mb-3 text-4xl font-regular uppercase text-primary lg:text-5xl">
              {t("eyebrow")}
            </SlideHeadingLeft>
            <SlideHeadingRight className="text-lg lg:text-xl">
              {t("heading")}
            </SlideHeadingRight>
          </div>
        </div>

        <div className="relative mx-auto w-full px-7 md:px-12 xl:w-4/5">
          <Swiper
            key={locale}
            aria-label={t("heading")}
            dir={isRtl ? "rtl" : "ltr"}
            modules={[Autoplay, Pagination]}
            centeredSlides
            spaceBetween={12}
            slidesPerView={1.08}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop
            pagination={{ clickable: true, el: ".why-choose-pagination" }}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 14 },
              768: { slidesPerView: 2.2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 18 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="why-choose-swiper"
          >
            {listData.map((item, index) => (
                <SwiperSlide key={index} className="h-auto">
                  <article className="why-choose-card group relative flex w-full flex-col overflow-hidden rounded-xl border border-border/50 bg-white dark:bg-card">
                    <div className="why-choose-card-image relative w-full shrink-0 overflow-hidden">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1]"
                      />

                    </div>

                    <div className="flex min-h-0 grow flex-col bg-card p-5">
                      <div>
                        <h3 className="why-choose-card-title mb-2 line-clamp-2 text-lg font-semibold leading-snug text-foreground">
                          {item.title}
                        </h3>
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                          {item.description}
                        </p>
                      </div>

                    </div>
                  </article>
                </SwiperSlide>
            ))}
          </Swiper>
          <div className="why-choose-pagination swiper-pagination" />

          <button
            type="button"
            aria-label={isRtl ? "الشريحة السابقة" : "Previous slide"}
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute -left-1 top-[42%] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white cursor-pointer  transition-colors hover:text-white md:left-0 rtl:left-auto rtl:-right-1 md:rtl:right-0"
          >
            <ChevronLeft
              aria-hidden="true"
              className={`h-6 w-6 ${isRtl ? "rotate-180" : ""}`}
            />
          </button>

          <button
            type="button"
            aria-label={isRtl ? "الشريحة التالية" : "Next slide"}
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute -right-1 top-[42%] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white cursor-pointer  transition-colors hover:text-white md:right-0 rtl:right-auto rtl:-left-1 md:rtl:left-0"
          >
            <ChevronRight
              aria-hidden="true"
              className={`h-6 w-6 ${isRtl ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
