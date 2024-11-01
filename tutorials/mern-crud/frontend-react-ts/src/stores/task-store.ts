import { create } from "zustand";
import { TaskType } from "../libs/types/task";
import axiosConfig from "../configs/axios-config";

type Type = {
  tasks: TaskType[];
  getTasks: (query?: string) => any;
  addTask: (task: TaskType) => any;
  updateTask: (id: string, task: TaskType) => any;
  completedTask: (id: string, completed: boolean) => any;
  deleteTask: (id: string) => any;
};

export const useTaskStore = create<Type>()((set, get) => ({
  tasks: [],
  getTasks: async (query) => {
    const url = `task?${query}`;
    const resp = await (await axiosConfig.get(url)).data;
    set({ tasks: resp });
    return resp;
  },
  addTask: async (task) => {
    const url = `task/`;
    const resp = await (await axiosConfig.post(url, task)).data;
    set({
      tasks: [...get().tasks, resp.data],
    });
    return resp;
  },
  updateTask: async (id, task) => {
    const url = `task/${id}`;
    const resp = await (await axiosConfig.put(url, task)).data;
    set({
      tasks: get().tasks.map((t) => (t._id === id ? resp.data : t)),
    });
    return resp;
  },
  completedTask: async (id, completed) => {
    const url = `task/${id}`;
    const resp = await (await axiosConfig.put(url, { completed })).data;
    set({
      tasks: get().tasks.map((t) => (t._id === id ? resp.data : t)),
    });
    return resp;
  },
  deleteTask: async (id) => {
    const url = `task/${id}`;
    await axiosConfig.delete(url);
    set({
      tasks: get().tasks.filter((t) => t._id !== id),
    });
    return id;
  },
}));
