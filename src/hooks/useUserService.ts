import { AxiosResponse } from "axios";
import { API_URLS } from "../api/api-urls";

import { User } from "../types/user.types";
import useAxiosPrivate from "./useAxiosPrivate";
import { UpdateUserSchema } from "../schemas/updateUserSchema.schema";

const useUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const getUser = async (id: string): Promise<AxiosResponse<User, any, {}>> => {
    try {
      const { getUser } = API_URLS;

      return axiosPrivate.get<User>(`${getUser}/${id}`);
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (id: number, updatedUser: UpdateUserSchema) => {
    try {
      const { updateUser } = API_URLS;

      return axiosPrivate.put<User>(`${updateUser}/${id}`, updatedUser);
    } catch (error) {
      throw error;
    }
  };

  const removeUser = async (id: number) => {
    try {
      const { removeUser } = API_URLS;

      return axiosPrivate.delete(`${removeUser}/${id}`);
    } catch (error) {
      throw error;
    }
  };

  return { getUser, updateUser, removeUser };
};

export default useUsers;
