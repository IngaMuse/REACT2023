import { api } from "./api";
import type { CardsResponse, GetCardsResponse } from "../../types/card.types";

interface GetParams {
  page: string;
  search: string;
  limit: string;
}

interface ServerParams {
  skip: string;
  q: string;
  limit: string;
}

export const cardsAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query<GetCardsResponse, GetParams>({
      query: (getParams) => {
        const params = {} as ServerParams;

        if (getParams.page && getParams.limit) {
          params.skip = ((+getParams.page - 1) * +getParams.limit).toString();
        }
        params.q = getParams.search;
        if (getParams.limit) {
          params.limit = getParams.limit;
        }
        return {
          url: "/users/search?",
          params,
        };
      },
      transformResponse: (response: CardsResponse) => ({
        cards: response.users,
        totalPages: response.total / response.limit,
      }),
      providesTags: (result, error, getParams) => [
        {
          type: "Cards",
          id: `${getParams.page}-${getParams.search}-${getParams.limit}`,
        },
      ],
    }),

    getCard: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Cards", id }],
    }),
  }),
});
