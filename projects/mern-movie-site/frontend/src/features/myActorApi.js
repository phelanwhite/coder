import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./authApi";

export const myActorApi = createApi({
  reducerPath: "myActorApi",
  tagTypes: ["myActorApi"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    addActor: builder.mutation({
      query: ({ body }) => ({
        url: `my-actor/`,
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["myActorApi"],
    }),
    removeActor: builder.mutation({
      query: ({ id }) => ({
        url: `my-actor/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["myActorApi"],
    }),
    getActorList: builder.query({
      query: () => ({
        url: `my-actor/`,
        method: "get",
      }),
      providesTags: ["myActorApi"],
    }),
  }),
});

export const {
  useAddActorMutation,
  useRemoveActorMutation,
  useGetActorListQuery,
} = myActorApi;
