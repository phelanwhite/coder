import express from "express";
import { StatusCodes } from "http-status-codes";
import upload from "../../configs/multer-config.js";
import actionModel from "../../models/action.model.js";
import { handleResponse } from "../../helpers/responses.js";
import storage_utils from "../../services/storage.js";

const actionRouter = express.Router();

actionRouter.post(
  "/upload-file",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const file = req.file;

      let uploadFile;

      if (file) {
        uploadFile = await storage_utils.cloudinary.uploadImageFile(file);
      }

      const newData = await actionModel.create({
        ...body,
        data: uploadFile,
        type: "file",
        user: user._id,
      });
      const getData = await actionModel
        .findById(newData?._id)
        .populate([`user`]);

      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "File uploaded successfully",
        data: getData,
      });
    } catch (error) {
      next(error);
    }
  }
);
actionRouter.delete("/delete-file/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletData = await actionModel.findByIdAndDelete(id, { new: true });

    await storage_utils.cloudinary.deleteFile(deletData?.data?.url);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "File deleted successfully",
      data: deletData,
    });
  } catch (error) {
    next(error);
  }
});
actionRouter.get(`/get-files-by-task/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const filter = {
      task: id,
      type: "file",
    };

    const getFiles = await actionModel.find(filter).sort({
      createdAt: -1,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Files fetched successfully",
      data: getFiles,
    });
  } catch (error) {
    next(error);
  }
});

actionRouter.post("/create-comment", async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const newData = await actionModel.create({
      ...body,
      type: "comment",
      user: user._id,
    });
    const getData = await actionModel.findById(newData?._id).populate([`user`]);

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Comment added successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});
actionRouter.post("/update-comment/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const updateData = await actionModel.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      { new: true }
    );
    const getData = await actionModel
      .findById(updateData?._id)
      .populate([`user`]);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Comment updated successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});
actionRouter.delete("/delete-comment/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletData = await actionModel.findByIdAndDelete(id, { new: true });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Comment deleted successfully",
      data: deletData,
    });
  } catch (error) {
    next(error);
  }
});
actionRouter.get(`/get-actions-by-task/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const filter = {
      task: id,
    };

    const getFiles = await actionModel.find(filter).populate([`user`]).sort({
      createdAt: -1,
    });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Actions fetched successfully",
      data: getFiles,
    });
  } catch (error) {
    next(error);
  }
});

export default actionRouter;
