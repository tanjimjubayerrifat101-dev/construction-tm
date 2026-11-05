"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import logo from "@/assets/navbar/tmyzna-logo.png";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";


interface FooterLinkProps {
  href: string;
  label: string;
  dir: "ltr" | "rtl";
}

function RollingFooterLink({ href, label, dir }: FooterLinkProps) {
  return (
    <Link
      href={href}
      dir={dir}
      className="group inline-flex items-center text-[15px] text-gray-300 transition-colors duration-300"
    >
      <span className="footer-rolling-text-wrap">
        <span className="footer-text-item footer-text-primary text-gray-300">
          {label}
        </span>
        <span className="footer-text-item footer-text-duplicate font-medium text-secondary">
          {label}
        </span>
      </span>
    </Link>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations("Footer");
  const isRtl = useLocale() === "ar";

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }
  const textDirection = isRtl ? "rtl" : "ltr";

  const businessLinesLinks = [
    { label: t("links.systemsIntegration"), href: "/service/systems-integration" },
    { label: t("links.construction"), href: "/service/construction" },
    { label: t("links.facilityServices"), href: "/service/facility-services" },
    { label: t("links.manpower"), href: "/service/manpower" },
    { label: t("links.environmental"), href: "/service/environmental" },
  ];

  const companyLinks = [
    { label: t("links.aboutUs"), href: "/about" },
    { label: t("links.ourServices"), href: "/service" },
    { label: t("links.ourLeadership"), href: "/about" },
    { label: t("links.mediaCenter"), href: "/media" },
    { label: t("links.contact"), href: "/contact" },
  ];

  return (
    <footer
      dir="ltr"
      className={`w-full bg-[#0d1627] text-white pt-16 md:pt-24 pb-12 relative overflow-hidden ${
        isRtl ? "font-cairo" : "font-primary"
      }`}
    >
      {/* Premium glow effect */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-[-200px] start-1/4 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10 max-w-[1400px]">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-20">
          {/* Logo & Tagline Column */}
          <div
            className={`lg:col-span-3 flex flex-col gap-4 ${
              isRtl
                ? "items-end text-right md:col-span-2"
                : "items-start pr-4"
            }`}
          >
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <Image
                src={logo}
                alt="TMYAZNA LOGO"
                className="w-32 md:w-40 brightness-0 invert object-contain"
              />
            </Link>
            <div
              dir={textDirection}
              className="mt-2 flex w-full flex-col gap-1 text-[14px] font-medium text-gray-300"
            >
              <p>{t("tagline")}</p>
            </div>
          </div>

          {/* Spacer for large screens */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Business Lines */}
          <div dir={textDirection} className="lg:col-span-2 flex flex-col space-y-6">
            <h4 className="text-[13px] font-bold text-white tracking-widest uppercase">
              {t("sections.businessLines")}
            </h4>
            <ul className="flex flex-col space-y-3.5">
              {businessLinesLinks.map((link, idx) => (
                <li key={`business-${idx}`}>
                  <RollingFooterLink href={link.href} label={link.label} dir={textDirection} />
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div dir={textDirection} className="lg:col-span-2 flex flex-col space-y-6">
            <h4 className="text-[13px] font-bold text-white tracking-widest uppercase">
              {t("sections.company")}
            </h4>
            <ul className="flex flex-col space-y-3.5">
              {companyLinks.map((link, idx) => (
                <li key={`company-${idx}`}>
                  <RollingFooterLink href={link.href} label={link.label} dir={textDirection} />
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Get In Touch */}
          <div dir={textDirection} className="lg:col-span-3 flex flex-col space-y-6">
            <h4 className="text-[13px] font-bold text-white tracking-widest uppercase">
              {t("sections.getInTouch")}
            </h4>
            <div className="flex w-full flex-col items-stretch space-y-4 text-[15px] text-gray-300">
              <a
                href="tel:+966112031398"
                dir="ltr"
                className={`block w-full ${isRtl ? "text-right" : ""} hover:text-white transition-colors duration-300`}
              >
                +966 11 203 1398
              </a>
              <a
                href="mailto:info@tmyazna.sa"
                dir="ltr"
                className={`block w-full ${isRtl ? "text-right" : ""} hover:text-white transition-colors duration-300`}
              >
                info@tmyazna.sa
              </a>
              <p
                dir={textDirection}
                className={`w-full ${isRtl ? "text-right" : "text-left"} leading-relaxed`}
              >
                {t("contactInfo.address1")}
                <br />
                {t("contactInfo.address2")}
              </p>
              
              {/* Social Icons */}
              <div
                dir="ltr"
                className={`flex w-full items-center gap-4 pt-2 ${
                  isRtl ? "justify-end" : "justify-start"
                }`}
              >
                <a
                  href="https://www.instagram.com/tmyazna/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="group flex items-center justify-center transition-transform hover:-translate-y-1"
                >
                  <FaInstagram
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400 transition-colors group-hover:text-secondary"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/tmyazna/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="group flex items-center justify-center transition-transform hover:-translate-y-1"
                >
                  <FaLinkedinIn
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400 transition-colors group-hover:text-secondary"
                  />
                </a> 
                <a
                  href="https://www.facebook.com/tmyazna/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="group flex items-center justify-center transition-transform hover:-translate-y-1"
                >
                  <FaFacebookF
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400 transition-colors group-hover:text-secondary"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-[14px] text-gray-400 font-medium border-t border-white/5">
          {/* Left Side: Copyright and Legal Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span dir={textDirection} className="text-gray-500 text-center">
              {t("legal.copyright")}
            </span>
            <div dir={textDirection} className="flex items-center gap-4">
              <Link href="/contact" className="hover:text-white transition-colors duration-200">
                {t("legal.contact")}
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                {t("legal.privacyPolicy")}
              </Link>
            </div>
          </div>

          {/* Right Side: Arabic Name */}
          {/* <div className="text-gray-500 font-arabic tracking-wide" dir="rtl">
            {t("legal.arabicName")}
          </div> */}
        </div>
      </div>
    </footer>
  );
}
