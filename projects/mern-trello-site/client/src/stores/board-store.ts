import { dataColumn } from "@/assets/data";
import { BoardType, ColumnType } from "@/assets/type";
import { axiosConfigV1 } from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  boards: BoardType[];
  addBoard: (data: any) => any;
  removeBoard: (id: string) => any;
  updateBoardById: (id: string, data: any) => any;
  getBoards: () => any;
};

export const useBoardStore = create<Type>()((set, get) => ({
  boards: [],
  addBoard: async (data) => {
    try {
      const url = `board/add`;
      const response = (await axiosConfigV1.post(url, data)).data;
      set({
        boards: [response?.data, ...get().boards],
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  removeBoard: async (id) => {},
  updateBoardById: async (id, data) => {
    try {
      const url = `board/update-id/${id}`;
      const response = (await axiosConfigV1.post(url, data)).data;
      set({
        boards: get().boards.map((board) =>
          board._id === id ? response?.data : board
        ),
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getBoards: async () => {
    try {
      const url = `board/get-all-by-me`;
      const response = (await axiosConfigV1.get(url)).data;
      set({
        boards: response?.data,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
}));
