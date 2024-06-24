import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { setCurrentUser } from "./authSlice";
import envConfig from "configs/envConfig";

const clientUrl = envConfig.serverUrl;

const baseQuery = fetchBaseQuery({
  baseUrl: clientUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // headers.set("Content-Type", "application/json");
    // headers.set("Accept", "application/json");
    const token = getState().authSlice?.currentUser?.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status == 403 || result.error?.status == 401) {
    const refreshTokenResult = await baseQuery(
      {
        url: `auth/refresh-token`,
        method: "POST",
      },
      api,
      extraOptions
    );

    console.log({ refreshTokenResult });

    if (refreshTokenResult.data) {
      const user = api.getState().authSlice?.currentUser;

      api.dispatch(
        setCurrentUser({
          ...user,
          accessToken: refreshTokenResult?.data?.result,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setCurrentUser(null));
      window.location.replace(`/signin`);
    }
  }

  return result;
};
