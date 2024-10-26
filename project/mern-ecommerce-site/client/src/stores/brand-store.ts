import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  brands: any[];
  getBrands: (query?: string) => any;
  createBrand: (data: any) => any;
  updateBrandById: (id: any, data: any) => any;
  deleteBrandById: (id: any) => any;
};

export const useBrandStore = create<Type>()((set, get) => ({
  brands: [],
  getBrands: async (query = "") => {
    const url = `/brand/get-all?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({ brands: response.data?.results });
    return response;
  },
  createBrand: async (data) => {
    const url = `/brand/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      brands: [response?.data, ...get().brands],
    });
    return response;
  },
  updateBrandById: async (id, data) => {
    const url = `/brand/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      brands: get().brands.map((item: any) =>
        item._id === id ? response?.data : item
      ),
    });
    return response;
  },
  deleteBrandById: async (id) => {
    const url = `/brand/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      brands: get().brands.filter((item: any) => item._id !== id),
    });
    return response;
  },
}));
