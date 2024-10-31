import React, { useContext, useState } from "react";
import Modal from "../components/Modal";
import MyListAddBox from "../components/MyListAddBox";

const AppContext = React.createContext<any | null>(null);

export const ListBoxProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpenMyListBox, setIsOpenMyListBox] = useState(false);
  const [itemAddMyList, setItemAddMyList] = useState({
    id: "",
    type: "",
  });
  const handleOpenListBox = (itemData: any) => {
    setIsOpenMyListBox(true);
    setItemAddMyList(itemData);
  };
  const handleCloseListBox = () => {
    setIsOpenMyListBox(false);
  };
  return (
    <AppContext.Provider
      value={{
        itemAddMyList,
        isOpenMyListBox,
        handleOpenListBox,
        handleCloseListBox,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useListBoxContext = () => React.useContext(AppContext);

export const ModalListBox = ({
  isOpenMyListBox,
  handleClose,
  itemAddMyList,
}: {
  isOpenMyListBox: boolean;
  handleClose: () => void;
  itemAddMyList: any;
}) => {
  return (
    <Modal open={isOpenMyListBox} onClose={handleClose}>
      <MyListAddBox handleClose={handleClose} itemData={itemAddMyList} />
    </Modal>
  );
};
