"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ConfirmationModal, {
  ConfirmationType,
} from "@/components/admin/ConfirmationModal";
import { useToast, ToastContainer } from "@/components/admin/Toast";
import {
  useChangePasswordMutation,
  useGetMeQuery,
  useUpdateMeMutation,
} from "@/redux/features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store";
import {
  User,
  Mail,
  Phone,
  Shield,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Camera,
} from "lucide-react";

export default function AdminProfilePage() {
  const { toasts, toast, removeToast } = useToast();
  const dispatch = useDispatch();
  const { data: meData, refetch } = useGetMeQuery();
  const [updateMe, { isLoading: isUpdatingProfile }] = useUpdateMeMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const user = meData?.data;

  // Confirm Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: ConfirmationType;
    title: string;
    message: string;
    onConfirm: () => Promise<void> | void;
  } | null>(null);

  // Profile Form State
  const [name, setName] = useState(user?.name || "Admin");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const executeUpdateProfile = async () => {
    setProfileMsg(null);

    const formData = new FormData();
    formData.append("data", JSON.stringify({ name, phoneNumber }));
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const res = await updateMe(formData).unwrap();
      if (res?.data) {
        dispatch(updateUser(res.data));
        refetch();
        setProfileMsg({ type: "success", text: "Profile updated successfully!" });
        toast({
          title: "Profile Updated",
          message: "Your profile information has been saved successfully.",
          type: "success",
        });
      }
      setConfirmModal(null);
    } catch (err: any) {
      const errMsg = err?.data?.message || "Failed to update profile.";
      setProfileMsg({ type: "error", text: errMsg });
      toast({
        title: "Update Failed",
        message: errMsg,
        type: "error",
      });
      setConfirmModal(null);
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmModal({
      isOpen: true,
      type: "update",
      title: "Update Profile Information",
      message: "Are you sure you want to save these profile changes?",
      onConfirm: executeUpdateProfile,
    });
  };

  const executeChangePassword = async () => {
    setPasswordMsg(null);

    try {
      await changePassword(passwordData).unwrap();
      setPasswordMsg({ type: "success", text: "Password changed successfully!" });
      toast({
        title: "Password Changed",
        message: "Your account password has been updated successfully.",
        type: "success",
      });
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setConfirmModal(null);
    } catch (err: any) {
      const errMsg = err?.data?.message || "Failed to change password.";
      setPasswordMsg({ type: "error", text: errMsg });
      toast({
        title: "Password Change Failed",
        message: errMsg,
        type: "error",
      });
      setConfirmModal(null);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMsg({
        type: "error",
        text: "New password and Confirm password do not match.",
      });
      toast({
        title: "Passwords Do Not Match",
        message: "New password and Confirm password do not match.",
        type: "error",
      });
      return;
    }

    setConfirmModal({
      isOpen: true,
      type: "update",
      title: "Change Admin Password",
      message: "Are you sure you want to change your login password?",
      onConfirm: executeChangePassword,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Admin Profile & Security
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update your admin personal details, profile avatar, and account credentials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Details Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#004187] to-[#0086ff] flex items-center justify-center text-white text-xl font-extrabold shadow-md overflow-hidden">
                {user?.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.name?.charAt(0)?.toUpperCase() || "A"
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{user?.name || "Super Admin"}</h3>
                <p className="text-xs text-slate-500">{user?.email}</p>
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-[#004187]">
                  <Shield className="w-3 h-3" /> Master Admin
                </span>
              </div>
            </div>

            {profileMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  profileMsg.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                {profileMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{profileMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0086ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+966 50 123 4567"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0086ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Profile Photo / Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setAvatarFile(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full p-2 rounded-xl border border-dashed border-slate-300 text-xs file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-[#004187] file:text-white cursor-pointer"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#004187] to-[#0086ff] text-white font-bold text-xs shadow-md shadow-[#0086ff]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isUpdatingProfile && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>

          {/* Change Password Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Change Password</h3>
                <p className="text-xs text-slate-500">
                  Ensure account security with a strong password
                </p>
              </div>
            </div>

            {passwordMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  passwordMsg.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                {passwordMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, oldPassword: e.target.value })
                  }
                  placeholder="••••••••••••"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0086ff]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  placeholder="Minimum 6 characters"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0086ff]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Re-type new password"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#0086ff]"
                />
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isChangingPassword && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Update Password</span>
              </button>
            </form>
          </div>
        </div>

        {/* Confirmation Modal */}
        {confirmModal && (
          <ConfirmationModal
            isOpen={confirmModal.isOpen}
            onClose={() => setConfirmModal(null)}
            onConfirm={confirmModal.onConfirm}
            title={confirmModal.title}
            message={confirmModal.message}
            type={confirmModal.type}
            isLoading={isUpdatingProfile || isChangingPassword}
          />
        )}

        {/* Toast Notifications */}
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    </AdminLayout>
  );
}
