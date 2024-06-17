import express from "express";
import categoryModel from "../models/category.model.js";

const authRoute = express.Router();

authRoute.post("/add-many", async (req, res, next) => {
  try {
    const categoryList = [
      {
        name: "Điện thoại Smartphone",
        slug: slug(`Điện thoại Smartphone`),
        thumbnail: "",
      },

      {
        name: "Máy tính bảng",
        slug: slug(`Máy tính bảng`),
        thumbnail: "",
      },
      {
        name: "Laptop",
        slug: slug(`Laptop`),
        thumbnail: "",
      },
      {
        name: "PC - Máy Tính Bộ",
        slug: slug(`PC - Máy Tính Bộ`),
        thumbnail: "",
      },
      {
        name: "Phụ Kiện",
        slug: slug(`Phụ Kiện`),
        thumbnail: "",
      },
      {
        name: "Máy Ảnh - Máy Quay Phim",
        slug: slug(`Máy Ảnh - Máy Quay Phim`),
        thumbnail: "",
      },
      {
        name: "Đồng hồ",
        slug: slug(`Đồng hồ`),
        thumbnail: "",
      },
      {
        name: "Máy In - Photocopy",
        slug: slug(`Máy In - Photocopy`),
        thumbnail: "",
      },
    ];
    const dataResp = await categoryModel.insertMany(categoryList);
    res.status(201).json(dataResp);
  } catch (error) {
    next(error);
  }
});
