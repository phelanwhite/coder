import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  products: any[];
  getProducts: (query?: string) => any;
  createProduct: (data: any) => any;
  updateProductById: (id: any, data: any) => any;
  deleteProductById: (id: any) => any;
};

export const useProductStore = create<Type>()((set, get) => ({
  products: [],
  getProducts: async (query = "") => {
    const url = `/product/get-all?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({ products: response.data?.results });
    return response;
  },
  createProduct: async (data) => {
    const url = `/product/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      products: [response?.data, ...get().products],
    });
    return response;
  },
  updateProductById: async (id, data) => {
    const url = `/product/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      products: get().products.map((item: any) =>
        item._id === id ? response?.data : item
      ),
    });
    return response;
  },
  deleteProductById: async (id) => {
    const url = `/product/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      products: get().products.filter((item: any) => item._id !== id),
    });
    return response;
  },
}));
