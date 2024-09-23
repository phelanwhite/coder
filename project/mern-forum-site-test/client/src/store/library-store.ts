import axiosConfig from "@/config/axios-config";
import { create } from "zustand";

// list
type TypeList = {
  lists: any[];
  createList: (data: any) => any;
  updateListById: (id: any, data: any) => any;
  addRemoveBlogByListId: (id: any, data: any) => any;
  deleteListById: (id: any) => any;
  getListsByMe: (query?: string) => any;
  blogsOfList: any[];
  getListsById: (query?: string) => any;
};

export const useListStore = create<TypeList>()((set, get) => ({
  lists: [],
  blogsOfList: [],
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
      blogsOfList: get().blogsOfList.filter(
        (blog) => blog._id !== data?.blog_id
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
  getListsById: async (id) => {
    const url = `list/get-id/${id}`;
    const response = await (await axiosConfig.get(url)).data;

    set({
      blogsOfList: response.data?.blogs,
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
  checkHighlightByMe: (id: any) => any;
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
  checkHighlightByMe: async (id) => {
    const url = `highlight/check-highlight-blog?type_id=${id}`;
    const response = (await axiosConfig.get(url)).data;
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
