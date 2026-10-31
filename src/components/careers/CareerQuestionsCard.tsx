import { useTranslations } from "next-intl";
import { HelpCircle } from "lucide-react";
import FadeUp from "@/utils/FadeUp";

export default function CareerQuestionsCard() {
  const t = useTranslations("Careers");

  return (
    <FadeUp delay={0.25} y={20}>
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200/80 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-card sm:flex-row sm:text-start">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <HelpCircle size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">{t("questions")}</h4>
            <p className="text-xs text-muted-foreground">{t("questionsSub")}</p>
          </div>
        </div>
        <a
          href="mailto:careers@tmyazna.sa"
          className="text-sm font-bold text-secondary hover:underline"
        >
          careers@tmyazna.sa
        </a>
      </div>
    </FadeUp>
  );
}
