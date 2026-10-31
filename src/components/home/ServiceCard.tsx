import {
  BuildingComplex,
  Cpu,
  Sprout,
  Users,
  WrenchOff,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface ServiceItem {
  key: "service1" | "service2" | "service3" | "service4" | "service5";
  icon: LucideIcon;
  barHoverClass: string;
  iconBgClass: string;
  href: string;
}

const SERVICES: ServiceItem[] = [
  {
    key: "service1",
    icon: Cpu,
    barHoverClass: "lg:group-hover:bg-primary",
    iconBgClass: "bg-primary",
    href: "/service/systems-integration",
  },
  {
    key: "service2",
    icon: BuildingComplex,
    barHoverClass: "lg:group-hover:bg-secondary",
    iconBgClass: "bg-secondary",
    href: "/service/construction",
  },
  {
    key: "service3",
    icon: WrenchOff,
    barHoverClass: "lg:group-hover:bg-light-black",
    iconBgClass: "bg-light-black",
    href: "/service/facility-services",
  },
  {
    key: "service4",
    icon: Users,
    barHoverClass: "lg:group-hover:bg-[#B049F4]",
    iconBgClass: "bg-[#B049F4]",
    href: "/service/manpower",
  },
  {
    key: "service5",
    icon: Sprout,
    barHoverClass: "lg:group-hover:bg-[#21C697]",
    iconBgClass: "bg-[#21C697]",
    href: "/service/environmental",
  },
];

export default function ServiceCard() {
  const t = useTranslations("Service");

  return (
    <div className="w-full mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 md:gap-y-0">
      {SERVICES.map(({ key, icon: Icon, barHoverClass, iconBgClass, href }) => (
        <Link
          key={key}
          href={href}
          className="group w-full lg:hover:shadow-[inset_0_0_30px_rgba(0,0,0,0.06)] duration-400 transition-all cursor-pointer h-64 border md:border-s-0 md:border-t-0 border-gray-100 flex justify-between items-start flex-col p-8"
        >
          <div className="w-full">
            <div
              className={`w-[15%] ${barHoverClass} duration-400 transition-all rounded-full h-1 bg-gray-400/30 mb-5`}
            />

            <h3 className="text-3xl lg:text-4xl font-medium text-light-black">
              {t(key)}
            </h3>
          </div>

          <div className="flex relative justify-end items-center w-full">
            <div
              className={`w-15 h-15  absolute -top-6 rotate-45 flex items-center ${iconBgClass} justify-center transition-all end-0`}
            >
              <Icon
                className="text-white -rotate-45"
                size={32}
                strokeWidth={1}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
