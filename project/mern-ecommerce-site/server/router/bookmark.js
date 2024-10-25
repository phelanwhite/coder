import express from "express";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";
import bookmarkModel from "../model/bookmark.js";
import { handleResponse } from "../helper/response.js";

const bookmarkRouter = express.Router();

bookmarkRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY._Q;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const user = req.user;

    const query = {
      user: user._id,
    };

    const getDatas = await bookmarkModel.find(query).limit(_limit).skip(_skip);

    const total_row = await bookmarkModel.countDocuments(query);

    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get all bookmark successfully",
      data: {
        results: getDatas,
        total_row,
        total_page,
        _page,
        _limit,
        _q,
      },
    });
  } catch (error) {
    next(error);
  }
});
bookmarkRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const getData = await bookmarkModel.findById(id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get bookmark by id successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});
bookmarkRouter.post(`/create`, async (req, res, next) => {
  try {
    const body = req.body;

    const user = req.user;

    const newData = await bookmarkModel.create({
      ...body,
      user: user._id,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Create bookmark successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
bookmarkRouter.put(`/update-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateDataById = await bookmarkModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Update bookmark successfully",
      data: updateDataById,
    });
  } catch (error) {
    next(error);
  }
});
bookmarkRouter.delete(`/delete-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteDataById = await bookmarkModel.findByIdAndDelete(id, {
      new: true,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Delete bookmark successfully",
      data: deleteDataById,
    });
  } catch (error) {
    next(error);
  }
});

export default bookmarkRouter;
