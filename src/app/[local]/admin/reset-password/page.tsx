"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { Lock, Loader2, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (!token) {
      setStatusMsg({
        type: "error",
        text: "Reset token is missing or invalid. Please request a new link.",
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setStatusMsg({
        type: "error",
        text: "New password and Confirm password do not match.",
      });
      return;
    }

    try {
      await resetPassword({
        token,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      setStatusMsg({
        type: "success",
        text: "Password reset successfully! Redirecting to login...",
      });

      setTimeout(() => {
        router.push(`/${locale}/admin/login`);
      }, 2000);
    } catch (err: any) {
      setStatusMsg({
        type: "error",
        text: err?.data?.message || "Failed to reset password. Link may be expired.",
      });
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#004187] to-[#0086ff]" />

      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-[#004187] to-[#0086ff] flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-[#0086ff]/25 mb-4">
          TM
        </div>
        <h2 className="text-2xl font-black text-[#001833] tracking-tight">
          Set New Password
        </h2>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-1">
          TMYAZNA Admin Portal
        </p>
      </div>

      {statusMsg && (
        <div
          className={`mb-6 p-4 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
            statusMsg.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
              : "bg-rose-50 border border-rose-200 text-rose-700"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            New Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="password"
              required
              minLength={6}
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/20 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="password"
              required
              minLength={6}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/20 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#004187] to-[#0086ff] text-white font-bold text-sm shadow-lg shadow-[#0086ff]/30 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Updating Password...</span>
            </>
          ) : (
            <>
              <span>Update Password</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/admin/login"
          className="text-xs font-bold text-[#0086ff] hover:underline cursor-pointer"
        >
          Return to Login
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Secure Password Reset</span>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001833] via-[#00224a] to-[#001026] flex items-center justify-center p-4 sm:p-6" dir="ltr">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
