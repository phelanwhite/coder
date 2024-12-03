import express from "express";
import slug from "slug";
import storage_utils from "../../services/storage.js";
import { verifyToken } from "../../middlewares/verifyToken.middleware.js";
import upload from "../../configs/multer-config.js";
import postModel from "../../models/post.model.js";
import { handleResponse } from "../../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
import { QUERY_PARAMETER } from "../../constants/index.js";
import { customDataPost } from "../../helpers/customData.js";

const postRouter = express.Router();

postRouter.get(`/get-posts`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY_PARAMETER._Q;
    const _page = parseInt(req.query._page) || QUERY_PARAMETER._PAGE;
    const _limit = parseInt(req.query._limit) || QUERY_PARAMETER._LIMIT;
    const _author = req.query._author;
    const _tracking_id = req.query._tracking_id;
    const _status = true;

    const skip = (_page - 1) * _limit;

    const filter = {
      title: {
        $regex: _q,
        $options: "i",
      },
      status: _status,
      ...(_author && { user: _author }),
    };

    const getDatas = await postModel
      .find(filter)
      .populate([`user`])
      .limit(_limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });

    const customData = await customDataPost({
      datas: getDatas,
      user_id: _tracking_id,
    });

    const total_rows = await postModel.countDocuments(filter);
    const total_pages = Math.ceil(total_rows / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Posts fetched successfully",
      data: {
        results: customData,
        total_rows,
        total_pages,
        _page,
        _limit,
      },
    });
  } catch (error) {
    next(error);
  }
});
postRouter.get(`/get-post-by-id/:id`, async (req, res, next) => {
  try {
    const _tracking_id = req.query._tracking_id;
    const id = req.params.id;

    const getData = await postModel.findById(id).populate([`user`]);

    const customData = (
      await customDataPost({
        datas: [getData],
        user_id: _tracking_id,
      })
    )?.[0];

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Post fetched successfully",
      data: customData,
    });
  } catch (error) {
    next(error);
  }
});
postRouter.get(`/get-post-by-id/:id/similar`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const _page = parseInt(req.query._page) || QUERY_PARAMETER._PAGE;
    const _limit = parseInt(req.query._limit) || QUERY_PARAMETER._LIMIT;
    const _author = req.query._author;

    const skip = (_page - 1) * _limit;

    const filter = {
      _id: { $ne: id },
      user: _author,
      status: true,
    };

    const getDatas = await postModel
      .find(filter)
      .populate([`user`])
      .limit(_limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });
    const total_rows = await postModel.countDocuments(filter);
    const total_pages = Math.ceil(total_rows / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Similar posts fetched successfully",
      data: {
        results: getDatas,
        total_rows,
        total_pages,
        _page,
        _limit,
      },
    });
  } catch (error) {
    next(error);
  }
});

// verify
postRouter.post(
  `/create`,
  verifyToken,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const file = req.file;
      const user = req.user;

      let thumbnail = body.thumbnail;
      if (file) {
        thumbnail = (await storage_utils.cloudinary.uploadImageFile(file)).url;
      }

      const newData = await postModel
        .create({
          ...body,
          ...(body?.title && { slug: slug(body?.title) }),
          thumbnail,
          user: user._id,
        })
        .then(
          async (value) =>
            await postModel.findById(value?._id).populate([`user`])
        );

      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Post created successfully",
        data: newData,
      });
    } catch (error) {
      next(error);
    }
  }
);
postRouter.put(
  `/update/:id`,
  verifyToken,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const file = req.file;

      let thumbnail = body.thumbnail;
      if (file) {
        thumbnail = (await storage_utils.cloudinary.uploadImageFile(file))?.url;
      }

      const newData = await postModel
        .findByIdAndUpdate(
          id,
          {
            ...body,
            ...(body?.title && { slug: slug(body?.title) }),
            thumbnail,
          },
          { new: true }
        )
        .then(
          async (value) =>
            await postModel.findById(value?._id).populate([`user`])
        );

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Post updated successfully",
        data: newData,
      });
    } catch (error) {
      next(error);
    }
  }
);
postRouter.delete(`/delete/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deletedData = await postModel
      .findByIdAndDelete(id, { new: true })
      .then(async (value) => {
        await storage_utils.cloudinary.deleteFile(value?.thumbnail);
        return value;
      });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Post deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    next(error);
  }
});
postRouter.get(`/get-posts-by-me`, verifyToken, async (req, res, next) => {
  try {
    const _page = parseInt(req.query._page) || QUERY_PARAMETER._PAGE;
    const _limit = parseInt(req.query._limit) || QUERY_PARAMETER._LIMIT;
    const _status = parseInt(req.query._status) === 1 ? true : false;

    const skip = (_page - 1) * _limit;

    const user = req.user;

    const filter = {
      user: user._id,
      status: _status,
    };

    const getDatas = await postModel
      .find(filter)
      .populate([`user`])
      .limit(_limit)
      .skip(skip)
      .sort({
        createdAt: -1,
      });
    const total_rows = await postModel.countDocuments(filter);
    const total_pages = Math.ceil(total_rows / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Posts fetched successfully",
      data: {
        results: getDatas,
        total_rows,
        total_pages,
        _page,
        _limit,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default postRouter;
