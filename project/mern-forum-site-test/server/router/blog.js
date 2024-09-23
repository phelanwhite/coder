import express from "express";
import { StatusCodes } from "http-status-codes";
import blogModel from "../model/blog.js";
import upload from "../config/multer-config.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadImageFile,
} from "../config/cloudinary-config.js";
import { handleResponse } from "../helper/response.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { query } from "../helper/constants.js";
import commentModel from "../model/comment.js";
import slug from "slug";
import mongoose from "mongoose";

const blogRouter = express.Router();

blogRouter.post(
  `/create`,
  verifyToken,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = req.user;
      const file = req.file;
      console.log(file);

      let thumbnail = body.thumbnail;
      if (file) {
        thumbnail = (await cloudinary_uploadImageFile(file)).secure_url;
      }

      const newData = await blogModel.create({
        ...body,
        thumbnail,
        slug: slug(body?.title),
        author: user._id,
      });
      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Blog created successfully",
        data: newData,
      });
    } catch (error) {
      next(error);
    }
  }
);
blogRouter.put(
  `/update-id/:id`,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const file = req.file;
      let thumbnail = body.thumbnail;
      if (file) {
        thumbnail = (await cloudinary_uploadImageFile(file)).secure_url;
        await cloudinary_deleteFile(body.thumbnail);
      }

      const updateDataById = await blogModel.findByIdAndUpdate(
        id,
        { ...body, ...(body?.title && { slug: slug(body?.title) }), thumbnail },
        { new: true }
      );
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Blog updated successfully",
        data: updateDataById,
      });
    } catch (error) {
      next(error);
    }
  }
);
blogRouter.put(`/like/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await blogModel.findByIdAndUpdate(
      id,
      {
        $inc: { likes: 1 },
      },
      { new: true }
    );
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Like/unlike updated successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.delete(`/delete-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteDataById = await blogModel.findByIdAndDelete(id, { new: true });
    await commentModel.deleteMany({
      blog: id,
    });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blog deleted successfully",
      data: deleteDataById,
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.query.user;
    const data = await blogModel.findById(id).populate(`author`);

    const total_comments = await commentModel.countDocuments({
      blog: id,
    });

    const count_word = data?.description?.split(" ").length;
    const reading_time_blog = Math.ceil(
      data?.description?.split(" ").length / 200
    );

    // update view

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Blog retrieved successfully",
      data: { ...data?._doc, total_comments, count_word, reading_time_blog },
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const q = req.query.q || query.SEARCH;
    const page = parseInt(req.query.page) || query.PAGE;
    const limit = parseInt(req.query.limit) || query.LIMIT;
    const skip = (page - 1) * limit;
    const topic = req.query.topic || null;
    const author = req.query.author || null;
    const status = true;

    // sort
    const _likes = parseInt(req.query.likes) || null;
    const _created_at = req.query.created_at || -1;

    const sort = { ...(_likes && { likes: _likes }), createdAt: _created_at };

    const filter = [
      {
        $match: {
          status: status,
          ...(q && {
            title: {
              $regex: q,
              $options: "i",
            },
          }),
          ...(topic && {
            topic: {
              $in: [topic],
            },
          }),
          ...(author && {
            author: new mongoose.Types.ObjectId(author),
          }),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "blog",
          as: "comments",
        },
      },
      {
        $addFields: {
          count_comment: {
            $size: "$comments",
          },
        },
      },
    ];

    const total_row = (
      await blogModel.aggregate([
        ...filter,

        {
          $count: "total_row",
        },
      ])
    )?.[0]?.total_row;

    const total_page = Math.ceil(total_row / limit);

    const data = await blogModel.aggregate([
      ...filter,
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $sort: { ...sort },
      },
    ]);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "All blogs retrieved successfully",
      data: { data: data, limit, total_page, total_row, page },
    });
  } catch (error) {
    next(error);
  }
});
blogRouter.get(`/get-all-by-me`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;

    const page = parseInt(req.query.page) || query.PAGE;
    const limit = parseInt(req.query.limit) || query.LIMIT;
    const status = req.query.status
      ? req.query.status === `1`
        ? true
        : false
      : false;

    const filter = {
      author: user._id,
      status: status,
    };

    const datas = await blogModel
      .find(filter)
      .populate("author")
      .sort({
        createdAt: -1,
      })
      .limit(limit)
      .skip((page - 1) * limit);

    const total_row = await blogModel.countDocuments(filter);

    const total_page = Math.ceil(total_row / limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "All blogs retrieved successfully",
      data: { data: datas, limit, total_page, total_row, page },
    });
  } catch (error) {
    next(error);
  }
});

// blogRouter.get(`/get-all-topic`, async (req, res, next) => {
//   try {
//     const data = await blogModel.aggregate([
//       {
//         $unwind: "$topic",
//       },
//       {
//         $group: {
//           _id: null,
//           count: {
//             $sum: "$topic",
//           },
//         },
//       },

//     ]);

//     return handleResponse(res, {
//       status: StatusCodes.OK,
//       message: "All topics retrieved successfully",
//       data: data,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

export default blogRouter;
