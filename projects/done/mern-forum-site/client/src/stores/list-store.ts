import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  lists: any[];
  createList: (data: any) => any;
  updateListById: (id: any, data: any) => any;
  deleteListById: (id: any) => any;
  getListsByMe: (query?: string) => any;
};

export const useListStore = create<Type>()((set, get) => ({
  lists: [],
  createList: async (data) => {
    const url = `list/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      lists: [response.data, ...get().lists],
    });
    return response;
  },
  updateListById: async (id, data) => {
    const url = `list/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      lists: get().lists.map((list) =>
        list._id === id ? { ...list, ...response.data } : list
      ),
    });
    return response;
  },
  deleteListById: async (id) => {
    const url = `list/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      lists: get().lists.filter((list) => list._id !== response?.data?._id),
    });
    return response;
  },
  getListsByMe: async (query?: string) => {
    const url = `list/get-lists-by-me?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      lists: response.data?.result,
    });
    return response;
  },
}));
