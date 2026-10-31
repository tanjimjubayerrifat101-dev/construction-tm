
import { MoveRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ComponentProps } from "react";

type ButtonProps = {
  text: string;
  href: ComponentProps<typeof Link>["href"];
};

export default function Button({ text, href }: ButtonProps) {
  return (
    <Link
      href={href}
      className="flex group justify-center items-center gap-x-3"
    >
      <p className="text-white text-[18px] sm:text-xl">{text}</p>

      <MoveRight className="text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all duration-200" />
    </Link>
  );
}