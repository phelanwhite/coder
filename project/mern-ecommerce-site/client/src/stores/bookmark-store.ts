import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  bookmarks: any[];
  getBookmarks: (query?: string) => any;
  createBookmark: (data: any) => any;
  updateBookmarkById: (id: any, data: any) => any;
  deleteBookmarkByProductId: (id: any) => any;
};

export const useBookmarkStore = create<Type>()((set, get) => ({
  bookmarks: [],
  getBookmarks: async (query = "") => {
    const url = `/bookmark/get-all?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({ bookmarks: response.data?.results });
    return response;
  },
  createBookmark: async (data) => {
    const url = `/bookmark/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      bookmarks: [response?.data, ...get().bookmarks],
    });
    return response;
  },
  updateBookmarkById: async (id, data) => {
    const url = `/bookmark/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      bookmarks: get().bookmarks.map((item: any) =>
        item._id === id ? response?.data : item
      ),
    });
    return response;
  },
  deleteBookmarkByProductId: async (id) => {
    const url = `/bookmark/delete-product-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      bookmarks: get().bookmarks.filter(
        (item: any) => item?.product?._id !== id
      ),
    });
    return response;
  },
}));
