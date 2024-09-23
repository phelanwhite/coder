import { useListStore } from "@/store/library-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import CreateAndUpdateListForm from "../form/CreateAndUpdateListForm";

const ListItemMenu = ({ data }: { data: any }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [editData, setEditData] = useState({
    idEdit: "",
    isEdit: false,
  });
  const [isOpenForm, setIsOpenForm] = useState(false);
  const handleCloseForm = () => setIsOpenForm(false);
  const handleOpenForm = () => setIsOpenForm(true);

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const { deleteListById } = useListStore();
  const deleteListByIdResult = useMutation({
    mutationFn: async () => {
      const response = await deleteListById(data?._id);
      return response;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  return (
    <>
      <CreateAndUpdateListForm
        isOpen={isOpenForm}
        onClose={handleCloseForm}
        idEdit={editData.idEdit}
        isEdit={editData.isEdit}
      />
      <div className="relative" ref={menuRef}>
        <button onClick={() => setIsOpenMenu(!isOpenMenu)}>
          <HiOutlineDotsHorizontal />
        </button>
        {isOpenMenu && (
          <div className="z-10 py-2 absolute right-0 shadow rounded border min-w-[120px] bg-white">
            <button
              onClick={() => {
                setEditData({
                  idEdit: data?._id,
                  isEdit: true,
                });
                handleOpenForm();
              }}
              className="text-left px-4 py-2 block w-max hover:text-textColor"
            >
              Edit list
            </button>
            <button className="text-left px-4 py-2 block w-max hover:text-textColor">
              Make list private
            </button>
            <button
              onClick={() => deleteListByIdResult.mutate()}
              className="text-left px-4 py-2 block w-max text-red-500 hover:text-textColor"
            >
              Delete list
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default memo(ListItemMenu);
