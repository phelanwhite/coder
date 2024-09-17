import { IoIosCloseCircle } from "react-icons/io";
import {
  useAddItemToMyListMutation,
  useExistingItemQuery,
  useGetmyListQuery,
  useRemoveItemFromMyListMutation,
} from "../stores/myListApi";
import MyListForm from "./MyListForm";
import { memo, useEffect, useState } from "react";
import Modal from "./Modal";
const MyListAddBox = ({
  handleClose,
  itemData,
}: {
  handleClose: () => void;
  itemData: any;
}) => {
  const getMyList = useGetmyListQuery(``);
  const [isForm, setIsForm] = useState(false);

  return (
    <>
      <div className="relative flex flex-col gap-4 max-w-[600px] w-full mx-auto rounded-md bg-white text-black text-base py-4">
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-4 right-4"
        >
          <IoIosCloseCircle size={20} />
        </button>
        <div className="px-4">
          <button
            onClick={() => setIsForm(true)}
            className="px-3 py-1.5 rounded text-white text-sm bg-purple-600 hover:bg-purple-500"
          >
            Create new list
          </button>
        </div>
        <div>
          <div className="font-semibold px-4">Your List</div>
          <div className="max-h-[300px] overflow-y-auto">
            {getMyList.data?.length > 0 ? (
              getMyList.data?.map((item: any) => (
                <ListItem data={item} key={item?._id} dataAdd={itemData} />
              ))
            ) : (
              <div className="text-sm px-4 text-gray-500">
                You don't have any listings yet
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal open={isForm} onClose={() => setIsForm(false)}>
        <MyListForm handleClose={() => setIsForm(false)} />
      </Modal>
    </>
  );
};

export default memo(MyListAddBox);

const ListItem = ({ data, dataAdd }: { data: any; dataAdd: any }) => {
  const [addItemToMyList] = useAddItemToMyListMutation();
  const [removeItemFromMyList] = useRemoveItemFromMyListMutation();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const checkItem = data?.items?.find(
      (i: any) => i.id == dataAdd?.id && i.type == dataAdd?.type
    );
    if (checkItem) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [data, dataAdd]);

  return (
    <label
      className="cursor-pointer flex items-center gap-2 w-full hover:bg-gray-100 px-4 py-2 rounded-md"
      key={data?._id}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          if (checked) {
            removeItemFromMyList({
              id: data?._id,
              itemId: dataAdd?.id,
              itemType: dataAdd?.type,
            });
            setChecked(false);
            return;
          } else {
            addItemToMyList({
              id: data?._id,
              data: { id: dataAdd?.id, type: dataAdd?.type },
            });
            setChecked(true);
            return;
          }
        }}
      />
      <span>{data?.title}</span>
    </label>
  );
};
