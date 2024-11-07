import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  topics: any[];
  getTopics: (query?: string) => any;
  deleteTopicById: (id: any) => any;
};

export const useTopicStore = create<Type>()((set, get) => ({
  topics: [],
  getTopics: async (query?: string) => {
    const url = `topic/get-all?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({
      topics: response.data?.result,
    });
    return response;
  },
  deleteTopicById: async (id) => {
    const url = `topic/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    return response;
  },
}));
