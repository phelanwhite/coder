import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  bookmarks: any[];
  addRemoveBookmark: (data: any) => any;
  getBookmarksByMe: (query?: string) => any;
};

export const useBookmarkStore = create<Type>()((set, get) => ({
  bookmarks: [],
  getBookmarksByMe: async (query?: string) => {
    const url = `bookmark/get-bookmarks-by-me?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      bookmarks: response.data?.result,
    });
    return response;
  },
  addRemoveBookmark: async (data) => {
    const url = `bookmark/add-remove`;
    const response = await (await axiosConfig.post(url, data)).data;
    // // remove
    // set({
    //   bookmarks: get().bookmarks.filter((item) => {
    //     return item?.blog?._id !== data?.blog;
    //   }),
    // });
    return response;
  },
}));
