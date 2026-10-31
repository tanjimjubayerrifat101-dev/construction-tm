import { type StaticImageData } from "next/image";

import service1Img from "@/assets/service/service1.png";
import service2Img from "@/assets/service/service2.png";
import service3Img from "@/assets/service/service3.png";
import service4Img from "@/assets/service/service4.png";
import service5Img from "@/assets/service/service5.png";
import srviceHomeImg from "@/assets/service/srvice-home.png";
import blog1Img from "@/assets/home/blog1.png";
import blog2Img from "@/assets/home/blog2.png";
import blog3Img from "@/assets/home/blog3.png";
import blog4Img from "@/assets/home/blog4.png";
import blog5Img from "@/assets/home/blog5.png";
import blog6Img from "@/assets/home/blog6.png";
import hero1Img from "@/assets/home/hero1.png";

export type ProjectStatus = "Ongoing" | "Completed" | "Planning";
export type ProjectSectorSlug =
  | "all"
  | "systems-integration"
  | "construction"
  | "facility-services"
  | "manpower"
  | "environmental";

export interface ProjectItem {
  id: string;
  title: string;
  sector: string;
  sectorSlug: ProjectSectorSlug;
  status: ProjectStatus;
  location: string;
  description: string;
  value: string;
  year: string;
  progress: number;
  image: StaticImageData;
}

export interface ProjectStat {
  target: number;
  prefix?: string;
  suffix?: string;
  prefixAr?: string;
  suffixAr?: string;
  unit?:string;
  unitAr?:string;
  decimals?: number;
  label: string;
  labelAr: string;
}

export interface ProjectArabicContent {
  title: string;
  sector: string;
  status: string;
  location: string;
  description: string;
  value: string;
}

export interface LocalizedProjectItem extends ProjectItem {
  statusText: string;
}

export const PROJECTS_STATS: ProjectStat[] = [
  { target: 40, suffix: "+", label: "Projects Delivered", labelAr: "مشروعاً تم إنجازه" },
  {
    target: 1600,
    prefix: "SAR ",
    prefixAr: "",
    suffix: "",
    suffixAr: " ريال",
    unit: "(million)",
    unitAr: "(مليون)",
    label: "Portfolio Value",
    labelAr: "قيمة المحفظة",
  },
  { target: 13, label: "Regions Covered", labelAr: "منطقة نغطيها" },
  { target: 5, label: "Business Sectors", labelAr: "قطاعات أعمال" },
];

export const PROJECT_SECTORS: { label: string; labelAr: string; slug: ProjectSectorSlug }[] = [
  { label: "All", labelAr: "الكل", slug: "all" },
  { label: "Systems Integration", labelAr: "تكامل الأنظمة", slug: "systems-integration" },
  { label: "Construction", labelAr: "الإنشاءات", slug: "construction" },
  { label: "Facility Services", labelAr: "خدمات المرافق", slug: "facility-services" },
  { label: "Manpower", labelAr: "القوى العاملة", slug: "manpower" },
  { label: "Environmental", labelAr: "الخدمات البيئية", slug: "environmental" },
];

export const FLAGSHIP_PROJECT: ProjectItem = {
  id: "flagship-king-salman-park",
  title: "King Salman Park — MEP & smart systems integration",
  sector: "Systems Integration",
  sectorSlug: "systems-integration",
  status: "Ongoing",
  location: "Riyadh Region",
  description:
    "Full mechanical, electrical and plumbing integration with intelligent building-management systems across a landmark development within King Salman Park — one of the largest urban parks in the world.",
  value: "SAR 480M",
  year: "2025",
  progress: 72,
  image: srviceHomeImg,
};

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: "proj-1",
    title: "King Salman Park — MEP & smart systems",
    sector: "Systems Integration",
    sectorSlug: "systems-integration",
    status: "Ongoing",
    location: "Riyadh Region",
    description:
      "Full MEP integration and intelligent building-management systems across a landmark park development.",
    value: "SAR 480M",
    year: "2025",
    progress: 72,
    image: service1Img,
  },
  {
    id: "proj-2",
    title: "Industrial water & wastewater treatment plant",
    sector: "Environmental",
    sectorSlug: "environmental",
    status: "Ongoing",
    location: "Eastern Region",
    description:
      "Design, build and operation of an advanced water treatment facility serving an industrial cluster.",
    value: "SAR 210M",
    year: "2025",
    progress: 84,
    image: service5Img,
  },
  {
    id: "proj-3",
    title: "NEOM development — integrated MEP package",
    sector: "Systems Integration",
    sectorSlug: "systems-integration",
    status: "Planning",
    location: "Tabuk Region",
    description:
      "Integrated mechanical, electrical and ICT systems package for a flagship NEOM development.",
    value: "SAR 360M",
    year: "2026",
    progress: 18,
    image: blog1Img,
  },
  {
    id: "proj-4",
    title: "Jeddah waterfront — interior fit-out",
    sector: "Construction",
    sectorSlug: "construction",
    status: "Completed",
    location: "Makkah Region",
    description:
      "High-end interior fit-out and finishing works for a waterfront commercial landmark on the Red Sea coast.",
    value: "SAR 145M",
    year: "2024",
    progress: 100,
    image: service2Img,
  },
  {
    id: "proj-5",
    title: "Regional campus — integrated FM",
    sector: "Facility Services",
    sectorSlug: "facility-services",
    status: "Ongoing",
    location: "Al-Qassim",
    description:
      "Five-year integrated hard and soft facility-management contract for a major institutional campus.",
    value: "SAR 92M",
    year: "2025",
    progress: 55,
    image: service3Img,
  },
  {
    id: "proj-6",
    title: "Abha highland infrastructure works",
    sector: "Construction",
    sectorSlug: "construction",
    status: "Ongoing",
    location: "Asir Region",
    description:
      "Civil and structural infrastructure works supporting tourism development across the Asir Highlands.",
    value: "SAR 175M",
    year: "2025",
    progress: 41,
    image: blog3Img,
  },
  {
    id: "proj-7",
    title: "Technical manpower deployment programme",
    sector: "Manpower",
    sectorSlug: "manpower",
    status: "Ongoing",
    location: "Najran Region",
    description:
      "Deployment and management of certified technical teams supporting operations and maintenance.",
    value: "SAR 62M",
    year: "2026",
    progress: 22,
    image: service4Img,
  },
  {
    id: "proj-8",
    title: "Smart waste-management programme",
    sector: "Environmental",
    sectorSlug: "environmental",
    status: "Completed",
    location: "Al-Jouf",
    description:
      "Sensor-based collection, segregation and recycling rollout across municipal facilities.",
    value: "SAR 48M",
    year: "2024",
    progress: 100,
    image: blog6Img,
  },
  {
    id: "proj-9",
    title: "Mosque complex — operations & maintenance",
    sector: "Facility Services",
    sectorSlug: "facility-services",
    status: "Ongoing",
    location: "Madinah Region",
    description:
      "Comprehensive O&M, cleaning and MEP maintenance across a major mosque and visitor complex.",
    value: "SAR 78M",
    year: "2025",
    progress: 60,
    image: blog5Img,
  },
  {
    id: "proj-10",
    title: "Diriyah Gate heritage district infrastructure",
    sector: "Construction",
    sectorSlug: "construction",
    status: "Ongoing",
    location: "Riyadh Region",
    description:
      "Precision structural civil works, traditional mud-brick facade coordination, and underground MEP tunnels for the historic district.",
    value: "SAR 220M",
    year: "2025",
    progress: 65,
    image: hero1Img,
  },
  {
    id: "proj-11",
    title: "Red Sea International Airport — terminal MEP",
    sector: "Systems Integration",
    sectorSlug: "systems-integration",
    status: "Completed",
    location: "Tabuk Region",
    description:
      "Complete life-safety, baggage automation BMS, and central chiller mechanical systems for the eco-luxury terminal.",
    value: "SAR 310M",
    year: "2024",
    progress: 100,
    image: blog2Img,
  },
  {
    id: "proj-12",
    title: "Qiddiya Speed Park — utility & electrical networks",
    sector: "Systems Integration",
    sectorSlug: "systems-integration",
    status: "Planning",
    location: "Riyadh Region",
    description:
      "High-voltage electrical substation integration, trackside telemetry networks, and automated water management for motorsports complex.",
    value: "SAR 180M",
    year: "2026",
    progress: 30,
    image: blog4Img,
  },
  {
    id: "proj-13",
    title: "Riyadh Metro Line 3 — stations technical FM",
    sector: "Facility Services",
    sectorSlug: "facility-services",
    status: "Ongoing",
    location: "Riyadh Region",
    description:
      "Turnkey hard FM operations, preventive escalator/HVAC maintenance, and passenger safety compliance across transit stations.",
    value: "SAR 85M",
    year: "2025",
    progress: 80,
    image: srviceHomeImg,
  },
];

const PROJECTS_ARABIC: Record<string, ProjectArabicContent> = {
  "flagship-king-salman-park": {
    title: "حديقة الملك سلمان — تكامل الأنظمة الكهروميكانيكية والذكية",
    sector: "تكامل الأنظمة",
    status: "قيد التنفيذ",
    location: "منطقة الرياض",
    description:
      "تكامل شامل لأنظمة الميكانيكا والكهرباء والسباكة وأنظمة إدارة المباني الذكية في مشروع بارز ضمن حديقة الملك سلمان، إحدى أكبر الحدائق الحضرية في العالم.",
    value: "٤٨٠ مليون ريال",
  },
  "proj-1": {
    title: "حديقة الملك سلمان — الأنظمة الكهروميكانيكية والذكية",
    sector: "تكامل الأنظمة",
    status: "قيد التنفيذ",
    location: "منطقة الرياض",
    description:
      "تكامل شامل للأنظمة الكهروميكانيكية وأنظمة إدارة المباني الذكية ضمن مشروع تطوير بارز في الحديقة.",
    value: "٤٨٠ مليون ريال",
  },
  "proj-2": {
    title: "محطة معالجة المياه ومياه الصرف الصناعي",
    sector: "الخدمات البيئية",
    status: "قيد التنفيذ",
    location: "المنطقة الشرقية",
    description:
      "تصميم وإنشاء وتشغيل منشأة متقدمة لمعالجة المياه تخدم تجمعاً صناعياً.",
    value: "٢١٠ ملايين ريال",
  },
  "proj-3": {
    title: "مشروع تطوير في نيوم — حزمة أنظمة كهروميكانيكية متكاملة",
    sector: "تكامل الأنظمة",
    status: "في مرحلة التخطيط",
    location: "منطقة تبوك",
    description:
      "حزمة متكاملة من أنظمة الميكانيكا والكهرباء وتقنية المعلومات والاتصالات لمشروع بارز في نيوم.",
    value: "٣٦٠ مليون ريال",
  },
  "proj-4": {
    title: "واجهة جدة البحرية — التجهيز الداخلي",
    sector: "الإنشاءات",
    status: "مكتمل",
    location: "منطقة مكة المكرمة",
    description:
      "أعمال تجهيز وتشطيب داخلي عالية الجودة لمعْلم تجاري على الواجهة البحرية للبحر الأحمر.",
    value: "١٤٥ مليون ريال",
  },
  "proj-5": {
    title: "حرم جامعي إقليمي — إدارة متكاملة للمرافق",
    sector: "خدمات المرافق",
    status: "قيد التنفيذ",
    location: "القصيم",
    description:
      "عقد لمدة خمس سنوات لإدارة المرافق الفنية وغير الفنية في حرم مؤسسي رئيسي.",
    value: "٩٢ مليون ريال",
  },
  "proj-6": {
    title: "أعمال البنية التحتية في مرتفعات أبها",
    sector: "الإنشاءات",
    status: "قيد التنفيذ",
    location: "منطقة عسير",
    description:
      "أعمال مدنية وإنشائية للبنية التحتية تدعم التنمية السياحية في مرتفعات عسير.",
    value: "١٧٥ مليون ريال",
  },
  "proj-7": {
    title: "برنامج توفير الكوادر الفنية",
    sector: "القوى العاملة",
    status: "قيد التنفيذ",
    location: "منطقة نجران",
    description:
      "توفير وإدارة فرق فنية معتمدة لدعم أعمال التشغيل والصيانة.",
    value: "٦٢ مليون ريال",
  },
  "proj-8": {
    title: "برنامج الإدارة الذكية للنفايات",
    sector: "الخدمات البيئية",
    status: "مكتمل",
    location: "الجوف",
    description:
      "تطبيق حلول جمع النفايات وفرزها وإعادة تدويرها باستخدام المستشعرات في المرافق البلدية.",
    value: "٤٨ مليون ريال",
  },
  "proj-9": {
    title: "مجمع مساجد — التشغيل والصيانة",
    sector: "خدمات المرافق",
    status: "قيد التنفيذ",
    location: "منطقة المدينة المنورة",
    description:
      "تشغيل وصيانة شاملة تشمل النظافة وصيانة الأنظمة الكهروميكانيكية في مجمع رئيسي للمساجد والزوار.",
    value: "٧٨ مليون ريال",
  },
  "proj-10": {
    title: "البنية التحتية للمنطقة التراثية في بوابة الدرعية",
    sector: "الإنشاءات",
    status: "قيد التنفيذ",
    location: "منطقة الرياض",
    description:
      "أعمال مدنية وإنشائية دقيقة، وتنسيق واجهات الطوب الطيني التقليدية، وأنفاق للأنظمة الكهروميكانيكية تحت الأرض في المنطقة التاريخية.",
    value: "٢٢٠ مليون ريال",
  },
  "proj-11": {
    title: "مطار البحر الأحمر الدولي — الأنظمة الكهروميكانيكية للمبنى",
    sector: "تكامل الأنظمة",
    status: "مكتمل",
    location: "منطقة تبوك",
    description:
      "تنفيذ أنظمة السلامة وإدارة أمتعة المسافرين عبر نظام إدارة المباني وأنظمة التبريد المركزي لمبنى المطار الفاخر المستدام.",
    value: "٣١٠ ملايين ريال",
  },
  "proj-12": {
    title: "حديقة السرعة في القدية — شبكات المرافق والكهرباء",
    sector: "تكامل الأنظمة",
    status: "في مرحلة التخطيط",
    location: "منطقة الرياض",
    description:
      "تكامل محطة كهرباء فرعية عالية الجهد وشبكات القياس عن بُعد على امتداد الحلبة وأنظمة آلية لإدارة المياه في مجمع رياضة المحركات.",
    value: "١٨٠ مليون ريال",
  },
  "proj-13": {
    title: "مترو الرياض، الخط الثالث — إدارة المرافق الفنية للمحطات",
    sector: "خدمات المرافق",
    status: "قيد التنفيذ",
    location: "منطقة الرياض",
    description:
      "تشغيل متكامل للمرافق الفنية وصيانة وقائية للسلالم المتحركة وأنظمة التكييف، مع الالتزام بمتطلبات سلامة الركاب في محطات النقل.",
    value: "٨٥ مليون ريال",
  },
};

export function getLocalizedProject(
  project: ProjectItem,
  isRtl: boolean
): LocalizedProjectItem {
  const arabic = isRtl ? PROJECTS_ARABIC[project.id] : undefined;

  return {
    ...project,
    ...(arabic
      ? {
          title: arabic.title,
          sector: arabic.sector,
          location: arabic.location,
          description: arabic.description,
          value: arabic.value,
        }
      : {}),
    statusText: arabic?.status ?? project.status,
  };
}
