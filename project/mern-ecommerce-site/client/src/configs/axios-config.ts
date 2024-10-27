import axios from "axios";
import env from "./env-config";

const axiosConfig = axios.create({
  baseURL: env.PORT_SERVER,
  params: {
    // _tracking_id: `66d904a1cbe4e2e3c1c56507`,
    ...(localStorage.getItem(`_tracking_id`) && {
      _tracking_id: localStorage.getItem(`_tracking_id`),
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
    console.log({ error });

    if (error.status === 401) {
      localStorage.removeItem("auth");
      // window.location.replace(`/signin`);
      // toast.error(
      //   `Invalid credentials. Please check your credentials and try again later.`
      // );
    }

    const makeError = error?.response?.data;

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.reject(error);
    return Promise.reject(makeError);
  }
);

export default axiosConfig;
