import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./authApi";

export const myMovieApi = createApi({
  reducerPath: "myMovieApi",
  tagTypes: ["myMovieApi"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    addMovie: builder.mutation({
      query: ({ body }) => ({
        url: `my-movie/`,
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["myMovieApi"],
    }),
    removeMovie: builder.mutation({
      query: ({ id }) => ({
        url: `my-movie/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["myMovieApi"],
    }),
    getMovieList: builder.query({
      query: () => ({
        url: `my-movie/`,
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
