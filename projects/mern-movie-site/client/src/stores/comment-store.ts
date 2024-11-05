import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  comments: any[];
  createComment: (data: any) => any;
  deleteCommentById: (id: string) => any;
  updateCommentById: (id: string, data: any) => any;
  getCommentsByMediaId: (id: string, query?: string) => any;
  getCommentsByUser: (query?: string) => any;
};

export const useCommentStore = create<Type>()((set, get) => ({
  comments: [],
  createComment: async (data) => {
    const url = `comment/create`;
    const response = (await axiosConfig.post(url, data)).data;
    set({
      comments: [response.data, ...get().comments],
    });
    return response;
  },
  deleteCommentById: async (id) => {
    const url = `comment/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      comments: get().comments.filter((item) => item?.data?._id !== id),
    });
    return response;
  },
  updateCommentById: async (id, data) => {
    const url = `comment/update-id/${id}`;
    const response = (await axiosConfig.put(url, data)).data;
    set({
      comments: get().comments.map((item) =>
        item._id === id ? response.data : item
      ),
    });
    return response;
  },
  getCommentsByMediaId: async (id, query = "") => {
    const url = `comment/get-by-media-id/${id}?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({
      comments: response.data?.results,
    });
    return response;
  },
  getCommentsByUser: async (query = "") => {
    const url = `comment/get-by-user?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({
      comments: response.data?.results,
    });
    return response;
  },
}));
