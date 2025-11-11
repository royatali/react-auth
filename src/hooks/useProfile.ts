import { toast } from "react-toastify";
import { useDarkMode } from "./useDarKMode";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import useLogout from "./useLogout";
import useUserService from "./useUserService";
import { User } from "../types/user.types";

const useProfile = () => {
  const { isDarkMode } = useDarkMode();
  const navigate: NavigateFunction = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { getUser, removeUser } = useUserService();
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const logout = useLogout();

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const { data: user } = await getUser(userId);
        setUser(user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleDelete = async () => {
    try {
      await removeUser(+(userId as string));
      await logout();
      navigate("/");
      toast.success(`User deleted successfully!`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    loading,
    error,
    isDarkMode,
    user,
    navigate,
    userId,
    setShowDeleteModal,
    showDeleteModal,
    handleDelete,
    showAvatarModal,
    setShowAvatarModal,
  };
};

export default useProfile;
