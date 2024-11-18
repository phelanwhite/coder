import express from "express";
import boardModel from "../../models/board.model.js";
import { handleResponse } from "../../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
const boardRouter = express();

boardRouter.post(`/add`, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const total_row = await boardModel.countDocuments({
      user: user._id,
    });
    const newData = await boardModel.create({
      ...body,
      user: user._id,
      position: total_row + 1,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Board created successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
boardRouter.post(`/update-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;
    const body = req.body;

    const updateData = await boardModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Board updated successfully",
      data: updateData,
    });
  } catch (error) {
    next(error);
  }
});
boardRouter.get(`/get-all-by-me`, async (req, res, next) => {
  try {
    const user = req.user;

    const filter = {
      user: user._id,
    };

    const getDatas = await boardModel.find(filter).sort({
      position: -1,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Boards fetched successfully",
      data: getDatas,
    });
  } catch (error) {
    next(error);
  }
});

export default boardRouter;
