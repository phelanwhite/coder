import axios from "axios";
import ENV from "./env-config";
import { useAuthStore } from "@/stores/auth-store";

export const axiosConfigV1 = axios.create({
  baseURL: ENV.PORT_SERVER,
  params: {
    ...(localStorage.getItem("_tracking_id") && {
      _tracking_id: localStorage.getItem("_tracking_id"),
    }),
  },
  headers: {
    // "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with the request
});
// Add a request interceptor
axiosConfigV1.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axiosConfigV1.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    const customError = error?.response?.data;
    if (error.status === 403) {
      useAuthStore.getState().signout();
      // try {
      //   const response = await useAuthStore.getState().refreshToken();
      // } catch (error: any) {
      //   if (error.status === 403) {

      //     return;
      //   }
      // }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(customError);
  }
);
