import express from "express";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helper/constants.js";
import productModel from "../model/product.js";
import { handleResponse } from "../helper/response.js";
import upload from "../config/multer-config.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadImageFile,
} from "../config/cloudinary-config.js";
import slug from "slug";

const productRouter = express.Router();

productRouter.get(`/get-all`, async (req, res, next) => {
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

    const getDatas = await productModel
      .find(query)
      // .populate([``])
      .limit(_limit)
      .skip(_skip)
      .sort({
        createdAt: -1,
      });

    const total_row = await productModel.countDocuments(query);

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
productRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const getData = await productModel.findById(id);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Get brand by ID successfully",
      data: getData,
    });
  } catch (error) {
    next(error);
  }
});
productRouter.post(
  `/create`,
  upload.fields([
    {
      name: "file_thumbnail",
      maxCount: 1,
    },
    {
      name: "file_images",
    },
  ]),
  async (req, res, next) => {
    try {
      const body = req.body;
      const files = req.files;

      let thumbnail = body.thumbnail;
      let images = body.images;

      if (files.file_thumbnail?.[0]) {
        thumbnail = (
          await cloudinary_uploadImageFile(files.file_thumbnail?.[0])
        )?.secure_url;
        await cloudinary_deleteFile(body?.thumbnail);
      }

      if (files.file_images?.length) {
        images = await Promise.all(
          files?.file_images?.map(async (file) => {
            return (await cloudinary_uploadImageFile(file))?.secure_url;
          })
        );

        if (body?.images?.length) {
          await Promise.all(
            body?.images?.map(async (file) => {
              await cloudinary_deleteFile(file);
            })
          );
        }
      }

      const newData = await productModel.create({
        ...body,
        slug: slug(body.name),
        thumbnail,
        images,
        price: Math.ceil(
          body?.original_price - (body?.original_price * body?.discount) / 100
        ),
      });

      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Create new product successfully",
        data: newData,
      });
    } catch (error) {
      next(error);
    }
  }
);
productRouter.put(
  `/update-id/:id`,
  upload.fields([
    {
      name: "file_thumbnail",
      maxCount: 1,
    },
    {
      name: "file_images",
    },
  ]),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const files = req.files;

      let thumbnail = body.thumbnail;
      let images = body.images;

      if (files.file_thumbnail?.[0]) {
        thumbnail = (
          await cloudinary_uploadImageFile(files.file_thumbnail?.[0])
        )?.secure_url;
        await cloudinary_deleteFile(body?.thumbnail);
      }

      if (files.file_images?.length) {
        images = await Promise.all(
          files?.file_images?.map(async (file) => {
            return (await cloudinary_uploadImageFile(file))?.secure_url;
          })
        );

        if (body?.images?.length) {
          await Promise.all(
            body?.images?.map(async (file) => {
              await cloudinary_deleteFile(file);
            })
          );
        }
      }

      const updateDataById = await productModel.findByIdAndUpdate(
        id,
        {
          ...body,
          slug: slug(body.name),
          thumbnail,
          images,
          price: Math.ceil(
            body?.original_price - (body?.original_price * body?.discount) / 100
          ),
        },
        { new: true }
      );

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Update product successfully",
        data: updateDataById,
      });
    } catch (error) {
      next(error);
    }
  }
);
productRouter.delete(`/delete-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteDataById = await productModel.findByIdAndDelete(id, {
      new: true,
    });

    if (deleteDataById?.thumbnail) {
      await cloudinary_deleteFile(deleteDataById?.thumbnail);
    }

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Delete product successfully",
      data: deleteDataById,
    });
  } catch (error) {
    next(error);
  }
});

export default productRouter;
