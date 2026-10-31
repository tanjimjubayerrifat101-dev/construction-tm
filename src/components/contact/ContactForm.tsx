"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Send,
  Loader2,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";
import FadeUp from "@/utils/FadeUp";
import contactImg from "@/assets/home/blog1.png";

export default function ContactForm() {
  const t = useTranslations("Contact");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate graceful message dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const inputClass =
    "w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-foreground placeholder:text-slate-400 outline-none transition-all duration-200 focus:bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20";

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container">
        <FadeUp duration={0.8} y={30}>
          <div className="flex flex-col md:flex-row overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* ── Left Side: Form ── */}
            <div className="w-full p-7 sm:p-10 lg:p-12 md:w-1/2">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest mb-2">
                  <span className="w-5 h-[2px] bg-secondary" />
                  <span>{t("formEyebrow")}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {t("heading")}
                </h2>
                <p className="text-sm text-slate-500 mt-1.5">
                  {t("formSubtitle")}
                </p>
              </div>

              {submitted ? (
                /* Success Feedback State */
                <div className="py-12 px-4 text-center flex flex-col items-center justify-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {t("successTitle")}
                  </h3>
                  <p className="text-slate-600 max-w-sm mx-auto text-sm mb-8 leading-relaxed">
                    {t("successMessage")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-secondary transition-colors cursor-pointer"
                  >
                    {t("sendAnother")}
                  </button>
                </div>
              ) : (
                /* Interactive Form with Fields from the Image */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Full name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t("fields.name")}
                      </label>
                      <input
                        type="text"
                        required
                        name="from_name"
                        placeholder={t("fields.namePlaceholder")}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t("fields.company")}
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder={t("fields.companyPlaceholder")}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t("fields.email")}
                      </label>
                      <input
                        type="email"
                        required
                        name="from_email"
                        placeholder={t("fields.emailPlaceholder")}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        {t("fields.phone")}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder={t("fields.phonePlaceholder")}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Row 3: Subject Select */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t("fields.subject")}
                    </label>
                    <select
                      name="subject"
                      defaultValue="general"
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="general">
                        {t("fields.subjectOptions.general")}
                      </option>
                      <option value="projects">
                        {t("fields.subjectOptions.projects")}
                      </option>
                      <option value="facility">
                        {t("fields.subjectOptions.facility")}
                      </option>
                      <option value="systems">
                        {t("fields.subjectOptions.systems")}
                      </option>
                      <option value="careers">
                        {t("fields.subjectOptions.careers")}
                      </option>
                      <option value="media">
                        {t("fields.subjectOptions.media")}
                      </option>
                    </select>
                  </div>

                  {/* Row 4: Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      {t("fields.message")}
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      placeholder={t("fields.messagePlaceholder")}
                      className={`${inputClass} resize-y min-h-[120px]`}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="
                        group relative inline-flex items-center justify-center gap-2.5
                        px-8 py-3.5 rounded-xl
                        bg-primary text-white text-sm font-semibold tracking-wide
                        shadow-md hover:bg-secondary hover:shadow-[0_8px_25px_rgba(0,134,255,0.3)]
                        transition-all duration-300 active:scale-[0.98] cursor-pointer
                        disabled:opacity-70 disabled:cursor-not-allowed
                      "
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t("submitting")}</span>
                        </>
                      ) : (
                        <>
                          <span>{t("submit")}</span>
                          <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* ── Right Side: Image using assets/home/blog1.png ── */}
            <div className="relative min-h-[350px] w-full md:min-h-full md:w-1/2 bg-slate-100">
              <Image
                src={contactImg}
                alt="TMYAZNA Contact"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              {/* Subtle brand tint gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#002244]/60 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
