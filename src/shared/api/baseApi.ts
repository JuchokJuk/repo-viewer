import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gitHubUrlApi } from "../constants/apiUrls";

export const baseApi = createApi({
   baseQuery: fetchBaseQuery({ baseUrl: gitHubUrlApi }),
   endpoints: () => ({}),
});

export const { usePrefetch } = baseApi;
