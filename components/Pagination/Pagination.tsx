import React from "react";
import styles from "../../styles/pagination.module.css";
import { useRouter } from "next/router";
interface PaginationProps {
  totalPages: number;
  page: string;
}

const Pagination = ({ totalPages, page }: PaginationProps) => {
  const router = useRouter();
  const { query } = router;

  const applyPageParams = (page: string) => {
    router.push({
      query: { ...query, page: page },
    });
  };

  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    const key = i.toString();
    const classPage = [`${styles.page}`];
    if (page === key) classPage.push(`${styles.page__selected}`);

    pageLinks.push(
      <div
        className={classPage.join(" ")}
        data-testid="page"
        key={key}
        onClick={() => applyPageParams(key)}
      >
        {i}
      </div>,
    );
  }

  return <div className={styles.pages}>{pageLinks}</div>;
};

export default Pagination;
