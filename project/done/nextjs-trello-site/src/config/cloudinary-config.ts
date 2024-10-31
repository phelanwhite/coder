"use server";
import { v2 as cloudinary } from "cloudinary";
import env from "./env-config";

cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_NAME,
  api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: `nextjs-trello-site` }, function (err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result?.secure_url);
      })
      .end(buffer);
  });
}

export async function deleteImage(imageId: string) {
  const public_id = imageId?.split("/")?.pop()?.split(".")?.[0];
  const result = await cloudinary.uploader.destroy(
    (`nextjs-trello-site/` + public_id) as string
  );
  return result;
}
