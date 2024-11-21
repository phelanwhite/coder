import { axiosConfigV1 } from "@/configs/axios-config";

export async function uploadImageToCloud(file: File) {
  try {
    const url = `upload/single`;
    const formData = new FormData();
    formData.append("file", file);
    return (await axiosConfigV1.post(url, formData)).data;
  } catch (error) {
    console.log(error);
  }
}
export async function uploadImagesToCloud(files: FileList) {
  try {
    const url = `upload/array`;
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }
    return (await axiosConfigV1.post(url, formData)).data;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteImageFromCloud(fileUrl: string) {
  try {
    const url = `upload/delete-file/${fileUrl}`;
    return (await axiosConfigV1.delete(url)).data;
  } catch (error) {
    console.log(error);
  }
}
