import express from "express";
import { handleResponse } from "../../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
import columnModel from "../../models/column.model.js";
const columnRouter = express();

columnRouter.post(`/add`, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const total_row = await columnModel.countDocuments({
      user: user._id,
    });
    const newData = await columnModel.create({
      ...body,
      user: user._id,
      position: total_row + 1,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Column created successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
columnRouter.post(`/update-position`, async (req, res, next) => {
  try {
    const body = req.body;

    for (let index = 0; index < body.length; index++) {
      const element = body[index];
      await columnModel.findByIdAndUpdate(
        element._id,
        {
          position: index,
        },
        { new: true }
      );
    }

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Column position updated successfully",
    });
  } catch (error) {
    next(error);
  }
});
columnRouter.post(`/update-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateData = await columnModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Column updated successfully",
      data: updateData,
    });
  } catch (error) {
    next(error);
  }
});
columnRouter.get(`/get-all-by-me`, async (req, res, next) => {
  try {
    const user = req.user;

    const filter = {
      user: user._id,
    };

    const getDatas = await columnModel.find(filter).sort({
      position: 1,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Columns fetched successfully",
      data: getDatas,
    });
  } catch (error) {
    next(error);
  }
});

export default columnRouter;
