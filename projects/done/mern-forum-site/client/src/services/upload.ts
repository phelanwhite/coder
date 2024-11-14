import axios from "axios";
import React from "react";

export const uploadToCloudinary = async (file: File) => {
  const url = `https://api.cloudinary.com/v1_1/dchn3imkg/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append(`upload_preset`, `mern-forum-site`);
  const response = (await axios.post(url, formData)).data;
  return response;
};
