import { 
  Wrench, 
  HardHat, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  TrendingUp,
  Award,
  Layers,
  FileCheck2,
  type LucideIcon 
} from "lucide-react";

export interface JobPosition {
  id: string; // slug for url
  departmentId: "systems-integration" | "construction" | "facility-services" | "environmental" | "manpower";
  department: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  location: {
    en: string;
    ar: string;
  };
  type: {
    en: string;
    ar: string;
  };
  experience: {
    en: string;
    ar: string;
  };
  /** Publication date, format: "YYYY-MM-DD" (shown as "Posted On: ..."). */
  postedDate: string;
  icon: LucideIcon;
  /** Shown as "Job Purpose / Objective" */
  overview: {
    en: string;
    ar: string;
  };
  /** Shown as "Key Responsibilities / Accountabilities" (bullet points) */
  responsibilities: {
    en: string[];
    ar: string[];
  };
  /** Shown in the "Requirements" part, one block per key. Empty arrays are hidden. */
  requirements: {
    /** Education / Professional Qualification */
    education: {
      en: string[];
      ar: string[];
    };
    /** Experience */
    experience: {
      en: string[];
      ar: string[];
    };
    /** Professional Licensing / Certification / Training */
    licensing: {
      en: string[];
      ar: string[];
    };
  };
}

export interface CareerBenefit {
  icon: LucideIcon;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
}

export interface HiringStep {
  number: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
}

export const CAREER_BENEFITS: CareerBenefit[] = [
  {
    icon: TrendingUp,
    title: {
      en: "Growth & development",
      ar: "التطور والنمو المهني",
    },
    description: {
      en: "Continuous training, certifications and a clear path to advance your career as the company grows.",
      ar: "برامج تدريب مستمرة وشهادات معتمدة ومسار وظيفي واضح لدعم نموك المهني المستمر.",
    },
  },
  {
    icon: Award,
    title: {
      en: "Landmark projects",
      ar: "مشاريع وطنية كبرى",
    },
    description: {
      en: "Work on Vision 2030 developments — from NEOM and the Red Sea to King Salman Park.",
      ar: "فرصة العمل في أضخم مشاريع رؤية 2030 من نيوم والبحر الأحمر إلى حديقة الملك سلمان.",
    },
  },
  {
    icon: Users,
    title: {
      en: "A team that backs you",
      ar: "فريق يدعمك دائماً",
    },
    description: {
      en: "Join skilled, multi-disciplinary professionals who share knowledge and work as one team.",
      ar: "العمل مع نخبة من المهندسين والخبراء متعددي التخصصات الذين يتبادلون المعرفة بروح الفريق الواحد.",
    },
  },
  {
    icon: ShieldCheck,
    title: {
      en: "Safety first",
      ar: "السلامة أولاً",
    },
    description: {
      en: "A culture built on health, safety and the well-being of every person on every site.",
      ar: "ثقافة راسخة ترتكز على الصحة والسلامة المهنية لحماية كل فرد في جميع مواقع العمل.",
    },
  },
  {
    icon: Sparkles,
    title: {
      en: "Saudization & inclusion",
      ar: "التوطين والشمولية",
    },
    description: {
      en: "We invest in local talent and champion diversity and equal opportunity across all divisions.",
      ar: "نستثمر بقوة في الكفاءات الوطنية ونعزز تكافؤ الفرص والتنوع في مختلف قطاعات الشركة.",
    },
  },
  {
    icon: Layers,
    title: {
      en: "Well-being & flexibility",
      ar: "بيئة عمل متوازنة",
    },
    description: {
      en: "Flexible, modern working models that protect and improve the wellbeing of our people.",
      ar: "نماذج عمل حديثة ومرنة تهدف إلى تحقيق التوازن ودعم الصحة النفسية والجسدية لفريقنا.",
    },
  },
];

export const HIRING_STEPS: HiringStep[] = [
  {
    number: "01",
    title: {
      en: "Apply online",
      ar: "التقديم الإلكتروني",
    },
    description: {
      en: "Submit your CV and tell us about the role and skills you're interested in.",
      ar: "قدّم سيرتك الذاتية واكتب نبذة عن مهاراتك والفرصة التي تناسب تطلعاتك.",
    },
  },
  {
    number: "02",
    title: {
      en: "Screening",
      ar: "الفرز والتقييم الأولي",
    },
    description: {
      en: "Our talent team reviews your profile and reaches out for an initial conversation.",
      ar: "يقوم فريق الموارد البشرية بمراجعة ملفك والتواصل معك لإجراء محادثة استكشافية.",
    },
  },
  {
    number: "03",
    title: {
      en: "Interviews",
      ar: "المقابلات الفنية",
    },
    description: {
      en: "Meet the hiring manager and team to explore the role and your aspirations.",
      ar: "لقاء مع مديري المشاريع والفرق الهندسية لمناقشة الخبرات الفنية وأهدافك.",
    },
  },
  {
    number: "04",
    title: {
      en: "Offer & onboarding",
      ar: "العرض والتهيئة للعمل",
    },
    description: {
      en: "Receive your offer and join a structured onboarding to set you up for success.",
      ar: "استلام العرض الوظيفي وبدء برنامج تهيئة متكامل لانطلاقة قوية في مسيرتك معنا.",
    },
  },
];

export const CAREER_DEPARTMENTS = [
  { id: "all", en: "All Roles", ar: "جميع الوظائف", icon: Briefcase },
  { id: "systems-integration", en: "Systems Integration", ar: "تكامل الأنظمة", icon: Cpu },
  { id: "construction", en: "Civil & Construction", ar: "البناء والمقاولات العامة", icon: HardHat },
  { id: "facility-services", en: "Facility Services", ar: "إدارة المرافق", icon: Wrench },
  { id: "environmental", en: "Environmental", ar: "البيئة والمياه", icon: Sparkles },
  { id: "manpower", en: "Manpower & HR", ar: "الموارد البشرية والتشغيل", icon: Users },
] as const;

export const JOB_POSITIONS: JobPosition[] = [
  {
    id: "senior-mep-engineer",
    departmentId: "systems-integration",
    department: {
      en: "Systems Integration",
      ar: "تكامل الأنظمة",
    },
    title: {
      en: "Senior MEP Engineer",
      ar: "مهندس أول أنظمة كهروميكانيكية (MEP)",
    },
    location: {
      en: "Riyadh, Saudi Arabia",
      ar: "الرياض، المملكة العربية السعودية",
    },
    type: {
      en: "Full-time",
      ar: "دوام كامل",
    },
    experience: {
      en: "5-8 years",
      ar: "٥-٨ سنوات",
    },
    postedDate: "2026-10-12",
    icon: Cpu,
    overview: {
      en: "Lead the design review, coordination and delivery of mechanical, electrical and plumbing systems on TMYAZNA's landmark projects. You'll sit at the heart of our Systems Integration division, making sure every installation meets international standards and the ambitions of Saudi Vision 2030.",
      ar: "قيادة مراجعة التصاميم والتنسيق والتنفيذ لأنظمة الميكانيكا والكهرباء والسباكة في مشاريع تميزنا الرائدة، مع ضمان مطابقة أعلى المعايير الهندسية الدولية ومستهدفات رؤية 2030.",
    },
    responsibilities: {
      en: [
        "Review and approve MEP designs, shop drawings and material submittals.",
        "Coordinate multi-discipline installation works with consultants and subcontractors.",
        "Supervise testing and commissioning of HVAC, electrical and plumbing systems.",
        "Ensure compliance with Saudi Building Code, project specifications and HSE requirements.",
        "Mentor junior engineers and report progress directly to project leadership.",
      ],
      ar: [
        "مراجعة واعتماد تصاميم الأنظمة الكهروميكانيكية والمخططات التنفيذية واعتمادات المواد.",
        "التنسيق المشترك لأعمال التركيبات الميدانية مع الاستشاريين والمقاولين الباطنيين.",
        "الإشراف على اختبارات التشغيل الأولي لأنظمة التكييف والكهرباء ومكافحة الحريق.",
        "الالتزام بكود البناء السعودي والمواصفات الفنية المعتمدة واشتراطات السلامة.",
        "توجيه المهندسين المبتدئين وتقديم التقارير الدورية لإدارة المشروع.",
      ],
    },
    requirements: {
      education: {
        en: ["B.Sc. in Mechanical or Electrical Engineering from an accredited university."],
        ar: ["بكالوريوس في الهندسة الميكانيكية أو الكهربائية من جامعة معتمدة."],
      },
      experience: {
        en: [
          "8+ years of MEP experience on large construction or infrastructure projects.",
          "Strong knowledge of the Saudi Building Code (SBC) and international standards (ASHRAE, NFPA).",
          "Proficiency with AutoCAD, Revit MEP and construction management software.",
        ],
        ar: [
          "خبرة لا تقل عن ٨ سنوات في مشاريع المباني الكبرى والبنية التحتية.",
          "معرفة عميقة بكود البناء السعودي والمعايير الدولية (ASHRAE, NFPA).",
          "إتقان العمل على برامج AutoCAD و Revit MEP وتطبيقات إدارة المشاريع.",
        ],
      },
      licensing: {
        en: ["Saudi Council of Engineers (SCE) registration is preferred."],
        ar: ["الاعتماد والتسجيل المهني لدى الهيئة السعودية للمهندسين (مفضل)."],
      },
    },
  },
  {
    id: "bim-coordinator",
    departmentId: "systems-integration",
    department: {
      en: "Systems Integration",
      ar: "تكامل الأنظمة",
    },
    title: {
      en: "BIM Coordinator (ISO 19650)",
      ar: "منسق نمذجة معلومات البناء (BIM)",
    },
    location: {
      en: "Riyadh, Saudi Arabia",
      ar: "الرياض، المملكة العربية السعودية",
    },
    type: {
      en: "Full-time",
      ar: "دوام كامل",
    },
    experience: {
      en: "3-5 years",
      ar: "٣-٥ سنوات",
    },
    postedDate: "2026-10-05",
    icon: Layers,
    overview: {
      en: "Manage 3D building information models, clash detection, and digital delivery protocols across architectural, structural, and electromechanical engineering packages.",
      ar: "إدارة نماذج معلومات البناء ثلاثية الأبعاد (BIM) وفحص التعارضات وإعداد النماذج الرقمية المتكاملة لكافة الحزم الإنشائية والمعمارية والميكانيكية.",
    },
    responsibilities: {
      en: [
        "Maintain Common Data Environment (CDE) adhering to ISO 19650 standards.",
        "Run clash detection matrices via Navisworks and coordinate resolution with design leads.",
        "Ensure model accuracy, Level of Development (LOD 300 to 500), and asset data integration.",
        "Generate 4D construction sequencing and quantity take-offs.",
      ],
      ar: [
        "إدارة بيئة البيانات المشتركة (CDE) وفق معيار ISO 19650.",
        "تشغيل تقارير كشف التعارضات عبر Navisworks وحلها مع فرق التصميم.",
        "التحقق من دقة النماذج ومستوى التطوير الهندسي (LOD 300-500).",
        "إعداد محاكاة الجداول الزمنية 4D وحساب الكميات الدقيقة.",
      ],
    },
    requirements: {
      education: {
        en: ["Degree in Architecture, Civil, or Mechanical Engineering."],
        ar: ["شهادة في الهندسة المعمارية أو المدنية أو الميكانيكية."],
      },
      experience: {
        en: [
          "4+ years specialized experience in BIM Coordination using Revit and Navisworks.",
          "Excellent spatial coordination and problem-solving skills.",
        ],
        ar: [
          "خبرة ٤ سنوات فأكثر في تنسيق نماذج BIM باستخدام Revit و Navisworks.",
          "مهارات تحليلية وتنسيقية ممتازة.",
        ],
      },
      licensing: {
        en: ["Certification in ISO 19650 or Autodesk Certified Professional is an advantage."],
        ar: ["شهادة احترافية في معايير ISO 19650 أو Autodesk Certified."],
      },
    },
  },
  {
    id: "project-manager-construction",
    departmentId: "construction",
    department: {
      en: "Civil & Construction",
      ar: "البناء والمقاولات العامة",
    },
    title: {
      en: "Project Manager — Construction",
      ar: "مدير مشروع — مقاولات إنشائية",
    },
    location: {
      en: "Jeddah, Saudi Arabia",
      ar: "جدة، المملكة العربية السعودية",
    },
    type: {
      en: "Full-time",
      ar: "دوام كامل",
    },
    experience: {
      en: "8+ years",
      ar: "٨+ سنوات",
    },
    postedDate: "2026-09-28",
    icon: HardHat,
    overview: {
      en: "Direct total site execution, timeline governance, budgetary control, and client communications for flagship commercial and institutional contracting developments.",
      ar: "قيادة الإدارة الميدانية الشاملة ومتابعة الجداول الزمنية والرقابة المالية والتواصل مع العملاء في مشاريع المقاولات التجارية والصناعية الكبرى.",
    },
    responsibilities: {
      en: [
        "Manage project scope, schedule, budget, quality, and environmental safety.",
        "Act as primary liaison with clients, supervising consultants, and municipal authorities.",
        "Oversee site engineering teams, sub-contractors, and procurement schedules.",
        "Prepare comprehensive progress milestones and executive risk mitigation reports.",
      ],
      ar: [
        "إدارة نطاق العمل والجدول الزمني والميزانية ومعايير الجودة والسلامة.",
        "تمثيل الشركة كنقطة اتصال رئيسية مع الملاك والاستشاريين والجهات التنظيمية.",
        "الإشراف على الكوادر الهندسية بالموقع ومقاولي الباطن وسلاسل الإمداد.",
        "إعداد تقارير الإنجاز الدورية وخطط إدارة المخاطر التشغيلية.",
      ],
    },
    requirements: {
      education: {
        en: ["B.Sc. in Civil Engineering or Construction Management."],
        ar: ["بكالوريوس هندسة مدنية أو إدارة تشييد."],
      },
      experience: {
        en: [
          "10+ years civil construction track record, with at least 4 years as Project Manager.",
          "Proven ability to deliver complex projects on schedule and within budget in KSA.",
        ],
        ar: [
          "خبرة ١٠ سنوات فأكثر في المقاولات الإنشائية منها ٤ سنوات كمدير مشروع.",
          "سجل حافل بتسليم المشاريع وفق المواعيد والميزانيات داخل المملكة.",
        ],
      },
      licensing: {
        en: ["PMP or Prince2 certification strongly preferred."],
        ar: ["شهادة إدارة المشاريع الاحترافية (PMP) مفضلة."],
      },
    },
  },
  {
    id: "site-civil-engineer",
    departmentId: "construction",
    department: {
      en: "Civil & Construction",
      ar: "البناء والمقاولات العامة",
    },
    title: {
      en: "Site Civil Engineer",
      ar: "مهندس موقع مدني",
    },
    location: {
      en: "Abha, Saudi Arabia",
      ar: "أبها، المملكة العربية السعودية",
    },
    type: {
      en: "Full-time",
      ar: "دوام كامل",
    },
    experience: {
      en: "3-5 years",
      ar: "٣-٥ سنوات",
    },
    postedDate: "2026-09-21",
    icon: HardHat,
    overview: {
      en: "Oversee day-to-day concrete pouring, rebar inspection, structural steel erection, and quality assurance workflows across southern regional development projects.",
      ar: "الإشراف الميداني اليومي على صب الخرسانات وفحص حديد التسليح وتركيب الهياكل الفولاذية وضمان تطبيق معايير الجودة المعتمدة في مشاريع المنطقة الجنوبية.",
    },
    responsibilities: {
      en: [
        "Execute on-site construction activities according to approved blueprints and shop drawings.",
        "Conduct pre-pour and post-pour inspection requests (RFI / MIR) with consultants.",
        "Monitor subcontractor work productivity, material usage, and daily logs.",
        "Enforce strict safety guidelines regarding heights, scaffolding, and PPE.",
      ],
      ar: [
        "تنفيذ الأعمال الإنشائية بالموقع طبقاً للمخططات المعتمدة وتوجيهات الاستشاري.",
        "إجراء طلبات الفحص والتفتيش الميداني (RFI/MIR) مع المهندسين المشرفين.",
        "متابعة إنتاجية العمالة ومقاولي الباطن وتوثيق السجلات اليومية.",
        "تطبيق إجراءات السلامة الصارمة للعمل في المرتفعات والسقالات ومعدات الوقاية.",
      ],
    },
    requirements: {
      education: {
        en: ["B.Sc. in Civil Engineering."],
        ar: ["بكالوريوس في الهندسة المدنية."],
      },
      experience: {
        en: [
          "3-5 years hands-on site experience in structural concrete and civil contracting in KSA.",
          "Familiarity with Aramco / Royal Commission standards is a major plus.",
          "Strong team leadership and communication skills.",
        ],
        ar: [
          "خبرة ٣-٥ سنوات في مواقع التشييد الإنشائي والخرسانات المسلحة في المملكة.",
          "المعرفة باشتراطات أرامكو أو الهيئة الملكية ميزة إضافية.",
          "مهارات قيادية وقدرة على إدارة العمالة الميدانية بفاعلية.",
        ],
      },
      licensing: {
        en: [],
        ar: [],
      },
    },
  },
  {
    id: "facility-management-supervisor",
    departmentId: "facility-services",
    department: {
      en: "Facility Services",
      ar: "إدارة المرافق",
    },
    title: {
      en: "Facility Management Supervisor",
      ar: "مشرف إدارة وتشغيل مرافق",
    },
    location: {
      en: "Medina, Saudi Arabia",
      ar: "المدينة المنورة، المملكة العربية السعودية",
    },
    type: {
      en: "Full-time",
      ar: "دوام كامل",
    },
    experience: {
      en: "3-5 years",
      ar: "٣-٥ سنوات",
    },
    postedDate: "2026-09-14",
    icon: Wrench,
    overview: {
      en: "Lead preventive and corrective maintenance operations across commercial towers, educational complexes, and governmental facilities under TMYAZNA management.",
      ar: "إدارة عمليات الصيانة الوقائية والتصحيحية للأبراج التجارية والمجمعات الحكومية والتعليمية التي تديرها وتشغلها شركة تميزنا.",
    },
    responsibilities: {
      en: [
        "Supervise multi-skilled technician crews (HVAC, plumbing, electrical, BMS).",
        "Implement Computerized Maintenance Management Systems (CMMS) work orders.",
        "Ensure 99.8% facility uptime and prompt SLA response for all client requests.",
        "Manage site spare parts inventory and vendor service contracts.",
      ],
      ar: [
        "الإشراف على الفرق الفنية للصيانة (تكييف، كهرباء، سباكة، أنظمة BMS).",
        "متابعة أوامر العمل عبر برامج إدارة الصيانة المحوسبة (CMMS).",
        "الحفاظ على الجاهزية التشغيلية القصوى للمرفق وفق اتفاقيات مستوى الخدمة (SLA).",
        "إدارة مخزون قطع الغيار ومتابعة عقود الموردين المتخصصين.",
      ],
    },
    requirements: {
      education: {
        en: ["Diploma or Bachelor's in Mechanical/Electrical Engineering or Facilities Management."],
        ar: ["دبلوم أو بكالوريوس في الهندسة الميكانيكية/الكهربائية أو إدارة المرافق."],
      },
      experience: {
        en: [
          "4+ years experience in integrated facilities management (IFM).",
          "Hands-on expertise with BMS systems, chillers, and emergency generators.",
          "Strong client service ethos and emergency response readiness.",
        ],
        ar: [
          "خبرة ٤ سنوات فأكثر في إدارة وتشغيل المرافق المتكاملة (IFM).",
          "خبرة عملية في أنظمة التحكم بالمباني BMS والمبردات والمولدات الاحتياطية.",
          "مهارات تواصل عالية مع العملاء وجاهزية للتعامل مع الطوارئ.",
        ],
      },
      licensing: {
        en: [],
        ar: [],
      },
    },
  },
  {
    id: "hse-officer",
    departmentId: "facility-services",
    department: {
      en: "Facility Services",
      ar: "إدارة المرافق والسلامة",
    },
    title: {
      en: "HSE Officer (Health, Safety & Environment)",
      ar: "مسؤول السلامة والصحة المهنية والبيئة (HSE)",
    },
    location: {
      en: "Dammam, Saudi Arabia",
      ar: "الدمام، المملكة العربية السعودية",
    },
    type: {
      en: "Full-time",
      ar: "دوام كامل",
    },
    experience: {
      en: "3-5 years",
      ar: "٣-٥ سنوات",
    },
    postedDate: "2026-09-08",
    icon: ShieldCheck,
    overview: {
      en: "Champion zero-harm occupational safety across active construction sites and operations facilities, conducting continuous risk assessments and toolbox talks.",
      ar: "ترسيخ ثقافة انعدام الحوادث والالتزام بأعلى معايير السلامة المهنية في مواقع العمل الإنشائي، وتنفيذ تقييمات المخاطر وجلسات التوعية اليومية.",
    },
    responsibilities: {
      en: [
        "Perform daily site inspections, identify hazards, and enforce corrective actions.",
        "Conduct safety inductions for newly arrived workers, engineers, and sub-contractors.",
        "Investigate any near-misses or incidents and maintain thorough compliance reports.",
        "Ensure emergency response drills, fire prevention, and environmental protection protocols.",
      ],
      ar: [
        "التفتيش الميداني اليومي وتحديد المخاطر واتخاذ الإجراءات التصحيحية الفورية.",
        "تقديم برامج التعريف بالسلامة للكوادر والعمالة الجديدة ومقاولي الباطن.",
        "التحقيق في الحوادث الوشيكة وإعداد تقارير الامتثال والتحسين المستمر.",
        "التأكد من جاهزية خطط الإخلاء ومعدات مكافحة الحرائق وحماية البيئة.",
      ],
    },
    requirements: {
      education: {
        en: [],
        ar: [],
      },
      experience: {
        en: [
          "3+ years active construction site safety experience in the GCC.",
          "Deep familiarity with Saudi Ministry of Human Resources occupational safety regulations.",
          "Fluent in English; Arabic proficiency is an asset.",
        ],
        ar: [
          "خبرة ٣ سنوات فأكثر في إدارة السلامة بمواقع المقاولات في دول الخليج.",
          "دراية بلوائح واشتراطات السلامة والصحة المهنية لوزارة الموارد البشرية.",
          "إجادة اللغة الإنجليزية؛ واللغة العربية ميزة إضافية.",
        ],
      },
      licensing: {
        en: ["NEBOSH IGC or OSHA 30-Hour certified."],
        ar: ["شهادة نيبوش الدولية (NEBOSH IGC) أو أوشا ٣٠ ساعة معتمدة."],
      },
    },
  },
  {
    id: "water-treatment-specialist",
    departmentId: "environmental",
    department: {
      en: "Environmental",
      ar: "البيئة والمياه",
    },
    title: {
      en: "Water Treatment Specialist",
      ar: "أخصائي محطات معالجة مياه",
    },
    location: {
      en: "Eastern Province, Saudi Arabia",
      ar: "المنطقة الشرقية، المملكة العربية السعودية",
    },
    type: {
      en: "Full-time",
      ar: "دوام كامل",
    },
    experience: {
      en: "5-8 years",
      ar: "٥-٨ سنوات",
    },
    postedDate: "2026-10-19",
    icon: Sparkles,
    overview: {
      en: "Lead technical operations, chemical dosage oversight, and membrane filtration systems across industrial wastewater and reverse osmosis desalination plants.",
      ar: "قيادة العمليات الفنية وضبط الجرعات الكيميائية وأنظمة الترشيح الغشائي في محطات معالجة مياه الصرف الصناعي ومحطات التحلية بالتناضح العكسي (RO).",
    },
    responsibilities: {
      en: [
        "Monitor RO plants, clarifying filtration, chlorination, and sludge handling units.",
        "Analyze daily water samples, turbidity, conductivity, and chemical composition.",
        "Coordinate preventive maintenance on high-pressure pumps and dosing skids.",
        "Ensure strict alignment with MEWA and national environmental standards.",
      ],
      ar: [
        "متابعة محطات التناضح العكسي RO ووحدات الترويق والكلورة ومعالجة الحمأة.",
        "تحليل عينات المياه اليومية وفحص العكارة والأملاح والمعايير الكيميائية.",
        "تنسيق الصيانة الدورية لمضخات الضغط العالي ومعدات الحقن الكيميائي.",
        "ضمان الالتزام الصارم بمعايير وزارة البيئة والمياه والزراعة والاشتراطات البيئية.",
      ],
    },
    requirements: {
      education: {
        en: ["B.Sc. in Chemical, Environmental, or Mechanical Engineering."],
        ar: ["بكالوريوس هندسة كيميائية أو بيئية أو ميكانيكية."],
      },
      experience: {
        en: [
          "5+ years specialized in Reverse Osmosis (RO) or industrial wastewater treatment.",
          "Strong knowledge of water chemistry, anti-scalants, and CIP cleaning protocols.",
          "Problem-solving acumen in plant process troubleshooting.",
        ],
        ar: [
          "خبرة ٥ سنوات فأكثر في محطات التناضح العكسي RO أو معالجة المياه الصناعية.",
          "فهم عميق لكيمياء المياه ومواد منع التكلس وغسيل الأغشية CIP.",
          "مهارات تشخيص الأعطال وتطوير كفاءة التشغيل المائي.",
        ],
      },
      licensing: {
        en: [],
        ar: [],
      },
    },
  },
  {
    id: "recruitment-mobilization-officer",
    departmentId: "manpower",
    department: {
      en: "Manpower & HR",
      ar: "الموارد البشرية والتشغيل",
    },
    title: {
      en: "Recruitment & Mobilization Officer",
      ar: "مسؤول استقطاب الكفاءات والتحشيد الميداني",
    },
    location: {
      en: "Riyadh, Saudi Arabia",
      ar: "الرياض، المملكة العربية السعودية",
    },
    type: {
      en: "Full-time",
      ar: "دوام كامل",
    },
    experience: {
      en: "3-5 years",
      ar: "٣-٥ سنوات",
    },
    postedDate: "2026-10-26",
    icon: Users,
    overview: {
      en: "Spearhead talent acquisition for high-velocity project sites, managing national talent sourcing, technical interviews, visa mobilization, and onboarding logistics.",
      ar: "إدارة استقطاب وتوظيف الكفاءات الهندسية والفنية للمشاريع السريعة، وتنسيق المقابلات وإجراءات التوطين والإلحاق الميداني السلس.",
    },
    responsibilities: {
      en: [
        "Source specialized civil, electromechanical, and site trade talents across KSA and internationally.",
        "Drive Qiwa, Muqeem, and Mudad compliance alongside government relations teams.",
        "Organize mobilization logistics, camp accommodation, and site badging.",
        "Champion Saudization (Nitaqat) targets in line with Vision 2030 priorities.",
      ],
      ar: [
        "استقطاب الكفاءات الهندسية والفنية والمهنية محلياً ودولياً لتغطية احتياج المشاريع.",
        "إدارة معاملات منصات قوى ومقيم ومدد بالتنسيق مع فريق العلاقات الحكومية.",
        "تنظيم إجراءات تسكين الكوادر وإصدار تصاريح الدخول للمواقع الحيوية.",
        "تحقيق نسب التوطين المستهدفة وفق برامج نطاقات ورؤية السعودية 2030.",
      ],
    },
    requirements: {
      education: {
        en: ["Bachelor's in Human Resources, Business Administration, or related field."],
        ar: ["بكالوريوس موارد بشرية أو إدارة أعمال أو مجال ذي صلة."],
      },
      experience: {
        en: [
          "3+ years recruitment experience within contracting, civil, or engineering sectors in KSA.",
          "Deep knowledge of Saudi Labor Law and local workforce platforms.",
          "High interpersonal agility and negotiation capability.",
        ],
        ar: [
          "خبرة ٣ سنوات فأكثر في توظيف قطاع المقاولات والهندسة داخل المملكة.",
          "معرفة تامة بنظام العمل السعودي ومنصات التوظيف الحكومية.",
          "مهارات تفاوض وتواصل ممتازة.",
        ],
      },
      licensing: {
        en: [],
        ar: [],
      },
    },
  },
];