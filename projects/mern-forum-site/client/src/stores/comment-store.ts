import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  comments: any[];
  total_comment: number;
  createComment: (data: any) => any;
  createReply: (data: any) => any;
  // updateCommentById: (id: any, data: any) => any;
  likeDislikeByCommentId: (id: any) => any;
  deleteCommentById: (id: any) => any;
  getCommentsByBlogId: (postId: string, query?: string) => any;
  getCommentsByMe: (query?: string) => any;
  getResponsesByBlogs: (query?: string) => any;
  getComments: (query?: string) => any;

  replies: any[];
  getRepliesByCommentId: (commentId: any, query?: string) => any;
};

export const useCommentStore = create<Type>()((set, get) => ({
  comments: [],
  replies: [],
  total_comment: 0,
  total_reply: 0,
  createComment: async (data) => {
    const url = `/comment/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      comments: [response.data, ...get().comments],
      total_comment: get().total_comment + 1,
    });
    return response;
  },
  createReply: async (data) => {
    const url = `/comment/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      replies: [response.data, ...get().replies],
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
  getCommentsByBlogId: async (postId, query = "") => {
    const url = `/comment/get-comments-by-blog-id/${postId}?${query}`;
    const response = (await axiosConfig.get(url)).data;

    set({
      comments: response.data?.result,
      total_comment: response.data?.total_row,
    });
    return response;
  },
  getRepliesByCommentId: async (commentId, query = "") => {
    const url = `comment/get-replies-by-comment-id/${commentId}?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({ replies: response.data?.result });
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
  getComments: async (query) => {
    const url = `/comment/get-all?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({ comments: response.data?.result });
    return response;
  },
}));
