import express from "express";
import upload from "../config/multer-config.js";
import {
  cloudinary_deleteFile,
  cloudinary_uploadImageFile,
  // cloudinary_uploadVideoFile,
} from "../config/cloudinary-config.js";
import { handleResponse } from "../helper/response.js";
import { StatusCodes } from "http-status-codes";
const uploadRouter = express.Router();

uploadRouter.post(
  `/upload-image-single`,
  upload.single(`file`),
  async (req, res, next) => {
    try {
      const { file } = req;
      const result = await cloudinary_uploadImageFile(file);
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "File uploaded successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

uploadRouter.post(
  `/upload-image-multiple`,
  upload.array(`files`),
  async (req, res, next) => {
    try {
      const { files } = req;
      const results = await Promise.all(
        files.map(async (file) => await cloudinary_uploadImageFile(file))
      );
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Files uploaded successfully",
        data: results,
      });
    } catch (error) {
      next(error);
    }
  }
);

uploadRouter.post(
  `/upload-image-fields`,
  upload.fields([
    {
      name: "file",
    },
    {
      name: "files",
    },
  ]),
  async (req, res, next) => {
    try {
      const { file, files } = req.files;

      const fileResult = await cloudinary_uploadImageFile(file?.[0]);
      const filesResults = await Promise.all(
        files.map(async (file) => await cloudinary_uploadImageFile(file))
      );
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Files uploaded successfully",
        data: { file: fileResult, files: filesResults },
      });
    } catch (error) {
      next(error);
    }
  }
);

// uploadRouter.post(
//   `/upload-video-single`,
//   async (req, res, next) => {
//     try {
//       console.log(`body: `, req.body);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   },
//   upload.single(`file`),
//   async (req, res, next) => {
//     try {
//       const { file } = req;

//       // const result = await cloudinary_uploadVideoFile(file);
//       return handleResponse(res, {
//         status: StatusCodes.OK,
//         message: "File uploaded successfully",
//         data: file,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

uploadRouter.delete(`/delete-file`, async (req, res, next) => {
  try {
    const url = req.query.url;
    const result = cloudinary_deleteFile(url);
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "File deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default uploadRouter;
