import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "./authSlice";
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
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

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["authApi"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: `auth/signin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["authApi"],
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `auth/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["authApi"],
    }),
    signout: builder.mutation({
      query: () => ({
        url: `auth/signout`,
        method: "POST",
      }),
      invalidatesTags: ["authApi"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["authApi"],
    }),
    resetPassword: builder.mutation({
      query: ({ data, token }) => ({
        url: `auth/reset-password?${token}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["authApi"],
    }),

    getListMe: builder.query({
      query: () => ({
        url: `auth/get-list-user`,
        method: "GET",
      }),
      providesTags: ["authApi"],
    }),
    getMe: builder.query({
      query: () => ({
        url: `auth/get-me`,
        method: "GET",
      }),
      providesTags: ["authApi"],
    }),
    updateMe: builder.mutation({
      query: (data) => ({
        url: `auth/update-me`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["authApi"],
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSignoutMutation,
  useGetMeQuery,
  useGetListMeQuery,
  useUpdateMeMutation,
} = authApi;
