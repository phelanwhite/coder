import axios from "axios";

const axiosConfig = axios.create({
  baseURL: `http://localhost:5000/api`,
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

    const makeError = error?.response?.data;
    // return Promise.reject(error);
    return Promise.reject(makeError);
  }
);

// Add a response interceptor
axiosConfig.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    const makeError = error?.response?.data;

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.reject(error);
    return Promise.reject(makeError);
  }
);

export default axiosConfig;
