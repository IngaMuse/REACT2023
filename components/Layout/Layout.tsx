import React from "react";
import Search from "../Search/Search";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";
import LimitPage from "../Pagination/LimitPage";
import ErrorTest from "../Error/ErrorTest";
import { ServerSide } from "@/types/card.types";
import { useRouter } from "next/router";
import ErrorBoundary from "@/components/Error/Error";
import CardPage from "../Cards/CardPage";
import styles from "../../styles/cards.module.css";

const Layout = ({ cards, details }: ServerSide) => {
  const router = useRouter();
  const { query } = router;
  const { page, limit, search, id: Id } = query;

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
        {headerMain()}
        <div className={styles.cards__page}>
          <Cards cards={cards.cards} />
          {Id && <CardPage cardDetails={details} />}
        </div>
      </div>
    </ErrorBoundary>
  );
};
export default Layout;
