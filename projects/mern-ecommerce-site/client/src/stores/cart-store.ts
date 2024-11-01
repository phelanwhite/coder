import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  carts: any[];
  getCarts: (query?: string) => any;
  createCart: (data: any) => any;
  updateCartById: (id: any, data: any) => any;
  deleteCartById: (id: any) => any;
};

export const useCartStore = create<Type>()((set, get) => ({
  carts: [],
  getCarts: async (query = "") => {
    const url = `/cart/get-all?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({ carts: response.data?.results });
    return response;
  },
  createCart: async (data) => {
    const url = `/cart/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      carts: [response?.data, ...get().carts],
    });
    return response;
  },
  updateCartById: async (id, data) => {
    const url = `/cart/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      carts: get().carts.map((item: any) =>
        item._id === id ? response?.data : item
      ),
    });
    return response;
  },
  deleteCartById: async (id) => {
    const url = `/cart/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({ carts: get().carts.filter((item: any) => item._id !== id) });
    return response;
  },
}));
