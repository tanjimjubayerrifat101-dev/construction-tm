"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Modal from "@/components/admin/Modal";
import ConfirmationModal, {
  ConfirmationType,
} from "@/components/admin/ConfirmationModal";
import { useToast, ToastContainer } from "@/components/admin/Toast";
import {
  useCreateJobMutation,
  useDeleteJobMutation,
  useGetJobsQuery,
  useUpdateJobMutation,
} from "@/redux/features/career/careerApi";
import { IJobPositionItem } from "@/redux/features/career/careerTypes";
import {
  Plus,
  Search,
  Briefcase,
  Edit2,
  Trash2,
  Loader2,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  ListPlus,
  Trash,
} from "lucide-react";

export default function AdminCareersPage() {
  const { toasts, toast, removeToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetJobsQuery({ searchTerm });

  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: ConfirmationType;
    title: string;
    message: string;
    onConfirm: () => Promise<void> | void;
  } | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<IJobPositionItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    jobId: "",
    titleEn: "",
    titleAr: "",
    departmentId: "systems-integration",
    departmentEn: "Systems Integration",
    departmentAr: "تكامل الأنظمة",
    locationEn: "Riyadh, Saudi Arabia",
    locationAr: "الرياض، المملكة العربية السعودية",
    typeEn: "Full-time",
    typeAr: "دوام كامل",
    experienceEn: "8+ years",
    experienceAr: "+٨ سنوات",
    postedDate: new Date().toISOString().split("T")[0],
    icon: "Briefcase",
    overviewEn: "",
    overviewAr: "",
    responsibilitiesEn: ["Lead end-to-end MEP and systems integration packages."],
    responsibilitiesAr: ["قيادة حزم تكامل الأنظمة الكهروميكانيكية بالكامل."],
    educationEn: ["Bachelor's Degree in Electrical / Mechanical Engineering."],
    educationAr: ["درجة البكالوريوس في الهندسة الكهربائية أو الميكانيكية."],
    reqExperienceEn: ["Minimum 8 years in commercial or infrastructure projects."],
    reqExperienceAr: ["خبرة لا تقل عن 8 سنوات في المشاريع التجارية أو البنية التحتية."],
    licensingEn: ["SCE Accreditation (Saudi Council of Engineers)."],
    licensingAr: ["اعتماد الهيئة السعودية للمهندسين."],
    isActive: true,
  });

  const openCreateModal = () => {
    setEditingJob(null);
    setFormData({
      jobId: "",
      titleEn: "",
      titleAr: "",
      departmentId: "systems-integration",
      departmentEn: "Systems Integration",
      departmentAr: "تكامل الأنظمة",
      locationEn: "Riyadh, Saudi Arabia",
      locationAr: "الرياض، المملكة العربية السعودية",
      typeEn: "Full-time",
      typeAr: "دوام كامل",
      experienceEn: "8+ years",
      experienceAr: "+٨ سنوات",
      postedDate: new Date().toISOString().split("T")[0],
      icon: "Briefcase",
      overviewEn: "",
      overviewAr: "",
      responsibilitiesEn: [""],
      responsibilitiesAr: [""],
      educationEn: [""],
      educationAr: [""],
      reqExperienceEn: [""],
      reqExperienceAr: [""],
      licensingEn: [""],
      licensingAr: [""],
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (job: IJobPositionItem) => {
    setEditingJob(job);
    setFormData({
      jobId: job.jobId,
      titleEn: job.title?.en || "",
      titleAr: job.title?.ar || "",
      departmentId: job.departmentId,
      departmentEn: job.department?.en || "Systems Integration",
      departmentAr: job.department?.ar || "تكامل الأنظمة",
      locationEn: job.location?.en || "",
      locationAr: job.location?.ar || "",
      typeEn: job.type?.en || "Full-time",
      typeAr: job.type?.ar || "دوام كامل",
      experienceEn: job.experience?.en || "8+ years",
      experienceAr: job.experience?.ar || "+٨ سنوات",
      postedDate: job.postedDate || new Date().toISOString().split("T")[0],
      icon: job.icon || "Briefcase",
      overviewEn: job.overview?.en || "",
      overviewAr: job.overview?.ar || "",
      responsibilitiesEn: job.responsibilities?.en?.length ? job.responsibilities.en : [""],
      responsibilitiesAr: job.responsibilities?.ar?.length ? job.responsibilities.ar : [""],
      educationEn: job.requirements?.education?.en?.length ? job.requirements.education.en : [""],
      educationAr: job.requirements?.education?.ar?.length ? job.requirements.education.ar : [""],
      reqExperienceEn: job.requirements?.experience?.en?.length ? job.requirements.experience.en : [""],
      reqExperienceAr: job.requirements?.experience?.ar?.length ? job.requirements.experience.ar : [""],
      licensingEn: job.requirements?.licensing?.en?.length ? job.requirements.licensing.en : [""],
      licensingAr: job.requirements?.licensing?.ar?.length ? job.requirements.licensing.ar : [""],
      isActive: job.isActive !== false,
    });
    setModalOpen(true);
  };

  type ArrayField =
    | "responsibilitiesEn"
    | "responsibilitiesAr"
    | "educationEn"
    | "educationAr"
    | "reqExperienceEn"
    | "reqExperienceAr"
    | "licensingEn"
    | "licensingAr";

  // Helper to handle dynamic array modifications
  // Uses functional setState to avoid stale-closure overwrites when called in sequence
  const handleArrayChange = (
    field: ArrayField,
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addArrayItem = (field: ArrayField) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field: ArrayField, index: number) => {
    setFormData((prev) => {
      const updated = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: updated.length ? updated : [""] };
    });
  };

  const executeSaveJob = async () => {
    const payload = {
      jobId:
        formData.jobId ||
        formData.titleEn.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
      title: { en: formData.titleEn, ar: formData.titleAr },
      departmentId: formData.departmentId as any,
      department: { en: formData.departmentEn, ar: formData.departmentAr },
      location: { en: formData.locationEn, ar: formData.locationAr },
      type: { en: formData.typeEn, ar: formData.typeAr },
      experience: { en: formData.experienceEn, ar: formData.experienceAr },
      postedDate: formData.postedDate,
      icon: formData.icon,
      overview: { en: formData.overviewEn, ar: formData.overviewAr },
      responsibilities: {
        en: formData.responsibilitiesEn.filter((s) => s.trim() !== ""),
        ar: formData.responsibilitiesAr.filter((s) => s.trim() !== ""),
      },
      requirements: {
        education: {
          en: formData.educationEn.filter((s) => s.trim() !== ""),
          ar: formData.educationAr.filter((s) => s.trim() !== ""),
        },
        experience: {
          en: formData.reqExperienceEn.filter((s) => s.trim() !== ""),
          ar: formData.reqExperienceAr.filter((s) => s.trim() !== ""),
        },
        licensing: {
          en: formData.licensingEn.filter((s) => s.trim() !== ""),
          ar: formData.licensingAr.filter((s) => s.trim() !== ""),
        },
      },
      isActive: formData.isActive,
    };

    try {
      if (editingJob) {
        await updateJob({ id: editingJob._id, data: payload }).unwrap();
        toast({
          title: "Job Position Updated",
          message: `"${formData.titleEn || "Job Position"}" has been updated successfully.`,
          type: "success",
        });
      } else {
        await createJob(payload).unwrap();
        toast({
          title: "Job Opening Created",
          message: `"${formData.titleEn || "New Job Opening"}" has been posted successfully.`,
          type: "success",
        });
      }
      setModalOpen(false);
      setConfirmModal(null);
    } catch (err: any) {
      toast({
        title: "Failed to Save Job Opening",
        message:
          err?.data?.message ||
          err?.message ||
          "An error occurred while saving the job position.",
        type: "error",
      });
      setConfirmModal(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = Boolean(editingJob);
    setConfirmModal({
      isOpen: true,
      type: isEditing ? "update" : "create",
      title: isEditing ? "Confirm Job Update" : "Confirm Job Creation",
      message: isEditing
        ? `Save changes to "${formData.titleEn || "this job"}"?`
        : `Post new job opening "${formData.titleEn || "New Job"}"?`,
      onConfirm: executeSaveJob,
    });
  };

  const confirmDeleteJob = (job: IJobPositionItem) => {
    setConfirmModal({
      isOpen: true,
      type: "delete",
      title: "Delete Job Opening",
      message: `Permanently delete "${job.title?.en}"? This vacancy will be removed from the public Careers list.`,
      onConfirm: async () => {
        try {
          await deleteJob(job._id).unwrap();
          toast({
            title: "Job Deleted",
            message: `"${job.title?.en}" has been removed from the Careers list.`,
            type: "success",
          });
        } catch (err: any) {
          toast({
            title: "Failed to Delete Job",
            message:
              err?.data?.message ||
              err?.message ||
              "Could not delete this job position.",
            type: "error",
          });
        }
        setConfirmModal(null);
      },
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Careers & Job Openings
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage vacancies, multiple bullet-point responsibilities, and qualifications
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#004187] to-[#0086ff] text-white font-bold text-xs shadow-md shadow-[#0086ff]/25 hover:opacity-95 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search job title or department..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0086ff]"
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#0086ff]" />
              <p className="text-xs font-semibold">Loading Careers...</p>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4">Job Title (EN / AR)</th>
                    <th className="py-3.5 px-4">Department</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4 text-center">Responsibilities</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {data.data.map((job) => (
                    <tr key={job._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{job.title?.en}</p>
                        <p className="text-[11px] text-slate-500" dir="rtl">
                          {job.title?.ar}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {job.department?.en}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span>{job.location?.en}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
                          {job.responsibilities?.en?.length || 0} bullets
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {job.isActive !== false ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-400 font-bold text-[11px]">
                            <XCircle className="w-3.5 h-3.5" /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(job)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-[#0086ff] hover:bg-sky-50 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDeleteJob(job)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Briefcase className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">No job openings found.</p>
              <button
                onClick={openCreateModal}
                className="text-xs font-bold text-[#0086ff] hover:underline cursor-pointer"
              >
                Post your first job vacancy
              </button>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingJob ? "Edit Job Opening" : "Create Job Opening"}
          subtitle="Add key responsibilities and qualifications dynamically as multiple bullet items"
          maxWidth="4xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5 text-sm sm:text-base">
            {/* Title EN / AR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Job Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                  placeholder="Senior Systems Integration Engineer"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Job Title (Arabic) *
                </label>
                <input
                  type="text"
                  required
                  dir="rtl"
                  value={formData.titleAr}
                  onChange={(e) =>
                    setFormData({ ...formData, titleAr: e.target.value })
                  }
                  placeholder="مهندس تكامل أنظمة أول"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Department & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Department *
                </label>
                <select
                  value={formData.departmentId}
                  onChange={(e) => {
                    const id = e.target.value;
                    const deptMap: Record<string, { en: string; ar: string }> = {
                      "systems-integration": { en: "Systems Integration", ar: "تكامل الأنظمة" },
                      construction: { en: "Construction", ar: "البناء والمقاولات" },
                      "facility-services": { en: "Facility Services", ar: "خدمات المرافق" },
                      environmental: { en: "Environmental", ar: "الحلول البيئية" },
                      manpower: { en: "Manpower", ar: "القوى العاملة" },
                    };
                    setFormData({
                      ...formData,
                      departmentId: id,
                      departmentEn: deptMap[id]?.en || "Systems Integration",
                      departmentAr: deptMap[id]?.ar || "تكامل الأنظمة",
                    });
                  }}
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all cursor-pointer"
                >
                  <option value="systems-integration">Systems Integration</option>
                  <option value="construction">Construction</option>
                  <option value="facility-services">Facility Services</option>
                  <option value="environmental">Environmental</option>
                  <option value="manpower">Manpower</option>
                </select>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Location (English) *
                </label>
                <input
                  type="text"
                  value={formData.locationEn}
                  onChange={(e) =>
                    setFormData({ ...formData, locationEn: e.target.value })
                  }
                  placeholder="Riyadh, Saudi Arabia"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Location (Arabic) *
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={formData.locationAr}
                  onChange={(e) =>
                    setFormData({ ...formData, locationAr: e.target.value })
                  }
                  placeholder="الرياض، المملكة العربية السعودية"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Overview / Job Purpose */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Job Purpose / Overview (English) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.overviewEn}
                  onChange={(e) =>
                    setFormData({ ...formData, overviewEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Job Purpose / Overview (Arabic) *
                </label>
                <textarea
                  rows={2}
                  required
                  dir="rtl"
                  value={formData.overviewAr}
                  onChange={(e) =>
                    setFormData({ ...formData, overviewAr: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* ── Key Responsibilities (Dynamic Array) ── */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Key Responsibilities (Multiple Items Array)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Add each responsibility point as a separate bullet in English and Arabic
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addArrayItem("responsibilitiesEn");
                      addArrayItem("responsibilitiesAr");
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#004187] text-white font-bold text-xs sm:text-sm cursor-pointer hover:opacity-90 transition-all"
                  >
                    <ListPlus className="w-4 h-4" />
                    <span>+ Add Point</span>
                  </button>
                </div>
              </div>

              {formData.responsibilitiesEn.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="w-6 text-slate-400 font-bold text-sm sm:text-base">{idx + 1}.</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleArrayChange("responsibilitiesEn", idx, e.target.value)
                    }
                    placeholder={`Responsibility in English #${idx + 1}`}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm sm:text-base focus:outline-none focus:border-[#0086ff] transition-all"
                  />
                  <input
                    type="text"
                    dir="rtl"
                    value={formData.responsibilitiesAr[idx] || ""}
                    onChange={(e) =>
                      handleArrayChange("responsibilitiesAr", idx, e.target.value)
                    }
                    placeholder={`المسؤولية بالعربية #${idx + 1}`}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm sm:text-base focus:outline-none focus:border-[#0086ff] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      removeArrayItem("responsibilitiesEn", idx);
                      removeArrayItem("responsibilitiesAr", idx);
                    }}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 cursor-pointer transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* ── Requirements: Education & Qualifications ── */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Education & Professional Requirements (Array)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500">Degree, certificates, or education requirements</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addArrayItem("educationEn");
                    addArrayItem("educationAr");
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-700 text-white font-bold text-xs sm:text-sm cursor-pointer hover:opacity-90 transition-all"
                >
                  <ListPlus className="w-4 h-4" />
                  <span>+ Add Education</span>
                </button>
              </div>

              {formData.educationEn.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span className="w-6 text-slate-400 font-bold text-sm sm:text-base">{idx + 1}.</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleArrayChange("educationEn", idx, e.target.value)
                    }
                    placeholder="e.g. Bachelor's in Civil Engineering"
                    className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm sm:text-base focus:outline-none focus:border-[#0086ff] transition-all"
                  />
                  <input
                    type="text"
                    dir="rtl"
                    value={formData.educationAr[idx] || ""}
                    onChange={(e) =>
                      handleArrayChange("educationAr", idx, e.target.value)
                    }
                    placeholder="مثال: بكالوريوس في الهندسة المدنية"
                    className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm sm:text-base focus:outline-none focus:border-[#0086ff] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      removeArrayItem("educationEn", idx);
                      removeArrayItem("educationAr", idx);
                    }}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 cursor-pointer transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-3 rounded-xl text-sm sm:text-base text-slate-600 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#004187] to-[#0086ff] text-white text-sm sm:text-base font-bold shadow-md shadow-[#0086ff]/25 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {(isCreating || isUpdating) && (
                  <Loader2 className="w-5 h-5 animate-spin" />
                )}
                <span>{editingJob ? "Update Job" : "Post Job Opening"}</span>
              </button>
            </div>
          </form>
        </Modal>

        {/* Confirmation Modal for Create, Update, Delete */}
        {confirmModal && (
          <ConfirmationModal
            isOpen={confirmModal.isOpen}
            onClose={() => setConfirmModal(null)}
            onConfirm={confirmModal.onConfirm}
            title={confirmModal.title}
            message={confirmModal.message}
            type={confirmModal.type}
            isLoading={isCreating || isUpdating || isDeleting}
          />
        )}

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    </AdminLayout>
  );
}
