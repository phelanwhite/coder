import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  comments: any[];
  createComment: (data: any) => any;
  //   updateCommentById: (id: any, data: any) => any;
  deleteCommentById: (id: any) => any;
  getCommentsByBlogId: (blogId: any, query?: string) => any;
  getCommentsInfiniteByBlogId: (blogId: any, query?: string) => any;
  getCommentsByMe: (query?: string) => any;
};

export const useCommentStore = create<Type>()((set, get) => ({
  comments: [],
  createComment: async (data) => {
    const url = `comment/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      comments: [response.data, ...get().comments],
    });
    return response;
  },
  deleteCommentById: async (id) => {
    const url = `comment/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      comments: get().comments.filter((comment) => comment._id !== id),
    });
    return response;
  },
  getCommentsByBlogId: async (blogId, query) => {
    const url = `comment/get-all-by-blog-id/${blogId}?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      comments: response.data?.data,
    });
    return response;
  },
  getCommentsInfiniteByBlogId: async (blogId, query) => {
    const url = `comment/get-all-by-blog-id/${blogId}?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      comments: get().comments.concat(response.data?.data),
    });
    return response;
  },
  getCommentsByMe: async (query) => {
    const url = `comment/get-all-by-me?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      comments: response.data?.data,
    });
    return response;
  },
}));
