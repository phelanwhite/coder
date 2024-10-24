import Loader from "@/components/layouts/loader";
import { useAuthStore } from "@/stores/auth-store";
import { useListStore } from "@/stores/library-store";
import { useQuery } from "@tanstack/react-query";
import { FC, memo, useState } from "react";
import { MdClose } from "react-icons/md";
import CreateAndUpdateListForm from "./CreateAndUpdateListForm";
import ListItemCheckbox from "./ListItemCheckbox";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ListSelectBox: FC<Props> = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();
  const [isOpenList, setIsOpenList] = useState(false);
  const { lists, getListsByMe } = useListStore();
  const getListsByMeResult = useQuery({
    queryKey: ["lists"],
    queryFn: async () => await getListsByMe(``),
    enabled: !!isOpen && !!user,
  });

  if (getListsByMeResult.isLoading) return <Loader />;
  if (!isOpen) return null;
  return (
    <>
      <CreateAndUpdateListForm
        isOpen={isOpenList}
        onClose={() => setIsOpenList(false)}
      />
      <div className="fixed top-0 left-0 bottom-0 right-0 inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div
          onClick={onClose}
          className="absolute top-0 left-0 bottom-0 right-0 -z-10"
        ></div>
        <div className="max-w-[500px] relative space-y-4 p-6 w-full shadow border rounded-lg bg-white">
          <button onClick={onClose} className="absolute top-4 right-4">
            <MdClose size={24} />
          </button>
          <div className="text-xl font-medium">Add to list</div>
          <div className="space-y-1">
            {lists.map((item) => (
              <ListItemCheckbox key={item?._id} data={item} />
            ))}
          </div>
          {/* btn add  */}
          <div className="border-t pt-3">
            <button
              onClick={() => setIsOpenList(true)}
              className="btn-success text-xs"
            >
              Create new list
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ListSelectBox);
