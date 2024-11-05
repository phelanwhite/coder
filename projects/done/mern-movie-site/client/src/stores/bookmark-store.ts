import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  bookmarks: any[];
  deleteBookmarkById: (id: string) => any;
  checkBookmarks: (data: any) => any;
  addRemoveBookmark: (data: any) => any;
  getBookmarksByUser: (query?: string) => any;
};

export const useBookmarkStore = create<Type>()((set, get) => ({
  bookmarks: [],
  deleteBookmarkById: async (id) => {
    const url = `bookmark/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      bookmarks: get().bookmarks.filter((item) => item._id !== id),
    });
    return response;
  },
  checkBookmarks: async (data) => {
    const url = `bookmark/check-exists`;
    const response = (await axiosConfig.post(url, data)).data;
    return response;
  },
  addRemoveBookmark: async (data) => {
    const url = `bookmark/add-remove`;
    const response = (await axiosConfig.post(url, data)).data;
    return response;
  },
  getBookmarksByUser: async (query = "") => {
    const url = `bookmark/get-bookmark-by-user?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({ bookmarks: response?.data?.results });
    return response;
  },
}));
