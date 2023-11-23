import React from "react";
import { useAppSelector } from "../../lib/hooks/redux";
import styles from "../../styles/pagination.module.css";
import { useActions } from "../../lib/hooks/redux";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const page = useAppSelector((state) => state.page.page);
  //const { setPage } = useActions();
  const router = useRouter();

  const applyPageParams = (page: string) => {
    router.push({
      query: { page: page },
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
