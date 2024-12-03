import { axiosConfigV1 } from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  bookmarks: any[];
  addRemveBookmark: (data: any) => any;
  deleteBookmarkById: (id: string) => any;
  getBookmarkByMe: (query?: string) => any;
};

export const useBookmarkStore = create<Type>()((set, get) => ({
  bookmarks: [],
  addRemveBookmark: async (data) => {
    const url = `bookmark/add-remove`;
    const response = (await axiosConfigV1.post(url, data)).data;
    set({
      bookmarks: [response.data, ...get().bookmarks],
    });
    return response;
  },
  deleteBookmarkById: async (id) => {
    const url = `bookmark/delete/${id}`;
    const response = (await axiosConfigV1.delete(url)).data;
    set({
      bookmarks: get().bookmarks.filter(
        (bookmark) => bookmark._id !== response?.data?._id
      ),
    });
    return response;
  },
  getBookmarkByMe: async (query) => {
    const url = `bookmark/get-bookmarks-by-me?${query}`;
    const response = (await axiosConfigV1.get(url)).data;
    set({
      bookmarks: response.data?.results,
    });
    return response;
  },
}));
