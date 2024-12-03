import { axiosConfigV1 } from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  favorites: any[];
  addRemveFavorite: (data: any) => any;
  deleteFavoriteById: (id: string) => any;
  getFavoriteByMe: (query?: string) => any;
};

export const useFavoriteStore = create<Type>()((set, get) => ({
  favorites: [],
  addRemveFavorite: async (data) => {
    const url = `favorite/add-remove`;
    const response = (await axiosConfigV1.post(url, data)).data;
    set({
      favorites: [response.data, ...get().favorites],
    });
    return response;
  },
  deleteFavoriteById: async (id) => {
    const url = `favorite/delete/${id}`;
    const response = (await axiosConfigV1.delete(url)).data;
    set({
      favorites: get().favorites.filter(
        (favorite) => favorite._id !== response?.data?._id
      ),
    });
    return response;
  },
  getFavoriteByMe: async (query) => {
    const url = `favorite/get-favorites-by-me?${query}`;
    const response = (await axiosConfigV1.get(url)).data;
    set({
      favorites: response.data?.results,
    });
    return response;
  },
}));
