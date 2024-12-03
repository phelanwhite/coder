import express from "express";
import bookmarkModel from "../../models/bookmark.model.js";
import { handleResponse } from "../../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
import { QUERY_PARAMETER } from "../../constants/index.js";

const bookmarkRouter = express.Router();

bookmarkRouter.post(`/add-remove`, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;
    const checkBookmark = await bookmarkModel.findOne({
      user: user?._id,
      type: body?.type,
      data: body?.data,
    });
    if (checkBookmark) {
      const deleteData = await bookmarkModel.findOneAndDelete(
        {
          user: user?._id,
          type: body?.type,
          data: body?.data,
        },
        {
          new: true,
        }
      );
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Bookmark removed successfully",
        data: deleteData,
      });
    } else {
      const newData = await bookmarkModel.create({ ...body, user: user?._id });
      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Bookmark added successfully",
        data: newData,
      });
    }
  } catch (error) {
    next(error);
  }
});
bookmarkRouter.delete(`/delete/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteDta = await bookmarkModel.findByIdAndDelete(id, {
      new: true,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Bookmark deleted successfully",
      data: deleteDta,
    });
  } catch (error) {
    next(error);
  }
});
bookmarkRouter.get(`/get-bookmarks-by-me`, async (req, res, next) => {
  try {
    const _page = parseInt(req.query._page) || QUERY_PARAMETER._PAGE;
    const _limit = parseInt(req.query._limit) || QUERY_PARAMETER._LIMIT;
    const skip = (_page - 1) * _limit;
    const user = req.user;

    const filter = {
      user: user?._id,
    };

    const getDatas = await bookmarkModel
      .find(filter)
      .populate([
        {
          path: `user`,
        },
        {
          path: `data`,
          populate: {
            path: `user`,
          },
        },
      ])
      .skip(skip)
      .limit(_limit)
      .sort({
        createdAt: -1,
      });
    const total_rows = await bookmarkModel.countDocuments(filter);
    const total_pages = Math.ceil(total_rows / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Bookmarks fetched successfully",
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

export default bookmarkRouter;
