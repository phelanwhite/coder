import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  favories: any[];
  deleteFavoriteById: (id: string) => any;
  checkFavorites: (data: any) => any;
  addRemoveFavorite: (data: any) => any;
  getFavoritesByUser: (query?: string) => any;
};

export const useFavoriteStore = create<Type>()((set, get) => ({
  favories: [],
  deleteFavoriteById: async (id) => {
    const url = `favorite/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      favories: get().favories.filter((item) => item._id !== id),
    });
    return response;
  },
  checkFavorites: async (data) => {
    const url = `favorite/check-exists`;
    const response = (await axiosConfig.post(url, data)).data;
    return response;
  },
  addRemoveFavorite: async (data) => {
    const url = `favorite/add-remove`;
    const response = (await axiosConfig.post(url, data)).data;
    return response;
  },
  getFavoritesByUser: async (query = "") => {
    const url = `favorite/get-favorite-by-user?${query}`;
    const response = (await axiosConfig.get(url)).data;
    set({ favories: response?.data?.results });
    return response;
  },
}));
