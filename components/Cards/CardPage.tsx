import React from "react";
import Card from "./Card";
import styles from "../../styles/cards.module.css";
import { ICard } from "@/types/card.types";
import { useRouter } from "next/router";

const CardPage = ({ cardDetails }: { cardDetails: ICard | null }) => {
  const router = useRouter();
  const { query } = router;
  const { details, page, limit, ...otherQuery } = query;

  const handleClose = () => {
    router.push({
      pathname: "/",
      query: {
        page: page || "1",
        limit: limit || "30",
        ...otherQuery,
      },
    });
  };

  return (
    <div
      className={`${styles.card__page} ${styles.card__column}`}
      data-testid="detail"
      onClick={handleClose}
    >
      <div className={styles.card__drop} onClick={handleClose}></div>
      <Card info={cardDetails} details={true} />
    </div>
  );
};

export default CardPage;
