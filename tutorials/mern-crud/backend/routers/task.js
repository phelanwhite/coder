import express from "express";
import taskModel from "../models/task.js";

const taskRouter = express.Router();

taskRouter.get(`/`, async (req, res, next) => {
  try {
    const _filter = req.query._filter;
    const respData = await taskModel.find({
      ...(_filter === `done` && { completed: true }),
      ...(_filter === `todo` && { completed: false }),
    });
    return res.status(200).json(respData);
  } catch (error) {
    next(error);
  }
});
taskRouter.get(`/:id`, async (req, res, next) => {
  try {
    const respData = await taskModel.findById(req.params.id);
    return res.status(200).json(respData);
  } catch (error) {
    next(error);
  }
});
taskRouter.post(`/`, async (req, res, next) => {
  try {
    const newTask = new taskModel(req.body);
    const respData = await newTask.save();
    return res.status(201).json({
      message: "Task created successfully",
      data: respData,
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.put(`/:id`, async (req, res, next) => {
  try {
    const updatedTask = await taskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
});
taskRouter.delete(`/:id`, async (req, res, next) => {
  try {
    const deletedTask = await taskModel.findByIdAndDelete(req.params.id, {
      new: true,
    });
    return res.status(200).json({
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    next(error);
  }
});

export default taskRouter;
