import type { StaticImageData } from "next/image";
import alRajhiLogo from "@/assets/partner/AlRajhiBankLogo.svg";
import almoallamLogo from "@/assets/partner/Almoallam-logo.svg";
import bicscLogo from "@/assets/partner/BICSc-Blue-logo-RGB-01-e1639057859456.png";
import jordanPioneerLogo from "@/assets/partner/Jordan-Pioneer-Logo-White.png";
import abilityLogo from "@/assets/partner/ability.svg";
import alHajryLogo from "@/assets/partner/al-hajry-footer-logo-black.png";
import alinmaLogo from "@/assets/partner/alinma-logo-black.svg";
import awacoLogo from "@/assets/partner/awacosa.jpg";
import kahatainLogo from "@/assets/partner/kahatain.png";
import libanetLogo from "@/assets/partner/libanet.svg";
import nahilLogo from "@/assets/partner/nahil-logo-11-1.svg";
import millenniumLogo from "@/assets/partner/red-millennium-logo.svg";
import sabLogo from "@/assets/partner/sab-new-logo.svg";
import setraaLogo from "@/assets/partner/setra.png";
import msajidonaLogo from "@/assets/partner/smc-footer-logo.svg";
import rtccLogo from "@/assets/partner/job-azureerdge.png";
import saudiMetersLogo from "@/assets/partner/smc-footer-logo.svg"
import shapoorjiLogo from "@/assets/partner/icon_splogo_blue.svg"
import muheelLogo from "@/assets/partner/muheel1.png"
import rttLogo from "@/assets/partner/rtt.webp"
import sapLogo from "@/assets/partner/sap-logo-svg.svg"

export interface Partner {
  id: string;
  nameKey: string;
  initials: string;
  logo?: StaticImageData;
  logoAr?: StaticImageData;
  href?: string;
}

export interface PartnerCategory {
  id: string;
  titleKey: string;
  partners: Partner[];
}

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    id: "government",
    titleKey: "government",
    partners: [],
  },
  {
    id: "realEstate",
    titleKey: "realEstate",
    partners: [
      {
        id: "millennium",
        nameKey: "millennium",
        initials: "MH",
        logo: millenniumLogo,
        href: "https://www.millenniumhotels.com/",
      },
    ],
  },
  {
    id: "generalContracting",
    titleKey: "generalContracting",
    partners: [
      { id: "setraa", nameKey: "setraa", initials: "SA", logo: setraaLogo, href: "http://www.setraa.com" },
      { id: "alNabati", nameKey: "alNabati", initials: "AN" },
      { id: "jordanPioneer", nameKey: "jordanPioneer", initials: "JP", logo: jordanPioneerLogo, href: "https://jordanpioneer.com/" },    
      { id: "saudiMeters", nameKey: "saudiMeters", initials: "SM" ,logo: saudiMetersLogo, href: "https://saudimeters.com/"},
      { id: "shapoorji", nameKey: "shapoorji", initials: "SP" , logo:shapoorjiLogo ,href: "https://www.shapoorjipallonji.com/" },
      { id: "rtcc", nameKey: "rtcc", initials: "RT", logo: rttLogo, href: "https://www.rtcc.com.sa/" },
      { id: "saudiEmaar", nameKey: "saudiEmaar", initials: "SE" },
    ],
  },
  {
    id: "facilitiesManagement",
    titleKey: "facilitiesManagement",
    partners: [
      { id: "muheel", nameKey: "muheel", initials: "MU", logo: muheelLogo , href: "https://www.muheel.com/" },
      { id: "awaco", nameKey: "awaco", initials: "AW", logo: awacoLogo, href: "https://awacosa.com/" },
      { id: "libanet", nameKey: "libanet", initials: "LI", logo: libanetLogo, href: "https://libanet.aero" },
      { id: "ncms", nameKey: "ncms", initials: "NC", href: "https://www.ncms.sa/ar" },
      { id: "alHajry", nameKey: "alHajry", initials: "AH", logo: alHajryLogo, href: "https://alhajry-overseas.com.sa" },
      { id: "almoallam", nameKey: "almoallam", initials: "AM", logo: almoallamLogo, href: "https://almoallam.com/" },
    ],
  },
  {
    id: "banks",
    titleKey: "banks",
    partners: [
      { id: "alRajhi", nameKey: "alRajhi", initials: "AR", logo: alRajhiLogo, href: "https://www.alrajhibank.com.sa/" },
      { id: "sab", nameKey: "sab", initials: "SA", logo: sabLogo, href: "https://www.sab.com/en/personal/" },
      { id: "alinma", nameKey: "alinma", initials: "AL", logo: alinmaLogo, href: "https://www.alinma.com/" },
    ],
  },
  {
    id: "healthcare",
    titleKey: "healthcare",
    partners: [
      { id: "ability", nameKey: "ability", initials: "AB", logo: abilityLogo, href: "https://abilitycomms.com/" },
    ],
  },
  {
    id: "consultancyProfessionalServices",
    titleKey: "consultancyProfessionalServices",
    partners: [
      { id: "bicsc", nameKey: "bicsc", initials: "BI", logo: bicscLogo, href: "https://bics.org.uk" },
    ],
  },
  {
    id: "technologyDigitalSolutions",
    titleKey: "technologyDigitalSolutions",
    partners: [
      { id: "nahil", nameKey: "nahil", initials: "NH", logo: nahilLogo, href: "https://nahil.com.sa/ar/" },
      { id: "sap", nameKey: "sap", initials: "SP", logo: sapLogo, href: "https://www.sap.com/mena/index.html" },
    ],
  },
  {
    id: "nonProfit",
    titleKey: "nonProfit",
    partners: [
      { id: "kahatain", nameKey: "kahatain", initials: "KA", logo: kahatainLogo, href: "https://www.kahatain.org.sa/" },
      { id: "msajidona", nameKey: "msajidona", initials: "MS", logo: rtccLogo, href: "https://store.msajidona.org.sa/" },
    ],
  },
];
