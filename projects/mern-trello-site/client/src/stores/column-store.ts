import { dataColumn } from "@/assets/data";
import { ColumnType } from "@/assets/type";
import { axiosConfigV1 } from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  columns: ColumnType[];
  addColumn: (data: any) => any;
  removeColumn: (id: string) => any;
  updateColumnById: (id: string, data: any) => any;
  updateColumns: (data: ColumnType[]) => any;
  updateColumnsPosition: (data: any) => any;
  getColumns: () => any;
};

export const useColumnStore = create<Type>()((set, get) => ({
  columns: [],
  addColumn: async (data) => {
    try {
      const url = `column/add`;
      const response = (await axiosConfigV1.post(url, data)).data;
      set({
        columns: [...get().columns, response?.data],
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  removeColumn: async (id) => {},
  updateColumnById: async (id, data) => {
    try {
      const url = `column/update-id/${id}`;
      const response = (await axiosConfigV1.post(url, data)).data;
      set({
        columns: get().columns.map((item) =>
          item._id === id ? { ...item, ...response?.data } : item
        ),
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  updateColumns: async (data) => {
    set({
      columns: data,
    });
  },
  updateColumnsPosition: async (data) => {
    try {
      const url = `column/update-position`;
      const response = (await axiosConfigV1.post(url, data)).data;
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getColumns: async () => {
    try {
      const url = `column/get-all-by-me`;
      const response = (await axiosConfigV1.get(url)).data;
      set({ columns: response?.data });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
}));
