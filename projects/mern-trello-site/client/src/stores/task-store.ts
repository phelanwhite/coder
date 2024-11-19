import { TaskType } from "@/assets/type";
import { axiosConfigV1 } from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  tasks: TaskType[];
  addTask: (data: any) => any;
  removeTask: (id: string) => any;
  updateTaskById: (id: string, data: any) => any;
  updateTasks: (data: any) => any;
  updateTasksPosition: (data: any) => any;
  getTasks: () => any;
};

export const useTaskStore = create<Type>()((set, get) => ({
  tasks: [],
  addTask: async (data) => {
    try {
      const url = `task/add`;
      const response = (await axiosConfigV1.post(url, data)).data;
      set({
        tasks: [...get().tasks, response?.data],
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  removeTask: (id) => {
    set({
      tasks: get().tasks.filter((task) => task._id !== id),
    });
  },
  updateTaskById: async (id, data) => {
    try {
      const url = `task/update-id/${id}`;
      const response = (await axiosConfigV1.post(url, data)).data;
      set({
        tasks: get().tasks.map((task) =>
          task._id === id ? { ...task, ...response?.data } : task
        ),
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateTasks: (data) => {
    set({
      tasks: data,
    });
  },
  updateTasksPosition: async (data) => {
    try {
      const url = `task/update-position`;
      const response = (await axiosConfigV1.post(url, data)).data;
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getTasks: async () => {
    try {
      const url = `task/get-all-by-me`;
      const response = (await axiosConfigV1.get(url)).data;
      set({ tasks: response?.data });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
}));
