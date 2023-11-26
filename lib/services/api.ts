import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Cards"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});
