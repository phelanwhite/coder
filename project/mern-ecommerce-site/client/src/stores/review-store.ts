import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  reviews: any[];
  getReviews: (query?: string) => any;
  createReview: (data: any) => any;
  updateReviewById: (id: any, data: any) => any;
  deleteReviewById: (id: any) => any;
};

export const useCommentStore = create<Type>()((set, get) => ({
  reviews: [],
  getReviews: async (query = "") => {
    const url = `/review/get-all?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({ reviews: response.data?.results });
    return response;
  },
  createReview: async (data) => {
    const url = `/review/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      reviews: [response?.data, ...get().reviews],
    });
    return response;
  },
  updateReviewById: async (id, data) => {
    const url = `/review/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      reviews: get().reviews.map((item: any) =>
        item._id === id ? response?.data : item
      ),
    });
    return response;
  },
  deleteReviewById: async (id) => {
    const url = `/review/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({
      reviews: get().reviews.filter((item: any) => item._id !== id),
    });
    return response;
  },
}));
