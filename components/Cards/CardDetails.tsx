import React from "react";
import { CardProps } from "../../types/card.types";
import styles from "../../styles/cards.module.css";

const CardDetails = ({ info, details }: CardProps) => {
  return details ? (
    <>
      <div className={styles.card__info}>
        <u>email:</u>
        <b>{info?.email}</b>
      </div>
      <div className={styles.card__info}>
        <u>phone:</u>
        <b>{info?.phone}</b>
      </div>
      <div className={styles.card__info}>
        <u>blood group:</u>
        <b>{info?.bloodGroup}</b>
      </div>
      <div className={styles.card__info}>
        <u>eye color:</u>
        <b>{info?.eyeColor}</b>
      </div>
    </>
  ) : (
    ""
  );
};

export default CardDetails;
