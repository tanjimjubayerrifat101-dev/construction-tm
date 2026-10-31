import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { JobPosition } from "@/data/careersData";
import FadeUp from "@/utils/FadeUp";

interface CareerJobDescriptionProps {
  job: JobPosition;
}

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

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="inline-block rounded-md bg-sky-50 px-3 py-1.5 text-sm font-bold text-primary dark:bg-sky-500/10 dark:text-sky-200 sm:text-base">
      {children}
    </h4>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 ps-6 text-sm leading-relaxed text-foreground/85 marker:text-foreground/60 sm:text-[15px]">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default function CareerJobDescription({
  job,
}: CareerJobDescriptionProps) {
  const isAr = useLocale() === "ar";
  const jobTitle = isAr ? job.title.ar : job.title.en;
  const postedDate = formatPostedDate(job.postedDate, isAr);
  const requirementGroups = [
    {
      key: "education",
      title: isAr
        ? "المؤهلات العلمية / المهنية"
        : "Education / Professional Qualification",
      items: isAr ? job.requirements.education.ar : job.requirements.education.en,
    },
    {
      key: "experience",
      title: isAr ? "الخبرة" : "Experience",
      items: isAr ? job.requirements.experience.ar : job.requirements.experience.en,
    },
    {
      key: "licensing",
      title: isAr
        ? "الترخيص المهني / الشهادات / التدريب"
        : "Professional Licensing / Certification / Training",
      items: isAr ? job.requirements.licensing.ar : job.requirements.licensing.en,
    },
  ].filter((group) => group.items.length > 0);

  return (
    <FadeUp delay={0.1} y={25}>
      <article className="rounded-3xl border border-gray-200/90 bg-white p-5 shadow-xl dark:border-white/10 dark:bg-card sm:p-8 lg:p-10">
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
              {postedDate}
            </span>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 font-medium text-muted-foreground dark:bg-white/10">
              <MapPin size={14} aria-hidden="true" />
              {isAr ? job.location.ar : job.location.en}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 font-medium text-emerald-600 dark:text-emerald-400">
              <Clock size={14} aria-hidden="true" />
              {isAr ? job.type.ar : job.type.en}
            </span>
          </div>
        </header>

        <section className="pt-8">
          <SectionTitle>{isAr ? "الوصف الوظيفي" : "Description"}</SectionTitle>
          <div className="mt-5">
            <SubHeading>
              {isAr ? "الغرض من الوظيفة / الهدف" : "Job Purpose / Objective"}
            </SubHeading>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-base">
              {isAr ? job.overview.ar : job.overview.en}
            </p>
          </div>
          <div className="mt-8">
            <SubHeading>
              {isAr
                ? "المسؤوليات والمهام الرئيسية"
                : "Key Responsibilities / Accountabilities"}
            </SubHeading>
            <BulletList
              items={
                isAr ? job.responsibilities.ar : job.responsibilities.en
              }
            />
          </div>
        </section>

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
  );
}
