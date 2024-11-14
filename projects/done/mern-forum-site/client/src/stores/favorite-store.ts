import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  favorites: any[];
  addRemoveFavorite: (data: any) => any;
  getFavoritesByMe: (query?: string) => any;
  deleteFavorite: (query?: string) => any;
};

export const useFavoriteStore = create<Type>()((set, get) => ({
  favorites: [],
  getFavoritesByMe: async (query?: string) => {
    const url = `favorite/get-favorites-by-me?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      favorites: response.data?.result,
    });
    return response;
  },
  addRemoveFavorite: async (data) => {
    const url = `favorite/add-remove`;
    const response = await (await axiosConfig.post(url, data)).data;

    return response;
  },
  deleteFavorite: async (query) => {
    const url = `/favorite/delete?${query}`;
    const response = (await axiosConfig.delete(url)).data;

    set({
      favorites: get().favorites.filter(
        (item) => item._id !== response?.data?.blog
      ),
    });
    return response;
  },
}));
