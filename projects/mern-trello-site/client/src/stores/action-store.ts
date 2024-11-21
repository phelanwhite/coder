import { axiosConfigV1 } from "@/configs/axios-config";
import { create } from "zustand";

type ActionType = {
  // file
  files: any[];
  uploadFile: (task: string, file: File) => any;
  deleteFile: (id: string) => any;
  getFilesByTaskId: (id: string) => any;

  //comment
  createComment: (task: string, data: any) => any;
  updateCommentById: (id: string, data: any) => any;
  deleteCommentById: (id: string) => any;
  //   action
  actions: any[];
  getActionsByTaskId: (id: string) => any;
};

export const useActionStore = create<ActionType>()((set, get) => ({
  files: [],
  uploadFile: async (task, file) => {
    try {
      const formData = new FormData();
      formData.append("task", task);
      formData.append("file", file);
      const url = `action/upload-file`;
      const response = (await axiosConfigV1.post(url, formData)).data;
      set({
        files: [response?.data, ...get().files],
        actions: [response?.data, ...get().actions],
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  deleteFile: async (id) => {
    try {
      const url = `action/delete-file/${id}`;
      const response = (await axiosConfigV1.delete(url)).data;
      set({
        files: get().files.filter((file) => file._id !== response.data?._id),
        actions: get().actions.filter(
          (action) => action._id !== response.data?._id
        ),
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  getFilesByTaskId: async (id) => {
    try {
      const url = `action/get-files-by-task/${id}`;
      const response = (await axiosConfigV1.get(url)).data;
      set({
        files: response?.data,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  createComment: async (task, data) => {
    try {
      const url = `action/create-comment`;
      const response = (await axiosConfigV1.post(url, { task, data })).data;
      set({
        actions: [response?.data, ...get().actions],
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  updateCommentById: async (id, data) => {
    try {
      const url = `action/update-comment/${id}`;
      const response = (await axiosConfigV1.post(url, data)).data;
      set({
        actions: get().actions.map((action) =>
          action._id === id ? { ...action, ...response?.data } : action
        ),
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  deleteCommentById: async (id) => {
    try {
      const url = `action/delete-comment/${id}`;
      const response = (await axiosConfigV1.delete(url)).data;
      set({
        actions: get().actions.filter(
          (action) => action._id !== response.data?._id
        ),
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  actions: [],
  getActionsByTaskId: async (id) => {
    try {
      const url = `action/get-actions-by-task/${id}`;
      const response = (await axiosConfigV1.get(url)).data;
      set({
        actions: response?.data,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
}));
