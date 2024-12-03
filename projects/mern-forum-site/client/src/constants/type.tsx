import React from "react";

export type LinkType = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  subMenu?: LinkType[];
};

export type PostType = {
  _id: string;
  title: string;
  thumbnail: string;
  content: string;
  topics: string[];
  article_origin: string;
  imageList: any[];
  description: string;
  status: boolean;
  publication_time: string;

  user?: any;
  isFavorite?: boolean;
  isBookmark?: boolean;
};

export type MyQueriesResultButtonMenuType =
  | "Card"
  | "Author"
  | "History"
  | "Bookmark"
  | "Favorite";

export type PostButtonMenuType = MyQueriesResultButtonMenuType;
export type ListButtonMenuType = MyQueriesResultButtonMenuType;
