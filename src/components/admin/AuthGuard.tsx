"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const locale = useLocale();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const localToken = typeof window !== "undefined" ? localStorage.getItem("adminAccessToken") : null;

    if (!isAuthenticated && !localToken) {
      router.replace(`/${locale}/admin/login`);
    } else {
      setChecking(false);
    }
  }, [isAuthenticated, token, router, locale]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#001833] flex flex-col items-center justify-center gap-4 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#0086ff]" />
        <p className="text-sm font-semibold tracking-wider text-slate-300">
          Verifying Admin Authorization...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
