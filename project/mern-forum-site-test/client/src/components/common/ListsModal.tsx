import { useListStore } from "@/store/library-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, memo, useEffect, useMemo, useState } from "react";
import Loader from "../layout/loader";
import CreateAndUpdateListForm from "../form/CreateAndUpdateListForm";
import { MdClose } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ListsModal: FC<Props> = ({ isOpen, onClose }) => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { lists, getListsByMe, addRemoveBlogByListId } = useListStore();

  const [page, setPage] = useState(1);
  // const [listsData, setListsData] = useState<any[]>([]);

  const getListsByMeResult = useQuery({
    queryKey: ["lists", page],
    queryFn: async () => await getListsByMe(`page=${page}`),
    enabled: !!isOpen && !!user,
  });
  const [listsData, setListsData] = useState<any[]>([]);

  const listsDataR = useMemo(() => {
    return [...listsData, ...lists];
  }, [listsData]);
  useEffect(() => {
    if (getListsByMeResult?.data && page !== 0) {
      setListsData(lists);
    }
  }, [getListsByMeResult.data]);

  const addRemoveBlogByListIdResult = useMutation({
    mutationFn: async ({ data, id }: { id: string; data: any }) => {
      const response = await addRemoveBlogByListId(id, data);
      return response;
    },
  });

  const [isOpenForm, setIsOpenForm] = useState(false);
  const handleOpenForm = () => setIsOpenForm(true);
  const handleCloseForm = () => setIsOpenForm(false);

  if (getListsByMeResult.isLoading || addRemoveBlogByListIdResult.isPending)
    return <Loader />;
  if (!isOpen) return <></>;
  return (
    <>
      <CreateAndUpdateListForm isOpen={isOpenForm} onClose={handleCloseForm} />
      <div className="fixed top-0 left-0 right-0 bottom-0 z-20 p-4 flex items-center justify-center bg-black/50">
        <div className="bg-white text-black max-w-[500px] w-full mx-auto p-4 rounded shadow space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-base">List</span>
            <button
              onClick={() => {
                onClose();
                setPage(0);
              }}
            >
              <MdClose size={20} />
            </button>
          </div>
          <div className="max-h-[300px] overflow-y-auto space-y-4">
            {listsDataR.map((item: any) => {
              const checked = item?.blogs?.find((item: any) => item === id);

              return (
                <label key={item?._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      addRemoveBlogByListIdResult.mutate({
                        id: item?._id,
                        data: {
                          blog_id: id,
                        },
                      });
                    }}
                  />
                  <span>{item?.title}</span>
                </label>
              );
            })}
            {/* btn view more  */}
            {page < getListsByMeResult?.data?.data?.total_page && (
              <div className="text-center text-link">
                <button onClick={() => setPage((prev) => prev + 1)}>
                  view more
                </button>
              </div>
            )}
          </div>
          {/* btn add  */}
          <div className="border-t pt-2">
            <button
              onClick={handleOpenForm}
              className="text-green-500 text-link"
            >
              Create new list
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ListsModal);
