import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import listModel from "../models/list.model.js";
import { handleResponse } from "../helpers/responses.js";
import { StatusCodes } from "http-status-codes";
import { QUERY } from "../helpers/constants.js";
import listItemModel from "../models/list-item.model.js";

const listRouter = express.Router();

listRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const user = req.user;

    const newData = await listModel
      .create({ ...body, author: user?._id })
      .then(async (value) => {
        const data = await listModel.findById(value?._id).populate("author");
        return data;
      });

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

    const updateData = await listModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "List updated successfully",
      data: updateData,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteData = await listModel
      .findByIdAndDelete(id, { new: true })
      .then(async (value) => {
        await listItemModel.deleteMany({
          list: value?._id,
        });
        return value;
      });

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "List deleted successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.get(`/get-lists-by-me`, verifyToken, async (req, res, next) => {
  try {
    const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
    const _page = parseInt(req.query._page) || QUERY._PAGE;
    const _skip = (_page - 1) * _limit;
    const _blog = req.query._blog;
    const user = req.user;

    const filter = {
      author: user?._id,
    };

    const getDatas = await listModel
      .find(filter)
      .populate(["author"])
      .sort({ createdAt: -1 })
      .skip(_skip)
      .limit(_limit)
      .then(async (value) => {
        const datas = [];
        for (const element of value) {
          const count_blog = await listItemModel.countDocuments({
            list: element._id,
          });
          const isChecked = (await listItemModel.findOne({
            list: element._id,
            blog: _blog,
            author: user?._id,
          }))
            ? true
            : false;

          const imageBlogs = await listItemModel
            .find({
              list: element._id,
            })
            .populate([`blog`])
            .then((value) => {
              return value?.map((item) => item?.blog?.thumbnail);
            });
          datas.push({ ...element._doc, count_blog, isChecked, imageBlogs });
        }

        return datas;
      });

    const total_row = await listModel.countDocuments(filter);
    const total_page = Math.ceil(total_row / _limit);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Lists retrieved successfully",
      data: {
        result: getDatas,
        total_page,
        total_row,
        _limit,
        _page,
      },
    });
  } catch (error) {
    next(error);
  }
});
listRouter.get(`/get-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;

    const getData = await listModel.findById(id).populate(["author"]);

    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "List retrieved successfully",
      data: getData,
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

// item
listRouter.get(
  `/get-items-by-list/:id`,
  verifyToken,
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const _limit = parseInt(req.query._limit) || QUERY._LIMIT;
      const _page = parseInt(req.query._page) || QUERY._PAGE;
      const _skip = (_page - 1) * _limit;

      const filter = {
        list: id,
      };

      const getDatas = await listItemModel
        .find(filter)
        .populate([
          {
            path: "author",
          },
          {
            path: "blog",
            populate: {
              path: "author",
            },
          },
        ])
        .sort({ createdAt: -1 })
        .skip(_skip)
        .limit(_limit);

      const total_row = await listItemModel.countDocuments(filter);
      const total_page = Math.ceil(total_row / _limit);

      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Items retrieved successfully",
        data: {
          result: getDatas,
          total_page,
          total_row,
          _limit,
          _page,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);
listRouter.post(`/add-item`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const newData = await listItemModel.create({ ...body, author: user?._id });

    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "Added item successfully",
      data: newData,
    });
  } catch (error) {
    next(error);
  }
});

listRouter.delete(`/remove-item`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const _list = req.query._list;
    const _blog = req.query._blog;

    const deleteData = await listItemModel.findOneAndDelete(
      {
        author: user?._id,
        list: _list,
        blog: _blog,
      },
      { new: true }
    );
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Removed item successfully",
      data: deleteData,
    });
  } catch (error) {
    next(error);
  }
});

export default listRouter;
