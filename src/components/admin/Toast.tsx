"use client";

import React, { useEffect, useCallback } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastItem[];
  onRemove?: (id: string) => void;
  onClose?: (id: string) => void;
}

const CONFIGS = {
  success: {
    icon: CheckCircle2,
    bar: "bg-emerald-500",
    iconColor: "text-emerald-500",
    bg: "bg-white",
    titleColor: "text-slate-900",
    msgColor: "text-slate-500",
  },
  error: {
    icon: XCircle,
    bar: "bg-rose-500",
    iconColor: "text-rose-500",
    bg: "bg-white",
    titleColor: "text-slate-900",
    msgColor: "text-slate-500",
  },
  warning: {
    icon: AlertTriangle,
    bar: "bg-amber-500",
    iconColor: "text-amber-500",
    bg: "bg-white",
    titleColor: "text-slate-900",
    msgColor: "text-slate-500",
  },
  info: {
    icon: Info,
    bar: "bg-blue-500",
    iconColor: "text-blue-500",
    bg: "bg-white",
    titleColor: "text-slate-900",
    msgColor: "text-slate-500",
  },
};

function SingleToast({
  toast,
  onRemove,
}: {
  toast: ToastItem;
  onRemove: (id: string) => void;
}) {
  const cfg = CONFIGS[toast.type];
  const Icon = cfg.icon;

  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={`relative flex items-start gap-3.5 w-80 rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden pr-4 py-4 pl-4 ${cfg.bg} animate-in slide-in-from-right-full duration-300`}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${cfg.bar} rounded-l-2xl`} />

      {/* Icon */}
      <div className={`shrink-0 mt-0.5 ${cfg.iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold leading-snug ${cfg.titleColor}`}>
          {toast.title}
        </p>
        {toast.message && (
          <p className={`text-xs mt-0.5 leading-relaxed ${cfg.msgColor}`}>
            {toast.message}
          </p>
        )}

        {/* Progress bar */}
        <div className="mt-2.5 h-0.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${cfg.bar} rounded-full`}
            style={{
              animation: "toast-progress 4s linear forwards",
            }}
          />
        </div>
      </div>

      {/* Close */}
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 p-0.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer mt-0.5"
      >
        <X className="w-4 h-4" />
      </button>

      <style jsx>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

export function ToastContainer({ toasts, onRemove, onClose }: ToastProps) {
  const handleRemove = onRemove || onClose || (() => {});
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <SingleToast toast={t} onRemove={handleRemove} />
        </div>
      ))}
    </div>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
import { useState } from "react";

export interface ToastOptions {
  title: string;
  message?: string;
  type?: ToastType;
}

export type ToastFunction = {
  (options: ToastOptions): void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, title, message }]);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toastHandler = useCallback((options: ToastOptions) => {
    add(options.type || "info", options.title, options.message);
  }, [add]);

  const toast = Object.assign(toastHandler, {
    success: (title: string, message?: string) => add("success", title, message),
    error: (title: string, message?: string) => add("error", title, message),
    warning: (title: string, message?: string) => add("warning", title, message),
    info: (title: string, message?: string) => add("info", title, message),
  }) as ToastFunction;

  return { toasts, toast, removeToast: remove };
}
