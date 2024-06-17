//

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCurrentUser } from "./authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:5000/`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // headers.append("Accept-Control-Allow-Origin", "*");
    // const token = getState().auth.token

    // If we have a token set in state, let's assume that we should be passing it.
    // if (token) {
    //   headers.set('authorization', `Bearer ${token}`)
    // }

    return headers;
  },
});

export const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  // console.log({ api });

  if (result.error?.status == 401 || result.error?.status == 409) {
    api.dispatch(setCurrentUser(null));
    window.location.replace(`/signin`);
    return result;
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: [`authApi`],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: ({ body }) => ({
        url: `auth/signup`,
        method: "POST",
        body: body,
      }),
    }),
    signin: builder.mutation({
      query: ({ body }) => ({
        url: `auth/signin`,
        method: "POST",
        body: body,
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: `auth/signout`,
        method: "POST",
      }),
    }),

    getMe: builder.query({
      query: () => ({ url: `auth/get-me`, method: "GET" }),
      providesTags: ["authApi"],
    }),
    updateMe: builder.mutation({
      query: ({ body }) => ({
        url: `auth/update-me`,
        body: body,
        method: "PUT",
      }),
      invalidatesTags: ["authApi"],
    }),
  }),
});
export const {
  useSigninMutation,
  useSignupMutation,
  useSignoutMutation,

  useGetMeQuery,
  useUpdateMeMutation,
} = authApi;
