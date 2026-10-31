"use client";

import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import RollingButton from "@/utils/RollingButton";

interface ServiceCTAProps {
  serviceName: string;
  isRtl?: boolean;
}

export default function ServiceCTA({ serviceName, isRtl = false }: ServiceCTAProps) {
  const highlights = isRtl
    ? [
        { icon: ShieldCheck, text: "معايير معتمدة ومطابقة للكود السعودي" },
        { icon: Zap, text: "جاهزية واستجابة سريعة في كافة أنحاء المملكة" },
        { icon: CheckCircle2, text: "حلول هندسية متكاملة تدعم رؤية 2030" },
      ]
    : [
        { icon: ShieldCheck, text: "100% Certified to Saudi Building & Safety Codes" },
        { icon: Zap, text: "Rapid Mobilization & Deployment Across the Kingdom" },
        { icon: CheckCircle2, text: "Turnkey Engineering Aligned with Vision 2030" },
      ];

  return (
    <section className="w-full mt-20 lg:mt-28">
      <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#00142b] via-[#002452] to-[#003b7a] p-8 sm:p-12 lg:p-16 text-white border border-white/10 shadow-2xl">
        {/* Ambient lighting glow spheres */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -end-24 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -start-24 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Subtle architectural grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
          }}
        />

        {/* 2-Column Responsive Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading, description & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Pill Eyebrow Badge with Pulse Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-5 text-xs font-bold uppercase tracking-wider text-secondary shadow-xs">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>{isRtl ? "شراكة موثوقة في المملكة" : "TRUSTED SAUDI PARTNER"}</span>
            </div>

            {/* Main CTA Heading */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[115%] mb-5">
              {isRtl ? (
                <>
                  هل تخطط لمشروع يحتاج إلى خبرة في{" "}
                  <span className="text-secondary">{serviceName}</span>؟
                </>
              ) : (
                <>
                  Looking for exceptional{" "}
                  <span className="text-secondary">{serviceName}</span> expertise?
                </>
              )}
            </h3>

            {/* Subtitle */}
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal">
              {isRtl
                ? "تواصل مع فريقنا الهندسي المتخصص في الرياض لمناقشة المتطلبات الفنية، دراسات الجدوى، والجدول الزمني لتنفيذ مشروعك وفق أعلى معايير الجودة."
                : "Connect with our engineering specialists in Riyadh to review specifications, streamline compliance, and accelerate your project delivery."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <RollingButton
                text={isRtl ? "تواصل مع فريقنا الآن" : "Contact Our Team"}
                href="/contact"
                variant="primary"
                className="shadow-xl"
              />
            </div>
          </div>

          {/* Right Column: Sleek Glassmorphic Trust Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl sm:rounded-3xl bg-white/8 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                  {isRtl ? "ضمانات الجودة والتميز" : "TMYAZNA ADVANTAGE"}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-secondary/20 text-secondary border border-secondary/30">
                  KSA Vision 2030
                </span>
              </div>

              {/* Highlights List */}
              <div className="flex flex-col gap-4">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                    >
                      <div className="p-2 rounded-lg bg-secondary/20 text-secondary shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-200 leading-snug">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Contact Prompt */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>{isRtl ? "المكتب الرئيسي: الرياض" : "Head Office: Riyadh, KSA"}</span>
                <span className="font-semibold text-secondary">info@tmyazna.sa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
