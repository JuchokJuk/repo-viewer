import { IGetPopularTSRequest, IGetPopularTSResponse } from "./types";
import { baseApi } from "../baseApi";

export const githubApi = baseApi.injectEndpoints({
   endpoints: (builder) => ({
      getPopularTSRepositories: builder.query<
         IGetPopularTSResponse,
         IGetPopularTSRequest
      >({
         query: ({ page = 1, per_page = 20, sort = "stars", order = "desc" }) =>
            `search/repositories?q=language:TypeScript+stars:>1&sort=${sort}&order=${order}&per_page=${per_page}&page=${page}`,
      }),
   }),
});
export const { useLazyGetPopularTSRepositoriesQuery } = githubApi;
