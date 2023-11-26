import React from "react";
import { CardProps } from "../../types/card.types";
import Link from "next/link";
import CardInfo from "./CardInfo";
import { useRouter } from "next/router";
import styles from "../../styles/cards.module.css";

const Card = ({ info, details }: CardProps) => {
  const router = useRouter();
  const { query } = router;

  if (info == null) {
    return <div className={styles.cards__not}>card not found</div>;
  }

  return !details ? (
    <Link
      href={{
        pathname: `/details/${info.id}`,
        query: { ...query },
      }}
      className={styles.card}
    >
      {<CardInfo info={info} details={details} />}
    </Link>
  ) : (
    <div className={styles.card}>
      {<CardInfo info={info} details={details} />}
    </div>
  );
};

export default Card;
