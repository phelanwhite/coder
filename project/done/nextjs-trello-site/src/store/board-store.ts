import {
  createBoard,
  deleteBoardById,
  getBoards,
  updateBoardById,
} from "@/libs/prisma-query/board";
import { create } from "zustand";

type State = {
  boards: any[];
};

type Action = {
  getBoards: () => any;
  createBoard: (data: any) => any;
  updateBoardById: (id: string, data: any) => any;
  deleteBoardById: (id: string) => any;
  toggleFavoriteBoard: (id: string) => any;
};

export const useBoardStore = create<State & Action>((set, get) => ({
  boards: [],
  getBoards: async () => {
    const resp = await getBoards();
    set({
      boards: resp,
    });
    return resp;
  },
  createBoard: async (data) => {
    const resp = await createBoard(data);
    set({
      boards: [resp, ...get().boards],
    });
    return resp;
  },
  updateBoardById: async (id, data) => {
    const resp = await updateBoardById(id, data);
    set({
      boards: get().boards.map((item) =>
        item.id === id ? { ...item, ...resp } : item
      ),
    });
    return resp;
  },
  deleteBoardById: async (id) => {
    const resp = await deleteBoardById(id);
    set({
      boards: get().boards.filter((item) => item.id !== resp?.id),
    });
    return resp;
  },
  toggleFavoriteBoard: async (id) => {
    const board = get().boards.find((board) => board.id === id);
    const resp = await updateBoardById(id, {
      isFavorite: board.isFavorite ? false : true,
    });
    set({
      boards: get().boards.map((item) =>
        item.id === id ? { ...item, ...resp } : item
      ),
    });
    return resp;
  },
}));
