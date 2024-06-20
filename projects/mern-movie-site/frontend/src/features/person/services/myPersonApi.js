import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "features/auth/services/baseQuery";

export const myPersonApi = createApi({
  reducerPath: "myPersonApi",
  tagTypes: ["myPersonApi"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    addPerson: builder.mutation({
      query: ({ body }) => ({
        url: `my-person/add-person`,
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["myPersonApi"],
    }),
    removePerson: builder.mutation({
      query: ({ id }) => ({
        url: `my-person/remove-person-id/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["myPersonApi"],
    }),
    getPersonList: builder.query({
      query: () => ({
        url: `my-person/get-my-person`,
        method: "get",
      }),
      providesTags: ["myPersonApi"],
    }),
  }),
});

export const {
  useAddPersonMutation,
  useRemovePersonMutation,
  useGetPersonListQuery,
} = myPersonApi;
