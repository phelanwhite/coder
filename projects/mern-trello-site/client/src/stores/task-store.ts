import { dataColumn, dataTask } from "@/assets/data";
import { ColumnType, TaskType } from "@/assets/type";
import { axiosConfigV1 } from "@/configs/axios-config";
import { create } from "zustand";

type Type = {
  tasks: TaskType[];
  addTask: (data: any) => any;
  removeTask: (id: string) => any;
  updateTasks: (data: TaskType[]) => any;
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
