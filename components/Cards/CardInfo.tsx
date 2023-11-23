import React from "react";
import { CardProps } from "../../types/card.types";
import CardDetails from "./CardDetails";
import styles from "../../styles/cards.module.css";

const CardInfo = ({ info, details }: CardProps) => {
  return (
    <>
      <div className={styles.card__img}>
        <img src={info?.image} alt="image" />
      </div>
      <div className={styles.card__content}>
        <div className={styles.card__name}>
          {info?.firstName + " " + info?.lastName}
        </div>
        <div className={styles.card__info}>
          <u>age:</u>
          <b>{info?.age}</b>
        </div>
        <div className={styles.card__info}>
          <u>gender:</u>
          <b>{info?.gender}</b>
        </div>
        <div className={styles.card__info}>
          <u>user name:</u>
          <b>{info?.username}</b>
        </div>
        <div className={styles.card__info}>
          <u>height:</u>
          <b>{info?.height}</b>
        </div>
        <div className={styles.card__info}>
          <u>weight:</u>
          <b>{info?.weight}</b>
        </div>
        <div className={styles.card__info}>
          <u>birth date:</u>
          <b>{info?.birthDate}</b>
        </div>
        {<CardDetails info={info} details={details} />}
      </div>
    </>
  );
};

export default CardInfo;
