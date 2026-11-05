"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Modal from "@/components/admin/Modal";
import ConfirmationModal, {
  ConfirmationType,
} from "@/components/admin/ConfirmationModal";
import { useToast, ToastContainer } from "@/components/admin/Toast";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "@/redux/features/project/projectApi";
import { IProjectItem } from "@/redux/features/project/projectTypes";
import { resolveImageUrl } from "@/utils/resolveImageUrl";
import {
  Plus,
  Search,
  Building2,
  Edit2,
  Trash2,
  Loader2,
  MapPin,
  CheckCircle2,
  Clock,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";

const SAUDI_REGIONS = [
  { id: "riyadh", name: "Riyadh Region (الرياض)" },
  { id: "makkah", name: "Makkah Region (مكة المكرمة)" },
  { id: "eastern-province", name: "Eastern Province (المنطقة الشرقية)" },
  { id: "madinah", name: "Madinah Region (المدينة المنورة)" },
  { id: "tabuk", name: "Tabuk Region · NEOM (تبوك · نيوم)" },
  { id: "al-qassim", name: "Al Qassim (القصيم)" },
  { id: "asir", name: "Asir Region (عسير)" },
  { id: "hail", name: "Hail Region (حائل)" },
  { id: "northern-borders", name: "Northern Borders (الحدود الشمالية)" },
  { id: "jazan", name: "Jazan Region (جازان)" },
  { id: "najran", name: "Najran Region (نجران)" },
  { id: "al-bahah", name: "Al Bahah (الباحة)" },
  { id: "al-jawf", name: "Al Jawf (الجوف)" },
];

export default function AdminProjectsPage() {
  const { toasts, toast, removeToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const { data, isLoading } = useGetProjectsQuery({
    searchTerm,
    sectorSlug: sectorFilter === "all" ? undefined : sectorFilter,
  });

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: ConfirmationType;
    title: string;
    message: string;
    onConfirm: () => Promise<void> | void;
  } | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<IProjectItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    projectId: "",
    titleEn: "",
    titleAr: "",
    sectorEn: "Systems Integration",
    sectorAr: "تكامل الأنظمة",
    sectorSlug: "systems-integration",
    statusEn: "Ongoing",
    statusAr: "قيد التنفيذ",
    statusCode: "Ongoing" as "Ongoing" | "Completed" | "Planning",
    locationEn: "Riyadh Region",
    locationAr: "منطقة الرياض",
    regionId: "riyadh",
    descriptionEn: "",
    descriptionAr: "",
    valueEn: "SAR 150M",
    valueAr: "١٥٠ مليون ريال",
    year: "2026",
    progress: 75,
    isFlagship: false,
    order: 0,
    isActive: true,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      projectId: `proj-${(data?.data?.length || 0) + 1}`,
      titleEn: "",
      titleAr: "",
      sectorEn: "Systems Integration",
      sectorAr: "تكامل الأنظمة",
      sectorSlug: "systems-integration",
      statusEn: "Ongoing",
      statusAr: "قيد التنفيذ",
      statusCode: "Ongoing",
      locationEn: "Riyadh Region",
      locationAr: "منطقة الرياض",
      regionId: "riyadh",
      descriptionEn: "",
      descriptionAr: "",
      valueEn: "SAR 100M",
      valueAr: "١٠٠ مليون ريال",
      year: new Date().getFullYear().toString(),
      progress: 60,
      isFlagship: false,
      order: (data?.data?.length || 0) + 1,
      isActive: true,
    });
    setSelectedFile(null);
    setModalOpen(true);
  };

  const openEditModal = (project: IProjectItem) => {
    setEditingProject(project);
    setFormData({
      projectId: project.projectId,
      titleEn: project.title?.en || "",
      titleAr: project.title?.ar || "",
      sectorEn: project.sector?.en || "",
      sectorAr: project.sector?.ar || "",
      sectorSlug: project.sectorSlug,
      statusEn: project.status?.en || "Ongoing",
      statusAr: project.status?.ar || "قيد التنفيذ",
      statusCode: project.statusCode || "Ongoing",
      locationEn: project.location?.en || "",
      locationAr: project.location?.ar || "",
      regionId: project.regionId || "riyadh",
      descriptionEn: project.description?.en || "",
      descriptionAr: project.description?.ar || "",
      valueEn: project.value?.en || "",
      valueAr: project.value?.ar || "",
      year: project.year || "2026",
      progress: project.progress || 0,
      isFlagship: project.isFlagship || false,
      order: project.order || 0,
      isActive: project.isActive !== false,
    });
    setSelectedFile(null);
    setModalOpen(true);
  };

  const executeSaveProject = async () => {
    const payload = {
      projectId: formData.projectId,
      title: { en: formData.titleEn, ar: formData.titleAr },
      sector: { en: formData.sectorEn, ar: formData.sectorAr },
      sectorSlug: formData.sectorSlug,
      status: { en: formData.statusEn, ar: formData.statusAr },
      statusCode: formData.statusCode,
      location: { en: formData.locationEn, ar: formData.locationAr },
      regionId: formData.regionId,
      description: { en: formData.descriptionEn, ar: formData.descriptionAr },
      value: { en: formData.valueEn, ar: formData.valueAr },
      year: formData.year,
      progress: Number(formData.progress),
      isFlagship: formData.isFlagship,
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    const form = new FormData();
    form.append("data", JSON.stringify(payload));
    if (selectedFile) {
      form.append("image", selectedFile);
    } else if (editingProject?.image) {
      form.append(
        "data",
        JSON.stringify({ ...payload, image: editingProject.image })
      );
    }

    try {
      if (editingProject) {
        await updateProject({ id: editingProject._id, data: form }).unwrap();
        toast({
          title: "Project Updated Successfully",
          message: `"${formData.titleEn || "Project"}" has been updated.`,
          type: "success",
        });
      } else {
        await createProject(form).unwrap();
        toast({
          title: "Project Created Successfully",
          message: `"${formData.titleEn || "New Project"}" has been created.`,
          type: "success",
        });
      }
      setModalOpen(false);
      setConfirmModal(null);
    } catch (err: any) {
      toast({
        title: "Failed to Save Project",
        message:
          err?.data?.message ||
          err?.message ||
          "An error occurred while saving the project.",
        type: "error",
      });
      setConfirmModal(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = Boolean(editingProject);
    setConfirmModal({
      isOpen: true,
      type: isEditing ? "update" : "create",
      title: isEditing ? "Confirm Project Update" : "Confirm Project Creation",
      message: isEditing
        ? `Save changes to "${formData.titleEn || "this project"}"?`
        : `Create new project "${formData.titleEn || "New Project"}"?`,
      onConfirm: executeSaveProject,
    });
  };

  const confirmDeleteProject = (project: IProjectItem) => {
    setConfirmModal({
      isOpen: true,
      type: "delete",
      title: "Delete Project",
      message: `Permanently delete "${project.title?.en}"? This will also remove its location pin from the Saudi presence map.`,
      onConfirm: async () => {
        try {
          await deleteProject(project._id).unwrap();
          toast({
            title: "Project Deleted",
            message: `"${project.title?.en}" has been permanently deleted.`,
            type: "success",
          });
        } catch (err: any) {
          toast({
            title: "Failed to Delete Project",
            message:
              err?.data?.message ||
              err?.message ||
              "Could not delete this project.",
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
              Projects & Saudi Presence Map
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage national megaprojects and dynamic location mapping across the Kingdom's 13 regions
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#004187] to-[#0086ff] text-white font-bold text-xs shadow-md shadow-[#0086ff]/25 hover:opacity-95 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects by name, location, or code..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0086ff] focus:ring-1 focus:ring-[#0086ff]"
            />
          </div>

          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0086ff] cursor-pointer"
          >
            <option value="all">All Business Sectors</option>
            <option value="systems-integration">Systems Integration</option>
            <option value="construction">Construction</option>
            <option value="facility-services">Facility Services</option>
            <option value="manpower">Manpower</option>
            <option value="environmental">Environmental</option>
          </select>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#0086ff]" />
              <p className="text-xs font-semibold">Loading Projects...</p>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4">Image</th>
                    <th className="py-3.5 px-4">Project Title (EN / AR)</th>
                    <th className="py-3.5 px-4">Sector</th>
                    <th className="py-3.5 px-4">Region (Map Pin)</th>
                    <th className="py-3.5 px-4 text-center">Progress</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {data.data.map((project) => (
                    <tr
                      key={project._id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="w-12 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 relative">
                          {resolveImageUrl(project.image) ? (
                            <img
                              src={resolveImageUrl(project.image)}
                              alt={project.title?.en}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-slate-400 absolute inset-0 m-auto" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900">{project.title?.en}</p>
                          {project.isFlagship && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 text-amber-800">
                              Flagship
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500" dir="rtl">
                          {project.title?.ar}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {project.sector?.en}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="capitalize">{project.regionId?.replace("-", " ")}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#004187] to-[#0086ff] rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="font-bold text-[11px] text-slate-800">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`
                            px-2 py-0.5 rounded-full text-[10px] font-bold border
                            ${
                              project.statusCode === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : project.statusCode === "Ongoing"
                                ? "bg-sky-50 text-sky-700 border-sky-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                          `}
                        >
                          {project.statusCode}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(project)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-[#0086ff] hover:bg-sky-50 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDeleteProject(project)}
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
              <Building2 className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">No projects found.</p>
              <button
                onClick={openCreateModal}
                className="text-xs font-bold text-[#0086ff] hover:underline cursor-pointer"
              >
                Create your first project
              </button>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingProject ? "Edit Project" : "Add New Project"}
          subtitle="Configure location, Saudi map pin, sector, and completion progress"
          maxWidth="3xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5 text-sm sm:text-base">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Project Code / ID *
                </label>
                <input
                  type="text"
                  required
                  value={formData.projectId}
                  onChange={(e) =>
                    setFormData({ ...formData, projectId: e.target.value })
                  }
                  placeholder="proj-1"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Saudi Region (Map Pin) *
                </label>
                <select
                  value={formData.regionId}
                  onChange={(e) =>
                    setFormData({ ...formData, regionId: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all cursor-pointer"
                >
                  {SAUDI_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Sector *
                </label>
                <select
                  value={formData.sectorSlug}
                  onChange={(e) => {
                    const slug = e.target.value;
                    const sectorMap: Record<string, { en: string; ar: string }> = {
                      "systems-integration": { en: "Systems Integration", ar: "تكامل الأنظمة" },
                      construction: { en: "Construction", ar: "البناء والمقاولات" },
                      "facility-services": { en: "Facility Services", ar: "خدمات المرافق" },
                      manpower: { en: "Manpower", ar: "القوى العاملة" },
                      environmental: { en: "Environmental", ar: "الحلول البيئية" },
                    };
                    setFormData({
                      ...formData,
                      sectorSlug: slug,
                      sectorEn: sectorMap[slug]?.en || "Systems Integration",
                      sectorAr: sectorMap[slug]?.ar || "تكامل الأنظمة",
                    });
                  }}
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all cursor-pointer"
                >
                  <option value="systems-integration">Systems Integration</option>
                  <option value="construction">Construction</option>
                  <option value="facility-services">Facility Services</option>
                  <option value="manpower">Manpower</option>
                  <option value="environmental">Environmental</option>
                </select>
              </div>
            </div>

            {/* Title EN / AR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.titleEn}
                  onChange={(e) =>
                    setFormData({ ...formData, titleEn: e.target.value })
                  }
                  placeholder="King Salman Park MEP Systems"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Title (Arabic) *
                </label>
                <input
                  type="text"
                  required
                  dir="rtl"
                  value={formData.titleAr}
                  onChange={(e) =>
                    setFormData({ ...formData, titleAr: e.target.value })
                  }
                  placeholder="حديقة الملك سلمان — تكامل الأنظمة"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Location & Value */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Status Code
                </label>
                <select
                  value={formData.statusCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      statusCode: e.target.value as any,
                      statusEn: e.target.value,
                      statusAr:
                        e.target.value === "Completed"
                          ? "مكتمل"
                          : e.target.value === "Planning"
                          ? "قيد التخطيط"
                          : "قيد التنفيذ",
                    })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all cursor-pointer"
                >
                  <option value="Ongoing">Ongoing (قيد التنفيذ)</option>
                  <option value="Completed">Completed (مكتمل)</option>
                  <option value="Planning">Planning (قيد التخطيط)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Progress (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) =>
                    setFormData({ ...formData, progress: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Value (e.g. SAR 480M)
                </label>
                <input
                  type="text"
                  value={formData.valueEn}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      valueEn: e.target.value,
                      valueAr: `${e.target.value.replace("SAR ", "")} ريال`,
                    })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">Year</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Description EN / AR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Description (English) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.descriptionEn}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Description (Arabic) *
                </label>
                <textarea
                  rows={3}
                  required
                  dir="rtl"
                  value={formData.descriptionAr}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionAr: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Image Upload & Flagship Checkbox */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="w-full sm:flex-1">
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Project Cover Image {editingProject ? "(Optional)" : "*"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required={!editingProject}
                  onChange={(e) =>
                    setSelectedFile(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full p-2.5 rounded-xl border border-dashed border-slate-300 text-sm sm:text-base file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#004187] file:text-white cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-3 self-start sm:self-center mt-4">
                <input
                  type="checkbox"
                  id="flagship"
                  checked={formData.isFlagship}
                  onChange={(e) =>
                    setFormData({ ...formData, isFlagship: e.target.checked })
                  }
                  className="w-5 h-5 rounded text-[#0086ff] cursor-pointer"
                />
                <label htmlFor="flagship" className="text-sm sm:text-base font-bold text-slate-800 cursor-pointer">
                  Featured / Flagship Project
                </label>
              </div>
            </div>

            {/* Submit */}
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
                <span>{editingProject ? "Update Project" : "Create Project"}</span>
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
