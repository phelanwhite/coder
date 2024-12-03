import { axiosConfigV1 } from "@/configs/axios-config";
import { PostType } from "@/constants/type";
import { create } from "zustand";

type Type = {
  posts: PostType[];
  createPost: (data: any) => any;
  updatePostById: (id: string, data: any) => any;
  changeStatusBlogById: (id: string, data: PostType) => any;
  deletePostById: (id: string) => any;
  getPostByMe: (query?: string) => any;
};

export const usePostStore = create<Type>()((set, get) => ({
  posts: [],
  createPost: async (data) => {
    const url = `post/create`;
    const response = (await axiosConfigV1.post(url, data)).data;
    set({
      posts: [response.data, ...get().posts],
    });
    return response;
  },
  updatePostById: async (id, data) => {
    const url = `post/update/${id}`;
    const response = (await axiosConfigV1.put(url, data)).data;
    set({
      posts: get().posts.map((post) =>
        post._id === id ? { ...post, ...response?.data } : post
      ),
    });
    return response;
  },
  changeStatusBlogById: async (id, data) => {
    const url = `post/update/${id}`;
    const response = await (await axiosConfigV1.put(url, data)).data;
    set({
      posts: get().posts.filter((post) => post._id !== response?.data?._id),
    });
    return response;
  },
  deletePostById: async (id) => {
    const url = `post/delete/${id}`;
    const response = (await axiosConfigV1.delete(url)).data;
    set({
      posts: get().posts.filter((post) => post._id !== response?.data?._id),
    });
    return response;
  },
  getPostByMe: async (query) => {
    const url = `post/get-posts-by-me?${query}`;
    const response = (await axiosConfigV1.get(url)).data;
    set({
      posts: response.data?.results,
    });
    return response;
  },
}));
