import {
  createFile,
  deleteFileById,
  getFilesByTaskId,
} from "@/libs/prisma-query/file";
import { create } from "zustand";

type State = {
  files: any[];
};

type Action = {
  createFile: (data: any) => any;
  deleteFileById: (id: string) => any;
  getFilesByTaskId: (id: string) => any;
};

export const useFileStore = create<State & Action>((set, get) => ({
  files: [],
  createFile: async (data) => {
    const resp = await createFile(data);
    set({
      files: [...get().files, resp],
    });
    return resp;
  },
  deleteFileById: async (id) => {
    const resp = await deleteFileById(id);
    set({
      files: get().files.filter((item) => item.id !== resp.id),
    });
    return id;
  },
  getFilesByTaskId: async (id) => {
    const resp = await getFilesByTaskId(id);
    set({
      files: resp,
    });
    return resp;
  },
}));
