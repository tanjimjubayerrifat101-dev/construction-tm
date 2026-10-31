"use client";

import { useTranslations } from "next-intl";
import { Send, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import FadeUp from "@/utils/FadeUp";

export default function CareersCtaBanner() {
  const t = useTranslations("Careers");

  return (
    <section className="container mb-20 sm:mb-28">
      <FadeUp delay={0.1} y={25} threshold="top 90%">
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-r from-[#00142b] via-[#00285a] to-[#004187] p-8 sm:p-12 lg:p-16 text-white border border-white/10 shadow-2xl text-center">
          {/* Subtle decorative grid pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Ambient lighting glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -end-24 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -start-24 w-80 h-80 bg-primary/30 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center">
            <span className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary mb-3">
              <span className="w-6 h-0.5 bg-secondary" />
              <span>{t("dontSeeRole")}</span>
              <span className="w-6 h-0.5 bg-secondary" />
            </span>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              {t("sendCv")}
            </h3>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mb-8">
              {t("sendCvDesc")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href="/careers/senior-mep-engineer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-secondary hover:bg-secondary/90 text-white font-bold text-sm sm:text-base shadow-xl shadow-secondary/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <Send size={18} />
                <span>{t("submitApplication")}</span>
              </Link>

              <a
                href="mailto:careers@tmyazna.sa"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
              >
                <Mail size={18} />
                <span>careers@tmyazna.sa</span>
              </a>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
