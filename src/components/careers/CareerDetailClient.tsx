"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  UploadCloud,
  FileText,
  X,
  Send,
  Building2,
  MapPin,
  Clock,
  CalendarDays,
  HelpCircle,
  CheckCircle,
  Loader2,
  User,
  Mail,
  Phone,
  Globe,
  Briefcase,
  Link2,
  Timer,
  MessageSquare,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { JOB_POSITIONS } from "@/data/careersData";
import FadeUp from "@/utils/FadeUp";

interface CareerDetailClientProps {
  jobId: string;
}

/* ── small presentational helpers (kept outside the component so they don't remount on every render) ── */

function formatPostedDate(iso: string, isAr: boolean) {
  return new Intl.DateTimeFormat(isAr ? "ar-SA-u-ca-gregory" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
      {children}
    </h3>
  );
}

/** Light-blue heading used for "Job Purpose", "Key Responsibilities", "Education" ... */
function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="inline-block rounded-md bg-sky-50 px-3 py-1.5 text-sm font-bold text-primary dark:bg-sky-500/10 dark:text-sky-200 sm:text-base">
      {children}
    </h4>
  );
}

/** Real bullet points (no check icons) */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 ps-6 text-sm leading-relaxed text-foreground/85 marker:text-foreground/60 sm:text-[15px]">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

function FormSectionHeader({
  num,
  title,
  sub,
}: {
  num: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3.5 border-b border-slate-200/60 bg-gradient-to-r from-secondary/8 via-secondary/4 to-transparent px-5 py-4 dark:border-white/6 dark:from-secondary/12 dark:via-secondary/5 dark:to-transparent sm:px-6">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary font-mono text-xs font-bold text-white shadow-md shadow-secondary/30">
        {num}
      </div>
      <div>
        <h4 className="text-sm font-bold tracking-tight text-foreground sm:text-base">
          {title}
        </h4>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function SelectChevron() {
  return (
    <svg
      className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-slate-400"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CareerDetailClient({ jobId }: CareerDetailClientProps) {
  const t = useTranslations("Careers");
  const locale = useLocale();
  const isAr = locale === "ar";

  // The job shown on the page always follows the URL (/careers/[jobId])
  const currentJob = JOB_POSITIONS.find((j) => j.id === jobId) || JOB_POSITIONS[0];

  // The position picked inside the application form. It starts as the job being viewed,
  // and resets automatically whenever the viewed job changes.
  const [applyChoice, setApplyChoice] = useState<{ from: string; id: string } | null>(null);
  const applyJobId =
    applyChoice && applyChoice.from === currentJob.id ? applyChoice.id : currentJob.id;

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Keep the active job card visible inside the scrollable job list
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const list = listRef.current;
    const activeJob = list?.querySelector<HTMLElement>('[aria-current="page"]');

    if (list && activeJob) {
      list.scrollTo({
        top: activeJob.offsetTop - (list.clientHeight - activeJob.clientHeight) / 2,
        behavior: "smooth",
      });
    }
  }, [currentJob.id]);

  // Form fields state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    nationality: "",
    experience: "3-5 years",
    currentEmployer: "",
    noticePeriod: "1 month",
    linkedin: "",
    coverNote: "",
    consent: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert(isAr ? "يرجى الموافقة على شروط معالجة البيانات للمتابعة." : "Please agree to the privacy consent to proceed.");
      return;
    }
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  /* ── job data for the current language ── */
  const jobTitle = isAr ? currentJob.title.ar : currentJob.title.en;
  const jobLoc = isAr ? currentJob.location.ar : currentJob.location.en;
  const jobType = isAr ? currentJob.type.ar : currentJob.type.en;
  const objective = isAr ? currentJob.overview.ar : currentJob.overview.en;
  const responsibilities = isAr ? currentJob.responsibilities.ar : currentJob.responsibilities.en;
  const postedLabel = formatPostedDate(currentJob.postedDate, isAr);

  const requirementGroups = [
    {
      key: "education",
      title: isAr ? "المؤهلات العلمية / المهنية" : "Education / Professional Qualification",
      items: isAr ? currentJob.requirements.education.ar : currentJob.requirements.education.en,
    },
    {
      key: "experience",
      title: isAr ? "الخبرة" : "Experience",
      items: isAr ? currentJob.requirements.experience.ar : currentJob.requirements.experience.en,
    },
    {
      key: "licensing",
      title: isAr ? "الترخيص المهني / الشهادات / التدريب" : "Professional Licensing / Certification / Training",
      items: isAr ? currentJob.requirements.licensing.ar : currentJob.requirements.licensing.en,
    },
  ].filter((group) => group.items.length > 0);

  /* ── shared class helpers (application form) ── */
  const inputClass =
    "w-full ps-10 pe-4 py-3.5 rounded-xl bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-white/8 text-foreground text-sm placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-sm";

  const selectClass =
    "w-full ps-10 pe-8 py-3.5 rounded-xl bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-white/8 text-foreground text-sm outline-none transition-all duration-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 shadow-sm cursor-pointer appearance-none";

  return (
    <div className="bg-slate-50/50 dark:bg-background pb-24 ">
      <div className="container relative z-20 max-w-7xl pt-24 ">
        {/* ══ Job list (left) + Job details (right) ══ */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">

          {/* ── Left: all open positions, scrollable ── */}
          <aside
            aria-label={isAr ? "الوظائف المتاحة" : "Open positions"}
            className="min-w-0 lg:sticky lg:top-24 lg:col-span-3"
          >
            <p className="mb-3 px-1 text-sm font-bold text-foreground">
              {isAr ? "الوظائف المتاحة" : "Open positions"} ({JOB_POSITIONS.length})
            </p>

            
            <div
              ref={listRef}
              className="relative flex max-h-64 flex-col gap-3 overflow-y-auto overscroll-y-contain p-1 pb-3 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] lg:max-h-[calc(100vh-7rem)] lg:pb-1"
            >
              {JOB_POSITIONS.map((job) => {
                const isActive = job.id === currentJob.id;
                return (
                  <Link
                    key={job.id}
                    href={`/careers/${job.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`block w-full shrink-0 rounded-xl border bg-white p-4 transition-colors duration-200 dark:bg-card sm:p-5 ${
                      isActive
                        ? "border-secondary shadow-md ring-1 ring-secondary/30"
                        : "border-gray-200/90 hover:border-secondary/50 dark:border-white/10"
                    }`}
                  >
                    <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                      {isAr ? job.title.ar : job.title.en}
                    </h3>
                    <div className="my-3 h-px bg-gray-100 dark:bg-white/10" />
                    <p className="text-xs font-medium text-foreground/80">
                      {isAr ? job.type.ar : job.type.en}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {isAr ? job.location.ar : job.location.en}
                    </p>
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* ── Right: Description + Requirements ── */}
          <div className="min-w-0 lg:col-span-9">
            <FadeUp delay={0.1} y={25}>
              <article className="rounded-3xl border border-gray-200/90 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-card sm:p-8 lg:p-10">

                {/* Header: title, posted date, location, type */}
                <header className="border-b border-gray-100 pb-6 dark:border-white/5">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                    {jobTitle}
                  </h2>

                  <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays size={15} aria-hidden="true" className="shrink-0" />
                    <span>
                      <span className="font-semibold text-foreground">
                        {isAr ? "تاريخ النشر:" : "Posted On:"}
                      </span>{" "}
                      {postedLabel}
                    </span>
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-muted-foreground dark:bg-white/10">
                      <MapPin size={14} aria-hidden="true" />
                      {jobLoc}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                      <Clock size={14} aria-hidden="true" />
                      {jobType}
                    </span>
                  </div>
                </header>

                {/* Description = objective + key responsibilities */}
                <section className="pt-8">
                  <SectionTitle>{isAr ? "الوصف الوظيفي" : "Description"}</SectionTitle>

                  <div className="mt-5">
                    <SubHeading>
                      {isAr ? "الغرض من الوظيفة / الهدف" : "Job Purpose / Objective"}
                    </SubHeading>
                    <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
                      {objective}
                    </p>
                  </div>

                  <div className="mt-8">
                    <SubHeading>
                      {isAr ? "المسؤوليات والمهام الرئيسية" : "Key Responsibilities / Accountabilities"}
                    </SubHeading>
                    <BulletList items={responsibilities} />
                  </div>
                </section>

                {/* Requirements = education + experience + licensing */}
                {requirementGroups.length > 0 && (
                  <section className="mt-10 border-t border-gray-100 pt-8 dark:border-white/5">
                    <SectionTitle>{isAr ? "المتطلبات" : "Requirements"}</SectionTitle>

                    {requirementGroups.map((group) => (
                      <div key={group.key} className="mt-6 first:mt-5">
                        <SubHeading>{group.title}</SubHeading>
                        <BulletList items={group.items} />
                      </div>
                    ))}
                  </section>
                )}

                {/* Apply */}
                <footer className="mt-10 flex justify-end border-t border-gray-100 pt-6 dark:border-white/5">
                  <a
                    href="#apply-form"
                    className="inline-flex items-center justify-center rounded-lg border border-secondary px-10 py-2.5 text-sm font-semibold text-secondary transition-colors duration-200 hover:bg-secondary hover:text-white"
                  >
                    {isAr ? "قدّم الآن" : "Apply"}
                  </a>
                </footer>
              </article>
            </FadeUp>

          {/* Application form follows the selected job details. */}
          <FadeUp delay={0.2} y={30}>
            <div
              id="apply-form"
              className="relative mt-6 scroll-mt-24 overflow-hidden rounded-3xl border border-gray-200/90 bg-white shadow-xl dark:border-white/10 dark:bg-card sm:mt-8"
            >
              {/* gradient top bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary absolute top-0 inset-x-0" />

              {isSubmitted ? (
                /* ── Success state ── */
                <div className="space-y-5 px-5 py-12 text-center sm:px-6 sm:py-16">
                  <div className="w-24 h-24 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center shadow-inner">
                    <CheckCircle size={52} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{t("successTitle")}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                    {t("successDesc")}
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-10 py-3.5 rounded-full bg-secondary text-white font-bold text-sm shadow-lg shadow-secondary/25 hover:bg-secondary/90 transition-all cursor-pointer"
                    >
                      {isAr ? "تقديم طلب آخر" : "Submit another application"}
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="p-5 pt-9 sm:p-8 sm:pt-10 lg:p-10 lg:pt-12">
                  {/* Form header */}
                  <div className="mx-auto mb-7 max-w-xl text-center sm:mb-8">
                    <div className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                      <span className="w-6 h-0.5 bg-secondary rounded-full" />
                      <span>{t("applicationEyebrow")}</span>
                      <span className="w-6 h-0.5 bg-secondary rounded-full" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {t("formTitle")}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">{t("formSubtitle")}</p>
                  </div>

                  <div className="space-y-5">
                    {/* ─ Section 01: Personal Details ─ */}
                    <div className="rounded-2xl overflow-hidden border border-slate-200/70 dark:border-white/8 shadow-sm">
                      <FormSectionHeader num="01" title={t("personalDetails")} sub={t("personalDetailsSub")} />

                      <div className="grid grid-cols-1 gap-4 bg-slate-50/60 p-4 dark:bg-slate-900/30 sm:p-5">
                        {/* First Name */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("firstName")} <span className="text-secondary">*</span>
                          </label>
                          <div className="relative">
                            <User size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} placeholder={isAr ? "محمد" : "First name"} className={inputClass} />
                          </div>
                        </div>

                        {/* Last Name */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("lastName")} <span className="text-secondary">*</span>
                          </label>
                          <div className="relative">
                            <User size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} placeholder={isAr ? "العتيبي" : "Last name"} className={inputClass} />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("email")} <span className="text-secondary">*</span>
                          </label>
                          <div className="relative">
                            <Mail size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="you@email.com" className={inputClass} />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("phone")} <span className="text-secondary">*</span>
                          </label>
                          <div className="relative">
                            <Phone size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+966 5X XXX XXXX" className={inputClass} />
                          </div>
                        </div>

                        {/* City */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("city")}
                          </label>
                          <div className="relative">
                            <MapPin size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder={isAr ? "الرياض" : "e.g. Riyadh"} className={inputClass} />
                          </div>
                        </div>

                        {/* Nationality */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("nationality")}
                          </label>
                          <div className="relative">
                            <Globe size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} placeholder={isAr ? "سعودي" : "Nationality"} className={inputClass} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ─ Section 02: Position & Experience ─ */}
                    <div className="rounded-2xl overflow-hidden border border-slate-200/70 dark:border-white/8 shadow-sm">
                      <FormSectionHeader num="02" title={t("positionExperience")} sub={t("positionExperienceSub")} />

                      <div className="grid grid-cols-1 gap-4 bg-slate-50/60 p-4 dark:bg-slate-900/30 sm:p-5">
                        {/* Position – full width */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("position")} <span className="text-secondary">*</span>
                          </label>
                          <div className="relative">
                            <Briefcase size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                            <SelectChevron />
                            <select
                              name="position"
                              required
                              value={applyJobId}
                              onChange={(e) => setApplyChoice({ from: currentJob.id, id: e.target.value })}
                              className={`${selectClass} font-semibold`}
                            >
                              {JOB_POSITIONS.map((pos) => (
                                <option key={pos.id} value={pos.id}>
                                  {isAr ? pos.title.ar : pos.title.en} — ({isAr ? pos.department.ar : pos.department.en})
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Experience */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("experience")} <span className="text-secondary">*</span>
                          </label>
                          <div className="relative">
                            <Briefcase size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                            <SelectChevron />
                            <select name="experience" value={formData.experience} onChange={handleInputChange} className={selectClass}>
                              <option value="1-3 years">{isAr ? "١-٣ سنوات" : "1-3 years"}</option>
                              <option value="3-5 years">{isAr ? "٣-٥ سنوات" : "3-5 years"}</option>
                              <option value="5-8 years">{isAr ? "٥-٨ سنوات" : "5-8 years"}</option>
                              <option value="8+ years">{isAr ? "٨+ سنوات" : "8+ years"}</option>
                            </select>
                          </div>
                        </div>

                        {/* Notice Period */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("noticePeriod")}
                          </label>
                          <div className="relative">
                            <Timer size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
                            <SelectChevron />
                            <select name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange} className={selectClass}>
                              <option value="immediate">{isAr ? "فوري" : "Immediate"}</option>
                              <option value="1 month">{isAr ? "شهر واحد" : "1 month"}</option>
                              <option value="2 months">{isAr ? "شهران" : "2 months"}</option>
                              <option value="3 months">{isAr ? "٣ أشهر" : "3 months"}</option>
                            </select>
                          </div>
                        </div>

                        {/* Current Employer – full width */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("currentEmployer")}
                          </label>
                          <div className="relative">
                            <Building2 size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input type="text" name="currentEmployer" value={formData.currentEmployer} onChange={handleInputChange} placeholder={isAr ? "اسم جهة العمل الحالية أو السابقة" : "Current company / organization name"} className={inputClass} />
                          </div>
                        </div>

                        {/* LinkedIn – full width */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("linkedin")}
                          </label>
                          <div className="relative">
                            <Link2 size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/username" className={inputClass} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ─ Section 03: Documents & Cover Note ─ */}
                    <div className="rounded-2xl overflow-hidden border border-slate-200/70 dark:border-white/8 shadow-sm">
                      <FormSectionHeader num="03" title={t("documentsTitle")} sub={t("documentsSub")} />

                      <div className="p-5 sm:p-6 bg-slate-50/60 dark:bg-slate-900/30 space-y-5">
                        {/* CV Upload */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {isAr ? "السيرة الذاتية (CV)" : "Resume / CV"} <span className="text-secondary">*</span>
                          </label>

                          {uploadedFile ? (
                            <div className="flex items-center justify-between p-4 sm:p-5 rounded-xl bg-white dark:bg-card border-2 border-secondary/40 shadow-sm">
                              <div className="flex items-center gap-3.5">
                                <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                                  <FileText size={22} />
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-foreground">{uploadedFile.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {isAr ? "جاهز للإرسال" : "Ready to submit"}
                                  </p>
                                </div>
                              </div>
                              <button type="button" onClick={handleRemoveFile} className="p-2 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer" title="Remove file">
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <label className="relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/12 hover:border-secondary bg-white dark:bg-card hover:bg-secondary/5 transition-all duration-300 cursor-pointer group shadow-xs">
                              <input type="file" accept=".pdf,.doc,.docx" required onChange={handleFileChange} className="sr-only" />
                              <div className="w-14 h-14 rounded-2xl bg-secondary/10 group-hover:bg-secondary text-secondary group-hover:text-white flex items-center justify-center mb-3 transition-all duration-300 shadow-sm group-hover:scale-105">
                                <UploadCloud size={26} />
                              </div>
                              <span className="text-sm font-bold text-foreground group-hover:text-secondary transition-colors">
                                {t("cvUpload")}
                              </span>
                              <span className="text-xs text-muted-foreground mt-1">{t("cvFormats")}</span>
                            </label>
                          )}
                        </div>

                        {/* Cover Note */}
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                            {t("coverNote")}
                          </label>
                          <div className="relative">
                            <MessageSquare size={15} className="absolute start-3 top-3.5 text-slate-400 pointer-events-none" />
                            <textarea
                              name="coverNote"
                              rows={4}
                              value={formData.coverNote}
                              onChange={handleInputChange}
                              placeholder={t("coverNotePlaceholder")}
                              className="w-full min-h-[110px] resize-y rounded-xl border border-slate-200 bg-white py-3.5 ps-10 pe-4 text-sm text-foreground shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-secondary focus:ring-2 focus:ring-secondary/20 dark:border-white/8 dark:bg-[#0d1117]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ─ Consent ─ */}
                    <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-xl bg-secondary/5 dark:bg-secondary/10 border border-secondary/20 dark:border-secondary/25">
                      <input
                        type="checkbox"
                        id="consent-checkbox"
                        name="consent"
                        required
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className="w-4 h-4 mt-0.5 rounded border-slate-300 text-secondary focus:ring-secondary cursor-pointer accent-secondary shrink-0"
                      />
                      <label htmlFor="consent-checkbox" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors leading-relaxed cursor-pointer">
                        {t("consentText")}
                      </label>
                    </div>

                    {/* ─ Submit ─ */}
                    <div className="text-center pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-4 text-sm font-bold text-white shadow-xl shadow-secondary/25 transition-all duration-500 hover:from-secondary hover:to-primary active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed sm:text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            <span>{t("submitting")}</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                            <span>{t("submitBtn")}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
        </div>

        <div className="mt-8">
          {/* ══ Questions Help Card ══ */}
          <FadeUp delay={0.25} y={20}>
            <div className="rounded-2xl p-6 bg-white dark:bg-card border border-gray-200/80 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{t("questions")}</h4>
                  <p className="text-xs text-muted-foreground">{t("questionsSub")}</p>
                </div>
              </div>
              <a href="mailto:careers@tmyazna.sa" className="text-sm font-bold text-secondary hover:underline">
                careers@tmyazna.sa
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}