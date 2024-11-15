import cloudinary from "../configs/cloudinary-config.js";
import ENV_CONFIG from "../configs/env-config.js";

const storage_utils = {
  cloudinary: {
    uploadImageFile: async function (file) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;

      const fileUri = await cloudinary.uploader.upload(dataURI, {
        folder: ENV_CONFIG.CLOUDINARY.CLOUDINARY_FOLDER_NAME,
      });

      return fileUri;
    },
    deleteFile: async function (fileUrl) {
      const public_id = fileUrl?.split("/")?.pop()?.split(".")?.[0];
      const url = await cloudinary.uploader.destroy(
        ENV_CONFIG.CLOUDINARY.CLOUDINARY_FOLDER_NAME + `/` + public_id
      );
      return url;
    },
  },
};

export default storage_utils;
