import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  isNotification: boolean;
  setNotification: (isNotification: boolean) => void;
  notifications: any[];
  getNotificationsByMe: (query?: string) => any;
  createNotificationBlog: (data: any) => any;
  deleteNotification: (id: string) => any;
};

export const useNotificationStore = create<Type>()((set, get) => ({
  isNotification: false,
  setNotification: (isNotification) => {
    set({ isNotification });
  },
  notifications: [],
  getNotificationsByMe: async (query) => {
    const url = `notification/get-notifications-by-me?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      notifications: response.data?.result,
    });
    return response;
  },
  createNotificationBlog: async (data) => {
    const url = `notification/create-notification-blog`;
    const response = await (await axiosConfig.post(url, data)).data;
    return response;
  },
  deleteNotification: async (query) => {
    const url = `notification/delete?${query}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      notifications: get().notifications.filter(
        (item) => item._id !== response?.data?.notification?.data
      ),
    });
    return response;
  },
}));
