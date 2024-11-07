import bookmarkModel from "../models/bookmark.model.js";
import favoriteModel from "../models/favorite.model.js";
import { getReadTimeToString } from "./time.js";

export const customDataBlogWithTrackingId = async ({ _tracking_id, datas }) => {
  try {
    let list = [];
    for (const element of datas) {
      const isBookmark = (await bookmarkModel.findOne({
        author: _tracking_id,
        blog: element._id,
      }))
        ? true
        : false;

      const isFavorite = (await favoriteModel.findOne({
        author: _tracking_id,
        blog: element._id,
      }))
        ? true
        : false;

      const read_time = getReadTimeToString(element?.description);

      const item = { ...element?._doc, isBookmark, isFavorite, read_time };

      list.push(item);
    }
    return list;
  } catch (error) {
    console.log(error);
  }
};

export const customDataBlogWithUserId = async (_user_id, datas) => {
  try {
    let list = [];
    for (const element of datas) {
      const isBookmark = (await bookmarkModel.findOne({
        author: _user_id,
        blog: element?.blog?._id,
      }))
        ? true
        : false;

      const isFavorite = (await favoriteModel.findOne({
        author: _user_id,
        blog: element?.blog?._id,
      }))
        ? true
        : false;

      const read_time = getReadTimeToString(element?.blog?.description);

      const item = {
        ...element?._doc,
        blog: {
          ...element?._doc?.blog?._doc,
          isBookmark,
          isFavorite,
          read_time,
        },
      };

      list.push(item);
    }
    return list;
  } catch (error) {
    console.log(error);
  }
};
