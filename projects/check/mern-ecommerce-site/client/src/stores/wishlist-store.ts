import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  wishlists: any[];
  getWishlists: (query?: string) => any;
  createWishlist: (data: any) => any;
  updateWishlistById: (id: any, data: any) => any;
  deleteWishlistByProductId: (id: any) => any;
};

export const useWishlistStore = create<Type>()((set, get) => ({
  wishlists: [],
  getWishlists: async (query = "") => {
    const url = `/wishlist/get-all?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({ wishlists: response.data?.results });
    return response;
  },
  createWishlist: async (data) => {
    const url = `/wishlist/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      wishlists: [response?.data, ...get().wishlists],
    });
    return response;
  },
  updateWishlistById: async (id, data) => {
    const url = `/wishlist/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      wishlists: get().wishlists.map((item: any) =>
        item._id === id ? response?.data : item
      ),
    });
    return response;
  },
  deleteWishlistByProductId: async (id) => {
    const url = `/wishlist/delete-product-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      wishlists: get().wishlists.filter(
        (item: any) => item?.product?._id !== id
      ),
    });
    return response;
  },
}));
