import express from "express";
import listModel from "../model/list.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
import { query } from "../helper/constants.js";
import blogModel from "../model/blog.js";
import mongoose, { Schema } from "mongoose";

const listRouter = express.Router();

listRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;
    const newData = await listModel.create({ ...body, author: user._id });
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "List created successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.put(`/update-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = await listModel.findByIdAndUpdate(id, body, { new: true });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "List updated successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteData = await listModel.findByIdAndDelete(id, { new: true });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "List deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.get(`/get-all-by-me`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const _q = req.query.q || query.SEARCH;
    const _topic = req.query.topic || "";
    const _page = parseInt(req.query.page) || query.PAGE;
    const _limit = parseInt(req.query.limit) || query.LIMIT;
    const _skip = (_page - 1) * _limit;

    const filter = [
      {
        $match: {
          ...(_q && {
            title: {
              $regex: _q,
              $options: "i",
            },
          }),
          ...(_topic && {
            topic: {
              $in: [_topic],
            },
          }),
          author: new mongoose.Types.ObjectId(user._id),
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
          from: "blogLists",
          localField: "blog",
          foreignField: "blog",
          as: "blogs",
        },
      },
      {
        $addFields: {
          count_blog: {
            $size: "$blogs",
          },
        },
      },
    ];

    const data = await listModel.aggregate([
      ...filter,
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $skip: _skip,
      },
      {
        $limit: _limit,
      },
    ]);

    const total_row = (
      await listModel.aggregate([
        ...filter,
        {
          $count: "total_row",
        },
      ])
    )?.[0]?.total_row;

    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Lists retrieved successfully",
      data: { data: data, limit: _limit, total_page, total_row, page: _page },
    });
  } catch (error) {
    next(error);
  }
});
listRouter.get(`/get-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await listModel
      .findById(id)
      .populate(["author"])
      .populate({
        path: "blogs",
        populate: {
          path: "author",
        },
      });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "List retrieved successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});
// listRouter.get(
//   `/get-blogs-by-list-id/:id`,
//   verifyToken,
//   async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const data = await listModel.findById(id).populate(["author"]);

//       return handleResponse(res, {
//         status: StatusCodes.OK,
//         message: "List retrieved successfully",
//         data: data,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// listRouter.put(`/add-remove-blog/:id`, verifyToken, async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const body = req.body;

//     const checkBlog = await listModel.findOne({
//       _id: id,
//       blogs: body.blog_id,
//     });

//     const updateList = await listModel.findByIdAndUpdate(
//       id,
//       {
//         ...(checkBlog
//           ? {
//               $pull: {
//                 blogs: body.blog_id,
//               },
//             }
//           : {
//               $push: {
//                 blogs: body.blog_id,
//               },
//             }),
//       },
//       { new: true }
//     );

//     return handleResponse(res, {
//       status: StatusCodes.OK,
//       message: checkBlog
//         ? "Blog remove successfully"
//         : "Blog added successfully",
//       data: updateList,
//     });
//   } catch (error) {
//     next(error);
//   }
// });
export default listRouter;
