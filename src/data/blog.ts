/**
 * Typed blog/news data for the "Latest News" section and Media Center listing.
 *
 * Each post has bilingual content fields (en + ar).
 * The `slug` is used as the dynamic route param: /media/[slug]
 *
 * Images are imported from src/assets/home/ — next/image handles optimisation.
 * When you add real CMS data, replace this file with an API fetch / MDX loader
 * and keep the same BlogPost interface.
 */

import blog1 from "@/assets/home/blog1.png";
import blog2 from "@/assets/home/blog2.png";
import blog3 from "@/assets/home/blog3.png";
import type { StaticImageData } from "next/image";

export interface BlogPost {
  slug: string;
  image: StaticImageData;
  date: string; // ISO 8601, e.g. "2026-06-05"
  category: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  excerpt: {
    en: string;
    ar: string;
  };
  /** Full article body — used on the detail page */
  body: {
    en: string;
    ar: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "tmyazna-advances-sustainable-facility-management",
    image: blog1,
    date: "2026-06-05",
    category: {
      en: "Facility Services",
      ar: "خدمات المرافق",
    },
    title: {
      en: "TMYAZNA advances sustainable facility management across the Kingdom",
      ar: "تميزنا تُطوّر منظومة إدارة المرافق المستدامة في أنحاء المملكة",
    },
    excerpt: {
      en: "As part of Saudi Vision 2030, TMYAZNA is expanding its integrated systems and facility services portfolio — driving energy efficiency and long-term value across the Kingdom's landmark developments.",
      ar: "في إطار رؤية السعودية 2030، تُوسّع تميزنا محفظتها من الأنظمة المتكاملة وخدمات المرافق، مما يعزز كفاءة الطاقة والقيمة طويلة الأمد في مشاريع المملكة الكبرى.",
    },
    body: {
      en: "TMYAZNA continues to build on its reputation as a trusted partner in the Kingdom's infrastructure growth. With a focus on sustainable facility management, the company has deployed smart energy monitoring systems across multiple landmark sites, reducing consumption by up to 30% and significantly improving occupant comfort. The initiative aligns directly with the Kingdom's Vision 2030 targets for sustainability and economic diversification.",
      ar: "تواصل تميزنا بناء سمعتها بوصفها شريكاً موثوقاً في النمو الهيكلي للمملكة. من خلال التركيز على إدارة المرافق المستدامة، نشرت الشركة أنظمة مراقبة الطاقة الذكية في عدد من المواقع البارزة، مما أدى إلى تخفيض الاستهلاك بنسبة تصل إلى 30٪ وتحسين راحة الشاغلين بصورة ملحوظة. تتوافق هذه المبادرة مباشرةً مع أهداف رؤية المملكة 2030 في مجال الاستدامة والتنويع الاقتصادي.",
    },
  },
  {
    slug: "tmyazna-secures-integrated-mep-contract-neom",
    image: blog2,
    date: "2026-06-01",
    category: {
      en: "Systems Integration",
      ar: "تكامل الأنظمة",
    },
    title: {
      en: "TMYAZNA secures integrated MEP contract for a NEOM development",
      ar: "تميزنا تحصل على عقد MEP متكامل لمشروع في نيوم",
    },
    excerpt: {
      en: "TMYAZNA has been awarded a comprehensive mechanical, electrical and plumbing contract for one of NEOM's next-generation residential clusters, reinforcing the company's growing presence in giga-projects.",
      ar: "فازت تميزنا بعقد ميكانيكي وكهربائي وسباكة شامل لأحد مجمعات سكن الجيل القادم في نيوم، مما يعزز حضور الشركة المتنامي في المشاريع العملاقة.",
    },
    body: {
      en: "The NEOM MEP contract marks a significant milestone for TMYAZNA, reflecting its capacity to deliver complex multi-discipline projects at scale. The scope covers over 500 residential units across three towers, with state-of-the-art building automation, energy management and fire safety systems integrated from day one. Works are scheduled to commence Q3 2026.",
      ar: "يُمثّل عقد MEP في نيوم إنجازاً بارزاً لتميزنا، إذ يعكس قدرتها على تنفيذ مشاريع متعددة التخصصات على نطاق واسع. يشمل النطاق أكثر من 500 وحدة سكنية موزعة على ثلاثة أبراج، مع أنظمة متقدمة لأتمتة المباني وإدارة الطاقة والسلامة من الحريق مدمجة من اليوم الأول. من المقرر أن تبدأ الأعمال في الربع الثالث من عام 2026.",
    },
  },
  {
    slug: "tmyazna-achieves-iso-45001-certification",
    image: blog3,
    date: "2026-05-25",
    category: {
      en: "Quality & Safety",
      ar: "الجودة والسلامة",
    },
    title: {
      en: "TMYAZNA achieves ISO 45001 occupational health & safety certification",
      ar: "تميزنا تحصل على شهادة ISO 45001 للصحة والسلامة المهنية",
    },
    excerpt: {
      en: "TMYAZNA has been awarded ISO 45001:2018 certification, the internationally recognised standard for occupational health and safety management systems, underscoring the company's commitment to workforce wellbeing.",
      ar: "حصلت تميزنا على شهادة ISO 45001:2018، المعيار المعترف به دولياً لأنظمة إدارة الصحة والسلامة المهنية، مما يُؤكد التزام الشركة بسلامة القوى العاملة ورفاهيتها.",
    },
    body: {
      en: "The ISO 45001:2018 certification follows a rigorous third-party audit across all of TMYAZNA's active project sites and head office operations. The standard requires organisations to identify and control health and safety risks, reduce accidents and improve well-being. TMYAZNA's Zero Harm programme, launched in 2024, played a central role in achieving the audit milestones.",
      ar: "جاءت شهادة ISO 45001:2018 عقب تدقيق مستقل صارم شمل جميع مواقع مشاريع تميزنا النشطة وعمليات المقر الرئيسي. يُلزم المعيار المنظمات بتحديد مخاطر الصحة والسلامة والسيطرة عليها، والحد من الحوادث وتعزيز الرفاهية. أدّى برنامج «صفر أضرار» الذي أطلقته تميزنا في عام 2024 دوراً محورياً في تحقيق معالم التدقيق.",
    },
  },
];
