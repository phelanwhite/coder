import bookmarkModel from "../models/bookmark.model.js";
import favoriteModel from "../models/favorite.model.js";

export async function customDataPost({ datas, user_id }) {
  try {
    let list = [];
    for (const element of datas) {
      const filter = {
        user: user_id,
        data: element?._id,
      };
      const isBookmark = (await bookmarkModel.findOne(filter)) ? true : false;

      const isFavorite = (await favoriteModel.findOne(filter)) ? true : false;
      const total_favorite = await favoriteModel.countDocuments(filter);

      const item = { ...element?._doc, isBookmark, isFavorite, total_favorite };

      list.push(item);
    }

    return list;
  } catch (error) {
    console.log(error);
  }
}
