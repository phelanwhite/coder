import { axiosConfigV1 } from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  histories: any[];
  createHistory: (data: any) => any;
  deleteHistoryById: (id: string) => any;
  deleteHistoriesByMe: () => any;
  getHistoriesByMe: (query?: string) => any;
};

export const useHistoryStore = create<Type>()((set, get) => ({
  histories: [],
  createHistory: async (data) => {
    const url = `history/create`;
    const response = (await axiosConfigV1.post(url, data)).data;
    set({
      histories: [response.data, ...get().histories],
    });
    return response;
  },
  deleteHistoryById: async (id) => {
    const url = `history/delete/${id}`;
    const response = (await axiosConfigV1.delete(url)).data;
    set({
      histories: get().histories.filter(
        (history) => history._id !== response?.data?._id
      ),
    });
    return response;
  },
  deleteHistoriesByMe: async () => {
    const url = `history/delete-histories-by-me`;
    const response = (await axiosConfigV1.delete(url)).data;

    set({
      histories: [],
    });
    return response;
  },
  getHistoriesByMe: async (query = "") => {
    const url = `history/get-histories-by-me?${query}`;
    const response = (await axiosConfigV1.get(url)).data;
    set({
      histories: response.data?.results,
    });
    return response;
  },
}));
