import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

// list
type TypeList = {
  lists: any[];
  createList: (data: any) => any;
  updateListById: (id: any, data: any) => any;
  addRemoveBlogByListId: (id: any, data: any) => any;
  deleteListById: (id: any) => any;
  getListsByMe: (query?: string) => any;
};

export const useListStore = create<TypeList>()((set, get) => ({
  lists: [],
  createList: async (data) => {
    const url = `list/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      lists: [response.data, ...get().lists],
    });
    return response;
  },
  updateListById: async (id, data) => {
    const url = `list/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      lists: get().lists.map((list) =>
        list._id === id ? { ...list, ...response.data } : list
      ),
    });
    return response;
  },
  addRemoveBlogByListId: async (id, data) => {
    const url = `list/add-remove-blog/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;

    set({
      lists: get().lists.map((list) =>
        list._id === id ? { ...list, ...response.data } : list
      ),
    });
    return response;
  },
  deleteListById: async (id) => {
    const url = `list/delete-id/${id}`;
    const response = (await axiosConfig.delete(url)).data;
    set({
      lists: get().lists.filter((list) => list._id !== id),
    });
    return response;
  },
  getListsByMe: async (query = "") => {
    const url = `list/get-all-by-me?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      lists: response.data?.data,
    });
    return response;
  },
}));

// highlight
type TypeHighlight = {
  highlights: any[];
  createHighlight: (data: any) => any;
  deleteHighlightById: (id: any) => any;
  getHighlightsByMe: (query?: string) => any;
};

export const useHighlightStore = create<TypeHighlight>()((set, get) => ({
  highlights: [],
  createHighlight: async (data) => {
    const url = `highlight/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      highlights: [response.data, ...get().highlights],
    });
    return response;
  },
  deleteHighlightById: async (id) => {
    const url = `highlight/delete-id/${id}`;
    const response = (await axiosConfig.delete(url)).data;
    set({
      highlights: get().highlights.filter((highlight) => highlight._id !== id),
    });
    return response;
  },
  getHighlightsByMe: async (query = "") => {
    const url = `highlight/get-all-by-me?${query}`;
    const response = (await axiosConfig.get(url)).data;

    set({
      highlights: response.data?.data,
    });
    return response;
  },
}));

// like
type TypeLike = {
  likes: any[];
  numberOfLikes: number;
  createLike: (data: any) => any;
  deleteLikeById: (id: any) => any;
  getLikesByBlogId: (id: any, query?: string) => any;
};

export const useLikeStore = create<TypeLike>()((set, get) => ({
  likes: [],
  numberOfLikes: 0,
  createLike: async (data) => {
    const url = `like/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      numberOfLikes: get().numberOfLikes + 1,
    });
    return response;
  },
  deleteLikeById: async (id) => {
    const url = `like/delete-id/${id}`;
    const response = (await axiosConfig.delete(url)).data;
    set({
      numberOfLikes: get().numberOfLikes - 1,
    });
    return response;
  },
  getLikesByBlogId: async (id, query = "") => {
    const url = `like/get-blog-id/${id}?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({
      likes: response.data?.data,
      numberOfLikes: response.data?.total_row,
    });
    return response;
  },
}));

// history
type TypeHistory = {
  history: any[];
  createHistory: (data: any) => any;
  deleteAllHistoryByMe: () => any;
  getHistoryByMe: (query?: string) => any;
};

export const useHistoryStore = create<TypeHistory>()((set, get) => ({
  history: [],
  createHistory: async (data) => {
    const url = `history/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      history: [response.data, ...get().history],
    });
    return response;
  },
  deleteAllHistoryByMe: async () => {
    const url = `history/delete-all-by-me`;
    const response = (await axiosConfig.delete(url)).data;
    set({
      history: [],
    });
    return response;
  },
  getHistoryByMe: async (query = "") => {
    const url = `history/get-all-by-me?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({
      history: response.data?.data,
    });
    return response;
  },
}));
