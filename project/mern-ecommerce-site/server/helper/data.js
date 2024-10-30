import bookmarkModel from "../model/bookmark.js";
import wishlistModel from "../model/wishlist.js";

export const customDataUserProducts = async (user, datas = []) => {
  let newDatas = [];

  for (const element of datas) {
    const isBookmark = (await bookmarkModel.findOne({
      user: user,
      product: element.product?._id,
    }))
      ? true
      : false;

    const isWishlist = (await wishlistModel.findOne({
      user: user,
      product: element.product?._id,
    }))
      ? true
      : false;

    const item = {
      ...element?._doc,
      product: { ...element?._doc?.product?._doc, isBookmark, isWishlist },
    };
    newDatas.push(item);
  }
  return newDatas;
};

export const customDataTrackingIDProducts = async (user, datas = []) => {
  let newDatas = [];

  for (const element of datas) {
    const isBookmark = (await bookmarkModel.findOne({
      user: user,
      product: element?._id,
    }))
      ? true
      : false;

    const isWishlist = (await wishlistModel.findOne({
      user: user,
      product: element?._id,
    }))
      ? true
      : false;

    const item = {
      ...element?._doc,
      isBookmark,
      isWishlist,
    };
    newDatas.push(item);
  }
  return newDatas;
};
