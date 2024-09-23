import { memo, useState } from "react";
import ListsModal from "./ListsModal";

const ButtonActionList = () => {
  const [isOpenList, setIsOpenList] = useState(false);
  const handleOpenList = () => setIsOpenList(true);
  const handleCloseList = () => setIsOpenList(false);
  return (
    <>
      <ListsModal isOpen={isOpenList} onClose={handleCloseList} />
      <button
        onClick={handleOpenList}
        className="text-left px-4 py-2 block w-max hover:text-textColor"
      >
        Add to list
      </button>
    </>
  );
};

export default memo(ButtonActionList);
