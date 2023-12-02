import React from "react";
import Card from "./Card";
import "./styles.css";
import { IForm } from "../../store/reducers/CardsSlice";

const Cards = ({ cards, createdForm }: IForm) => {
  if (cards?.length == 0) {
    return <div className="cards__not">cards not found</div>;
  }
  const cardsList =
    cards &&
    cards.map((card) => (
      <div
        className={
          createdForm && card.id == cards.length - 1 ? "card card_new" : "card"
        }
        key={card.id}
      >
        <Card key={card.id} info={card} />
      </div>
    ));
  return <div className="cards__list">{cardsList}</div>;
};

export default Cards;
