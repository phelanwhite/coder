import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  blogs: any[];
  createBlog: (data: any) => any;
  updateBlogById: (id: any, data: any) => any;
  changeStatusBlogById: (id: string, data: any) => any;
  deleteBlogById: (id: any) => any;
  getBlogs: (query?: string) => any;
  getBlogsByMe: (query?: string) => any;
  getBlogsByAdmin: (query?: string) => any;
};

export const useBlogStore = create<Type>()((set, get) => ({
  blogs: [],
  createBlog: async (data) => {
    const url = `blog/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      blogs: [response.data, ...get().blogs],
    });
    return response;
  },
  updateBlogById: async (id, data) => {
    const url = `blog/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      blogs: get().blogs.map((blog) =>
        blog._id === id ? { ...blog, ...response.data } : blog
      ),
    });
    return response;
  },
  changeStatusBlogById: async (id, data) => {
    const url = `blog/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      blogs: get().blogs.filter((blog) => blog._id !== id),
    });
    return response;
  },
  deleteBlogById: async (id) => {
    const url = `blog/delete-id/${id}`;
    const response = (await axiosConfig.delete(url)).data;
    set({
      blogs: get().blogs.filter((blog) => blog._id !== response?.data?._id),
    });
    return response;
  },
  getBlogs: async (query) => {
    const url = `blog/get-all?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({ blogs: response.data?.data });
    return response;
  },
  getBlogsByMe: async (query) => {
    const url = `blog/get-blogs-by-me?${query}`;
    const response = (await axiosConfig.get(url)).data;

    set({ blogs: response.data?.result });
    return response;
  },
  getBlogsByAdmin: async (query) => {
    const url = `admin/get-blogs?${query}`;
    const response = (await axiosConfig.get(url)).data;

    set({ blogs: response.data?.result });
    return response;
  },
}));
