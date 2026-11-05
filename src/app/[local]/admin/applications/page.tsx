"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Modal from "@/components/admin/Modal";
import ConfirmationModal from "@/components/admin/ConfirmationModal";
import { useToast, ToastContainer } from "@/components/admin/Toast";
import {
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/redux/features/career/careerApi";
import { IJobApplicationItem } from "@/redux/features/career/careerTypes";
import {
  Search,
  FileCheck2,
  Trash2,
  Loader2,
  FileText,
  Mail,
  Phone,
  Building2,
  Eye,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function AdminApplicationsPage() {
  const { toasts, toast, removeToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { data, isLoading } = useGetApplicationsQuery({
    searchTerm,
    status: statusFilter || undefined,
  });

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateApplicationStatusMutation();
  const [deleteApplication, { isLoading: isDeleting }] =
    useDeleteApplicationMutation();

  const [activeNote, setActiveNote] = useState<IJobApplicationItem | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ app: IJobApplicationItem } | null>(null);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast({
        title: "Status Updated",
        message: `Application status updated to "${status}".`,
        type: "success",
      });
    } catch (err: any) {
      toast({
        title: "Failed to Update Status",
        message:
          err?.data?.message ||
          err?.message ||
          "Could not update application status.",
        type: "error",
      });
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!confirmDelete) return;
    try {
      const applicantName = confirmDelete.app.fullName;
      await deleteApplication(confirmDelete.app._id).unwrap();
      toast({
        title: "Application Deleted",
        message: `Application from "${applicantName}" has been permanently removed.`,
        type: "success",
      });
      setConfirmDelete(null);
    } catch (err: any) {
      toast({
        title: "Failed to Delete Application",
        message:
          err?.data?.message ||
          err?.message ||
          "Could not delete this application.",
        type: "error",
      });
      setConfirmDelete(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Candidate Applications & Resumes
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Review submitted job applications, download candidate CVs, and track hiring stages
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by candidate name, email, or role..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0086ff]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#0086ff] cursor-pointer"
          >
            <option value="">All Application Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#0086ff]" />
              <p className="text-xs font-semibold">Loading Applications...</p>
            </div>
          ) : data?.data && data.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4">Candidate</th>
                    <th className="py-3.5 px-4">Applied Position</th>
                    <th className="py-3.5 px-4">Experience</th>
                    <th className="py-3.5 px-4">Resume / CV</th>
                    <th className="py-3.5 px-4">Cover Note</th>
                    <th className="py-3.5 px-4">Hiring Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {data.data.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{app.fullName}</p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            {app.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            {app.phone}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-800">{app.jobTitle}</span>
                        <p className="text-[11px] text-slate-500">{app.currentCity} • {app.nationality}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {app.experience}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-0.5">Notice: {app.noticePeriod}</p>
                      </td>
                      <td className="py-3 px-4">
                        {app.cv?.url ? (
                          <a
                            href={app.cv.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-[#0086ff] font-bold text-[11px] hover:bg-sky-100 transition-colors cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View CV</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        ) : (
                          <span className="text-slate-400">No file</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {app.coverNote ? (
                          <button
                            onClick={() => setActiveNote(app)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-[#0086ff] cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" /> Read Note
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app._id, e.target.value)
                          }
                          className={`
                            px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer focus:outline-none
                            ${
                              app.status === "Shortlisted"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                : app.status === "Reviewed"
                                ? "bg-blue-50 text-blue-700 border-blue-300"
                                : app.status === "Rejected"
                                ? "bg-rose-50 text-rose-700 border-rose-300"
                                : "bg-amber-50 text-amber-700 border-amber-300"
                            }
                          `}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setConfirmDelete({ app })}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete application"
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
              <FileCheck2 className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">No applications found.</p>
              <p className="text-xs">
                Candidate submissions from the public careers page will appear here.
              </p>
            </div>
          )}
        </div>

        {/* View Cover Note Modal */}
        <Modal
          isOpen={Boolean(activeNote)}
          onClose={() => setActiveNote(null)}
          title={`Candidate Note: ${activeNote?.fullName}`}
          subtitle={`Position applied: ${activeNote?.jobTitle}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 leading-relaxed whitespace-pre-wrap">
              {activeNote?.coverNote || "No cover note provided."}
            </div>

            {activeNote?.linkedin && (
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">LinkedIn:</span>
                <a
                  href={activeNote.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0086ff] hover:underline"
                >
                  {activeNote.linkedin}
                </a>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveNote(null)}
                className="px-4 py-2 rounded-xl bg-[#004187] text-white font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={Boolean(confirmDelete)}
          onClose={() => setConfirmDelete(null)}
          onConfirm={handleDeleteConfirmed}
          title="Delete Application"
          message={`Permanently delete ${confirmDelete?.app?.fullName ?? "this applicant"}'s submission? Their candidate record and attached resume file will be removed.`}
          type="delete"
          isLoading={isDeleting}
        />

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    </AdminLayout>
  );
}
