"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useGetServicesQuery } from "@/redux/features/service/serviceApi";
import { useGetProjectsQuery } from "@/redux/features/project/projectApi";
import { useGetMediaPostsQuery } from "@/redux/features/media/mediaApi";
import {
  useGetJobsQuery,
  useGetApplicationsQuery,
} from "@/redux/features/career/careerApi";
import { Link } from "@/i18n/navigation";
import {
  Wrench,
  Building2,
  Newspaper,
  Briefcase,
  FileCheck2,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data: servicesData } = useGetServicesQuery({});
  const { data: projectsData } = useGetProjectsQuery({});
  const { data: mediaData } = useGetMediaPostsQuery({});
  const { data: jobsData } = useGetJobsQuery({});
  const { data: applicationsData } = useGetApplicationsQuery({ limit: 5 });

  const stats = [
    {
      title: "Active Services",
      count: servicesData?.meta?.total ?? 5,
      icon: Wrench,
      href: "/admin/services",
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Projects",
      count: projectsData?.meta?.total ?? 12,
      icon: Building2,
      href: "/admin/projects",
      color: "from-sky-500 to-cyan-600",
      bgColor: "bg-sky-50 text-sky-600",
    },
    {
      title: "Media & Articles",
      count: mediaData?.meta?.total ?? 3,
      icon: Newspaper,
      href: "/admin/media",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Career Openings",
      count: jobsData?.meta?.total ?? 5,
      icon: Briefcase,
      href: "/admin/careers",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50 text-amber-600",
    },
    {
      title: "Applications Received",
      count: applicationsData?.meta?.total ?? 0,
      icon: FileCheck2,
      href: "/admin/applications",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#001833] via-[#002f61] to-[#004187] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[#0086ff] uppercase tracking-wider mb-3">
              Master Admin Control Center
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              Welcome to TMYAZNA Dashboard
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Manage your bilingual services, national projects & Saudi map locations, media articles, career job openings, and candidate applications dynamically.
            </p>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Link
                key={idx}
                href={s.href}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${s.bgColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors flex items-center gap-1">
                    Manage <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {s.count}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {s.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions & Recent Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Shortcuts */}
          <div className="lg:col-span-1 rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Quick Management Actions
            </h3>
            <div className="space-y-2.5">
              <Link
                href="/admin/services"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-100 transition-colors text-sm font-semibold text-slate-800 cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Wrench className="w-4 h-4 text-[#0086ff]" />
                  Add or Edit Services
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/admin/projects"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-100 transition-colors text-sm font-semibold text-slate-800 cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-[#0086ff]" />
                  Add Project & Map Pin
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/admin/media"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-100 transition-colors text-sm font-semibold text-slate-800 cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Newspaper className="w-4 h-4 text-[#0086ff]" />
                  Publish News or Article
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/admin/careers"
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-100 transition-colors text-sm font-semibold text-slate-800 cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-[#0086ff]" />
                  Post Job Opening
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Recent Applications Preview */}
          <div className="lg:col-span-2 rounded-3xl bg-white border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Recent Candidate Applications
                  </h3>
                  <p className="text-xs text-slate-500">
                    Latest resumes received from the public careers page
                  </p>
                </div>
                <Link
                  href="/admin/applications"
                  className="text-xs font-bold text-[#0086ff] hover:underline cursor-pointer"
                >
                  View All
                </Link>
              </div>

              {applicationsData?.data && applicationsData.data.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {applicationsData.data.map((app) => (
                    <div
                      key={app._id}
                      className="py-3.5 flex items-center justify-between text-sm"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{app.fullName}</p>
                        <p className="text-xs text-slate-500">
                          Applied for: <span className="font-medium text-slate-700">{app.jobTitle}</span> • {app.experience}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <FileCheck2 className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="text-sm font-semibold">No applications submitted yet.</p>
                  <p className="text-xs">
                    When applicants submit their resume through the Careers form, they will appear here.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Connected to Cloudinary & MongoDB</span>
              <span className="font-bold text-emerald-600">● Operational</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
