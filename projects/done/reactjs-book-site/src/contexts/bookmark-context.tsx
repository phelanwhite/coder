import React, { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";

// type and interface
type BookType = {
  _id: string;
  bookId: string;
};

type Actions = {
  type: "ADD_BOOK" | "REMOVE_BOOK";
  payload: {
    bookId: string;
  };
};

interface IBookmarkContext {
  bookmarks: BookType[];
  addBookmark: (bookId: string) => void;
  removeBook: (bookId: string) => void;
  checkBook(bookId: string): BookType | undefined;
}

// reducer
const reducer = (state: BookType[], action: Actions): BookType[] => {
  switch (action.type) {
    case "ADD_BOOK":
      const checkBook = state.find(
        (item: BookType) => item?.bookId === action.payload.bookId
      );
      if (checkBook) return state;

      const newItem: BookType = {
        _id: uuid(),
        bookId: action.payload.bookId,
      };
      return [newItem, ...state];

    case "REMOVE_BOOK":
      return state.filter(
        (item: BookType) => item.bookId !== action.payload.bookId
      );

    default:
      return state;
  }
};

const initialBookmarks =
  JSON.parse(localStorage.getItem("bookmarks") as string) || [];

// context
const BookmarkContext = createContext<IBookmarkContext>({
  bookmarks: [],
  addBookmark: () => {},
  removeBook: () => {},
  checkBook: () => undefined,
});

// provider

export const BookmarkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookmarks, dispatch] = useReducer(reducer, initialBookmarks);
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookId: string) => {
    dispatch({
      type: "ADD_BOOK",
      payload: { bookId },
    });
    toast.success(`Added to bookmarks`);
  };

  const removeBook = (bookId: string) => {
    dispatch({
      type: "REMOVE_BOOK",
      payload: { bookId },
    });
    toast.success(`Removed from bookmarks`);
  };

  const checkBook = (bookId: string) => {
    return bookmarks.find((item: BookType) => item.bookId === bookId);
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBook, checkBook }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => useContext(BookmarkContext);
