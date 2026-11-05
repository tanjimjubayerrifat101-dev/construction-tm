"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useLoginMutation, useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import {
  Lock,
  Mail,
  Loader2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: isSendingForgot }] =
    useForgotPasswordMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotMsg(null);
    try {
      const res = await forgotPassword({ email: forgotEmail }).unwrap();
      setForgotMsg({
        type: "success",
        text:
          res?.message ||
          "Password reset link has been dispatched to your email.",
      });
    } catch (err: any) {
      setForgotMsg({
        type: "error",
        text: err?.data?.message || "Failed to send reset link.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await login(formData).unwrap();
      if (res?.data?.accessToken && res?.data?.user) {
        dispatch(
          setCredentials({
            user: res.data.user,
            token: res.data.accessToken,
          })
        );
        router.push(`/${locale}/admin/dashboard`);
      }
    } catch (err: any) {
      setErrorMsg(
        err?.data?.message || "Invalid credentials or unauthorized login."
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#001833] via-[#00224a] to-[#001026] flex items-center justify-center p-4 sm:p-6"
      dir="ltr"
    >
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-12 relative overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#004187] to-[#0086ff]" />

        {/* Brand Header */}
        <div className="text-center mb-9">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#004187] to-[#0086ff] flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-[#0086ff]/30 mb-4 tracking-tight">
            TM
          </div>
          <h2 className="text-3xl font-black text-[#001833] tracking-tight">
            Admin Portal
          </h2>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1.5">
            TMYAZNA Construction & Systems
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your administrative email"
                autoComplete="email"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/20 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold uppercase tracking-wider text-slate-800">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm font-bold text-[#0086ff] hover:text-[#004187] hover:underline cursor-pointer transition-colors"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 text-base font-medium text-slate-900 focus:outline-none focus:border-[#0086ff] focus:ring-2 focus:ring-[#0086ff]/20 transition-all placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#004187] to-[#0086ff] text-white font-black text-base shadow-lg shadow-[#0086ff]/30 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-7 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">
                  Reset Admin Password
                </h3>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setForgotMsg(null);
                  }}
                  className="text-slate-400 hover:text-slate-700 text-base font-bold cursor-pointer p-1 rounded-lg hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm font-medium text-slate-600">
                Enter your administrative email address to receive password reset instructions.
              </p>

              {forgotMsg && (
                <div
                  className={`p-4 rounded-xl text-sm font-semibold ${
                    forgotMsg.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {forgotMsg.text}
                </div>
              )}

              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your administrative email"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-base text-slate-900 focus:outline-none focus:border-[#0086ff] placeholder:text-slate-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotMsg(null);
                    }}
                    className="px-5 py-2.5 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingForgot}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#004187] to-[#0086ff] text-white font-bold text-sm shadow-md shadow-[#0086ff]/25 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSendingForgot && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Send Reset Email</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Security badge */}
        <div className="mt-9 pt-6 border-t border-slate-100 flex items-center justify-center gap-2.5 text-sm font-semibold text-slate-500">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span>Protected Single-Role Security Gate</span>
        </div>
      </div>
    </div>
  );
}
