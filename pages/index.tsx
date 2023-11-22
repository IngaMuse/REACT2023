import React, { useEffect } from "react";
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

const Main = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const page = searchParams.get("page") || "1";
  // const params = useParams();
  const { setLoading } = useActions();
  const { setCards } = useActions();
  const search: string = useAppSelector((state) => state.search.search);
  const page: string = useAppSelector((state) => state.page.page);
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
      // if (searchParams.has("page")) searchParams.set("page", page);
      // else searchParams.append("page", page);
      // setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    search,
    limit,
    // searchParams,
    // setSearchParams,
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
      {/* {params.id == undefined ? (
        <div className="header__main">{headerMain()}</div>
      ) : */}
      (
      <Link
        href={link}
        className="header__main"
        style={{ textDecoration: "none", color: "black" }}
      >
        {headerMain()}
      </Link>
      ){/* } */}
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
