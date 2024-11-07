import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  users: any[];
  getUsers: (query?: string) => any;
  createUser: (data: any) => any;
  updateUserById: (id: any, data: any) => any;
  deleteUserById: (id: any) => any;
};

export const useUserStore = create<Type>()((set, get) => ({
  users: [],
  getUsers: async (query = "") => {
    const url = `/user/get-all?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({ users: response.data?.results });
    return response;
  },
  createUser: async (data) => {
    const url = `/user/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      users: [response?.data, ...get().users],
    });
    return response;
  },
  updateUserById: async (id, data) => {
    const url = `/user/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      users: get().users.map((item: any) =>
        item._id === id ? response?.data : item
      ),
    });
    return response;
  },
  deleteUserById: async (id) => {
    const url = `/user/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      users: get().users.filter((item: any) => item._id !== id),
    });
    return response;
  },
}));
