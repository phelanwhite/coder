import React, { useState } from "react";
import Modal from "../components/Modal";
import MediaPlayTrailer from "../components/MediaPlayTrailer";

const AppContext = React.createContext<any | null>(null);

export const PlayTrailerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);
  const [mediaTrailer, setMediaTrailer] = useState({
    media_id: "",
    media_type: "",
  });
  const handleOpenTrailer = (media_id: string, media_type: string) => {
    setMediaTrailer({ media_id, media_type });
    setIsOpenTrailer(true);
  };
  const handleCloseTrailer = () => {
    setIsOpenTrailer(false);
  };

  return (
    <AppContext.Provider
      value={{
        isOpenTrailer,
        handleCloseTrailer,
        mediaTrailer,
        handleOpenTrailer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const usePlayTrailerContext = () => React.useContext(AppContext);

export const ModalMediaPlayTrailer = ({
  isOpenTrailer,
  handleClose,
  mediaTrailer,
}: {
  isOpenTrailer: boolean;
  handleClose: () => void;
  mediaTrailer: {
    media_id: string;
    media_type: string;
  };
}) => (
  <Modal open={isOpenTrailer} onClose={handleClose}>
    <MediaPlayTrailer
      onClose={handleClose}
      media_id={mediaTrailer.media_id}
      media_type={mediaTrailer.media_type}
    />
  </Modal>
);
