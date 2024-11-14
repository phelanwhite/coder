import bookmarkModel from "../models/bookmark.model.js";
import commentModel from "../models/comment.model.js";
import favoriteModel from "../models/favorite.model.js";
import { getReadTimeToString } from "./time.js";

export const customDataBlog = async ({ author_id, datas }) => {
  try {
    let list = [];
    for (const element of datas) {
      const isBookmark = (await bookmarkModel.findOne({
        author: author_id,
        blog: element?._id,
      }))
        ? true
        : false;

      const isFavorite = (await favoriteModel.findOne({
        author: author_id,
        blog: element?._id,
      }))
        ? true
        : false;

      const total_comment = await commentModel.countDocuments({
        blog: element?._id,
      });

      const total_favorite = await favoriteModel.countDocuments({
        blog: element?._id,
      });

      const read_time = getReadTimeToString(element?.description);

      const item = {
        ...element?._doc,
        isBookmark,
        isFavorite,
        read_time,
        total_comment,
        total_favorite,
      };

      list.push(item);
    }
    return list;
  } catch (error) {
    console.log(error);
  }
};

export const customDataComment = async ({ datas }) => {
  try {
    let list = [];
    for (const element of datas) {
      const count_reply = await commentModel.countDocuments({
        "reply.comment_id": element?._id,
      });
      const item = { ...element?._doc, count_reply };

      list.push(item);
    }
    return list;
  } catch (error) {
    console.log(error);
  }
};
