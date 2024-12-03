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
    // refresh token
    if (error.status === 403) {
      try {
        const url = ENV.PORT_SERVER + `auth/refresh-token`;
        const refreshTokenResult = (
          await axios.post(
            url,
            {},
            {
              withCredentials: true,
            }
          )
        ).data;

        if (refreshTokenResult?.status === 200) {
          useAuthStore.setState({
            access_token: refreshTokenResult?.data?.access_token,
          });

          // retry the original query with new access token
          const originalRequestConfig = error.config;

          const query = (await axios.request(originalRequestConfig)).data;
          console.log({
            query,
          });

          return Promise.resolve(query);
        } else {
          await useAuthStore.getState().signout();
          return Promise.reject(customError);
        }
      } catch (_error: any) {
        if (_error.status === 403) {
          await useAuthStore.getState().signout();
          return Promise.reject(customError);
        }
      }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(customError);
  }
);
