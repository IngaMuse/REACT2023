import React from "react";
import Card from "./Card";
import styles from "../../styles/cards.module.css";
import { ICard } from "@/types/card.types";

export interface Cards {
  cards: ICard[];
}

const Cards = (props: Cards) => {
  const { cards } = props;

  if (cards?.length == 0) {
    return <div className={styles.cards__not}>cards not found</div>;
  }

  const cardsList =
    cards &&
    cards.map((card) => <Card key={card.id} info={card} details={false} />);

  return (
    <div className={`${styles.cards__list} ${styles.card__column}`}>
      {cardsList}
    </div>
  );
};

export default Cards;
