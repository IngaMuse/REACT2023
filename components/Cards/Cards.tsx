import React from "react";
import Card from "./Card";
import Link from "next/link";
import { useAppSelector } from "../../lib/hooks/redux";
import styles from "../../styles/cards.module.css";

const Cards = () => {
  const cards = useAppSelector((state) => state.cards.cards);
  const page = useAppSelector((state) => state.page.page);
  const limit = useAppSelector((state) => state.limit.limit);
  if (cards?.length == 0) {
    return <div className={styles.cards__not}>cards not found</div>;
  }

  let link = "/?page=" + page;
  if (limit !== "30") link = link + "&limit=" + limit;
  const cardsList =
    cards &&
    cards.map((card) => <Card key={card.id} info={card} details={false} />);

  return (
    <div className={styles.cards__page}>
      {/* {params.id == undefined ? (
        <div className={'${styles.cards__list} ${styles.card__column}'}>{cardsList}</div>
      ) : ( */}
      <Link
        href={link}
        className={`${styles.cards__list} ${styles.card__column}`}
      >
        {cardsList}
      </Link>
      {/* )} */}
    </div>
  );
};

export default Cards;
