import React, { useEffect } from "react";
import { useActions, useAppSelector } from "../hooks/redux";
import Cards from "./Cards/Cards";

const Main = () => {
  const cards = useAppSelector((state) => state.cards.cards);
  const createdForm = useAppSelector((state) => state.cards.createdForm);
  const { setCreatedForm } = useActions();

  const wait = (milliseconds: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  };

  useEffect(() => {
    const checkForm = async () => {
      if (createdForm) {
        await wait(3000);
        setCreatedForm(false);
      }
    };
    checkForm();
  }, [createdForm, setCreatedForm]);

  return (
    <div className="main">
      <Cards cards={cards} createdForm={createdForm} />
    </div>
  );
};

export default Main;
