import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  vieweds: any[];
  getViewed: (query?: string) => any;
  createViewed: (data: any) => any;
  updateViewedById: (id: any, data: any) => any;
  deleteViewedById: (id: any) => any;
  deleteVieweds: () => any;
};

export const useViewedStore = create<Type>()((set, get) => ({
  vieweds: [],
  getViewed: async (query = "") => {
    const url = `/viewed/get-all?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({ vieweds: response.data?.results });
    return response;
  },
  createViewed: async (data) => {
    const url = `/viewed/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      vieweds: [response?.data, ...get().vieweds],
    });
    return response;
  },
  updateViewedById: async (id, data) => {
    const url = `/viewed/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      vieweds: get().vieweds.map((item: any) =>
        item._id === id ? response?.data : item
      ),
    });
    return response;
  },
  deleteViewedById: async (id) => {
    const url = `/viewed/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({ vieweds: get().vieweds.filter((item: any) => item._id !== id) });
    return response;
  },
  deleteVieweds: async () => {
    const url = `/viewed/delete-all`;
    const response = await (await axiosConfig.delete(url)).data;
    set({ vieweds: [] });
    return response;
  },
}));
