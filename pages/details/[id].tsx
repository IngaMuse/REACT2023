import React from "react";
import { ServerSide } from "@/types/card.types";
import { cardsAPI } from "../../lib/services/CardsService";
import { wrapper } from "../../lib/store/store";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Layout from "../../components/Layout/Layout";

const DetailsPage = ({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { cards, details } = response;

  return (
    <>
      <Layout cards={cards} details={details} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{ response: ServerSide }> =
  wrapper.getServerSideProps((store) => async (context) => {
    const pageNumber = context.query.page?.toString() || "1";
    const pageLimit = context.query.limit?.toString() || "30";
    const pageSearch = context.query.search?.toString() || "";
    const Id = context?.params?.id;

    store.dispatch(
      cardsAPI.endpoints.getCards.initiate({
        page: pageNumber,
        limit: pageLimit,
        search: pageSearch,
      }),
    );

    if (Id) store.dispatch(cardsAPI.endpoints.getCard.initiate(Id));

    await Promise.all(store.dispatch(cardsAPI.util.getRunningQueriesThunk()));

    return {
      props: {
        response: {
          cards: store.getState().cards,
          details: store.getState().card.card,
        },
      },
    };
  });

export default DetailsPage;
