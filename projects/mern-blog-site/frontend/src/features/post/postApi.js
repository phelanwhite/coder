//

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "features/auth/authApi";

export const postApi = createApi({
  reducerPath: "postApi",
  tagTypes: [`postApi`],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    post_create: builder.mutation({
      query: ({ body }) => ({
        url: `post/create-post`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["postApi"],
    }),
    post_update_id: builder.mutation({
      query: ({ body, id }) => ({
        url: `post/update-post-id/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["postApi"],
    }),
    post_delete_id: builder.mutation({
      query: ({ id }) => ({
        url: `post/delete-post-id/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["postApi"],
    }),
    post_get_all: builder.query({
      query: ({ params }) => ({
        url: `post/get-all`,
        method: "GET",
        params: params,
      }),
      providesTags: ["postApi"],
    }),
    post_get_mypost: builder.query({
      query: ({ params }) => ({
        url: `post/get-my-post`,
        method: "GET",
        params: params,
      }),
      providesTags: ["postApi"],
    }),
    post_get_id: builder.query({
      query: ({ id }) => ({
        url: `post/get-id/${id}`,
        method: "GET",
      }),
      providesTags: ["postApi"],
    }),
  }),
});
export const {
  usePost_createMutation,
  usePost_delete_idMutation,
  usePost_get_allQuery,
  usePost_get_mypostQuery,
  usePost_get_idQuery,
  usePost_update_idMutation,
} = postApi;
