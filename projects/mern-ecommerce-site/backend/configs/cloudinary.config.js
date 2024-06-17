import { v2 as cloudinaryConfig } from "cloudinary";
import env from "./env.config.js";

cloudinaryConfig.config({
  api_key: env.cloudinary.CLOUDINARY_API_KEY,
  api_secret: env.cloudinary.CLOUDINARY_API_SECRET,
  cloud_name: env.cloudinary.CLOUDINARY_CLOUD_NAME,
});
export default cloudinaryConfig;

export async function cloudinary_uploadFile(file, folderUpload = `upload`) {
  const b64 = Buffer.from(file.buffer).toString("base64");
  let dataURI = "data:" + file.mimetype + ";base64," + b64;
  const fileUri = await cloudinaryConfig.uploader.upload(dataURI, {
    folder: `mern-ecommerce-site/${folderUpload}`,
  });

  return fileUri;
}

export async function cloudinary_deleteFile(
  fileDeleteUrl,
  folderDelete = `upload`
) {
  const public_id = fileDeleteUrl?.split("/")?.pop()?.split(".")?.[0];
  console.log(public_id);
  await cloudinaryConfig.uploader.destroy(
    `mern-ecommerce-site/${folderDelete}/` + public_id
  );
}
