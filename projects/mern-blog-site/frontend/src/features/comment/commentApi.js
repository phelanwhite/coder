//

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "features/auth/authApi";

export const commentApi = createApi({
  reducerPath: "commentApi",
  tagTypes: [`commentApi`],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    comment_create: builder.mutation({
      query: ({ body }) => ({
        url: `comment/create-comment`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["commentApi"],
    }),
    comment_get_post_id: builder.query({
      query: ({ id }) => ({
        url: `comment/get-comment-post-id/${id}`,
        method: "GET",
      }),
      providesTags: ["commentApi"],
    }),
  }),
});
export const { useComment_createMutation, useComment_get_post_idQuery } =
  commentApi;
