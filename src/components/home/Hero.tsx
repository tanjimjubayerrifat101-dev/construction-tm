"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@/utils/Button";
import SplitReveal from "@/utils/SplitReveal";
import FadeUp from "@/utils/FadeUp";
import hero1 from "@/assets/home/hero1.png";
import hero2 from "@/assets/home/hero2.png";
import hero3 from "@/assets/home/blog5.png";
import "swiper/css";

const slides = [hero1, hero2, hero3];

export default function Hero() {
  const locale = useLocale();
  const t = useTranslations("Hero");
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const isRtl = locale === "ar";

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Swiper
          key={locale}
          aria-label="Featured content"
          className="h-full w-full"
          dir={isRtl ? "rtl" : "ltr"}
          modules={[Autoplay]}
          loop
          speed={900}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        >
          {slides.map((image, index) => (
            <SwiperSlide key={image.src}>
              <Image
                src={image}
                alt=""
                fill
                sizes="100vw"
                priority={index === 0}
                className={`object-cover ${isRtl ? "-scale-x-100" : ""}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-primary/20" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-36 bg-linear-to-b from-black/80 via-black/50 to-transparent"
      />

      <div className="container relative z-20 h-full w-full">
        <div className="relative flex h-full w-full flex-col items-start justify-center">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-0.75 w-12 bg-primary" />
            <span className="h-0.75 w-5 bg-white/60" />
          </div>
          <div className="h-16 w-full max-w-5xl sm:h-20 md:h-26 lg:h-34 xl:h-38">
            <SplitReveal
              key={activeSlide}
              as="h1"
              className="text-[clamp(1.5rem,5vw,4.5rem)] leading-[1.05] text-white uppercase rtl:font-sans rtl:leading-[1.2]"
              stagger={0.06}
              duration={0.9}
            >
              {activeSlide === 1 ? t("slide2TitlePart1") : activeSlide === 2 ? t("slide3TitlePart1") : t("titlePart1")}{" "}
              <br />
              <span className="text-primary">
                {activeSlide === 1 ? t("slide2TitlePart2") : activeSlide === 2 ? t("slide3TitlePart2") : t("titlePart2")}
              </span>
            </SplitReveal>
          </div>
          <div className="mt-6 flex h-28 items-start sm:h-24 lg:h-16">
            <p className="border-l-[3px] border-primary py-1 pl-4 text-base font-semibold italic leading-6 text-white sm:text-lg rtl:border-r-[3px] rtl:border-l-0 rtl:pl-0 rtl:pr-4">
              {activeSlide === 1
                ? t("slide2Subtitle")
                : activeSlide === 2
                  ? t("slide3Subtitle")
                  : t("slide1Subtitle")}
            </p>
          </div>
          {/* <div className={`${activeSlide === 0 ? "mt-6" : "mt-4"}`}>
            <FadeUp delay={0.2} duration={0.8} y={30}>
              <Button text={t("ctaButton")} href="/" />
            </FadeUp>
          </div> */}
          <div className="mt-8 flex items-center gap-2">
            {slides.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeSlide === index}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "w-9 bg-primary" : "w-4 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}