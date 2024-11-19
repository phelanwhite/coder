import { create } from "zustand";

type TaskModalType = {
  isOpen: boolean;
  idTask: string;
  openModal: (idTask: string) => void;
  closeModal: () => void;
  toggleModal: () => void;
};

export const useTaskModalStore = create<TaskModalType>()((set, get) => ({
  isOpen: false,
  idTask: "",
  openModal: (idTask) => set({ isOpen: true, idTask: idTask }),
  closeModal: () => set({ isOpen: false }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
