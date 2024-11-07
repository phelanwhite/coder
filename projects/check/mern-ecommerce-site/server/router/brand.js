import express from "express";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";
import brandModel from "../model/brand.js";
import { handleResponse } from "../helper/response.js";
import upload from "../config/multer-config.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadImageFile,
} from "../config/cloudinary-config.js";
import slug from "slug";
import { verifyTokenAdmin } from "../middleware/verifyToken.js";

const brandRouter = express.Router();

brandRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const _q = req.query._q || QUERY._Q;
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;

    const query = {
      name: {
        $regex: _q,
        $options: "i",
      },
    };

    const getDatas = await brandModel
      .find(query)
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await brandModel.countDocuments(query);

    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get all brands successfully",
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
brandRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const getData = await brandModel.findById(id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get brand by ID successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});
brandRouter.post(
  `/create`,
  verifyTokenAdmin,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const body = req.body;

      let thumbnail = "";
      if (req.file) {
        thumbnail = (await cloudinary_uploadImageFile(req.file))?.secure_url;
      }

      const newData = await brandModel.create({
        ...body,
        slug: slug(body.name),
        thumbnail,
      });

      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Create new brand successfully",
        data: newData,
      });
    } catch (error) {
      next(error);
    }
  }
);
brandRouter.put(
  `/update-id/:id`,
  verifyTokenAdmin,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;

      let thumbnail = body?.thumbnail;
      if (req.file) {
        thumbnail = (await cloudinary_uploadImageFile(req.file))?.secure_url;
        await cloudinary_deleteFile(body?.thumbnail);
      }

      const updateDataById = await brandModel.findByIdAndUpdate(
        id,
        {
          ...body,
          slug: slug(body.name),
          thumbnail,
        },
        { new: true }
      );

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Update brand successfully",
        data: updateDataById,
      });
    } catch (error) {
      next(error);
    }
  }
);
brandRouter.delete(
  `/delete-id/:id`,
  verifyTokenAdmin,
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const deleteDataById = await brandModel.findByIdAndDelete(id, {
        new: true,
      });

      if (deleteDataById?.thumbnail) {
        await cloudinary_deleteFile(deleteDataById?.thumbnail);
      }

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Delete brand successfully",
        data: deleteDataById,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default brandRouter;
