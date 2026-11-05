"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import {
  LayoutDashboard,
  Wrench,
  Building2,
  Newspaper,
  Briefcase,
  FileCheck2,
  UserCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import AuthGuard from "./AuthGuard";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Wrench,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: Building2,
  },
  {
    label: "Media Center",
    href: "/admin/media",
    icon: Newspaper,
  },
  {
    label: "Careers",
    href: "/admin/careers",
    icon: Briefcase,
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: FileCheck2,
  },
  {
    label: "Admin Profile",
    href: "/admin/profile",
    icon: UserCheck,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push(`/${locale}/admin/login`);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f4f7fb] text-slate-800 flex" dir="ltr">
        {/* Mobile Backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#001833] text-white flex flex-col border-r border-white/10
            transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
            ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* Logo Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-white/10 bg-[#001329]">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#004187] to-[#0086ff] flex items-center justify-center font-black text-white text-base shadow-md">
                TM
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-white">
                  TMYAZNA
                </h1>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0086ff]">
                  Admin Dashboard
                </p>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white lg:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <div className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Management Portal
            </div>

            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer
                    ${
                      isActive
                        ? "bg-[#004187] text-white shadow-md shadow-[#004187]/40 font-bold"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-[#0086ff]" : "text-slate-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-5 h-5 opacity-80" />}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/10 bg-[#001329] space-y-2.5">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Public Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-sm font-bold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <header className="h-20 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 -ml-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex items-center gap-2.5 text-sm font-bold text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Admin Console</span>
              </div>
            </div>

            {/* Profile Pill */}
            <div className="flex items-center gap-4">
              <Link
                href="/admin/profile"
                className="flex items-center gap-3.5 p-2 pr-4 rounded-full hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200/60"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#004187] to-[#0086ff] text-white flex items-center justify-center font-bold text-base shadow-xs">
                  {user?.avatar?.url ? (
                    <img
                      src={user.avatar.url}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user?.name?.charAt(0)?.toUpperCase() || "A"
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 leading-tight">
                    {user?.name || "Super Admin"}
                  </p>
                  <p className="text-xs font-semibold text-slate-500">{user?.email || "admin@tmyazna.com"}</p>
                </div>
              </Link>
            </div>
          </header>

          {/* Dynamic Page Content */}
          <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
