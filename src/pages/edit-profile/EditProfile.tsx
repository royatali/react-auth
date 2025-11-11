import { useEffect, useMemo, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MainLayout from "../../components/layout/MainLayout";
import Spinner from "../../components/common/Spinner";
import useProfile from "../../hooks/useProfile";
import { formatDate } from "../../utils/dateUtils";
import ImagePreviewModal from "../../components/modal/ImagePreviewModal";
import { FiUpload } from "react-icons/fi";
import useUserService from "../../hooks/useUserService";
import { toast } from "react-toastify";
import { Bio } from "../../types/user.types";
import {
  updateUserSchema,
  UpdateUserSchema,
} from "../../schemas/updateUserSchema.schema";
import ProfileNotFound from "../../components/profile/ProfileNotFound";

// ---------------- UI helpers ----------------
const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-medium mb-1 text-start">
    {children}
  </label>
);
const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-start mt-1 text-xs text-red-500">*{msg}</p> : null;

const RoleBadge = ({ role, dark }: { role: string; dark: boolean }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
      dark
        ? "bg-gray-700 text-gray-100 ring-gray-600"
        : "bg-gray-100 text-gray-800 ring-gray-300"
    }`}
  >
    {role.toLowerCase()}
  </span>
);

// file -> base64 dataURL
const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const EditProfile = () => {
  const { user, userId, isDarkMode, loading, error, navigate } = useProfile();

  const [submitting, setSubmitting] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateUser } = useUserService();
  const pageBg = isDarkMode ? "bg-[#0f172a]" : "bg-gray-50";
  const card = isDarkMode
    ? "bg-gray-800 text-gray-100 border-gray-700"
    : "bg-white text-gray-900 border-gray-200";
  const muted = isDarkMode ? "text-gray-300" : "text-gray-600";

  const defaultValues = useMemo<UpdateUserSchema>(
    () => ({
      username: user?.username ?? "",
      email: user?.email ?? "",
      password: "",
      bio: {
        welcomeMessage: user?.bio?.welcomeMessage ?? "",
        avatar: user?.bio?.avatar ?? "",
      },
    }),
    [user]
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isDirty, dirtyFields },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (user) reset(defaultValues);
  }, [user, reset, defaultValues]);

  const avatar = watch("bio.avatar");
  const avatarSrc =
    avatar ||
    user?.bio?.avatar ||
    "https://placehold.co/128x128/png?text=Avatar";

  if (loading) {
    return (
      <MainLayout title="Edit Profile">
        <div className="flex justify-center items-center py-16">
          <Spinner />
        </div>
      </MainLayout>
    );
  }
  if (error || !user) {
    return <ProfileNotFound profileId={userId as string} />;
  }

  // Build minimal PATCH payload
  const buildPatchBody = (values: UpdateUserSchema) => {
    const body: any = {};
    const df = defaultValues;

    if (dirtyFields.username && values.username !== df.username)
      body.username = values.username?.trim();
    if (dirtyFields.email && values.email !== df.email)
      body.email = values.email?.trim();
    if (dirtyFields.password && values.password && values.password.length > 0)
      body.password = values.password;

    const bio: Bio = {} as Bio;
    if (
      dirtyFields.bio?.welcomeMessage &&
      values.bio?.welcomeMessage !== df.bio?.welcomeMessage
    )
      bio.welcomeMessage = values.bio?.welcomeMessage ?? "";
    if (dirtyFields.bio?.avatar && values.bio?.avatar !== df.bio?.avatar)
      bio.avatar = values.bio?.avatar ?? "";

    if (Object.keys(bio).length > 0) body.bio = bio;
    return body;
  };

  const onSubmit = async (values: UpdateUserSchema) => {
    const patchBody = buildPatchBody(values);
    if (Object.keys(patchBody).length === 0) {
      navigate(`/profile/${userId}`);
      return;
    }
    try {
      setSubmitting(true);
      const { data: userResponse } = await updateUser(user.id, patchBody);
      toast.success(`Profile ${userResponse.username} updated successfully!`);
      await navigate(`/profile/${userResponse.id}`);
    } catch (e) {
      console.error(e);
      alert(typeof e === "string" ? e : (e as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  // image upload -> base64
  const handleImageUpload = async (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = evt.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    try {
      const dataUrl = await fileToBase64(file);
      setValue("bio.avatar", dataUrl, { shouldDirty: true, shouldTouch: true });
    } catch {
      alert("Failed to read the image.");
    }
  };

  return (
    <MainLayout title="Edit Profile">
      <div className={`${pageBg} transition-colors`}>
        <div
          className={`max-w-xl mx-auto p-6 border rounded-2xl shadow-sm mt-6 ${card}`}
        >
          <h1 className="text-2xl font-bold mb-1">Edit Profile</h1>
          <p className={`text-sm mb-6 ${muted}`}>
            Update your account details below.
          </p>

          {/* Avatar + Upload (centered) */}
          <div className="mb-6 flex flex-col items-center gap-3">
            {/* Click avatar -> open full-screen modal */}
            <button
              type="button"
              onClick={() => setShowImageModal(true)}
              className="rounded-full outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Open profile picture"
              title="Open profile picture"
            >
              <img
                src={avatarSrc}
                alt="Avatar"
                className="h-28 w-28 rounded-full object-cover ring-2 ring-indigo-500 cursor-zoom-in"
              />
            </button>

            {/* Upload icon button (hidden file input) */}
            <input
              ref={fileInputRef}
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold
               text-white ${
                 isDarkMode
                   ? "bg-indigo-600 hover:bg-indigo-500"
                   : "bg-blue-600 hover:bg-blue-500"
               }  active:scale-[.99] transition`}
              aria-label="Upload new avatar"
              title="Upload new avatar"
            >
              <FiUpload className="text-base" />
              Upload
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <FieldLabel>Username</FieldLabel>
              <input
                type="text"
                autoComplete="username"
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                {...register("username")}
              />
              <FieldError msg={errors.username?.message} />
            </div>

            {/* Email */}
            <div>
              <FieldLabel>Email</FieldLabel>
              <input
                type="email"
                autoComplete="email"
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                {...register("email")}
              />
              <FieldError msg={errors.email?.message} />
            </div>

            {/* Password */}
            <div>
              <FieldLabel>
                New Password (leave blank to keep current)
              </FieldLabel>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                {...register("password")}
              />
              <FieldError msg={errors.password?.message} />
              <p className={`mt-1 text-xs ${muted}`}>
                8–32 chars, with upper & lower case and a number or special
                char.
              </p>
            </div>

            {/* Welcome Message */}
            <div>
              <FieldLabel>Welcome Message</FieldLabel>
              <input
                type="text"
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700 text-gray-100"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                {...register("bio.welcomeMessage")}
              />
              <FieldError msg={errors.bio?.welcomeMessage?.message} />
            </div>

            {/* Actions (space-between; no Reset; no Avatar URL field) */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigate(`/profile/${userId}`)}
                className={
                  "rounded-xl px-5 py-2.5 text-sm font-semibold ring-1 transitionbg-red-600 text-white bg-red-600 hover:bg-red-700"
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting || !isDirty}
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[.99] transition cursor-pointer"
              >
                {submitting ? "Saving…" : "Save Changes"}
              </button>
            </div>

            {/* Bottom section */}
            <hr
              className={isDarkMode ? "border-gray-700" : "border-gray-200"}
            />
            <div className="pt-4">
              <h2 className="text-lg font-semibold text-center mb-3">Roles</h2>
              <div className="flex items-center justify-center gap-2 mb-3">
                {(user.roles?.length ? user.roles : ["USER"]).map(
                  (r: string) => (
                    <RoleBadge key={r} role={r} dark={!!isDarkMode} />
                  )
                )}
              </div>
              <div className={`text-sm ${muted}`}>
                <div>
                  Created At:{" "}
                  <span
                    className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                  >
                    {formatDate(user.createdAt)}
                  </span>
                </div>
                <div>
                  Updated At:{" "}
                  <span
                    className={isDarkMode ? "text-blue-400" : "text-blue-600"}
                  >
                    {formatDate(user.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Full-screen image modal */}
        <ImagePreviewModal
          isOpen={showImageModal}
          src={avatarSrc}
          alt={`${user.username} avatar`}
          onClose={() => setShowImageModal(false)}
          isDarkMode={isDarkMode}
        />
      </div>
    </MainLayout>
  );
};

export default EditProfile;
