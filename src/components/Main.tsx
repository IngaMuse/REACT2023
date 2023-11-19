import React, { useEffect } from "react";
import Search from "./Search/Search";
import Cards from "./Cards/Cards";
import Pagination from "./Pagination/Pagination";
import LimitPage from "./Pagination/LimitPage";
import Loader from "./Loader/Loader";
import ErrorTest from "./Error/ErrorTest";
import { useSearchParams, Link, useParams } from "react-router-dom";
import { cardsAPI } from "../services/CardsService";
import { useAppSelector } from "../hooks/redux";
import { useActions } from "../hooks/redux";

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const params = useParams();
  const { setLoading } = useActions();
  const { setCards } = useActions();
  const search: string = useAppSelector((state) => state.search.search);
  const limit: string = useAppSelector((state) => state.limit.limit);

  const {
    isLoading,
    isSuccess,
    data: cardsData,
  } = cardsAPI.useGetCardsQuery({
    page,
    search,
    limit,
  });
  const { cards, totalPages } = cardsData || { cards: [], totalPages: 0 };

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
    if (isSuccess) {
      setLoading(false);
      setCards(cards);
      if (searchParams.has("page")) searchParams.set("page", page);
      else searchParams.append("page", page);
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    search,
    limit,
    searchParams,
    setSearchParams,
    cards,
    isLoading,
    isSuccess,
  ]);

  let link = "/?page=" + page;
  if (limit) {
    link = link + "&limit=" + limit;
  }
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
      {params.id == undefined ? (
        <div className="header__main">{headerMain()}</div>
      ) : (
        <Link
          to={link}
          className="header__main"
          style={{ textDecoration: "none", color: "black" }}
        >
          {headerMain()}
        </Link>
      )}
      {!isLoading ? (
        <Cards />
      ) : (
        <div className="main__loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Main;
