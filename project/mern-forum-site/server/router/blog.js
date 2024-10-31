import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import upload from "../config/multer-config.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadImageFile,
} from "../config/cloudinary-config.js";
import { StatusCodes } from "http-status-codes";
import slug from "slug";
import blogModel from "../model/blog.js";
import { handleResponse } from "../helper/response.js";
import { QUERY } from "../helper/constants.js";
import bookmarkModel from "../model/bookmark.js";
import favoriteModel from "../model/favorite.js";

const blogRouter = express.Router();

blogRouter.post(
  `/create`,
  verifyToken,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const file = req.file;

      let thumbnail = body.thumbnail;
      if (file) {
        thumbnail = (await cloudinary_uploadImageFile(file)).secure_url;
      }

      const newData = await blogModel.create({
        ...body,
        thumbnail,
        ...(body?.title && { slug: slug(body?.title) }),
        author: user._id,
      });

      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Blog created successfully",
        data: newData,
      });
    } catch (error) {
      next(error);
    }
  }
);
blogRouter.put(
  `/update-id/:id`,
  verifyToken,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const file = req.file;

      let thumbnail = body.thumbnail;
      if (file) {
        thumbnail = (await cloudinary_uploadImageFile(file)).secure_url;
        await cloudinary_deleteFile(body.thumbnail);
      }

      const updateData = await blogModel.findByIdAndUpdate(req.params.id, {
        ...body,
        thumbnail,
        ...(body?.title && { slug: slug(body?.title) }),
      });
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Blog updated successfully",
        data: updateData,
      });
    } catch (error) {
      next(error);
    }
  }
);
blogRouter.put(`/incriment-view/:id`, async (req, res, next) => {
  try {
    const updateData = await blogModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blog view count incremented successfully",
      data: updateData,
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const deleteData = await blogModel.findByIdAndDelete(req.params.id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blog deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-blogs-by-me`, verifyToken, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY.Q;
    const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
    const _page = parseInt(req.query._page) || QUERY.PAGE;
    const _skip = (_page - 1) * _limit;
    const _status = parseInt(req.query._status) ? true : false;

    const user = req.user;

    const filter = {
      $and: [
        { author: user._id },
        {
          status: _status,
        },
        {
          title: {
            $regex: _q,
            $options: "i",
          },
        },
      ],
    };

    const getDatas = await blogModel
      .find(filter)
      .populate([`author`])
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });
    const total_row = await blogModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blogs retrieved successfully",
      data: {
        result: getDatas,
        total_row,
        total_page,
        page: _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-blogs-by-author-id/:id`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY.Q;
    const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
    const _page = parseInt(req.query._page) || QUERY.PAGE;
    const _skip = (_page - 1) * _limit;
    const _status = true;
    const _tracking_id = req.query._tracking_id;

    const filter = {
      $and: [
        {
          author: req.params.id,
        },
        {
          status: _status,
        },
      ],
    };

    const getDatas = await blogModel
      .find(filter)
      .populate([`author`])
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });
    const total_row = await blogModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    let datas = [];
    for (const element of getDatas) {
      const isBookmark = (await bookmarkModel.findOne({
        author: _tracking_id,
        blog: element._id,
      }))
        ? true
        : false;

      const item = { ...element?._doc, isBookmark };

      datas.push(item);
    }

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blogs retrieved successfully",
      data: {
        result: datas,
        total_row,
        total_page,
        page: _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-blogs-by-topic-id/:id`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY.Q;
    const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
    const _page = parseInt(req.query._page) || QUERY.PAGE;
    const _skip = (_page - 1) * _limit;
    const _status = true;

    const filter = {
      $and: [
        {
          status: _status,
        },
        {
          topic: {
            $regex: req.params.id,
            $options: "i",
          },
        },
      ],
    };

    const getDatas = await blogModel
      .find(filter)
      .populate([`author`])
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });
    const total_row = await blogModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blogs retrieved successfully",
      data: {
        result: getDatas,
        total_row,
        total_page,
        page: _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY.Q;
    const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
    const _page = parseInt(req.query._page) || QUERY.PAGE;
    const _skip = (_page - 1) * _limit;
    const _tracking_id = req.query._tracking_id;
    const _status = true;
    const _sort_view = req.query._sort_view === "1" ? true : false;

    const filter = {
      $and: [
        {
          status: _status,
        },
        {
          title: {
            $regex: _q,
            $options: "i",
          },
        },
      ],
    };

    const getDatas = await blogModel
      .find(filter)
      .populate([`author`])
      .set(`isBookmark`, true)
      .limit(_limit)
      .skip(_skip)
      .sort({
        ...(_sort_view && { views: -1 }),
        createdAt: -1,
      });

    let datas = [];
    for (const element of getDatas) {
      const isBookmark = (await bookmarkModel.findOne({
        author: _tracking_id,
        blog: element._id,
      }))
        ? true
        : false;

      const item = { ...element?._doc, isBookmark };

      datas.push(item);
    }

    const total_row = await blogModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blogs retrieved successfully",
      data: {
        result: datas,
        total_row,
        total_page,
        page: _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const _tracking_id = req.query._tracking_id;
    const getData = await blogModel
      .findById(req.params.id)
      .populate([`author`]);

    // bookmark
    const isBookmark = (await bookmarkModel.findOne({
      author: _tracking_id,
      blog: req.params.id,
    }))
      ? true
      : false;

    // favorite
    const isFavorite = (await favoriteModel.findOne({
      author: _tracking_id,
      blog: req.params.id,
    }))
      ? true
      : false;

    const count_favorite = await favoriteModel.countDocuments({
      blog: req.params.id,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blog retrieved successfully",
      data: {
        ...getData?._doc,
        isBookmark,
        favorite: {
          isFavorite,
          count_favorite,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-id/:id/similar`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY.Q;
    const _limit = parseInt(req.query._limit) || QUERY.LIMIT;
    const _page = parseInt(req.query._page) || QUERY.PAGE;
    const _skip = (_page - 1) * _limit;
    const _tracking_id = req.query._tracking_id;
    const _status = true;
    const _author = (await blogModel.findById(req.params.id))?.author;

    const filter = {
      $and: [
        {
          status: _status,
        },
        {
          title: {
            $regex: _q,
            $options: "i",
          },
        },
        {
          _id: {
            $not: {
              $eq: req.params.id,
            },
          },
        },
        {
          author: {
            $eq: _author,
          },
        },
      ],
    };

    const getDatas = await blogModel
      .find(filter)
      .populate([`author`])
      .set(`isBookmark`, true)
      .limit(_limit)
      .skip(_skip)
      .sort({
        views: -1,
      });

    let datas = [];
    for (const element of getDatas) {
      const isBookmark = (await bookmarkModel.findOne({
        author: _tracking_id,
        blog: element._id,
      }))
        ? true
        : false;

      const item = { ...element?._doc, isBookmark };

      datas.push(item);
    }

    const total_row = await blogModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blogs retrieved successfully",
      data: {
        result: datas,
        total_row,
        total_page,
        page: _page,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
