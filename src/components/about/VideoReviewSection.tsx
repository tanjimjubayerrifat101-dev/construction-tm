"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Play, Star, X, Quote } from "lucide-react";
import FadeUp from "@/utils/FadeUp";
import SlideHeadingLeft from "@/utils/SlideHeading";

import videoPoster from "@/assets/service/srvice-home.png";
import partner2 from "@/assets/partner/partner2.png";
import partner3 from "@/assets/partner/partner3.png";
import partner4 from "@/assets/partner/partner4.png";
import partner5 from "@/assets/partner/partner5.png";
import partner6 from "@/assets/partner/partner6.png";

const partnerLogos = [partner2, partner3, partner4, partner5, partner6];

export default function VideoReviewSection() {
  const t = useTranslations("AboutPage.videoReview");
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-background py-20 md:py-28 lg:py-32">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Block: Video Thumbnail with Play Button */}
          <div className="lg:col-span-12 flex">
            <FadeUp delay={0.1} y={30} className="w-full h-full">
              <div className="group relative h-full min-h-[360px] sm:min-h-[520px] w-full overflow-hidden rounded-2xl border border-border/70 shadow-xl isolate flex flex-col justify-end p-8 sm:p-10">
                <Image
                  src={videoPoster}
                  alt={t("videoHeading")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover -z-20 transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 -z-10"
                  aria-hidden="true"
                />

                {/* Centered Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    aria-label={t("playVideo")}
                    className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-secondary text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-primary cursor-pointer active:scale-95 group/btn"
                  >
                    <span className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping pointer-events-none" />
                    <Play
                      size={32}
                      className="ms-1 fill-white text-white transition-transform group-hover/btn:scale-110"
                    />
                  </button>
                </div>

                {/* Video Info at Bottom */}
                <div className="relative z-10">
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary">
                    {t("videoEyebrow")}
                  </span>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-white">
                    {t("videoHeading")}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-300">
                    {t("videoSub")}
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Block: Customer Reviews Card (Image 1 style) */}
          {/* <div className="lg:col-span-5 flex">
            <FadeUp delay={0.2} y={30} className="w-full h-full">
              <div className="relative flex flex-col justify-between h-full rounded-2xl border border-border/70 bg-card p-8 sm:p-10 shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-secondary">
                      {t("reviewEyebrow")}
                    </span>
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>
                  </div>

                  <SlideHeadingLeft as="h3" className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6">
                    {t("reviewHeading")}
                  </SlideHeadingLeft>

                  <div className="relative">
                    <Quote
                      size={44}
                      className="text-secondary/15 absolute -top-4 -start-2 pointer-events-none"
                    />
                    <p className="relative z-10 text-base sm:text-lg text-muted-foreground leading-relaxed italic">
                      &ldquo;{t("reviewQuote")}&rdquo;
                    </p>
                  </div>
                </div>

                
                <div className="mt-8 pt-6 border-t border-border/60 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-white font-bold text-lg shadow-md">
                    FA
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">
                      {t("reviewerName")}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {t("reviewerRole")}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div> */}
        </div>

        {/* Bottom Partner Logos Ribbon (as in Image 1) */}
        <FadeUp delay={0.3} y={25} className="mt-16 pt-12 border-t border-border/60">
          <div className="text-center mb-8">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-muted-foreground/70">
              {t("partnersEyebrow")}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20">
            {partnerLogos.map((logo, index) => (
              <div
                key={index}
                className="group flex h-12 w-28 sm:w-32 items-center justify-center grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-105 cursor-pointer"
              >
                <Image
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  width={130}
                  height={50}
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Video Modal Player */}
      {isVideoOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 end-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 cursor-pointer transition-colors"
              aria-label="Close video"
            >
              <X size={22} />
            </button>
            <div className="relative aspect-video w-full">
              <video
                src="/video/hero-video.mp4"
                controls
                autoPlay
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
