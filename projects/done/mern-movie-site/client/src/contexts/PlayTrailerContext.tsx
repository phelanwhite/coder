import React, { useState } from "react";
import MediaPlayTrailer from "@/components/common/MediaPlayTrailer";
import Modal from "@/components/layout/modal";

const AppContext = React.createContext<{
  isOpenTrailer: boolean;
  mediaTrailer: {
    media_id: string;
    media_type: string;
  };
  handleCloseTrailer: () => void;
  handleOpenTrailer: (media_id: string, media_type: string) => void;
}>({
  isOpenTrailer: false,
  mediaTrailer: {
    media_id: "",
    media_type: "",
  },
  handleCloseTrailer: () => {},
  handleOpenTrailer: (media_id, media_type) => {},
});

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
    setMediaTrailer({ media_id: "", media_type: "" });
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
      <>
        {isOpenTrailer && (
          <Modal isOpen={isOpenTrailer} onClose={handleCloseTrailer}>
            <MediaPlayTrailer
              onClose={handleCloseTrailer}
              media_id={mediaTrailer.media_id}
              media_type={mediaTrailer.media_type}
            />
          </Modal>
        )}
        {children}
      </>
    </AppContext.Provider>
  );
};

export const usePlayTrailerContext = () => React.useContext(AppContext);
