import { type StaticImageData } from "next/image";
import {
  Cpu,
  Building2,
  Settings,
  Users,
  Leaf,
  Zap,
  Wrench,
  Droplets,
  Flame,
  Wind,
  Network,
  type LucideIcon,
} from "lucide-react";

import service1Img from "@/assets/service/service1.png";
import service2Img from "@/assets/service/service2.png";
import service3Img from "@/assets/service/service3.png";
import service4Img from "@/assets/service/service4.png";
import service5Img from "@/assets/service/service5.png";

// Catalog and supporting images from project assets
import catalogHeroImg from "@/assets/service/srvice-home.png";
import blog1Img from "@/assets/home/blog1.png";
import blog2Img from "@/assets/home/blog2.png";
import blog3Img from "@/assets/home/blog3.png";
import blog4Img from "@/assets/home/blog4.png";
import blog5Img from "@/assets/home/blog5.png";
import blog6Img from "@/assets/home/blog6.png";
import hero1Img from "@/assets/home/hero1.png";
import hero2Img from "@/assets/home/hero2.png";

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  badge?: string;
}

export interface SubDiscipline {
  id: string;
  tabTitle: string;
  heading: string;
  description: string;
  capabilitiesHeading: string;
  capabilities: string[];
  icon: LucideIcon;
}

export interface ServiceItemData {
  id: string;
  slug: string;
  number: string;
  name: string;
  shortTitle: string;
  heading: string;
  description: string;
  image: StaticImageData;
  icon: LucideIcon;
  subDisciplines?: SubDiscipline[];
  tabHeading?: string;
  coreCapabilitiesHeading?: string;
  coreDescription?:string;
  coreCapabilities?: string[];
  catalogHeading?: string;
  catalogItems: CatalogItem[];
}

interface ArabicSubDiscipline {
  tabTitle: string;
  heading: string;
  description: string;
  capabilitiesHeading: string;
  capabilities: string[];
}

interface ArabicCatalogItem {
  title: string;
  description: string;
  badge: string;
}

interface ArabicServiceContent {
  name: string;
  shortTitle: string;
  heading: string;
  description: string;
  coreCapabilitiesHeading?: string;
  coreDescription?: string;
  coreCapabilities?: string[];
  catalogHeading: string;
  tabHeading?: string;
  subDisciplines?: Record<string, ArabicSubDiscipline>;
  catalogItems: Record<string, ArabicCatalogItem>;
}

export const SERVICES_DATA: ServiceItemData[] = [
  {
    id: "systems-integration",
    slug: "systems-integration",
    number: "01",
    name: "Systems Integration",
    shortTitle: "Systems Integration",
    icon: Cpu,
    heading: "Our Systems Integration Expertise",
    description:
      "We unify a building's electrical, mechanical, plumbing, fire & life safety, HVAC and ICT systems into one intelligent, measurable network — engineered for reliability, efficiency and long-term performance across six integrated disciplines.",
    image: service1Img,
    tabHeading: "Integrated Disciplines",
    subDisciplines: [
      {
        id: "electrical",
        tabTitle: "Electrical",
        heading: "Our Electrical Systems Integration Expertise",
        description:
          "At TMYAZNA Company Limited, we provide the intelligent backbone for your facility’s power infrastructure. Our team excels in the sophisticated integration of high-voltage distribution and low-voltage control systems, ensuring a seamless flow of energy that is both reliable and measurable. We bridge the gap between heavy electrical hardware and smart building analytics, allowing for real-time monitoring and automated load management. By synchronizing power systems with your HVAC and Fire Life Safety networks, we create an integrated environment that reduces operational costs, enhances equipment lifespan, and guarantees uninterrupted performance.",
        capabilitiesHeading: "Core Electrical & Power Integration Capabilities",
        capabilities: [
          "Main Switchgear & MDB Integration",
          "Smart Metering & Sub-Metering",
          "Automatic Transfer Switches (ATS)",
          "Generator Control Systems",
          "UPS (Uninterruptible Power Supply)",
          "Intelligent Lighting Control",
          "Power Quality Analytics",
          "Motor Control Centers (MCC)",
          "EV Charging Infrastructure",
          "Renewable Energy Integration",
        ],
        icon: Zap,
      },
      {
        id: "mechanical",
        tabTitle: "Mechanical",
        heading: "Our Mechanical Systems Integration Expertise",
        description:
          "We specialise in the seamless synchronization of complex mechanical infrastructure. Every pump, valve and motor is integrated into a unified, intelligent network — from plumbing and water treatment to specialised pumping stations — giving real-time visibility that enables predictive maintenance, reduces water waste and keeps core utilities running efficiently.",
        capabilitiesHeading: "Core Mechanical Systems Capabilities",
        capabilities: [
          "Domestic Water Pumping",
          "Water Filtration & Treatment",
          "Greywater & Irrigation Systems",
          "Sump Pump & Sewage Lift Stations",
          "Hot Water Generation",
          "Compressed Air & Vacuum Systems",
          "Vibration & Flow Monitoring",
          "Leak Detection & Automated Shut-off",
        ],
        icon: Wrench,
      },
      {
        id: "plumbing",
        tabTitle: "Plumbing",
        heading: "Our Plumbing Systems Integration Expertise",
        description:
          "We bring technical oversight to the building’s fluid infrastructure, integrating water-supply and waste systems into the wider building-management framework. By linking pumps, tanks and filtration units to centralized controls, we provide the visibility needed to manage water resources, prevent localized damage and maintain operational continuity in high-traffic facilities.",
        capabilitiesHeading: "Core Plumbing & Water Capabilities",
        capabilities: [
          "Booster Pump Staging",
          "Remote Tank Monitoring",
          "BMS-Linked Leak Detection",
          "Filtration Status Alerts",
          "Hot Water Loop Optimization",
          "Sewage Pit High-Level Alarms",
          "Water Metering Integration",
          "Irrigation Feed Synchronization",
          "Greywater System Interlocking",
          "Solar Water Heater Integration"
        ],
        icon: Droplets,
      },
      {
        id: "fire-safety",
        tabTitle: "Fire & Life Safety",
        heading: "Our Fire Life Safety & Systems Integration Expertise",
        description:
          "We deliver comprehensive integration of advanced fire-alarm and firefighting systems — a proactive shield for your infrastructure. By synchronizing detection intelligence with suppression power and tying it into building automation and HVAC controls, we provide a unified response strategy that protects lives and assets while meeting the highest international standards and local civil-defence codes.",
        capabilitiesHeading: "Core Fire Safety & Integration Capabilities",
        capabilities: [
          "Intelligent Fire Alarm Systems",
          "Firefighting Pump Sets",
          "Automatic Sprinkler Systems",
          "Clean Agent Suppression (FM-200/Novec)",
          "Smoke Management & HVAC Integration",
          "Emergency Voice & Evacuation (PA/VA)",
          "Fire Hydrant & Hose Reel Networks",
          "Stairwell Pressurization Systems",
          "Emergency Lighting & Signage",
          "Central Monitoring"
        ],
        icon: Flame,
      },
      {
        id: "hvac",
        tabTitle: "HVAC",
        heading: "Our HVAC Integration Expertise",
        description:
          "We deliver sophisticated climate solutions where power meets precision — end-to-end integration of high-capacity thermal plants and advanced air-handling networks. We engineer intelligent ecosystems that synchronize cooling sources with air distribution for a healthier, more sustainable indoor environment, optimised for performance, compliance and long-term reliability.",
        capabilitiesHeading: "Core HVAC Systems Capabilities",
        capabilities: [
          "Central Chilled-Water Systems",
          "Water-Cooled Systems",
          "Air-Cooled Systems",
          "VRF/VRV (Variable Refrigerant Flow)",
          "Split & Cassette Unit Systems",
          "Air Handling Units (AHUs)",
          "Fresh Air Handling Units (FAHUs)",
          "SMACNA-Standard Ducting",
          "Exhaust & Extraction Systems",
          "BMS & Smart Integration"
        ],
        icon: Wind,
      },
      {
        id: "ict",
        tabTitle: "ICT",
        heading: "Our ICT Systems Integration Expertise",
        description:
          "We build the digital foundation for the modern, connected enterprise, integrating robust ICT infrastructure that turns buildings into responsive, data-driven environments. By unifying active and passive components into one communication framework, we deliver seamless connectivity, high-speed data transmission and ironclad security — ready for the next generation of smart-city infrastructure.",
        capabilitiesHeading: "Core ICT Systems Capabilities",
        capabilities: [
          "Structured Cabling Systems (SCS)",
          "Converged IP Networks",
          "Unified Communications (UC)",
          "BMS Solutions",
          "Wireless Infrastructure (Wi-Fi 6/7)",
          "Active Network Switching",
          "Data Center & Server Room Integration",
          "IP-CCTV & Security Integration",
          "AV & Digital Signage Integration",
          "Network Security & Firewalls"
        ],
        icon: Network,
      },
    ],
    catalogHeading: "Systems Integration Catalog",
    catalogItems: [
      {
        id: "si-cat-1",
        title: "Main Switchgear & MDB Panels",
        description:
          "Engineered low- and medium-voltage power distribution units integrated with smart circuit monitoring and automated failover control.",
        image: service1Img,
        badge: "Power Distribution",
      },
      {
        id: "si-cat-2",
        title: "Centralized Building Management Systems",
        description:
          "Intelligent BMS architecture unifying HVAC, lighting, energy metering, and equipment diagnostics into a single dashboard.",
        image: catalogHeroImg,
        badge: "Smart Automation",
      },
      {
        id: "si-cat-3",
        title: "Clean Agent Fire Suppression Units",
        description:
          "NFPA-compliant waterless gas suppression solutions designed for mission-critical data rooms, telecom hubs, and electrical substations.",
        image: blog1Img,
        badge: "Life Safety",
      },
      {
        id: "si-cat-4",
        title: "Enterprise Optical ICT & Server Racks",
        description:
          "High-density structured cabling, redundant fiber loops, and organized server enclosures optimized for high-throughput connectivity.",
        image: blog2Img,
        badge: "Digital Backbone",
      },
    ],
  },
  {
    id: "construction",
    slug: "construction",
    number: "02",
    name: "Construction",
    shortTitle: "Construction",
    icon: Building2,
    heading: "Our Construction Expertise",
    description:
      "We deliver civil, structural and building works to programme, budget and the highest quality and safety standards — managing every stage from groundworks and structures through fit-out to testing, commissioning and handover.",
    image: service2Img,
    tabHeading: "Construction Services",
    subDisciplines: [
      {
        id: "civil-works",
        tabTitle: "Civil Works",
        heading: "Our Civil Work Expertise",
        description:
          "At TMYAZNA Company Limited, we provide the structural integrity and foundational excellence every great project requires. Our team manages civil works with precision, durability, and seamless coordination with MEP services. Through modern construction methods and rigorous site management, we deliver high-quality infrastructure that provides a reliable base for complex technical installations.",
        capabilitiesHeading: "Core Civil Work Capabilities",
        capabilities: [
          "Structural Concrete Works",
          "Earthworks & Site Preparation",
          "Masonry & Blockwork",
          "Waterproofing Systems",
          "External Works & Hardscaping",
          "Structural Steel Integration",
          "Underground Utility Infrastructure",
          "Internal Plastering & Screeding",
          "Expansion Joint Management",
          "Demolition & Structural Alterations",
        ],
        icon: Building2,
      },
      {
        id: "interior-fit-out",
        tabTitle: "Interior Fit-Out",
        heading: "Our Interior Fit-Out Expertise",
        description:
          "We transform empty shells into functional, high-end environments. Our approach combines design and engineering so the finished space reflects the client’s vision and works seamlessly with the building’s technical systems. From acoustic performance to premium materials, we deliver turnkey fit-outs integrated with HVAC, electrical, and ICT infrastructure.",
        capabilitiesHeading: "Core Fit-Out Capabilities",
        capabilities: [
          "Gypsum & Ceiling Systems",
          "Specialized Flooring Solutions",
          "Joinery & Custom Millwork",
          "Glass & Aluminum",
          "Painting & Finishing Work",
          "Exterior Glazed Cladding Systems",
        ],
        icon: Wrench,
      },
    ],
    coreCapabilitiesHeading: "Our Civil Work Expertise",
    coreDescription:"At Tmyazna Company Limited, we provide the structural integrity and foundational excellence that every great project requires. Tmyazna team manages civil works with a focus on precision, durability, and seamless coordination with MEP services. We understand that civil work is the skeleton of the facility; therefore, our team ensures that every structural element is executed to the highest engineering standards. By integrating modern construction methodologies with rigorous site management, Tmyazna team delivers high-quality infrastructure that serves as a reliable base for the most complex technological installations.",
    coreCapabilities: [
      "Structural Concrete Works",
      "Earthworks & Site Preparation",
      "Masonry & Blockwork",
      "Waterproofing Systems",
      "External Works & Hardscaping",
      "Structural Steel Integration",
      "Underground Utility Infrastructure",
      "Internal Plastering & Screeding.",
      "Expansion Joint Management",
      "Demolition & Structural Alterations",
    ],
    catalogHeading: "Construction Solutions Catalog",
    catalogItems: [
      {
        id: "con-cat-1",
        title: "Commercial & Corporate Complex Structures",
        description:
          "Turnkey delivery of prime commercial office headquarters, shopping centers, and mixed-use developments across Saudi Arabia.",
        image: service2Img,
        badge: "Commercial",
      },
      {
        id: "con-cat-2",
        title: "Heavy Civil & Foundation Infrastructure",
        description:
          "Deep basement excavations, secant piling, ground compaction, and heavy reinforced concrete foundations built for high loads.",
        image: blog3Img,
        badge: "Civil Works",
      },
      {
        id: "con-cat-3",
        title: "Turnkey Interior Fit-Out & Architectural Finishes",
        description:
          "Bespoke commercial interiors, acoustic ceiling installations, premium stonework, and contemporary architectural glass facades.",
        image: blog4Img,
        badge: "Fit-Out",
      },
      {
        id: "con-cat-4",
        title: "Industrial Warehouses & Logistics Hubs",
        description:
          "High-span pre-engineered steel buildings, temperature-controlled distribution centers, and heavy-duty flooring solutions.",
        image: hero1Img,
        badge: "Industrial",
      },
    ],
  },
  {
    id: "facility-services",
    slug: "facility-services",
    number: "03",
    name: "Facility Services",
    shortTitle: "Facility Services",
    icon: Settings,
    heading: "Our Facility Management Expertise",
    description:
      "We provide end-to-end hard and soft facility management that keeps assets running reliably and cost-effectively across their entire lifecycle — backed by CAFM technology and trained, certified teams.",
    image: service3Img,
    tabHeading: "Facility Service Lines",
    subDisciplines: [
      {
        id: "facility-management",
        tabTitle: "Facility Management",
        heading: "Our Facility Management Expertise",
        description:
          "We deliver integrated facility management that extends beyond hospitality and basic maintenance. Using data from connected systems, our teams provide proactive, technology-driven operations that reduce downtime and cost while keeping occupants safe and comfortable.",
        capabilitiesHeading: "Core Facility Management Capabilities",
        capabilities: [
          "CAFM System Integration",
          "Hard FM (Mechanical & Electrical) Maintenance",
          "Soft FM (Cleaning & Housekeeping)",
          "Security & Access Management",
          "Energy Management & Auditing",
          "Preventive & Predictive Maintenance",
          "Landscaping & Irrigation Maintenance",
          "EHS (Environment, Health & Safety)",
        ],
        icon: Settings,
      },
      {
        id: "janitorial",
        tabTitle: "Janitorial Services",
        heading: "Our Janitorial Services Expertise",
        description:
          "We treat cleanliness as an essential part of facility health and asset preservation. Our trained teams use eco-friendly methods and carefully planned schedules to maintain hygienic, professional spaces without disrupting daily operations, from premium finishes to sensitive technical areas.",
        capabilitiesHeading: "Core Janitorial Services Capabilities",
        capabilities: [
          "High-End Surface Care",
          "Sanitization & Infection Control",
          "Dust-Free Janitorial Protocols",
          "Waste Management & Segregation",
          "Deep Cleaning & Steam Treatment",
          "Façade & External Cleaning",
        ],
        icon: Users,
      },
      {
        id: "operation-maintenance",
        tabTitle: "Operation & Maintenance",
        heading: "Our Operation & Maintenance Expertise",
        description:
          "We support daily operational continuity with technical operation and maintenance services for a building’s core systems. Combining hands-on engineering skills with integrated monitoring, we maintain mechanical and electrical assets for reliable, safe, and efficient operation, maximum uptime, and energy sustainability.",
        capabilitiesHeading: "Core Operation & Maintenance Capabilities",
        capabilities: [
          "System-Specific Preventive Maintenance",
          "Predictive Diagnostics",
          "Energy Optimization",
          "Critical Spare Parts Management",
          "Full-Time On-Site Technical Teams",
          "Water & Air Quality Testing",
          "Corrective & Emergency Repairs",
          "Lifecycle Asset Mapping",
        ],
        icon: Wrench,
      },
    ],
    coreCapabilitiesHeading: "Core Facility Management Capabilities",
    coreDescription:"At Tmyazna Company Limited, we believe that a building is a high-performance asset that requires expert care to retain its value. Tmyazna team delivers integrated Facility Management solutions that go beyond hospitality services and basic maintenance; we focus on operational excellence and lifecycle optimization. By leveraging the data from our integrated systems, our team provides proactive, technology-driven management that reduces downtime and minimizes operational costs. Whether managing a high-traffic mall or a sensitive data center, Tmyazna team ensures a safe, efficient, and comfortable environment for all occupants through a unified management approach.",
    coreCapabilities: [
      "CAFM System Integration",
      "Hard FM (Mechanical & Electrical) Maintenance",
      "Soft FM (Cleaning & Housekeeping)",
      "Security & Access Management",
      "Energy Management & Auditing",
      "Preventive & Predictive Maintenance",
      "Landscaping & Irrigation Maintenance",
      "Landscaping & Irrigation Maintenance",
    ],
    catalogHeading: "Facility Management Catalog",
    catalogItems: [
      {
        id: "fm-cat-1",
        title: "CAFM Smart Facility Operations Platform",
        description:
          "Cloud-based work order tracking, IoT asset telemetry, and preventive maintenance automation for commercial portfolios.",
        image: service3Img,
        badge: "CAFM Technology",
      },
      {
        id: "fm-cat-2",
        title: "Critical Plant Hard FM Maintenance Packages",
        description:
          "Comprehensive service agreements for chillers, backup generators, transformers, and building automation controllers.",
        image: blog5Img,
        badge: "Hard FM",
      },
      {
        id: "fm-cat-3",
        title: "Premium Soft Services & Campus Cleaning",
        description:
          "Sustainable green cleaning practices, automated facade washing, landscape irrigation, and hygienic waste processing.",
        image: blog6Img,
        badge: "Soft FM",
      },
      {
        id: "fm-cat-4",
        title: "Energy & HVAC Retrofit Optimization",
        description:
          "Targeted upgrades for legacy building systems that reduce kilowatt consumption by up to 30% through intelligent controls.",
        image: hero2Img,
        badge: "Efficiency",
      },
    ],
  },
  {
    id: "manpower",
    slug: "manpower",
    number: "04",
    name: "Manpower",
    shortTitle: "Manpower",
    icon: Users,
    heading: "Our Manpower Services Expertise",
    description:
      "We supply skilled, certified people — mobilised quickly and managed to international standards across every discipline and trade, with full recruitment, training, Saudization and compliance support.",
    image: service4Img,
    tabHeading: "Workforce Categories",
    subDisciplines: [
      {
        id: "technical-workforce",
        tabTitle: "Technical Workforce",
        heading: "Engineering & Technical Professionals",
        description:
          "We provide certified, project-ready engineering and technical professionals for demanding infrastructure and systems integration projects. Our specialists are mobilized to meet project requirements and work to the safety and quality standards expected across the Kingdom’s landmark developments.",
        capabilitiesHeading: "Engineering & Technical Capabilities",
        capabilities: [
          "Engineering & Technical Professionals",
          "Specialized HVAC & MEP Technicians",
          "Skilled Civil & Construction Trades",
          "Industrial Operators & Fabricators",
          "Finishing & Fit-Out Artisans",
        ],
        icon: Wrench,
      },
      {
        id: "operations-support",
        tabTitle: "Operations & Site Support",
        heading: "Operation, Maintenance & Site Support Teams",
        description:
          "We supply dependable teams to keep facilities and project sites operating smoothly. From operation and maintenance to professional cleaning and site logistics, our personnel are prepared to support daily operations in line with required safety, quality, and compliance standards.",
        capabilitiesHeading: "Operations & Site Support Capabilities",
        capabilities: [
          "Operation & Maintenance (O&M) Teams",
          "Professional Janitorial & Hygiene Staff",
          "Site Logistics & General Support",
        ],
        icon: Settings,
      },
    ],
    coreCapabilitiesHeading: "Core Manpower & Technical Staffing Capabilities",
    coreDescription:"At Tmyazna Company Limited, we provide a tiered human capital solution designed to meet the rigorous demands of large-scale infrastructure and systems integration. Tmyazna team understands that project success requires a balanced workforce, from high- level engineering specialists to dependable site support. We bridge the gap between technical demand and talent supply by providing certified, project-ready professionals across three specialized categories. By choosing Tmyazna team, you ensure that your project is powered by a workforce that is not only technically capable but also fully integrated into the safety and quality standards required for Saudi Arabia’s landmark developments.",
    coreCapabilities: [
      "Engineering & Technical Professionals",
      "Operation & Maintenance (O&M) Teams",
      "Specialized HVAC & MEP Technicians",
      "Professional Janitorial & Hygiene Staff",
      "Skilled Civil & Construction Trades",
      "Skilled Civil & Construction Trades",
      "Industrial Operators & Fabricators",
      "Finishing & Fit-Out Artisans",
      "Site Logistics & General Support",
    ],
    catalogHeading: "Workforce Solutions Catalog",
    catalogItems: [
      {
        id: "mp-cat-1",
        title: "Certified MEP Technical Teams",
        description:
          "Specialized crews of electrical technicians, HVAC mechanics, and instrumentation specialists equipped with verified credentials.",
        image: service4Img,
        badge: "Technical Trades",
      },
      {
        id: "mp-cat-2",
        title: "Civil Construction & Structural Crews",
        description:
          "Experienced steel fixers, shuttering carpenters, masons, and certified heavy equipment operators ready for mega-projects.",
        image: blog3Img,
        badge: "Construction Labor",
      },
      {
        id: "mp-cat-3",
        title: "Certified HSE Safety & Quality Officers",
        description:
          "Dedicated site safety professionals ensuring zero lost-time incidents and continuous compliance with Saudi labor codes.",
        image: blog1Img,
        badge: "HSE Officers",
      },
      {
        id: "mp-cat-4",
        title: "Turnkey Workforce Logistics & Camps",
        description:
          "Complete mobilization packages including fully catered accommodation, daily bus transport, medical coverage, and HR support.",
        image: blog5Img,
        badge: "Turnkey Logistics",
      },
    ],
  },
  {
    id: "environmental",
    slug: "environmental",
    number: "05",
    name: "Environmental",
    shortTitle: "Environmental",
    icon: Leaf,
    heading: "Our Water Treatment & Environmental Services Expertise",
    description:
      "We deliver water, waste and sustainability solutions that protect the environment and support the Kingdom’s net-zero ambitions — from treatment plants to recycling, compliance and emissions monitoring.",
    image: service5Img,
    tabHeading: "Environmental Services",
    subDisciplines: [
      {
        id: "water-treatment",
        tabTitle: "Water Treatment",
        heading: "Our Water Treatment Expertise",
        description:
          "We protect facility water systems through specialist chemical and mechanical treatment. Covering the full water cycle—from potable-water purification to wastewater recycling for irrigation—our smart monitoring and treatment protocols help maintain hygiene, protect infrastructure, and reduce environmental impact.",
        capabilitiesHeading: "Core Water Treatment Capabilities",
        capabilities: [
          "Potable Water Purification",
          "Cooling Tower Water Treatment",
          "Greywater Recycling Systems",
          "Reverse Osmosis (RO) Plant Integration",
          "Sewage Treatment Plant (STP) Management",
          "Swimming Pool & Water Feature Filtration",
          "Boiler & Heating Loop Treatment",
          "Automated Water Quality Analysis",
          "Scale & Corrosion Inhibition",
          "Sustainable Drainage Systems (SuDS)",
        ],
        icon: Droplets,
      },
      {
        id: "waste-management",
        tabTitle: "Waste Management",
        heading: "Our Waste Management & Environmental Services Expertise",
        description:
          "We turn waste management into a sustainability function through integrated solutions that support environmental and hygiene standards. Smart tracking, sorting, and recovery help move facilities beyond traditional disposal towards circular-economy practices while reducing their environmental footprint.",
        capabilitiesHeading: "Core Waste Management Capabilities",
        capabilities: [
          "Smart Bin & Sensor Integration",
          "Source Segregation Systems",
          "Organic Waste Composting",
          "Hazardous & Medical Waste Protocols",
          "BMS-Linked Waste Tracking",
          "Pneumatic Waste Collection Support",
          "Construction & Demolition (C&D) Diversion",
          "E-Waste Recycling Programs",
          "Grease Trap & Oil Management",
          "Zero-Waste Strategy Consulting",
        ],
        icon: Leaf,
      },
    ],
    coreCapabilitiesHeading: "Core Water Treatment & Integration Capabilities",
    coreCapabilities: [
      "Potable Water Purification",
      "Cooling Tower Water Treatment",
      "Greywater Recycling Systems",
      "Reverse Osmosis (RO) Plant Integration",
      "Sewage Treatment Plant (STP) Management",
      "Swimming Pool & Water Feature Filtration",
      "Boiler & Heating Loop Treatment",
      "Automated Water Quality Analysi",
      "Scale & Corrosion Inhibitio",
      "Sustainable Drainage Systems (SuDS)",
    ],
    catalogHeading: "Environmental Solutions Catalog",
    catalogItems: [
      {
        id: "env-cat-1",
        title: "Modular Wastewater Treatment Plants (MBR / MBBR)",
        description:
          "Containerized and civil sewage treatment systems producing high-purity recycled water for landscape irrigation and industrial cooling.",
        image: service5Img,
        badge: "Water Treatment",
      },
      {
        id: "env-cat-2",
        title: "Industrial Recycling & Waste Recovery Centers",
        description:
          "Engineered sorting and processing facilities transforming solid industrial waste into reusable raw materials.",
        image: blog6Img,
        badge: "Waste Recovery",
      },
      {
        id: "env-cat-3",
        title: "Continuous Emissions & Air Quality Stations",
        description:
          "Real-time sensor arrays measuring particulates, VOCs, NOx, and greenhouse gases with direct telemetry to environmental monitors.",
        image: blog2Img,
        badge: "Monitoring",
      },
      {
        id: "env-cat-4",
        title: "Commercial Solar PV Carports & Rooftop Arrays",
        description:
          "Grid-tied solar photovoltaic installations that reduce carbon footprint and generate clean on-site kilowatt hours.",
        image: hero2Img,
        badge: "Renewable Energy",
      },
    ],
  },
];

const SERVICES_ARABIC: Record<string, ArabicServiceContent> = {
  "systems-integration": {
    name: "تكامل الأنظمة",
    shortTitle: "تكامل الأنظمة",
    heading: "خبرتنا في تكامل الأنظمة",
    description:
      "نوحّد الأنظمة الكهربائية والميكانيكية وأنظمة السباكة ومكافحة الحريق وسلامة الأرواح والتكييف وتقنية المعلومات والاتصالات في المباني ضمن شبكة ذكية قابلة للقياس، مصممة لتحقيق الاعتمادية والكفاءة والأداء طويل الأمد عبر ستة تخصصات متكاملة.",
    tabHeading: "التخصصات المتكاملة",
    catalogHeading: "كتالوج تكامل الأنظمة",
    subDisciplines: {
      electrical: {
        tabTitle: "الأنظمة الكهربائية",
        heading: "خبرتنا في تكامل الأنظمة الكهربائية",
        description:
          "في شركة تميزنا المحدودة، نوفر البنية الذكية لشبكات الطاقة في منشأتكم. يتميز فريقنا بقدرته على تكامل أنظمة توزيع الجهد العالي وأنظمة التحكم ذات الجهد المنخفض، لضمان تدفق طاقة موثوق وقابل للقياس. ونربط المعدات الكهربائية بأنظمة تحليل المباني الذكية لمراقبة الأداء آنياً وإدارة الأحمال آلياً. كما ننسق أنظمة الطاقة مع التكييف وشبكات السلامة من الحريق لخفض تكاليف التشغيل وإطالة عمر المعدات وضمان استمرارية الأداء.",
        capabilitiesHeading: "قدرات تكامل الأنظمة الكهربائية والطاقة",
        capabilities: [
          "تكامل لوحات المفاتيح الرئيسية ولوحات التوزيع الرئيسية",
          "العدادات الذكية والعدادات الفرعية",
          "مفاتيح التحويل الآلي (ATS)",
          "أنظمة التحكم بالمولدات",
          "أنظمة الطاقة غير المنقطعة (UPS)",
          "التحكم الذكي بالإضاءة",
          "تحليل جودة الطاقة",
          "مراكز التحكم بالمحركات (MCC)",
          "بنية شحن المركبات الكهربائية",
          "تكامل الطاقة المتجددة",
        ],
      },
      mechanical: {
        tabTitle: "الأنظمة الميكانيكية",
        heading: "خبرتنا في تكامل الأنظمة الميكانيكية",
        description:
          "نتخصص في التنسيق السلس للبنية التحتية الميكانيكية المعقدة. نربط كل مضخة وصمام ومحرك بشبكة ذكية موحدة، بدءاً من السباكة ومعالجة المياه وصولاً إلى محطات الضخ المتخصصة. ويوفر ذلك رؤية فورية تساعد على الصيانة التنبؤية والحد من هدر المياه وضمان كفاءة المرافق الأساسية.",
        capabilitiesHeading: "قدرات الأنظمة الميكانيكية",
        capabilities: [
          "ضخ المياه للاستخدام المنزلي",
          "ترشيح المياه ومعالجتها",
          "أنظمة المياه الرمادية والري",
          "مضخات التجميع ومحطات رفع مياه الصرف",
          "إنتاج المياه الساخنة",
          "أنظمة الهواء المضغوط والتفريغ",
          "مراقبة الاهتزازات والتدفق",
          "كشف التسرب والإيقاف الآلي",
        ],
      },
      plumbing: {
        tabTitle: "السباكة",
        heading: "خبرتنا في تكامل أنظمة السباكة",
        description:
          "نوفر الإشراف الفني على شبكات المياه والصرف في المباني، ونكاملها مع منظومة إدارة المبنى. ومن خلال ربط المضخات والخزانات ووحدات الترشيح بأنظمة التحكم المركزية، نتيح إدارة الموارد المائية ومنع الأضرار الموضعية والحفاظ على استمرارية التشغيل في المنشآت ذات الكثافة العالية.",
        capabilitiesHeading: "قدرات السباكة والمياه",
        capabilities: [
          "مضخات تعزيز ضغط المياه",
          "مراقبة الخزانات عن بُعد",
          "كشف التسرب المرتبط بنظام إدارة المبنى",
          "تنبيهات حالة الترشيح",
          "تحسين دورة المياه الساخنة",
          "إنذارات ارتفاع منسوب مياه الصرف",
          "تكامل عدادات المياه",
          "مزامنة تغذية أنظمة الري",
          "ربط أنظمة المياه الرمادية",
          "تكامل سخانات المياه بالطاقة الشمسية",
        ],
      },
      "fire-safety": {
        tabTitle: "الحريق وسلامة الأرواح",
        heading: "خبرتنا في تكامل أنظمة الحريق وسلامة الأرواح",
        description:
          "نقدم تكاملاً شاملاً لأنظمة إنذار الحريق ومكافحته المتقدمة لتوفير حماية استباقية للبنية التحتية. ومن خلال ربط أنظمة الكشف والإطفاء بأتمتة المباني والتحكم بالتكييف، نوفر استجابة موحدة تحمي الأرواح والأصول وتفي بأعلى المعايير الدولية ومتطلبات الدفاع المدني المحلية.",
        capabilitiesHeading: "قدرات تكامل أنظمة السلامة من الحريق",
        capabilities: [
          "أنظمة إنذار الحريق الذكية",
          "مجموعات مضخات مكافحة الحريق",
          "أنظمة الرش الآلي",
          "أنظمة الإطفاء بالغاز النظيف (FM-200/Novec)",
          "إدارة الدخان وتكامل أنظمة التكييف",
          "أنظمة الإخلاء والنداء الصوتي للطوارئ (PA/VA)",
          "شبكات صنابير الحريق وبكرات الخراطيم",
          "أنظمة ضغط سلالم الطوارئ",
          "إنارة الطوارئ واللوحات الإرشادية",
          "المراقبة المركزية",
        ],
      },
      hvac: {
        tabTitle: "التكييف والتهوية",
        heading: "خبرتنا في تكامل أنظمة التكييف والتهوية",
        description:
          "نقدم حلولاً متقدمة للتحكم بالمناخ تجمع بين الطاقة والدقة، من خلال تكامل محطات التبريد عالية السعة وشبكات معالجة الهواء. نصمم منظومات ذكية تنسق مصادر التبريد مع توزيع الهواء لتوفير بيئة داخلية صحية ومستدامة، مع التركيز على الأداء والامتثال والاعتمادية طويلة الأمد.",
        capabilitiesHeading: "قدرات أنظمة التكييف والتهوية",
        capabilities: [
          "أنظمة المياه المبردة المركزية",
          "أنظمة التبريد بالمياه",
          "أنظمة التبريد بالهواء",
          "أنظمة تدفق وسيط التبريد المتغير (VRF/VRV)",
          "أنظمة الوحدات المنفصلة ووحدات الكاسيت",
          "وحدات مناولة الهواء (AHUs)",
          "وحدات مناولة الهواء النقي (FAHUs)",
          "مجاري هواء مطابقة لمعايير SMACNA",
          "أنظمة العادم وشفط الهواء",
          "تكامل أنظمة إدارة المباني والتحكم الذكي",
        ],
      },
      ict: {
        tabTitle: "تقنية المعلومات والاتصالات",
        heading: "خبرتنا في تكامل أنظمة تقنية المعلومات والاتصالات",
        description:
          "نبني الأساس الرقمي للمنشآت الحديثة والمتصلة من خلال تكامل بنية تحتية موثوقة لتقنية المعلومات والاتصالات، بما يحوّل المباني إلى بيئات تفاعلية قائمة على البيانات. نوحّد المكونات النشطة والسلبية ضمن إطار اتصالات واحد لتوفير اتصال سلس ونقل سريع للبيانات وأمان قوي، استعداداً للجيل القادم من البنية التحتية للمدن الذكية.",
        capabilitiesHeading: "قدرات أنظمة تقنية المعلومات والاتصالات",
        capabilities: [
          "أنظمة الكابلات الهيكلية (SCS)",
          "شبكات بروتوكول الإنترنت المتكاملة",
          "الاتصالات الموحدة (UC)",
          "حلول أنظمة إدارة المباني",
          "البنية التحتية اللاسلكية (Wi-Fi 6/7)",
          "مبدلات الشبكات النشطة",
          "تكامل مراكز البيانات وغرف الخوادم",
          "تكامل كاميرات المراقبة IP وأنظمة الأمن",
          "تكامل الأنظمة السمعية والبصرية واللوحات الرقمية",
          "أمن الشبكات والجدران النارية",
        ],
      },
    },
    catalogItems: {
      "si-cat-1": {
        title: "لوحات المفاتيح الرئيسية ولوحات التوزيع",
        description:
          "وحدات هندسية لتوزيع الطاقة ذات الجهد المنخفض والمتوسط، متكاملة مع مراقبة ذكية للدوائر والتحويل الآلي عند الأعطال.",
        badge: "توزيع الطاقة",
      },
      "si-cat-2": {
        title: "أنظمة إدارة المباني المركزية",
        description:
          "بنية ذكية لأنظمة إدارة المباني تجمع التكييف والإضاءة وقياس الطاقة وتشخيص المعدات في لوحة تحكم واحدة.",
        badge: "الأتمتة الذكية",
      },
      "si-cat-3": {
        title: "وحدات الإطفاء بالغاز النظيف",
        description:
          "حلول إطفاء بالغاز دون استخدام الماء، مطابقة لمعايير NFPA ومصممة لغرف البيانات الحيوية ومراكز الاتصالات والمحطات الكهربائية.",
        badge: "سلامة الأرواح",
      },
      "si-cat-4": {
        title: "أنظمة الاتصالات الضوئية وخزائن الخوادم",
        description:
          "كابلات هيكلية عالية الكثافة ومسارات ألياف ضوئية احتياطية وخزائن خوادم منظمة لتحسين سرعة الاتصال.",
        badge: "البنية الرقمية",
      },
    },
  },
  construction: {
    name: "الإنشاءات",
    shortTitle: "الإنشاءات",
    heading: "خبرتنا في الإنشاءات",
    description:
      "ننفذ الأعمال المدنية والإنشائية وأعمال المباني وفق الجداول والميزانيات وأعلى معايير الجودة والسلامة، وندير جميع المراحل من تجهيز الموقع والهياكل إلى التشطيبات والاختبارات والتشغيل والتسليم.",
    tabHeading: "خدمات الإنشاءات",
    subDisciplines: {
      "civil-works": {
        tabTitle: "الأعمال المدنية",
        heading: "خبرتنا في الأعمال المدنية",
        description:
          "في شركة تميزنا المحدودة، نوفر المتانة الإنشائية والأسس الراسخة التي يحتاج إليها كل مشروع ناجح. يدير فريقنا الأعمال المدنية بدقة واهتمام بالمتانة والتنسيق السلس مع خدمات الأنظمة الكهروميكانيكية. ومن خلال أساليب البناء الحديثة والإدارة الدقيقة للمواقع، ننفذ بنية تحتية عالية الجودة تشكل أساساً موثوقاً للتركيبات التقنية المعقدة.",
        capabilitiesHeading: "قدرات الأعمال المدنية الأساسية",
        capabilities: [
          "أعمال الخرسانة الإنشائية",
          "الأعمال الترابية وتجهيز الموقع",
          "أعمال المباني والبلوك",
          "أنظمة العزل المائي",
          "الأعمال الخارجية وتنسيق المساحات",
          "تكامل الهياكل الفولاذية",
          "البنية التحتية للمرافق تحت الأرض",
          "اللياسة الداخلية وتسوية الأرضيات",
          "إدارة فواصل التمدد",
          "الهدم والتعديلات الإنشائية",
        ],
      },
      "interior-fit-out": {
        tabTitle: "التجهيز الداخلي",
        heading: "خبرتنا في التجهيز الداخلي",
        description:
          "نحوّل الهياكل الفارغة إلى بيئات عملية راقية. ونجمع في أعمال التجهيز الداخلي بين التصميم والهندسة لضمان توافق المساحة النهائية مع رؤية العميل وانسجامها مع الأنظمة الفنية للمبنى. ومن الأداء الصوتي إلى المواد عالية الجودة، نقدم حلولاً متكاملة ترتبط بأنظمة التكييف والكهرباء وتقنية المعلومات والاتصالات.",
        capabilitiesHeading: "قدرات التجهيز الداخلي الأساسية",
        capabilities: [
          "أنظمة الجبس والأسقف",
          "حلول الأرضيات المتخصصة",
          "أعمال النجارة والتصنيع حسب الطلب",
          "الزجاج والألمنيوم",
          "أعمال الطلاء والتشطيب",
          "أنظمة تكسية الواجهات الزجاجية",
        ],
      },
    },
    coreCapabilitiesHeading: "خبرتنا في الأعمال المدنية",
    coreDescription:
      "في شركة تميزنا المحدودة، نوفر المتانة الإنشائية والأسس الراسخة التي يحتاج إليها كل مشروع ناجح. يدير فريقنا الأعمال المدنية بدقة واهتمام بالمتانة والتنسيق السلس مع خدمات الأنظمة الكهروميكانيكية. ونؤمن بأن الأعمال المدنية تشكل الهيكل الأساسي للمنشأة؛ لذلك نحرص على تنفيذ كل عنصر إنشائي وفق أعلى المعايير الهندسية. ومن خلال توظيف أساليب البناء الحديثة والإدارة الدقيقة للمواقع، ننفذ بنية تحتية عالية الجودة تشكل أساساً موثوقاً لأعقد التركيبات التقنية.",
    coreCapabilities: [
      "أعمال الخرسانة الإنشائية",
      "الأعمال الترابية وتجهيز الموقع",
      "أعمال المباني والبلوك",
      "أنظمة العزل المائي",
      "الأعمال الخارجية وتنسيق المساحات",
      "تكامل الهياكل الفولاذية",
      "البنية التحتية للمرافق تحت الأرض",
      "اللياسة الداخلية وتسوية الأرضيات",
      "إدارة فواصل التمدد",
      "الهدم والتعديلات الإنشائية",
    ],
    catalogHeading: "كتالوج حلول الإنشاءات",
    catalogItems: {
      "con-cat-1": {
        title: "المجمعات التجارية ومباني الشركات",
        description:
          "تنفيذ متكامل للمقار التجارية ومراكز التسوق والمشاريع متعددة الاستخدامات في أنحاء المملكة العربية السعودية.",
        badge: "تجاري",
      },
      "con-cat-2": {
        title: "الأعمال المدنية الثقيلة والبنية التحتية للأساسات",
        description:
          "أعمال حفر الأقبية العميقة والخوازيق المتداخلة ودمك التربة وتنفيذ الأساسات الخرسانية المسلحة للأحمال العالية.",
        badge: "أعمال مدنية",
      },
      "con-cat-3": {
        title: "التشطيبات الداخلية والتجهيز المعماري المتكامل",
        description:
          "تصميم وتنفيذ المساحات التجارية والأسقف العازلة للصوت والأعمال الحجرية الفاخرة والواجهات الزجاجية العصرية.",
        badge: "التجهيز والتشطيب",
      },
      "con-cat-4": {
        title: "المستودعات الصناعية ومراكز الخدمات اللوجستية",
        description:
          "مبانٍ فولاذية واسعة الامتداد ومراكز توزيع مضبوطة الحرارة وحلول أرضيات تتحمل الاستخدام الشاق.",
        badge: "صناعي",
      },
    },
  },
  "facility-services": {
    name: "خدمات المرافق",
    shortTitle: "خدمات المرافق",
    heading: "خبرتنا في إدارة المرافق",
    description:
      "نقدم إدارة متكاملة للمرافق تشمل الخدمات الفنية وغير الفنية، بما يحافظ على موثوقية الأصول وكفاءة تكلفتها طوال دورة حياتها، بدعم من تقنيات إدارة المرافق المحوسبة وفرق مدربة ومعتمدة.",
    tabHeading: "مجالات خدمات المرافق",
    subDisciplines: {
      "facility-management": {
        tabTitle: "إدارة المرافق",
        heading: "خبرتنا في إدارة المرافق",
        description:
          "نقدم حلولاً متكاملة لإدارة المرافق تتجاوز خدمات الضيافة والصيانة الأساسية. وبالاستفادة من بيانات الأنظمة المتصلة، نوفر عمليات استباقية قائمة على التقنية تقلل فترات التوقف والتكاليف، وتحافظ على سلامة شاغلي المنشآت وراحتهم.",
        capabilitiesHeading: "قدرات إدارة المرافق الأساسية",
        capabilities: [
          "تكامل أنظمة إدارة المرافق المحوسبة (CAFM)",
          "صيانة المرافق الفنية (الميكانيكية والكهربائية)",
          "خدمات المرافق غير الفنية (النظافة والتدبير)",
          "إدارة الأمن والتحكم بالدخول",
          "إدارة الطاقة والتدقيق",
          "الصيانة الوقائية والتنبؤية",
          "صيانة المسطحات الخضراء وشبكات الري",
          "البيئة والصحة والسلامة (EHS)",
        ],
      },
      janitorial: {
        tabTitle: "خدمات النظافة",
        heading: "خبرتنا في خدمات النظافة",
        description:
          "نعدّ النظافة جزءاً أساسياً من صحة المرافق والحفاظ على الأصول. وتستخدم فرقنا المدربة أساليب صديقة للبيئة وجداول مدروسة للحفاظ على مساحات صحية ومهنية دون تعطيل سير العمل اليومي، بدءاً من التشطيبات الراقية وصولاً إلى المساحات الفنية الحساسة.",
        capabilitiesHeading: "قدرات خدمات النظافة الأساسية",
        capabilities: [
          "العناية بالأسطح عالية الجودة",
          "التعقيم ومكافحة العدوى",
          "بروتوكولات النظافة الخالية من الغبار",
          "إدارة النفايات وفرزها",
          "التنظيف العميق والمعالجة بالبخار",
          "تنظيف الواجهات والمساحات الخارجية",
        ],
      },
      "operation-maintenance": {
        tabTitle: "التشغيل والصيانة",
        heading: "خبرتنا في التشغيل والصيانة",
        description:
          "ندعم استمرارية التشغيل اليومية من خلال خدمات فنية لتشغيل وصيانة الأنظمة الأساسية في المباني. ونجمع بين الخبرة الهندسية العملية والمراقبة المتكاملة للحفاظ على الأصول الميكانيكية والكهربائية وضمان موثوقية التشغيل وسلامته وكفاءته واستدامة الطاقة.",
        capabilitiesHeading: "قدرات التشغيل والصيانة الأساسية",
        capabilities: [
          "الصيانة الوقائية حسب نوع النظام",
          "التشخيص التنبؤي",
          "تحسين كفاءة الطاقة",
          "إدارة قطع الغيار الحيوية",
          "فرق فنية متواجدة في الموقع بدوام كامل",
          "اختبارات جودة المياه والهواء",
          "الإصلاحات التصحيحية والطارئة",
          "رسم خرائط الأصول طوال دورة حياتها",
        ],
      },
    },
    coreCapabilitiesHeading: "قدرات إدارة المرافق الأساسية",
    coreDescription:
      "في شركة تميزنا المحدودة، نؤمن بأن المبنى أصل عالي الأداء يحتاج إلى عناية متخصصة للحفاظ على قيمته. يقدم فريقنا حلولاً متكاملة لإدارة المرافق تتجاوز خدمات الضيافة والصيانة الأساسية، وتركز على التميز التشغيلي وتحسين دورة حياة الأصول. وبالاستفادة من بيانات الأنظمة المتكاملة، نوفر إدارة استباقية قائمة على التقنية تقلل فترات التوقف وتكاليف التشغيل. سواء أدرنا مركزاً تجارياً كثيف الحركة أو مركز بيانات حساساً، نعمل على توفير بيئة آمنة وفعالة ومريحة لجميع شاغلي المنشأة من خلال نهج موحد في الإدارة.",
    coreCapabilities: [
      "تكامل أنظمة إدارة المرافق المحوسبة (CAFM)",
      "صيانة المرافق الفنية (الميكانيكية والكهربائية)",
      "خدمات المرافق غير الفنية (النظافة والتدبير)",
      "إدارة الأمن والتحكم بالدخول",
      "إدارة الطاقة والتدقيق",
      "الصيانة الوقائية والتنبؤية",
      "صيانة المسطحات الخضراء وشبكات الري",
      "صيانة المسطحات الخضراء وشبكات الري",
    ],
    catalogHeading: "كتالوج إدارة المرافق",
    catalogItems: {
      "fm-cat-1": {
        title: "منصة ذكية لتشغيل المرافق عبر CAFM",
        description:
          "منصة سحابية لمتابعة أوامر العمل وبيانات أصول إنترنت الأشياء وأتمتة الصيانة الوقائية للمحافظ التجارية.",
        badge: "تقنية CAFM",
      },
      "fm-cat-2": {
        title: "حزم صيانة المرافق الفنية للمنشآت الحيوية",
        description:
          "اتفاقيات خدمات شاملة للمبردات والمولدات الاحتياطية والمحولات ووحدات أتمتة المباني.",
        badge: "إدارة المرافق الفنية",
      },
      "fm-cat-3": {
        title: "خدمات غير فنية متميزة ونظافة المجمعات",
        description:
          "ممارسات تنظيف مستدامة وصديقة للبيئة وغسل آلي للواجهات وري المساحات الخضراء ومعالجة صحية للنفايات.",
        badge: "إدارة المرافق غير الفنية",
      },
      "fm-cat-4": {
        title: "ترشيد الطاقة وتحديث أنظمة التكييف",
        description:
          "تحديثات مستهدفة لأنظمة المباني القائمة تخفض استهلاك الكهرباء بنسبة تصل إلى 30٪ عبر أنظمة تحكم ذكية.",
        badge: "الكفاءة",
      },
    },
  },
  manpower: {
    name: "القوى العاملة",
    shortTitle: "القوى العاملة",
    heading: "خبرتنا في خدمات القوى العاملة",
    description:
      "نوفر كوادر ماهرة ومعتمدة، ونعبئها بسرعة ونديرها وفق المعايير الدولية في مختلف التخصصات والمهن، مع دعم متكامل للتوظيف والتدريب والتوطين والامتثال.",
    tabHeading: "فئات القوى العاملة",
    subDisciplines: {
      "technical-workforce": {
        tabTitle: "الكوادر الفنية",
        heading: "المهندسون والمتخصصون الفنيون",
        description:
          "نوفر مهندسين ومتخصصين فنيين معتمدين وجاهزين للعمل في مشاريع البنية التحتية وتكامل الأنظمة ذات المتطلبات العالية. ونعبئ الكفاءات وفق احتياجات المشروع، مع الالتزام بمعايير السلامة والجودة المطلوبة في المشاريع الكبرى بالمملكة.",
        capabilitiesHeading: "قدرات الكوادر الهندسية والفنية",
        capabilities: [
          "المهندسون والمتخصصون الفنيون",
          "فنيو التكييف والأنظمة الكهروميكانيكية",
          "الحرفيون المهرة في الأعمال المدنية والإنشاءات",
          "مشغلو المعدات الصناعية وأعمال التصنيع",
          "حرفيو التشطيبات والتجهيز الداخلي",
        ],
      },
      "operations-support": {
        tabTitle: "التشغيل والدعم الميداني",
        heading: "فرق التشغيل والصيانة والدعم الميداني",
        description:
          "نوفر فرقاً موثوقة لدعم استمرارية تشغيل المرافق ومواقع المشاريع. وتشمل خدماتنا التشغيل والصيانة والنظافة المهنية والخدمات اللوجستية للمواقع، مع الالتزام بمعايير السلامة والجودة والامتثال.",
        capabilitiesHeading: "قدرات التشغيل والدعم الميداني",
        capabilities: [
          "فرق التشغيل والصيانة (O&M)",
          "فرق النظافة والصحة العامة",
          "الخدمات اللوجستية للمواقع والدعم العام",
        ],
      },
    },
    coreCapabilitiesHeading: "قدرات توفير الكوادر الفنية",
    coreDescription:
      "في شركة تميزنا المحدودة، نقدم حلولاً متدرجة لرأس المال البشري تلبي المتطلبات الدقيقة لمشاريع البنية التحتية واسعة النطاق وتكامل الأنظمة. ويدرك فريقنا أن نجاح المشروع يحتاج إلى قوى عاملة متوازنة، من الخبراء الهندسيين إلى فرق الدعم الميداني الموثوقة. نربط بين الاحتياجات الفنية وتوفير الكفاءات من خلال كوادر معتمدة وجاهزة للعمل ضمن ثلاث فئات متخصصة. وباختيار تميزنا، تستفيد مشاريعكم من فريق يمتلك الكفاءة الفنية ويلتزم بمعايير السلامة والجودة المطلوبة في مشاريع المملكة الرائدة.",
    coreCapabilities: [
      "المهندسون والمتخصصون الفنيون",
      "فرق التشغيل والصيانة (O&M)",
      "فنيو التكييف والأنظمة الكهروميكانيكية",
      "فرق النظافة والصحة العامة",
      "الحرفيون المهرة في الأعمال المدنية والإنشاءات",
      "الحرفيون المهرة في الأعمال المدنية والإنشاءات",
      "مشغلو المعدات الصناعية وأعمال التصنيع",
      "حرفيو التشطيبات والتجهيز الداخلي",
      "الخدمات اللوجستية للمواقع والدعم العام",
    ],
    catalogHeading: "كتالوج حلول القوى العاملة",
    catalogItems: {
      "mp-cat-1": {
        title: "فرق فنية معتمدة للأنظمة الكهروميكانيكية",
        description:
          "فرق متخصصة من فنيي الكهرباء والتكييف والأجهزة، تحمل مؤهلات وشهادات مهنية موثقة.",
        badge: "المهن الفنية",
      },
      "mp-cat-2": {
        title: "فرق الإنشاءات المدنية والهياكل",
        description:
          "حدادو تسليح ونجارو قوالب وبناؤون ومشغلو معدات ثقيلة معتمدون، جاهزون للمشاريع الكبرى.",
        badge: "عمالة الإنشاءات",
      },
      "mp-cat-3": {
        title: "مسؤولو السلامة والجودة المعتمدون",
        description:
          "متخصصون ميدانيون في السلامة يضمنون الحد من الحوادث والامتثال المستمر لأنظمة العمل السعودية.",
        badge: "مسؤولو السلامة",
      },
      "mp-cat-4": {
        title: "حلول متكاملة لسكن وتنقل القوى العاملة",
        description:
          "حزم تعبئة متكاملة تشمل السكن مع الوجبات والنقل اليومي بالحافلات والتغطية الطبية ودعم الموارد البشرية.",
        badge: "الخدمات اللوجستية المتكاملة",
      },
    },
  },
  environmental: {
    name: "الخدمات البيئية",
    shortTitle: "الخدمات البيئية",
    heading: "خبرتنا في معالجة المياه والخدمات البيئية",
    description:
      "نقدم حلولاً للمياه والنفايات والاستدامة تحمي البيئة وتدعم طموحات المملكة لتحقيق الحياد الصفري، بدءاً من محطات المعالجة وإعادة التدوير وصولاً إلى الامتثال ومراقبة الانبعاثات.",
    tabHeading: "الخدمات البيئية",
    subDisciplines: {
      "water-treatment": {
        tabTitle: "معالجة المياه",
        heading: "خبرتنا في معالجة المياه",
        description:
          "نحمي أنظمة المياه في المنشآت من خلال المعالجة الكيميائية والميكانيكية المتخصصة. ونغطي دورة المياه كاملة، من تنقية مياه الشرب إلى إعادة تدوير مياه الصرف للري. كما تساعدنا المراقبة الذكية وبروتوكولات المعالجة على الحفاظ على النظافة وحماية البنية التحتية والحد من الأثر البيئي.",
        capabilitiesHeading: "قدرات معالجة المياه الأساسية",
        capabilities: [
          "تنقية مياه الشرب",
          "معالجة مياه أبراج التبريد",
          "أنظمة إعادة تدوير المياه الرمادية",
          "تكامل محطات التناضح العكسي (RO)",
          "إدارة محطات معالجة مياه الصرف الصحي (STP)",
          "ترشيح مياه المسابح والنوافير",
          "معالجة مياه الغلايات ودارات التدفئة",
          "التحليل الآلي لجودة المياه",
          "مكافحة الترسبات والتآكل",
          "أنظمة تصريف مستدامة (SuDS)",
        ],
      },
      "waste-management": {
        tabTitle: "إدارة النفايات",
        heading: "خبرتنا في إدارة النفايات والخدمات البيئية",
        description:
          "نحوّل إدارة النفايات إلى رافد للاستدامة من خلال حلول متكاملة تدعم المعايير البيئية والصحية. وتساعد تقنيات التتبع والفرز والاسترداد الذكية المنشآت على تجاوز أساليب التخلص التقليدية وتطبيق مبادئ الاقتصاد الدائري مع تقليل أثرها البيئي.",
        capabilitiesHeading: "قدرات إدارة النفايات الأساسية",
        capabilities: [
          "تكامل الحاويات الذكية وأجهزة الاستشعار",
          "أنظمة فرز النفايات من المصدر",
          "تسميد النفايات العضوية",
          "بروتوكولات النفايات الخطرة والطبية",
          "تتبع النفايات المرتبط بنظام إدارة المبنى",
          "دعم أنظمة جمع النفايات بالأنابيب الهوائية",
          "تحويل نفايات البناء والهدم عن المرادم",
          "برامج إعادة تدوير النفايات الإلكترونية",
          "إدارة مصائد الشحوم والزيوت",
          "استشارات استراتيجية الوصول إلى صفر نفايات",
        ],
      },
    },
    coreCapabilitiesHeading: "قدرات معالجة المياه وتكامل الأنظمة",
    coreCapabilities: [
      "تنقية مياه الشرب",
      "معالجة مياه أبراج التبريد",
      "أنظمة إعادة تدوير المياه الرمادية",
      "تكامل محطات التناضح العكسي (RO)",
      "إدارة محطات معالجة مياه الصرف الصحي (STP)",
      "ترشيح مياه المسابح والنوافير",
      "معالجة مياه الغلايات ودارات التدفئة",
      "التحليل الآلي لجودة المياه",
      "مكافحة الترسبات والتآكل",
      "أنظمة تصريف مستدامة (SuDS)",
    ],
    catalogHeading: "كتالوج الحلول البيئية",
    catalogItems: {
      "env-cat-1": {
        title: "محطات معالجة مياه الصرف المعيارية (MBR / MBBR)",
        description:
          "أنظمة محطات معالجة معبأة أو إنشائية تنتج مياهاً معاد تدويرها عالية النقاء لري المسطحات الخضراء والتبريد الصناعي.",
        badge: "معالجة المياه",
      },
      "env-cat-2": {
        title: "مراكز إعادة التدوير واستعادة النفايات الصناعية",
        description:
          "منشآت هندسية للفرز والمعالجة تحوّل النفايات الصناعية الصلبة إلى مواد خام قابلة لإعادة الاستخدام.",
        badge: "استعادة النفايات",
      },
      "env-cat-3": {
        title: "محطات مستمرة لرصد الانبعاثات وجودة الهواء",
        description:
          "مصفوفات مستشعرات آنية لقياس الجسيمات والمركبات العضوية المتطايرة وأكاسيد النيتروجين وغازات الدفيئة، مع إرسال مباشر للبيانات إلى أنظمة الرصد البيئي.",
        badge: "الرصد البيئي",
      },
      "env-cat-4": {
        title: "مواقف ومصفوفات ألواح شمسية للمباني التجارية",
        description:
          "أنظمة كهروضوئية متصلة بالشبكة تقلل البصمة الكربونية وتنتج كهرباء نظيفة في موقع المنشأة.",
        badge: "الطاقة المتجددة",
      },
    },
  },
};

export function getLocalizedService(
  service: ServiceItemData,
  isRtl: boolean
): ServiceItemData {
  const arabic = isRtl ? SERVICES_ARABIC[service.id] : undefined;
  if (!arabic) return service;

  return {
    ...service,
    name: arabic.name,
    shortTitle: arabic.shortTitle,
    heading: arabic.heading,
    description: arabic.description,
    coreCapabilitiesHeading:
      arabic.coreCapabilitiesHeading ?? service.coreCapabilitiesHeading,
    coreDescription: arabic.coreDescription ?? service.coreDescription,
    coreCapabilities: arabic.coreCapabilities ?? service.coreCapabilities,
    catalogHeading: arabic.catalogHeading,
    tabHeading: arabic.tabHeading ?? service.tabHeading,
    subDisciplines: service.subDisciplines?.map((discipline) => ({
      ...discipline,
      ...arabic.subDisciplines?.[discipline.id],
    })),
    catalogItems: service.catalogItems.map((item) => ({
      ...item,
      ...arabic.catalogItems[item.id],
    })),
  };
}
