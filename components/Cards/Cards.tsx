import React from "react";
import Card from "./Card";
import Link from "next/link";
import { useAppSelector } from "../../lib/hooks/redux";
//import "./style.css";

const Cards = () => {
  const cards = useAppSelector((state) => state.cards.cards);
  //const params = useParams();
  //const [searchParams] = useSearchParams();
  const page = useAppSelector((state) => state.page.page);
  const limit = useAppSelector((state) => state.limit.limit);
  if (cards?.length == 0) {
    return <div className="cards__not">cards not found</div>;
  }

  let link = "/?page=" + page;
  if (limit !== "30") link = link + "&limit=" + limit;
  const cardsList =
    cards &&
    cards.map((card) => <Card key={card.id} info={card} details={false} />);

  return (
    <div className="cards__page">
      {/* {params.id == undefined ? (
        <div className="cards__list card__column">{cardsList}</div>
      ) : ( */}
      <Link href={link} className="cards__list card__column">
        {cardsList}
      </Link>
      {/* )} */}
    </div>
  );
};

export default Cards;
