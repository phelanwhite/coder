import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  categories: any[];
  getCategories: (query?: string) => any;
  createCategory: (data: any) => any;
  updateCategoryById: (id: any, data: any) => any;
  deleteCategoryById: (id: any) => any;
};

export const useCategoryStore = create<Type>()((set, get) => ({
  categories: [],
  getCategories: async (query = "") => {
    const url = `/category/get-all?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({ categories: response.data?.results });
    return response;
  },
  createCategory: async (data) => {
    const url = `/category/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      categories: [response?.data, ...get().categories],
    });
    return response;
  },
  updateCategoryById: async (id, data) => {
    const url = `/category/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      categories: get().categories.map((item: any) =>
        item._id === id ? response?.data : item
      ),
    });
    return response;
  },
  deleteCategoryById: async (id) => {
    const url = `/category/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      categories: get().categories.filter((item: any) => item._id !== id),
    });
    return response;
  },
}));
