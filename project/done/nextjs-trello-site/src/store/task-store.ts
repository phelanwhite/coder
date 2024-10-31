import {
  createTask,
  getTasksByBoardId,
  updateTaskById,
  updatePositionTasks,
  deleteTaskById,
} from "@/libs/prisma-query/task";
import { create } from "zustand";

type State = {
  tasks: any[];
};

type Action = {
  getTasksByBoardId: (boardId: string) => any;
  createTask: (data: any) => any;
  updateTaskById: (id: string, data: any) => any;
  updateTasks: (data: any) => any;
  updatePositionTasks: (data: any) => any;
  deleteTaskById: (id: string) => any;
};

export const useTaskStore = create<State & Action>((set, get) => ({
  tasks: [],
  getTasksByBoardId: async (boardId) => {
    const resp = await getTasksByBoardId(boardId);

    set({
      tasks: resp,
    });
    return resp;
  },
  createTask: async (data) => {
    const resp = await createTask(data);
    set({
      tasks: [...get().tasks, resp],
    });
    return resp;
  },
  updateTaskById: async (id, data) => {
    const resp = await updateTaskById(id, data);
    set({
      tasks: get().tasks.map((item) =>
        item.id === id ? { ...item, ...resp } : item
      ),
    });
    return resp;
  },
  updateTasks: async (data) => {
    set({
      tasks: data,
    });
    return get().tasks;
  },
  updatePositionTasks: async (data) => {
    const resp = await updatePositionTasks(data);
    return resp;
  },
  deleteTaskById: async (id) => {
    const resp = await deleteTaskById(id);
    set({
      tasks: get().tasks.filter((item) => item.id !== resp?.id),
    });
    return resp;
  },
}));
