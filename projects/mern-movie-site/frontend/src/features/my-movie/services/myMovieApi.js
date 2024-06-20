import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "features/auth/services/baseQuery";

export const myMovieApi = createApi({
  reducerPath: "myMovieApi",
  tagTypes: ["myMovieApi"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    addMovie: builder.mutation({
      query: ({ body }) => ({
        url: `my-movie/add-movie`,
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["myMovieApi"],
    }),
    removeMovie: builder.mutation({
      query: ({ id }) => ({
        url: `my-movie/remove-movie-id/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["myMovieApi"],
    }),
    getMovieList: builder.query({
      query: () => ({
        url: `my-movie/get-my-movie`,
        method: "get",
      }),
      providesTags: ["myMovieApi"],
    }),
  }),
});

export const {
  useAddMovieMutation,
  useRemoveMovieMutation,
  useGetMovieListQuery,
} = myMovieApi;
