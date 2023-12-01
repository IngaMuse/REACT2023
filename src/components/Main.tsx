import React, { useEffect } from "react";
import { useActions, useAppSelector } from "../hooks/redux";
import Cards from "./Cards/Cards";

const Main = () => {
  //const { addCard } = useActions();
  const cards = useAppSelector((state) => state.cards.cards);
  useEffect(() => {}, []);

  return (
    <div className="main">
      <Cards cards={cards} />
    </div>
  );
};

export default Main;
