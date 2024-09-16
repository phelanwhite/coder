import {
  createComment,
  deleteCommentById,
  getCommentByTaskId,
  updateCommentById,
} from "@/libs/prisma-query/comment";
import { create } from "zustand";

type State = {
  comments: any[];
};

type Action = {
  createComment: (data: any) => any;
  updateCommentById: (id: string, data: any) => any;
  deleteCommentById: (id: string) => any;
  getCommentByTaskId: (id: string) => any;
};

export const useCommentStore = create<State & Action>((set, get) => ({
  comments: [],
  createComment: async (data) => {
    const resp = await createComment(data);
    set({
      comments: [resp, ...get().comments],
    });
    return resp;
  },
  updateCommentById: async (id, data) => {
    const resp = await updateCommentById(id, data);
    set({
      comments: get().comments.map((comment) =>
        comment.id === id ? { ...comment, ...data } : comment
      ),
    });
    return resp;
  },
  deleteCommentById: async (id) => {
    const resp = await deleteCommentById(id);
    set({
      comments: get().comments.filter((comment) => comment.id !== resp.id),
    });
    return id;
  },
  getCommentByTaskId: async (id) => {
    const resp = await getCommentByTaskId(id);
    set({
      comments: resp,
    });
    return resp;
  },
}));
