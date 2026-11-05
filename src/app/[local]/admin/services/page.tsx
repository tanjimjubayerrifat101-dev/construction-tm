"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Modal from "@/components/admin/Modal";
import ConfirmationModal, {
  ConfirmationType,
} from "@/components/admin/ConfirmationModal";
import { useToast, ToastContainer } from "@/components/admin/Toast";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useUpdateServiceMutation,
} from "@/redux/features/service/serviceApi";
import {
  IServiceItem,
  IServiceSubDiscipline,
  IServiceCatalogItem,
} from "@/redux/features/service/serviceTypes";
import { resolveImageUrl } from "@/utils/resolveImageUrl";
import {
  Plus,
  Search,
  Wrench,
  Edit2,
  Trash2,
  Loader2,
  Image as ImageIcon,
  Layers,
  CheckCircle2,
  XCircle,
  FolderTree,
  ListPlus,
  Trash,
  PackagePlus,
  Tag,
} from "lucide-react";

export default function AdminServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetServicesQuery({ searchTerm });
  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();

  const { toasts, toast, removeToast } = useToast();

  // Confirmation Modal State (for Create, Update, Delete)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: ConfirmationType;
    title: string;
    message: string;
    onConfirm: () => Promise<void> | void;
  } | null>(null);

  // Core Service Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<IServiceItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Sub-services / Tabs Manager Modal State
  const [tabsModalOpen, setTabsModalOpen] = useState(false);
  const [selectedServiceForTabs, setSelectedServiceForTabs] =
    useState<IServiceItem | null>(null);
  const [tabsList, setTabsList] = useState<IServiceSubDiscipline[]>([]);
  const [catalogList, setCatalogList] = useState<IServiceCatalogItem[]>([]);

  // Sub-discipline Edit state
  const [editingTabIndex, setEditingTabIndex] = useState<number | null>(null);
  const [newTab, setNewTab] = useState<IServiceSubDiscipline>({
    id: "",
    tabTitle: { en: "", ar: "" },
    heading: { en: "", ar: "" },
    description: { en: "", ar: "" },
    capabilitiesHeading: { en: "Core Capabilities", ar: "القدرات الرئيسية" },
    capabilities: { en: [""], ar: [""] },
    icon: "Settings",
  });

  // Catalog Item Edit state
  const [editingCatalogIndex, setEditingCatalogIndex] = useState<number | null>(null);
  const [newCatalogItem, setNewCatalogItem] = useState<IServiceCatalogItem>({
    id: "",
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    badge: { en: "", ar: "" },
    image: { url: "" },
  });

  // Service Form State
  const [formData, setFormData] = useState({
    number: "01",
    slug: "",
    nameEn: "",
    nameAr: "",
    shortTitleEn: "",
    shortTitleAr: "",
    headingEn: "",
    headingAr: "",
    descriptionEn: "",
    descriptionAr: "",
    tabHeadingEn: "Service Areas",
    tabHeadingAr: "مجالات الخدمة",
    catalogHeadingEn: "Technical Catalog",
    catalogHeadingAr: "الكتالوج الفني",
    icon: "Cpu",
    order: 0,
    isActive: true,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      number: `0${(data?.data?.length || 0) + 1}`,
      slug: "",
      nameEn: "",
      nameAr: "",
      shortTitleEn: "",
      shortTitleAr: "",
      headingEn: "",
      headingAr: "",
      descriptionEn: "",
      descriptionAr: "",
      tabHeadingEn: "Service Areas",
      tabHeadingAr: "مجالات الخدمة",
      catalogHeadingEn: "Technical Catalog",
      catalogHeadingAr: "الكتالوج الفني",
      icon: "Cpu",
      order: (data?.data?.length || 0) + 1,
      isActive: true,
    });
    setSelectedFile(null);
    setModalOpen(true);
  };

  const openEditModal = (service: IServiceItem) => {
    setEditingService(service);
    setFormData({
      number: service.number,
      slug: service.slug,
      nameEn: service.name?.en || "",
      nameAr: service.name?.ar || "",
      shortTitleEn: service.shortTitle?.en || "",
      shortTitleAr: service.shortTitle?.ar || "",
      headingEn: service.heading?.en || "",
      headingAr: service.heading?.ar || "",
      descriptionEn: service.description?.en || "",
      descriptionAr: service.description?.ar || "",
      tabHeadingEn: service.tabHeading?.en || "Service Areas",
      tabHeadingAr: service.tabHeading?.ar || "مجالات الخدمة",
      catalogHeadingEn: service.catalogHeading?.en || "Technical Catalog",
      catalogHeadingAr: service.catalogHeading?.ar || "الكتالوج الفني",
      icon: service.icon || "Cpu",
      order: service.order || 0,
      isActive: service.isActive !== false,
    });
    setSelectedFile(null);
    setModalOpen(true);
  };

  const executeSaveService = async () => {
    const payload = {
      number: formData.number,
      slug: formData.slug || formData.nameEn.toLowerCase().replace(/\s+/g, "-"),
      name: { en: formData.nameEn, ar: formData.nameAr },
      shortTitle: {
        en: formData.shortTitleEn || formData.nameEn,
        ar: formData.shortTitleAr || formData.nameAr,
      },
      heading: { en: formData.headingEn, ar: formData.headingAr },
      description: { en: formData.descriptionEn, ar: formData.descriptionAr },
      tabHeading: { en: formData.tabHeadingEn, ar: formData.tabHeadingAr },
      catalogHeading: { en: formData.catalogHeadingEn, ar: formData.catalogHeadingAr },
      icon: formData.icon,
      order: Number(formData.order),
      isActive: formData.isActive,
    };

    const form = new FormData();
    form.append("data", JSON.stringify(payload));
    if (selectedFile) {
      form.append("image", selectedFile);
    } else if (editingService?.image) {
      form.append(
        "data",
        JSON.stringify({ ...payload, image: editingService.image })
      );
    }

    try {
      if (editingService) {
        await updateService({ id: editingService._id, data: form }).unwrap();
        toast.success("Service Updated", `"${formData.nameEn}" has been updated successfully.`);
      } else {
        await createService(form).unwrap();
        toast.success("Service Created", `"${formData.nameEn}" has been added successfully.`);
      }
      setModalOpen(false);
      setConfirmModal(null);
    } catch (err: any) {
      toast.error("Save Failed", err?.data?.message || "Failed to save service. Ensure all fields are filled.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = Boolean(editingService);

    setConfirmModal({
      isOpen: true,
      type: isEditing ? "update" : "create",
      title: isEditing ? "Confirm Service Update" : "Confirm Service Creation",
      message: isEditing
        ? `Are you sure you want to save updates to the service "${formData.nameEn || "this service"}"?`
        : `Are you sure you want to create the new service "${formData.nameEn || "New Service"}"?`,
      onConfirm: executeSaveService,
    });
  };

  const confirmDeleteService = (service: IServiceItem) => {
    setConfirmModal({
      isOpen: true,
      type: "delete",
      title: "Delete Service",
      message: `Are you sure you want to permanently delete "${service.name?.en}"? All associated sub-disciplines and catalog items will be removed. This action cannot be undone.`,
      onConfirm: async () => {
        try {
          await deleteService(service._id).unwrap();
          toast.success("Service Deleted", `"${service.name?.en}" has been permanently removed.`);
        } catch (err: any) {
          toast.error("Delete Failed", err?.data?.message || "Failed to delete service.");
        }
        setConfirmModal(null);
      },
    });
  };

  // Open Sub-services & Tabs Manager
  const openTabsManager = (service: IServiceItem) => {
    setSelectedServiceForTabs(service);
    setTabsList(service.subDisciplines || []);
    setCatalogList(service.catalogItems || []);
    setEditingTabIndex(null);
    setEditingCatalogIndex(null);
    setNewTab({
      id: "",
      tabTitle: { en: "", ar: "" },
      heading: { en: "", ar: "" },
      description: { en: "", ar: "" },
      capabilitiesHeading: { en: "Core Capabilities", ar: "القدرات الرئيسية" },
      capabilities: { en: [""], ar: [""] },
      icon: "Settings",
    });
    setTabsModalOpen(true);
  };

  // Save updated tabs & catalog to backend with confirmation
  const executeSaveTabsAndCatalog = async () => {
    if (!selectedServiceForTabs) return;

    try {
      const payload = {
        subDisciplines: tabsList.filter((t) => t.id && t.tabTitle?.en),
        catalogItems: catalogList.filter((c) => c.id && c.title?.en),
      };

      await updateService({
        id: selectedServiceForTabs._id,
        data: payload as any,
      }).unwrap();

      toast.success("Tabs & Catalog Saved", `Sub-disciplines and catalog items for "${selectedServiceForTabs.name?.en}" updated.`);
      setTabsModalOpen(false);
      setConfirmModal(null);
    } catch (err: any) {
      toast.error("Update Failed", err?.data?.message || "Failed to update sub-services tabs.");
    }
  };

  const handleSaveTabsAndCatalog = () => {
    if (!selectedServiceForTabs) return;
    setConfirmModal({
      isOpen: true,
      type: "update",
      title: "Confirm Tabs & Catalog Update",
      message: `Are you sure you want to save all changes to tabs and catalog items for "${selectedServiceForTabs.name?.en}"?`,
      onConfirm: executeSaveTabsAndCatalog,
    });
  };

  // Add or update a tab
  const handleSaveTabItem = () => {
    if (!newTab.tabTitle.en || !newTab.tabTitle.ar) {
      alert("Please provide both English and Arabic Tab Title.");
      return;
    }

    const tabId =
      newTab.id ||
      newTab.tabTitle.en.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

    const itemToSave: IServiceSubDiscipline = {
      ...newTab,
      id: tabId,
      capabilities: {
        en: (newTab.capabilities?.en || []).filter((c) => c.trim().length > 0),
        ar: (newTab.capabilities?.ar || []).filter((c) => c.trim().length > 0),
      },
    };

    if (editingTabIndex !== null) {
      const updated = [...tabsList];
      updated[editingTabIndex] = itemToSave;
      setTabsList(updated);
      setEditingTabIndex(null);
    } else {
      setTabsList([...tabsList, itemToSave]);
    }

    setNewTab({
      id: "",
      tabTitle: { en: "", ar: "" },
      heading: { en: "", ar: "" },
      description: { en: "", ar: "" },
      capabilitiesHeading: { en: "Core Capabilities", ar: "القدرات الرئيسية" },
      capabilities: { en: [""], ar: [""] },
      icon: "Settings",
    });
  };

  const handleEditTabItem = (index: number) => {
    setEditingTabIndex(index);
    const item = tabsList[index];
    setNewTab({
      ...item,
      capabilities: {
        en: item.capabilities?.en?.length ? [...item.capabilities.en] : [""],
        ar: item.capabilities?.ar?.length ? [...item.capabilities.ar] : [""],
      },
    });
  };

  const handleRemoveTabItem = (index: number) => {
    setTabsList(tabsList.filter((_, idx) => idx !== index));
    if (editingTabIndex === index) {
      setEditingTabIndex(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Services & Integrated Disciplines
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Configure core business lines, sub-service tabs, and technical catalogs in both English and Arabic
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#004187] to-[#0086ff] text-white font-bold text-xs shadow-md shadow-[#0086ff]/25 hover:opacity-95 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services by title or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0086ff] focus:ring-1 focus:ring-[#0086ff] transition-all"
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#0086ff]" />
              <p className="text-xs font-semibold">Loading Services...</p>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4">#</th>
                    <th className="py-3.5 px-4">Hero Image</th>
                    <th className="py-3.5 px-4">Service Name (EN / AR)</th>
                    <th className="py-3.5 px-4">Slug</th>
                    <th className="py-3.5 px-4 text-center">Sub-Service Tabs</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {data.data.map((service) => (
                    <tr
                      key={service._id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {service.number}
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-12 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 relative">
                          {resolveImageUrl(service.image) ? (
                            <img
                              src={resolveImageUrl(service.image)}
                              alt={service.name?.en}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-slate-400 absolute inset-0 m-auto" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{service.name?.en}</p>
                        <p className="text-[11px] text-slate-500" dir="rtl">
                          {service.name?.ar}
                        </p>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {service.slug}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => openTabsManager(service)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-sky-50 hover:bg-sky-100 text-[#0086ff] border border-sky-200 transition-colors cursor-pointer"
                          title="Click to manage tabs & sub-services"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>{service.subDisciplines?.length || 0} Tabs</span>
                          <span className="text-[10px] text-slate-400 ml-1">Edit</span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {service.isActive !== false ? (
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
                          onClick={() => openEditModal(service)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-[#0086ff] hover:bg-sky-50 transition-colors cursor-pointer"
                          title="Edit Service Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDeleteService(service)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Service"
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
              <Wrench className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">No services found.</p>
              <button
                onClick={openCreateModal}
                className="text-xs font-bold text-[#0086ff] hover:underline cursor-pointer"
              >
                Create your first service
              </button>
            </div>
          )}
        </div>

        {/* Add/Edit Core Service Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingService ? "Edit Service Line" : "Add New Service Line"}
          subtitle="Configure high-level service headings, banner media, and tab labels"
          maxWidth="3xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5 text-sm sm:text-base">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Service Number (e.g. 01)
                </label>
                <input
                  type="text"
                  required
                  value={formData.number}
                  onChange={(e) =>
                    setFormData({ ...formData, number: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Unique Slug (URL)
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="systems-integration"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Icon Identifier (Lucide)
                </label>
                <input
                  type="text"
                  required
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="Cpu, Building2, Leaf..."
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Name EN / AR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nameEn}
                  onChange={(e) =>
                    setFormData({ ...formData, nameEn: e.target.value })
                  }
                  placeholder="Systems Integration"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Name (Arabic) *
                </label>
                <input
                  type="text"
                  required
                  dir="rtl"
                  value={formData.nameAr}
                  onChange={(e) =>
                    setFormData({ ...formData, nameAr: e.target.value })
                  }
                  placeholder="تكامل الأنظمة"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Heading EN / AR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Heading (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.headingEn}
                  onChange={(e) =>
                    setFormData({ ...formData, headingEn: e.target.value })
                  }
                  placeholder="Engineering Excellence Across Systems"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Heading (Arabic) *
                </label>
                <input
                  type="text"
                  required
                  dir="rtl"
                  value={formData.headingAr}
                  onChange={(e) =>
                    setFormData({ ...formData, headingAr: e.target.value })
                  }
                  placeholder="التميز الهندسي في تكامل الأنظمة"
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

            {/* Tab Section Headings EN / AR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Sub-Services Tab Title (English)
                </label>
                <input
                  type="text"
                  value={formData.tabHeadingEn}
                  onChange={(e) =>
                    setFormData({ ...formData, tabHeadingEn: e.target.value })
                  }
                  placeholder="Service Areas"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Sub-Services Tab Title (Arabic)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={formData.tabHeadingAr}
                  onChange={(e) =>
                    setFormData({ ...formData, tabHeadingAr: e.target.value })
                  }
                  placeholder="مجالات الخدمة"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                Service Hero Image {editingService ? "(Leave empty to keep existing)" : "*"}
              </label>
              <input
                type="file"
                accept="image/*"
                required={!editingService}
                onChange={(e) =>
                  setSelectedFile(e.target.files ? e.target.files[0] : null)
                }
                className="w-full p-2.5 rounded-xl border border-dashed border-slate-300 text-sm sm:text-base file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-[#004187] file:text-white cursor-pointer"
              />
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
                <span>{editingService ? "Update Service" : "Create Service"}</span>
              </button>
            </div>
          </form>
        </Modal>

        {/* Manage Sub-Services (Tabs) & Catalog Modal */}
        <Modal
          isOpen={tabsModalOpen}
          onClose={() => setTabsModalOpen(false)}
          title={`Sub-Services & Tabs Manager — ${selectedServiceForTabs?.name?.en || ""}`}
          subtitle="Add, edit, or delete dynamic sub-discipline tabs, detailed technical overviews, and bullet capabilities"
          maxWidth="4xl"
        >
          <div className="space-y-6 text-sm sm:text-base max-h-[75vh] overflow-y-auto pr-1">
            {/* Existing Tabs List */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <FolderTree className="w-5 h-5 text-[#0086ff]" />
                  <span>Configured Sub-Service Tabs ({tabsList.length})</span>
                </h3>
                <span className="text-xs sm:text-sm text-slate-500">
                  Tabs appear on the left column in service details page
                </span>
              </div>

              {tabsList.length === 0 ? (
                <div className="p-6 text-center rounded-xl border border-dashed border-slate-200 text-slate-500 text-sm sm:text-base">
                  <p>No sub-service tabs added yet. Create your first tab below.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {tabsList.map((tab, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all ${
                        editingTabIndex === idx
                          ? "border-[#0086ff] bg-sky-50/50 shadow-xs ring-1 ring-[#0086ff]"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900 text-sm sm:text-base">
                          {tab.tabTitle?.en}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEditTabItem(idx)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#0086ff] hover:bg-slate-100 cursor-pointer transition-colors"
                            title="Edit Tab"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveTabItem(idx)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                            title="Delete Tab"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium" dir="rtl">
                        {tab.tabTitle?.ar}
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500">
                        <span className="font-mono text-xs">ID: {tab.id}</span>
                        <span>{tab.capabilities?.en?.length || 0} Capabilities</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sub-discipline Editor Form */}
            <div className="p-6 rounded-2xl border border-sky-100 bg-slate-50/90 space-y-4">
              <h4 className="font-bold text-slate-900 flex items-center justify-between text-sm sm:text-base">
                <span>
                  {editingTabIndex !== null
                    ? `Edit Tab: ${tabsList[editingTabIndex]?.tabTitle?.en}`
                    : "Add New Sub-Service Tab"}
                </span>
                {editingTabIndex !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingTabIndex(null);
                      setNewTab({
                        id: "",
                        tabTitle: { en: "", ar: "" },
                        heading: { en: "", ar: "" },
                        description: { en: "", ar: "" },
                        capabilitiesHeading: { en: "Core Capabilities", ar: "القدرات الرئيسية" },
                        capabilities: { en: [""], ar: [""] },
                        icon: "Settings",
                      });
                    }}
                    className="text-xs sm:text-sm text-slate-500 hover:text-slate-800 underline cursor-pointer"
                  >
                    Cancel Editing
                  </button>
                )}
              </h4>

              {/* Tab Title EN / AR & ID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                    Tab Slug / ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={newTab.id}
                    onChange={(e) => setNewTab({ ...newTab, id: e.target.value })}
                    placeholder="electrical-systems"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                    Tab Title (EN) *
                  </label>
                  <input
                    type="text"
                    value={newTab.tabTitle?.en}
                    onChange={(e) =>
                      setNewTab({
                        ...newTab,
                        tabTitle: { ...newTab.tabTitle, en: e.target.value },
                      })
                    }
                    placeholder="Electrical Systems"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                    Tab Title (AR) *
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={newTab.tabTitle?.ar}
                    onChange={(e) =>
                      setNewTab({
                        ...newTab,
                        tabTitle: { ...newTab.tabTitle, ar: e.target.value },
                      })
                    }
                    placeholder="الأنظمة الكهربائية"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                  />
                </div>
              </div>

              {/* Heading EN / AR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                    Detail Heading (EN)
                  </label>
                  <input
                    type="text"
                    value={newTab.heading?.en}
                    onChange={(e) =>
                      setNewTab({
                        ...newTab,
                        heading: { ...newTab.heading, en: e.target.value },
                      })
                    }
                    placeholder="High & Low Voltage Engineering"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                    Detail Heading (AR)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={newTab.heading?.ar}
                    onChange={(e) =>
                      setNewTab({
                        ...newTab,
                        heading: { ...newTab.heading, ar: e.target.value },
                      })
                    }
                    placeholder="هندسة الجهد العالي والمنخفض"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                  />
                </div>
              </div>

              {/* Description EN / AR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                    Description (EN)
                  </label>
                  <textarea
                    rows={2}
                    value={newTab.description?.en}
                    onChange={(e) =>
                      setNewTab({
                        ...newTab,
                        description: { ...newTab.description, en: e.target.value },
                      })
                    }
                    placeholder="Detailed explanation of this sub-discipline..."
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                    Description (AR)
                  </label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={newTab.description?.ar}
                    onChange={(e) =>
                      setNewTab({
                        ...newTab,
                        description: { ...newTab.description, ar: e.target.value },
                      })
                    }
                    placeholder="شرح تفصيلي لهذا التخصص الفرعي..."
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                  />
                </div>
              </div>

              {/* Dynamic Capabilities Bullets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm sm:text-base font-bold text-slate-800">
                    Capabilities Bullets (EN / AR)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setNewTab({
                        ...newTab,
                        capabilities: {
                          en: [...(newTab.capabilities?.en || []), ""],
                          ar: [...(newTab.capabilities?.ar || []), ""],
                        },
                      });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0086ff] hover:underline cursor-pointer"
                  >
                    <ListPlus className="w-4 h-4" />
                    <span>+ Add Capability Item</span>
                  </button>
                </div>

                {(newTab.capabilities?.en || [""]).map((capEn, capIdx) => (
                  <div key={capIdx} className="flex items-center gap-2.5">
                    <input
                      type="text"
                      value={capEn}
                      onChange={(e) => {
                        const updated = [...(newTab.capabilities?.en || [])];
                        updated[capIdx] = e.target.value;
                        setNewTab({
                          ...newTab,
                          capabilities: {
                            ...newTab.capabilities!,
                            en: updated,
                          },
                        });
                      }}
                      placeholder={`Capability ${capIdx + 1} (EN)`}
                      className="flex-1 px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                    />
                    <input
                      type="text"
                      dir="rtl"
                      value={newTab.capabilities?.ar?.[capIdx] || ""}
                      onChange={(e) => {
                        const updated = [...(newTab.capabilities?.ar || [])];
                        updated[capIdx] = e.target.value;
                        setNewTab({
                          ...newTab,
                          capabilities: {
                            ...newTab.capabilities!,
                            ar: updated,
                          },
                        });
                      }}
                      placeholder={`القدرة ${capIdx + 1} (AR)`}
                      className="flex-1 px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm sm:text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const enList = (newTab.capabilities?.en || []).filter(
                          (_, i) => i !== capIdx
                        );
                        const arList = (newTab.capabilities?.ar || []).filter(
                          (_, i) => i !== capIdx
                        );
                        setNewTab({
                          ...newTab,
                          capabilities: { en: enList, ar: arList },
                        });
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer transition-colors"
                      title="Remove"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveTabItem}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {editingTabIndex !== null ? "Update Tab in List" : "Add Tab to Service"}
                </button>
              </div>
            </div>

            {/* Bottom Final Save Button */}
            <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setTabsModalOpen(false)}
                className="px-5 py-3 rounded-xl text-sm sm:text-base text-slate-600 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleSaveTabsAndCatalog}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#004187] to-[#0086ff] text-white font-bold text-sm sm:text-base shadow-md shadow-[#0086ff]/25 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isUpdating && <Loader2 className="w-5 h-5 animate-spin" />}
                <span>Save All Tabs & Catalog Changes</span>
              </button>
            </div>
          </div>
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
