"use client";

import React, { useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Edit3,
  PlusCircle,
  Loader2,
  X,
} from "lucide-react";

export type ConfirmationType = "create" | "update" | "delete" | "warning";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  message: string;
  type?: ConfirmationType;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "warning",
  confirmText,
  cancelText = "Cancel",
  isLoading = false,
}: ConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const config = {
    create: {
      icon: PlusCircle,
      iconBg: "bg-emerald-100 text-emerald-600 border border-emerald-200",
      btnBg:
        "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-500/25 hover:from-emerald-700 hover:to-teal-700",
      defaultBtnText: "Yes, Create",
      badgeText: "Creation Confirmation",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    update: {
      icon: Edit3,
      iconBg: "bg-blue-100 text-[#0086ff] border border-blue-200",
      btnBg:
        "bg-gradient-to-r from-[#004187] to-[#0086ff] text-white shadow-blue-500/25 hover:opacity-95",
      defaultBtnText: "Yes, Update",
      badgeText: "Update Confirmation",
      badgeColor: "bg-blue-50 text-[#004187] border-blue-200",
    },
    delete: {
      icon: Trash2,
      iconBg: "bg-rose-100 text-rose-600 border border-rose-200",
      btnBg:
        "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-rose-500/25 hover:from-rose-700 hover:to-red-700",
      defaultBtnText: "Yes, Delete",
      badgeText: "Destructive Action",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
    warning: {
      icon: AlertTriangle,
      iconBg: "bg-amber-100 text-amber-600 border border-amber-200",
      btnBg:
        "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-amber-500/25 hover:from-amber-700 hover:to-orange-700",
      defaultBtnText: "Confirm",
      badgeText: "Action Confirmation",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
  }[type];

  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => !isLoading && onClose()}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <div className="relative w-full max-w-lg transform rounded-2xl bg-white text-left shadow-2xl transition-all border border-slate-200/90 overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header Accent Bar */}
          <div
            className={`h-2.5 w-full ${
              type === "create"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                : type === "update"
                ? "bg-gradient-to-r from-[#004187] to-[#0086ff]"
                : type === "delete"
                ? "bg-gradient-to-r from-rose-500 to-red-500"
                : "bg-gradient-to-r from-amber-500 to-orange-500"
            }`}
          />

          <div className="p-7 sm:p-8">
            <div className="flex items-start gap-5">
              {/* Icon Container */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${config.iconBg}`}
              >
                <Icon className="w-7 h-7" />
              </div>

              {/* Title & Message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${config.badgeColor}`}
                  >
                    {config.badgeText}
                  </span>
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-40"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-xl font-black text-slate-900 leading-snug tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 text-base font-medium text-slate-600 leading-relaxed">
                  {message}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-base hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer disabled:opacity-50"
              >
                {cancelText}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className={`px-7 py-3 rounded-xl font-bold text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98] ${config.btnBg}`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>{confirmText || config.defaultBtnText}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
