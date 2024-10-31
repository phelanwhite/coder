import {
  createColumn,
  deleteColumnById,
  getColumnsByBoardId,
  updateColumnById,
  updatePositionColumns,
} from "@/libs/prisma-query/column";
import { create } from "zustand";

type State = {
  columns: any[];
};

type Action = {
  getColumnsByBoardId: (boardId: string) => any;
  createColumn: (data: any) => any;
  updateColumnById: (id: string, data: any) => any;
  updateColumns: (data: any) => any;
  updatePositionColumns: (data: any) => any;
  deleteColumnById: (id: string) => any;
};

export const useColumnStore = create<State & Action>((set, get) => ({
  columns: [],
  getColumnsByBoardId: async (boardId) => {
    const resp = await getColumnsByBoardId(boardId);

    set({
      columns: resp,
    });
    return resp;
  },
  createColumn: async (data) => {
    const resp = await createColumn(data);
    set({
      columns: [...get().columns, resp],
    });
    return resp;
  },
  updateColumnById: async (id, data) => {
    const resp = await updateColumnById(id, data);
    set({
      columns: get().columns.map((item) =>
        item.id === id ? { ...item, ...resp } : item
      ),
    });
    return resp;
  },
  updateColumns: async (data) => {
    set({
      columns: data,
    });
    return get().columns;
  },
  updatePositionColumns: async (data) => {
    const resp = await updatePositionColumns(data);
    resp;
  },
  deleteColumnById: async (id: string) => {
    const resp = await deleteColumnById(id);
    set({
      columns: get().columns.filter((item) => item.id !== resp?.id),
    });
    return resp;
  },
}));
