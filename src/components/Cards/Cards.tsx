import React from "react";
import Card from "./Card";
import type { ICards } from "../../types/form.types";
import "./styles.css";

const Cards = ({ cards }: ICards) => {
  if (cards?.length == 0) {
    return <div className="cards__not">cards not found</div>;
  }
  const cardsList =
    cards && cards.map((card) => <Card key={card.id} info={card} />);
  return <div className="cards__list">{cardsList}</div>;
};

export default Cards;
