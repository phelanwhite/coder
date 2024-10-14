import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  comments: any[];
  total_comments: number;
  createComment: (data: any) => any;
  // updateCommentById: (id: any, data: any) => any;
  likeDislikeByCommentId: (id: any) => any;
  deleteCommentById: (id: any) => any;
  getCommentsByPostId: (postId: string, query?: string) => any;
  getCommentsByMe: (query?: string) => any;
  getResponsesByBlogs: (query?: string) => any;
};

export const useCommentStore = create<Type>()((set, get) => ({
  comments: [],
  total_comments: 0,
  createComment: async (data) => {
    const url = `/comment/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      comments: [response.data?.blog && response.data, ...get().comments],
      total_comments: get().total_comments + 1,
    });
    return response;
  },
  deleteCommentById: async (id) => {
    const url = `/comment/delete-id/${id}`;
    const response = (await axiosConfig.delete(url)).data;
    set({
      comments: get().comments.filter((comment) => comment._id !== id),
    });
    return response;
  },
  likeDislikeByCommentId: async (id) => {
    const url = `/comment/like-dislike-by-comment-id/${id}`;
    const response = (await axiosConfig.put(url)).data;
    set({
      comments: get().comments.map((comment) =>
        comment._id === id ? { ...comment, ...response?.data } : comment
      ),
    });
    return response;
  },
  getCommentsByPostId: async (postId, query = "") => {
    const url = `/comment/get-comments-by-blog-id/${postId}?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({
      comments: response.data?.result,
      total_comments: response.data?.total_row,
    });
    return response;
  },
  getCommentsByMe: async (query) => {
    const url = `/comment/get-comments-by-me?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({ comments: response.data?.result });
    return response;
  },
  getResponsesByBlogs: async (query) => {
    const url = `/comment/get-responses-by-blogs?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({ comments: response.data?.result });
    return response;
  },
}));
