import React from "react";
import Search from "../components/Search/Search";
import Cards from "../components/Cards/Cards";
import Pagination from "../components/Pagination/Pagination";
import LimitPage from "../components/Pagination/LimitPage";
import Loader from "../components/Loader/Loader";
import ErrorTest from "../components/Error/ErrorTest";
import Link from "next/link";
import { cardsAPI } from "../lib/services/CardsService";
import { useAppSelector } from "../lib/hooks/redux";
import { useActions } from "../lib/hooks/redux";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { wrapper } from "../lib/store/store";
import type { CardsResponse, GetCardsResponse } from "../types/card.types";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import styles from "../styles/loader.module.css";

const Main = ({ response }) => {
  // const searchParams = useSearchParams()
  // const pageParams = searchParams.get("page");
  const router = useRouter();
  const search: string = useAppSelector((state) => state.search.search);
  const page: string = useAppSelector((state) => state.page.page);
  const limit: string = useAppSelector((state) => state.limit.limit);

  const id = router.query.details;

  const { data: cardsData } = cardsAPI.useGetCardsQuery({
    page,
    search,
    limit,
  });
  const { cards, totalPages } = cardsData || { cards: [], totalPages: 0 };

  if (id) {
    const { data: cardData } = cardsAPI.useGetCardQuery(id);
  }

  // if (isLoading) {
  //   setLoading(true);
  // }
  // if (isSuccess) {
  //   setLoading(false);
  //   setCards(cards);}
  // if (searchParams.has("page")) searchParams.set("page", page);
  // else searchParams.append("page", page);
  // setSearchParams(searchParams);

  let link = "/?page=" + page + "&limit=" + limit;

  const headerMain = () => (
    <>
      <Search />
      <ErrorTest />
      <LimitPage />
      <Pagination totalPages={totalPages} />
    </>
  );

  return (
    <div className="main">
      {/* {params.id == undefined ? (
        <div className="header__main">{headerMain()}</div>
      ) : ( */}
      <Link
        href={link}
        className="header__main"
        style={{ textDecoration: "none", color: "black" }}
      >
        {headerMain()}
      </Link>
      {/*) } */}
      {/* {!isLoading ? ( */}
      <Cards />
      {/* ) : (
          <div className={styles.main__loader}>
          <Loader />
        </div>
      )} */}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const pageNumber = String(context.query.page) || "1";
    const pageLimit = String(context.query.limit) || "30";
    const pageSearch = String(context.query.search) || " ";
    const response = await store.dispatch(
      cardsAPI.endpoints.getCards.initiate({
        page: pageNumber,
        limit: pageLimit,
        search: pageSearch,
      }),
    );
    //console.log("State on server", store.getState());

    await Promise.all(store.dispatch(cardsAPI.util.getRunningQueriesThunk()));
    return {
      props: { response },
    };
  },
);

export default Main;
