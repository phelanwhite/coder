import express from "express";
import listModel from "../model/list.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { query } from "../helper/constants.js";
import blogModel from "../model/blog.js";

const listRouter = express.Router();

listRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;
    const newData = await listModel.create({ ...body, author: user._id });
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "List created successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.put(`/update-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await listModel.findByIdAndUpdate(id, body, { new: true });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "List updated successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteData = await listModel.findByIdAndDelete(id, { new: true });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "List deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.get(`/get-all-by-me`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const q = req.query.q || query.SEARCH;
    const tag = req.query.tag || "";
    const category = req.query.category || "";
    const page = parseInt(req.query.page) || query.PAGE;
    const limit = parseInt(req.query.limit) || query.LIMIT;
    const skip = (page - 1) * limit;

    const filter = {
      ...(q && {
        title: {
          $regex: q,
          $options: "i",
        },
      }),
      ...(category && {
        category: {
          $regex: category,
          $options: "i",
        },
      }),
      ...(tag && {
        tags: {
          $regex: tag,
          $options: "i",
        },
      }),
      author: user._id,
    };

    const datas = await listModel
      .find(filter)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "author",
      })
      .sort({
        createdAt: -1,
      });

    const total_row = await listModel.countDocuments(filter);

    const total_page = Math.ceil(total_row / limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Lists retrieved successfully",
      data: { data: datas, limit, total_page, total_row, page },
    });
  } catch (error) {
    next(error);
  }
});
listRouter.get(`/get-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await listModel
      .findById(id)
      .populate(["author"])
      .populate({
        path: "blogs",
        populate: {
          path: "author",
        },
      });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "List retrieved successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.get(
  `/get-blogs-by-list-id/:id`,
  verifyToken,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await listModel.findById(id).populate(["author"]);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "List retrieved successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  }
);
listRouter.put(`/add-remove-blog/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const checkBlog = await listModel.findOne({
      _id: id,
      blogs: body.blog_id,
    });

    const updateList = await listModel.findByIdAndUpdate(
      id,
      {
        ...(checkBlog
          ? {
              $pull: {
                blogs: body.blog_id,
              },
            }
          : {
              $push: {
                blogs: body.blog_id,
              },
            }),
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: checkBlog
        ? "Blog remove successfully"
        : "Blog added successfully",
      data: updateList,
    });
  } catch (error) {
    next(error);
  }
});
export default listRouter;
