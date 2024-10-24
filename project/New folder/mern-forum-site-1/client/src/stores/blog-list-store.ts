import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  blogsOfList: any[];
  addRemoveBlog: (data: any) => any;
  getBlogsByListId: (blogId: string, query?: string) => any;
};

export const useBlogListStore = create<Type>()((set, get) => ({
  blogsOfList: [],
  addRemoveBlog: async (data: any) => {
    const url = `blog-list/add-remove-blog`;
    const response = (
      await axiosConfig.post(url, {
        blog: data?.blog,
        list: data?.list,
      })
    ).data;
    return response;
  },
  getBlogsByListId: async (blogId, query?: string) => {
    const url = `blog-list/get-blogs-by-list-id/${blogId}?${query}`;
    const response = (await axiosConfig.get(url)).data;
    console.log({ response });

    set({ blogsOfList: response.data?.data });
    return response;
  },
}));
