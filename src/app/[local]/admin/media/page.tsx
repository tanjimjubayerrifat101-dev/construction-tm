"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Modal from "@/components/admin/Modal";
import ConfirmationModal, {
  ConfirmationType,
} from "@/components/admin/ConfirmationModal";
import { useToast, ToastContainer } from "@/components/admin/Toast";
import {
  useCreateMediaPostMutation,
  useDeleteMediaPostMutation,
  useGetMediaPostsQuery,
  useUpdateMediaPostMutation,
} from "@/redux/features/media/mediaApi";
import { IMediaPostItem } from "@/redux/features/media/mediaTypes";
import { resolveImageUrl } from "@/utils/resolveImageUrl";
import {
  Plus,
  Search,
  Newspaper,
  Edit2,
  Trash2,
  Loader2,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AdminMediaPage() {
  const { toasts, toast, removeToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetMediaPostsQuery({ searchTerm });

  const [createPost, { isLoading: isCreating }] = useCreateMediaPostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdateMediaPostMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeleteMediaPostMutation();

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: ConfirmationType;
    title: string;
    message: string;
    onConfirm: () => Promise<void> | void;
  } | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<IMediaPostItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    slug: "",
    titleEn: "",
    titleAr: "",
    categoryEn: "Facility Services",
    categoryAr: "خدمات المرافق",
    excerptEn: "",
    excerptAr: "",
    bodyEn: "",
    bodyAr: "",
    date: new Date().toISOString().split("T")[0],
    isPublished: true,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openCreateModal = () => {
    setEditingPost(null);
    setFormData({
      slug: "",
      titleEn: "",
      titleAr: "",
      categoryEn: "Facility Services",
      categoryAr: "خدمات المرافق",
      excerptEn: "",
      excerptAr: "",
      bodyEn: "",
      bodyAr: "",
      date: new Date().toISOString().split("T")[0],
      isPublished: true,
    });
    setSelectedFile(null);
    setModalOpen(true);
  };

  const openEditModal = (post: IMediaPostItem) => {
    setEditingPost(post);
    setFormData({
      slug: post.slug,
      titleEn: post.title?.en || "",
      titleAr: post.title?.ar || "",
      categoryEn: post.category?.en || "Facility Services",
      categoryAr: post.category?.ar || "خدمات المرافق",
      excerptEn: post.excerpt?.en || "",
      excerptAr: post.excerpt?.ar || "",
      bodyEn: post.body?.en || "",
      bodyAr: post.body?.ar || "",
      date: post.date || new Date().toISOString().split("T")[0],
      isPublished: post.isPublished !== false,
    });
    setSelectedFile(null);
    setModalOpen(true);
  };

  const executeSavePost = async () => {
    const payload = {
      slug: formData.slug || formData.titleEn.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
      title: { en: formData.titleEn, ar: formData.titleAr },
      category: { en: formData.categoryEn, ar: formData.categoryAr },
      excerpt: { en: formData.excerptEn, ar: formData.excerptAr },
      body: { en: formData.bodyEn, ar: formData.bodyAr },
      date: formData.date,
      isPublished: formData.isPublished,
    };

    const form = new FormData();
    form.append("data", JSON.stringify(payload));
    if (selectedFile) {
      form.append("image", selectedFile);
    } else if (editingPost?.image) {
      form.append(
        "data",
        JSON.stringify({ ...payload, image: editingPost.image })
      );
    }

    try {
      if (editingPost) {
        await updatePost({ id: editingPost._id, data: form }).unwrap();
        toast({
          title: "Article Updated Successfully",
          message: `"${formData.titleEn || "Article"}" has been updated.`,
          type: "success",
        });
      } else {
        await createPost(form).unwrap();
        toast({
          title: "Article Published Successfully",
          message: `"${formData.titleEn || "New Article"}" has been published.`,
          type: "success",
        });
      }
      setModalOpen(false);
      setConfirmModal(null);
    } catch (err: any) {
      toast({
        title: "Failed to Save Article",
        message:
          err?.data?.message ||
          err?.message ||
          "An error occurred while saving the article.",
        type: "error",
      });
      setConfirmModal(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = Boolean(editingPost);
    setConfirmModal({
      isOpen: true,
      type: isEditing ? "update" : "create",
      title: isEditing ? "Confirm Article Update" : "Confirm Article Creation",
      message: isEditing
        ? `Save changes to "${formData.titleEn || "this article"}"?`
        : `Publish new article "${formData.titleEn || "New Article"}"?`,
      onConfirm: executeSavePost,
    });
  };

  const confirmDeletePost = (post: IMediaPostItem) => {
    setConfirmModal({
      isOpen: true,
      type: "delete",
      title: "Delete Article",
      message: `Permanently delete "${post.title?.en}"? The article and its cover image will be removed from the Media Center.`,
      onConfirm: async () => {
        try {
          await deletePost(post._id).unwrap();
          toast({
            title: "Article Deleted",
            message: `"${post.title?.en}" has been removed from the Media Center.`,
            type: "success",
          });
        } catch (err: any) {
          toast({
            title: "Failed to Delete Article",
            message:
              err?.data?.message ||
              err?.message ||
              "Could not delete this article.",
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
              Media Center & News Articles
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Publish and manage press releases, technical insights, and corporate news
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#004187] to-[#0086ff] text-white font-bold text-xs shadow-md shadow-[#0086ff]/25 hover:opacity-95 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Article</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title, category, or content..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0086ff]"
          />
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#0086ff]" />
              <p className="text-xs font-semibold">Loading Articles...</p>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4">Cover</th>
                    <th className="py-3.5 px-4">Title (EN / AR)</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {data.data.map((post) => (
                    <tr key={post._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="w-12 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 relative">
                          {resolveImageUrl(post.image) ? (
                            <img
                              src={resolveImageUrl(post.image)}
                              alt={post.title?.en}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-slate-400 absolute inset-0 m-auto" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="font-bold text-slate-900 line-clamp-1">{post.title?.en}</p>
                        <p className="text-[11px] text-slate-500 line-clamp-1" dir="rtl">
                          {post.title?.ar}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {post.category?.en}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{post.date}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {post.isPublished !== false ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-400 font-bold text-[11px]">
                            <XCircle className="w-3.5 h-3.5" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(post)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-[#0086ff] hover:bg-sky-50 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDeletePost(post)}
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
              <Newspaper className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">No articles found.</p>
              <button
                onClick={openCreateModal}
                className="text-xs font-bold text-[#0086ff] hover:underline cursor-pointer"
              >
                Publish your first article
              </button>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={editingPost ? "Edit News Article" : "Publish News Article"}
          subtitle="Articles appear on the public Media Center and Home page"
          maxWidth="3xl"
        >
          <form onSubmit={handleSubmit} className="space-y-5 text-sm sm:text-base">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="tmyazna-advances-sustainable-facility-management"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Publication Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Category EN / AR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Category (English) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.categoryEn}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryEn: e.target.value })
                  }
                  placeholder="Facility Services"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Category (Arabic) *
                </label>
                <input
                  type="text"
                  required
                  dir="rtl"
                  value={formData.categoryAr}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryAr: e.target.value })
                  }
                  placeholder="خدمات المرافق"
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
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
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Excerpt EN / AR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Short Excerpt (English) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerptEn}
                  onChange={(e) =>
                    setFormData({ ...formData, excerptEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Short Excerpt (Arabic) *
                </label>
                <textarea
                  rows={2}
                  required
                  dir="rtl"
                  value={formData.excerptAr}
                  onChange={(e) =>
                    setFormData({ ...formData, excerptAr: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Full Body Article Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Full Article Body (English) *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.bodyEn}
                  onChange={(e) =>
                    setFormData({ ...formData, bodyEn: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                  Full Article Body (Arabic) *
                </label>
                <textarea
                  rows={5}
                  required
                  dir="rtl"
                  value={formData.bodyAr}
                  onChange={(e) =>
                    setFormData({ ...formData, bodyAr: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm sm:text-base font-medium text-slate-900 bg-white focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/15 transition-all"
                />
              </div>
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-slate-800 mb-1.5">
                Article Cover Image {editingPost ? "(Optional)" : "*"}
              </label>
              <input
                type="file"
                accept="image/*"
                required={!editingPost}
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
                <span>{editingPost ? "Update Article" : "Publish Article"}</span>
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
