import express from "express";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helpers/constants.js";
import blogModel from "../models/blog.model.js";
import { handleResponse } from "../helpers/responses.js";
import { customDataBlog } from "../services/customData.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadImageFile,
} from "../configs/cloudinary-config.js";
import upload from "../configs/multer-config.js";
import slug from "slug";

const blogRouter = express.Router();

blogRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY._Q;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
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
          $or: [
            {
              title: {
                $regex: _q,
                $options: "i",
              },
            },
            {
              topic: {
                $regex: _q,
                $options: "i",
              },
            },
          ],
        },
      ],
    };

    const getDatas = await blogModel
      .find(filter)
      .populate([`author`])
      .limit(_limit)
      .skip(_skip)
      .sort({
        ...(_sort_view && { count_views: -1 }),
        createdAt: -1,
      });

    const total_row = await blogModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    const customData = await customDataBlog({
      author_id: _tracking_id,
      datas: getDatas,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blogs retrieved successfully",
      data: {
        result: customData,
        total_row,
        total_page,
        _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const _tracking_id = req.query._tracking_id;

    // incriment view
    await blogModel.findByIdAndUpdate(
      id,
      {
        $inc: { count_views: 1 },
      },
      { new: true }
    );

    const getData = await blogModel.findById(id).populate([`author`]);

    const customData = await customDataBlog({
      author_id: _tracking_id,
      datas: [getData],
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blogs retrieved successfully",
      data: customData?.[0],
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-id/:id/similar`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const _tracking_id = req.query._tracking_id;
    const _author = req.query._author;
    const _status = true;

    const filter = {
      $and: [
        {
          status: _status,
        },
        {
          _id: {
            $not: {
              $eq: id,
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
      .limit(_limit)
      .skip(_skip)
      .sort({
        count_views: -1,
      });

    const customData = await customDataBlog({
      author_id: _tracking_id,
      datas: getDatas,
    });

    const total_row = await blogModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Similar blogs retrieved successfully",
      data: {
        result: customData,
        total_row,
        total_page,
        _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-blogs-by-author-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const _tracking_id = req.query._tracking_id;
    const _status = true;

    const filter = {
      $and: [
        {
          author: id,
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

    const customData = await customDataBlog({
      author_id: _tracking_id,
      datas: getDatas,
    });

    const total_row = await blogModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blogs retrieved successfully",
      data: {
        result: customData,
        total_row,
        total_page,
        _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-blogs-by-topic`, async (req, res, next) => {
  try {
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const _tracking_id = req.query._tracking_id;
    const _topic = req.query._topic || QUERY._TOPIC;
    const _status = true;

    const filter = {
      $and: [
        {
          topic: {
            $regex: _topic,
            $options: "i",
          },
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

    const customData = await customDataBlog({
      author_id: _tracking_id,
      datas: getDatas,
    });

    const total_row = await blogModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blogs retrieved successfully",
      data: {
        result: customData,
        total_row,
        total_page,
        _page,
      },
    });
  } catch (error) {
    next(error);
  }
});

// verify
blogRouter.get(`/get-blogs-by-me`, verifyToken, async (req, res, next) => {
  try {
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const _topic = req.query._topic || QUERY._TOPIC;
    const _status = req.query._status === "1" ? true : false;

    const user = req.user;

    const filter = {
      $and: [
        {
          author: user._id,
        },
        {
          topic: {
            $regex: _topic,
            $options: "i",
          },
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

    const customData = await customDataBlog({
      author_id: user?._id,
      datas: getDatas,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blogs retrieved successfully",
      data: {
        result: customData,
        total_row,
        total_page,
        _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
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
blogRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteData = await blogModel.findByIdAndDelete(id);
    if (deleteData?.thumbnail) {
      await cloudinary_deleteFile(deleteData.thumbnail);
    }

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blog deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});

export default blogRouter;
