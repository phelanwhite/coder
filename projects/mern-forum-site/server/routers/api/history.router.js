import express from "express";
import historyModel from "../../models/history.model.js";
import { handleResponse } from "../../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
import { QUERY_PARAMETER } from "../../constants/index.js";

const historyRouter = express.Router();

historyRouter.post(`/create`, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;

    const checkHistory = await historyModel.findOne({
      user: user?._id,
      type: body.type,
      data: body.data,
    });

    let newData;
    if (checkHistory) {
      await historyModel.findOneAndDelete(
        {
          user: user?._id,
          type: body.type,
          data: body.data,
        },
        {
          new: true,
        }
      );
      newData = await historyModel.create({ ...body, user: user?._id });
    } else {
      newData = await historyModel.create({ ...body, user: user?._id });
    }

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "History created successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
historyRouter.delete(
  `/delete-histories-by-me`,

  async (req, res, next) => {
    try {
      const user = req.user;

      const deleteDatas = await historyModel.deleteMany(
        {
          user: user?._id,
        },
        { new: true }
      );

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "All user's histories deleted successfully",
        data: deleteDatas,
      });
    } catch (error) {
      next(error);
    }
  }
);
historyRouter.delete(`/delete/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteData = await historyModel.findByIdAndDelete(id, { new: true });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "History deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});
historyRouter.get(`/get-histories-by-me`, async (req, res, next) => {
  try {
    const _page = parseInt(req.query._page) || QUERY_PARAMETER._PAGE;
    const _limit = parseInt(req.query._limit) || QUERY_PARAMETER._LIMIT;
    const skip = (_page - 1) * _limit;
    const user = req.user;

    const filter = {
      user: user?._id,
    };

    const getDatas = await historyModel
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
    const total_rows = await historyModel.countDocuments(filter);
    const total_pages = Math.ceil(total_rows / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User's histories fetched successfully",
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

export default historyRouter;
