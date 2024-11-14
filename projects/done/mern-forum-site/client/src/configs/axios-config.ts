import axios from "axios";
import ENV from "./env-config";

const axiosConfig = axios.create({
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
axiosConfig.interceptors.request.use(
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
axiosConfig.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    if (error.status === 403) {
      localStorage.removeItem("auth");
    }

    const customError = error?.response?.data;

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(customError);
  }
);

export default axiosConfig;
