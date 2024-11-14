import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  users: any[];
  getUsersByAdmin: (query?: string) => any;
};

export const useUserStore = create<Type>()((set, get) => ({
  users: [],
  getUsersByAdmin: async (query?: string) => {
    const url = `admin/get-users?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      users: response.data?.result,
    });
    return response;
  },
}));
