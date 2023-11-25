import { api } from "./api";
import type {
  CardsResponse,
  GetCardResponse,
  GetCardsResponse,
  ICard,
} from "../../types/card.types";
import { setCards, setTotalPages } from "../store/reducers/CardsSlice";
import { setCard } from "../store/reducers/CardSlice";

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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const mainData = await queryFulfilled;
        const { cards, totalPages } = mainData.data;
        dispatch(setCards(cards));
        dispatch(setTotalPages(totalPages));
      },
    }),

    getCard: builder.query<GetCardResponse, string | string[]>({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      transformResponse: (response: ICard) => ({
        card: response,
      }),
      providesTags: (result, error, id) => [{ type: "Cards", id: `${id}` }],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const mainData = await queryFulfilled;
        const { card } = mainData.data;
        dispatch(setCard(card));
      },
    }),
  }),
});
