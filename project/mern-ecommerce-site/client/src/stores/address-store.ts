import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  address: any[];
  getAddress: (query?: string) => any;
  createAddress: (data: any) => any;
  updateAddressById: (id: any, data: any) => any;
  deleteAddressById: (id: any) => any;
};

export const useAddressStore = create<Type>()((set, get) => ({
  address: [],
  getAddress: async (query = "") => {
    const url = `/address/get-all?${query}`;
    const response = await (await axiosConfig.get(url)).data;
    set({ address: response.data?.results });
    return response;
  },
  createAddress: async (data) => {
    const url = `/address/create`;
    const response = await (await axiosConfig.post(url, data)).data;
    set({
      address: [response?.data, ...get().address],
    });
    return response;
  },
  updateAddressById: async (id, data) => {
    const url = `/address/update-id/${id}`;
    const response = await (await axiosConfig.put(url, data)).data;
    set({
      address: get().address.map((item: any) =>
        item._id === id ? response?.data : item
      ),
    });
    return response;
  },
  deleteAddressById: async (id) => {
    const url = `/address/delete-id/${id}`;
    const response = await (await axiosConfig.delete(url)).data;
    set({ address: get().address.filter((item: any) => item._id !== id) });
    return response;
  },
}));
