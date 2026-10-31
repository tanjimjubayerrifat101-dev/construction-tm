import { useTranslations } from "next-intl";
import Breadcrumbs from "@/utils/Breadcrumb";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";
import heroImg from "@/assets/home/blog3.png";

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <main className="min-h-screen bg-background">
      <Breadcrumbs
        title={t("breadcrumb")}
        eyebrow={t("eyebrow")}
        heading={t("heading")}
        description={t("subheading")}
        image={heroImg}
      />
      <ContactInfoCards />
      <ContactForm />
      <ContactMap />
    </main>
  );
}