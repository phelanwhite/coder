"use client";
import React, { useContext, useState } from "react";

const AppContext = React.createContext<any | null>(null);

export const CommentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState<any | null>(null);

  return (
    <AppContext.Provider value={{ isEdit, setIsEdit, dataEdit, setDataEdit }}>
      {children}
    </AppContext.Provider>
  );
};

export const useCommentContext = () => useContext(AppContext);
