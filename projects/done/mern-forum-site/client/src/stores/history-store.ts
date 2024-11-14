import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  histories: any[];
  createHistory: (data: any) => any;
  deleteHistoriesByMe: () => any;
  getHistoriesByMe: (query?: string) => any;
  deleteHistory: (query?: string) => any;
};

export const useHistoryStore = create<Type>()((set, get) => ({
  histories: [],
  createHistory: async (data) => {
    const url = `history/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      histories: [response.data, ...get().histories],
    });
    return response;
  },
  deleteHistoriesByMe: async () => {
    const url = `history/delete-histories-by-me`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      histories: [],
    });
    return response;
  },
  getHistoriesByMe: async (query?: string) => {
    const url = `history/get-histories-by-me?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      histories: response.data?.result,
    });
    return response;
  },
  deleteHistory: async (query) => {
    const url = `/history/delete?${query}`;
    const response = (await axiosConfig.delete(url)).data;

    set({
      histories: get().histories.filter(
        (item) => item._id !== response?.data?.blog
      ),
    });
    return response;
  },
}));
