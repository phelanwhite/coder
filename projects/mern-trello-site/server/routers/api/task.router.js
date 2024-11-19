import express from "express";
import { handleResponse } from "../../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
import taskModel from "../../models/task.model.js";
const taskRouter = express();

taskRouter.post(`/add`, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const total_row = await taskModel.countDocuments({
      user: user._id,
    });
    const newData = await taskModel.create({
      ...body,
      user: user._id,
      position: total_row + 1,
    });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Task created successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.post(`/update-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateData = await taskModel.findByIdAndUpdate(
      id,
      { ...body },
      {
        new: true,
      }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Task updated successfully",
      data: updateData,
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.post(`/update-position`, async (req, res, next) => {
  try {
    const body = req.body;

    for (let index = 0; index < body.length; index++) {
      const element = body[index];
      await taskModel.findByIdAndUpdate(
        element._id,
        {
          column: element.column,
          position: index,
        },
        { new: true }
      );
    }

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Task positions updated successfully",
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.get(`/get-all-by-me`, async (req, res, next) => {
  try {
    const user = req.user;

    const filter = {
      user: user._id,
    };

    const getDatas = await taskModel.find(filter).sort({
      position: 1,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Tasks fetched successfully",
      data: getDatas,
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const getData = await taskModel.findById(id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Task fetched successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});

export default taskRouter;
