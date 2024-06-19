import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithAuth } from "./baseQuery";

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
        method: "DELETE",
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

    signinPassportSuccess: builder.query({
      query: () => ({
        url: `auth/signin/success`,
        method: "GET",
      }),
      providesTags: ["authApi"],
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
  useSigninPassportSuccessQuery,
} = authApi;
