import React from "react";
import Loader from "../Loader/Loader";
import Card from "./Card";
import Link from "next/link";
import { useAppSelector } from "../../lib/hooks/redux";
import { cardsAPI } from "../../lib/services/CardsService";
import { useActions } from "../../lib/hooks/redux";
import styles from "../../styles/cards.module.css";

const CardPage = () => {
  const page = useAppSelector((state) => state.page.page);
  const limit = useAppSelector((state) => state.limit.limit);

  let link = "/?page=" + page + "&limit=" + limit;
  //const id = params.id?.toString() || "";
  const id = "";

  const { isLoading, isSuccess, data: cardData } = cardsAPI.useGetCardQuery(id);

  return (
    <div
      className={`${styles.card__page} ${styles.card__column}`}
      data-testid="detail"
    >
      <Link href={link} className={styles.card__drop}></Link>
      {!isLoading ? (
        <Card info={cardData} details={true} />
      ) : (
        <div className={styles.main__loader}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CardPage;
