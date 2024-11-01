import { FC, memo } from "react";
import { create } from "zustand";
import { MdClose } from "react-icons/md";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}
const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return <></>;
  return (
    <div className="bg-black/50 px-4 overflow-y-auto fixed top-0 left-0 bottom-0 right-0 z-[1000] py-12">
      <div
        onClick={onClose}
        className="absolute top-0 left-0 bottom-0 right-0"
      ></div>
      <div className="z-10 max-w-[800px] w-full mx-auto bg-bg-form rounded-md overflow-hidden relative">
        <button
          onClick={onClose}
          className="text-base p-1.5 rounded-full hover:bg-gray-300 absolute top-2 right-2"
        >
          <MdClose />
        </button>
        {children}
      </div>
    </div>
  );
};
export default memo(Modal);

type State = {
  isOpen: boolean;
  id: string;
};
type Actions = {
  handleOpen: (id: string) => any;
  handleClose: () => any;
  toggleOpen: () => any;
};
export const useModal = create<State & Actions>()((set, get) => ({
  isOpen: false,
  id: "",
  handleOpen: (id) => set({ isOpen: true, id }),
  handleClose: () => set({ isOpen: false, id: "" }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
