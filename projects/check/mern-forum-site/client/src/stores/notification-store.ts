import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  notifications: any[];
  isNotification: boolean;
  getNotifications: (query?: string) => any;
  deleteNotificationByID: (id: string) => any;
};

export const useNotificationStore = create<Type>()((set, get) => ({
  notifications: [],
  isNotification: false,
  getNotifications: async (query?: string) => {
    const url = `notification/get-by-me?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      notifications: response.data?.result,
    });
    return response;
  },
  deleteNotificationByID: async (id: string) => {
    const url = `notification/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      notifications: get().notifications.filter(
        (notification) => notification._id !== id
      ),
    });
    return response;
  },
}));
