"use client";

import { useTranslations } from "next-intl";
import { MapPin, ExternalLink } from "lucide-react";
import SlideHeadingLeft from "@/utils/SlideHeading";
import SlideHeadingRight from "@/utils/SlideHeadingRight";
import SlideBox from "@/utils/SlideBox";

export default function ContactMap() {
  const t = useTranslations("Contact");

  // Google Maps embed URL centered on Anas Ibn Malik St, Al Narjis, Riyadh, Saudi Arabia
  const embedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14488.756778438138!2d46.6749877!3d24.8236021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ef09ef0a41f87%3A0x6b8c9d46f5b72186!2sAnas%20Ibn%20Malik%20Rd%2C%20Al%20Narjis%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa";

  const directMapUrl =
    "https://maps.google.com/?q=Al-Narjis+District+Anas+Ibn+Malik+St+Riyadh";

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container">
        {/* Centered Heading with SlideHeadingLeft & SlideHeadingRight matching Home page sections */}
        <div className="flex justify-center items-center flex-col w-full mb-12 sm:mb-16">
          <div className="text-center w-full xl:w-[80%] 2xl:w-[60%]">
            <SlideHeadingLeft className="text-3xl sm:text-4xl lg:text-5xl text-primary font-regular uppercase mb-3">
              {t("mapEyebrow")}
            </SlideHeadingLeft>
            <SlideHeadingRight className="text-base sm:text-lg lg:text-xl text-slate-600">
              {t("mapHeading")}
            </SlideHeadingRight>
          </div>
        </div>

        {/* Map Container wrapped in SlideBox */}
        <SlideBox direction="right" distance={45} className="w-full">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-lg h-[420px] sm:h-[480px] lg:h-[540px] isolate">
            <iframe
              title="TMYAZNA Head Office Location"
              src={embedUrl}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Location Card Overlay */}
            <div className="absolute start-4 bottom-4 sm:start-6 sm:bottom-6 z-10 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-slate-200 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-foreground">
                    TMYAZNA
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {t("address")}
                  </p>
                  <a
                    href={directMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-secondary mt-3 transition-colors"
                  >
                    <span>{t("openInGoogleMaps")}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </SlideBox>
      </div>
    </section>
  );
}
