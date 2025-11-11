import Spinner from "../../components/common/Spinner";
import MainLayout from "../../components/layout/MainLayout";
import useProfile from "../../hooks/useProfile";
import ConfirmDeleteModal from "../../components/modal/ConfirmDeleteModal";
import ProfileNotFound from "../../components/profile/ProfileNotFound";
import { formatDate } from "../../utils/dateUtils";
import ImagePreviewModal from "../../components/modal/ImagePreviewModal";
import { User } from "../../types/user.types";

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

const Profile = () => {
  const {
    error,
    handleDelete,
    isDarkMode,
    loading,
    navigate,
    setShowDeleteModal,
    showDeleteModal,
    showAvatarModal,
    setShowAvatarModal,
    user,
    userId,
  } = useProfile();

  if (loading)
    return (
      <MainLayout title="Profile">
        <Spinner />
      </MainLayout>
    );

  if (error) return <ProfileNotFound profileId={userId as string} />;

  if (!user) return <ProfileNotFound profileId={userId as string} />;

  const { username, email, roles, createdAt, updatedAt, bio }: User = user;

  const pageBg = isDarkMode ? "bg-[#0f172a]" : "bg-gray-100";
  const cardText = isDarkMode ? "text-gray-100" : "text-gray-900";
  const subText = isDarkMode ? "text-gray-300" : "text-gray-600";
  const linkBlue = isDarkMode
    ? "text-blue-400 hover:text-blue-300"
    : "text-blue-600 hover:text-blue-700";
  const muted = isDarkMode ? "text-gray-300" : "text-gray-600";

  const avatarSrc: string =
    bio?.avatar || "https://placehold.co/160x160/png?text=Avatar";

  return (
    <MainLayout title={`Profile - ${user?.username}`}>
      <div className={`${pageBg} transition-colors`}>
        <h1 className="text-2xl font-bold mb-1">Profile - {user?.username}</h1>
        <p className={`text-sm mb-6 ${muted}`}>
          Update your account details below.
        </p>

        <div
          className={`max-w-md mx-auto px-6 pb-12 pt-4 text-center ${cardText}`}
        >
          {/* Avatar */}
          <div className="mt-2 flex justify-center">
            <img
              src={
                bio?.avatar || "https://placehold.co/160x160/png?text=Avatar"
              }
              alt={`${username || "User"} avatar`}
              className="h-32 w-32 rounded-full object-cover ring-2 ring-indigo-500 cursor-pointer"
              onClick={() => setShowAvatarModal(true)}
            />
          </div>

          {/* Username / Email / Welcome */}
          <h2 className="mt-6 text-2xl font-bold">
            {username || "Unnamed User"}
          </h2>
          <p className={`mt-1 text-sm ${subText}`}>{email || "—"}</p>
          {bio?.welcomeMessage && (
            <p className={`mt-2 text-sm ${subText}`}>{bio.welcomeMessage}</p>
          )}

          {/* Roles */}
          <div className="mt-4 flex items-center justify-center gap-2">
            Roles:
            {(roles.length ? roles : ["USER"]).map((r: string) => (
              <RoleBadge key={r} role={r} dark={!!isDarkMode} />
            ))}
          </div>

          {/* Meta */}
          <div className={`mt-6 space-y-1 text-sm ${subText}`}>
            <div>
              Created: <span className={linkBlue}>{formatDate(createdAt)}</span>
            </div>
            <div>
              Updated: <span className={linkBlue}>{formatDate(updatedAt)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(`/edit-profile/${userId}`)}
              className="w-full max-w-xs rounded-full px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[.99] transition"
            >
              Edit Profile
            </button>

            {/* REMOVE button (opens modal) */}
            {!user.roles.includes("ADMIN") && (
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className={`w-full max-w-xs rounded-full px-6 py-3 text-sm font-semibold ring-1 transition
                ${
                  isDarkMode
                    ? "bg-transparent bg-red-500 text-white ring-red-500/40 hover:bg-red-700"
                    : "bg-transparent bg-red-500 text-white ring-red-200 hover:bg-red-700"
                }`}
              >
                Remove Account
              </button>
            )}
          </div>

          {/* Modal */}
          <ConfirmDeleteModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            isDarkMode={isDarkMode}
            title="Delete Account"
            prompt="Are you sure you want to delete your profile? This action cannot be undone."
            confirmText="Yes, delete"
            cancelText="Cancel"
          />

          {/* Image Preview Modal */}
          <ImagePreviewModal
            isOpen={showAvatarModal}
            src={avatarSrc}
            alt={`${username || "User"} avatar`}
            onClose={() => setShowAvatarModal(false)}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
