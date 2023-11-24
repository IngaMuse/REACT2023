import React from "react";
import Search from "../components/Search/Search";
import Cards from "../components/Cards/Cards";
import Pagination from "../components/Pagination/Pagination";
import LimitPage from "../components/Pagination/LimitPage";
import ErrorTest from "../components/Error/ErrorTest";
import { ServerSide } from "@/types/card.types";
import { cardsAPI } from "../lib/services/CardsService";
import { useRouter } from "next/router";
import { wrapper } from "../lib/store/store";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import ErrorBoundary from "@/components/Error/Error";

const Main = ({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { cards, details } = response;
  const router = useRouter();
  const { query } = router;
  const { page, limit, search, details: detailedId } = query;

  const headerMain = () => (
    <>
      <Search searchValue={search || ""} />
      <ErrorTest />
      <LimitPage limit={limit?.toString() || "30"} />
      <Pagination
        totalPages={cards.totalPages}
        page={page?.toString() || "1"}
      />
    </>
  );

  return (
    <ErrorBoundary>
      <div className="main">
        {/* <Link
        href="/"
        className="header__main"
        style={{ textDecoration: "none", color: "black" }}
      > */}
        {headerMain()}
        <Cards cards={cards.cards} />
      </div>
    </ErrorBoundary>
  );
};

export const getServerSideProps: GetServerSideProps<{ response: ServerSide }> =
  wrapper.getServerSideProps((store) => async (context) => {
    const pageNumber = context.query.page?.toString() || "1";
    const pageLimit = context.query.limit?.toString() || "30";
    const pageSearch = context.query.search?.toString() || "";
    store.dispatch(
      cardsAPI.endpoints.getCards.initiate({
        page: pageNumber,
        limit: pageLimit,
        search: pageSearch,
      }),
    );
    await Promise.all(store.dispatch(cardsAPI.util.getRunningQueriesThunk()));
    return {
      props: {
        response: {
          cards: store.getState().cards,
          details: null,
        },
      },
    };
  });

export default Main;
