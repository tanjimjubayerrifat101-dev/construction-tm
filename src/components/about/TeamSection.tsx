"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import TeamMemberCard from "./TeamMemberCard";
import FadeUp from "@/utils/FadeUp";
import SlideHeadingLeft from "@/utils/SlideHeading";

import leaderImg from "@/assets/home/why-choose/why1.jpeg";
import member2Img from "@/assets/home/why-choose/why2.png";
import member3Img from "@/assets/home/why-choose/why3.png";
import member4Img from "@/assets/home/blog4.png";
import member5Img from "@/assets/home/blog5.png";
import member6Img from "@/assets/home/blog6.png";

export default function TeamSection() {
  const t = useTranslations("AboutPage.team");
  const tAbout = useTranslations("AboutPage.aboutSection");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const swiperRef = useRef<SwiperInstance | null>(null);

  const teamMembers = [
    {
      name: tAbout("leaderName"),
      role: tAbout("leaderRole"),
      bio: t("bios.leader"),
      image: leaderImg,
    },
    {
      name: t("tba"),
      role: t("roles.coo"),
      bio: t("bios.coo"),
      image: member2Img,
    },
    {
      name: t("tba"),
      role: t("roles.cfo"),
      bio: t("bios.cfo"),
      image: member3Img,
    },
    {
      name: t("tba"),
      role: t("roles.cco"),
      bio: t("bios.cco"),
      image: member4Img,
    },
    {
      name: t("tba"),
      role: t("roles.cso"),
      bio: t("bios.cso"),
      image: member5Img,
    },
    {
      name: t("tba"),
      role: t("roles.cpo"),
      bio: t("bios.cpo"),
      image: member6Img,
    },
  ];

  return (
    <section id="leadership"  className="relative w-full overflow-hidden bg-muted/20 py-16 md:py-24">
      <div className="container">
        {/* ── Section Header — centered ── */}
        <div className="mb-10 md:mb-14 text-center">
          <FadeUp delay={0.1} y={15}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[2px] w-6 bg-secondary" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary">
                {t("eyebrow")}
              </span>
              <span className="h-[2px] w-6 bg-secondary" />
            </div>
          </FadeUp>
{/* 
          <SlideHeadingLeft className="mb-3 text-4xl lg:text-5xl font-regular uppercase text-primary">
            {t("headingPart1")}{" "}
            <span className="text-secondary">{t("headingPart2")}</span>
          </SlideHeadingLeft> */}
        </div>

        {/* ── MOBILE / TABLET → Swiper slider (hidden on lg+) ── */}
        <div className="relative lg:hidden px-7 md:px-12">
          <Swiper
            key={locale}
            dir={isRtl ? "rtl" : "ltr"}
            modules={[Pagination]}
            spaceBetween={14}
            slidesPerView={1.15}
            centeredSlides={false}
            loop={false}
            pagination={{ clickable: true, el: ".team-swiper-pagination" }}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2.1, spaceBetween: 16 },
              768: { slidesPerView: 2.4, spaceBetween: 18 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="team-swiper pb-12"
          >
            {teamMembers.map((member, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <TeamMemberCard
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination dots */}
          <div className="team-swiper-pagination swiper-pagination !bottom-0" />

          {/* Prev button */}
          <button
            type="button"
            aria-label={isRtl ? "الشريحة السابقة" : "Previous slide"}
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute -left-1 top-[42%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white cursor-pointer transition-colors hover:bg-secondary rtl:left-auto rtl:-right-1"
          >
            <ChevronLeft className={`h-5 w-5 ${isRtl ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>

          {/* Next button */}
          <button
            type="button"
            aria-label={isRtl ? "الشريحة التالية" : "Next slide"}
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute -right-1 top-[42%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white cursor-pointer transition-colors hover:bg-secondary rtl:right-auto rtl:-left-1"
          >
            <ChevronRight className={`h-5 w-5 ${isRtl ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        </div>

        {/* ── DESKTOP (lg+) → 3-column grid ── */}
        <div className="hidden lg:mx-auto lg:w-[80%] lg:grid lg:grid-cols-3 lg:gap-4 xl:gap-5">
          {teamMembers.map((member, idx) => (
            <FadeUp
              key={idx}
              delay={0.08 + (idx % 3) * 0.12}
              y={30}
              className="flex justify-center"
            >
              <div className="w-full">
                <TeamMemberCard
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                />
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
