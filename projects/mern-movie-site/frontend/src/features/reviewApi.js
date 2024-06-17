import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./authApi";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  tagTypes: ["reviewApi"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ body }) => ({
        url: `review/`,
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["reviewApi"],
    }),

    getReviewMovieId: builder.query({
      query: ({ media_id, media_type }) => ({
        url: `review/?media_id=${media_id}&media_type=${media_type}`,
        method: "get",
      }),
      providesTags: ["reviewApi"],
    }),
  }),
});

export const { useAddReviewMutation, useGetReviewMovieIdQuery } = reviewApi;
