import React from "react";
import { useAppSelector } from "../../lib/hooks/redux";
//import "./style.css";
import { useActions } from "../../lib/hooks/redux";
interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  //const [searchParams, setSearchParams] = useSearchParams();
  const page = useAppSelector((state) => state.page.page);
  const { setPage } = useActions();

  const applyPageParams = (page: string) => {
    // if (searchParams.has("page")) {
    //   searchParams.set("page", page);
    // } else searchParams.append("page", page);
    // setSearchParams(searchParams);
  };

  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    const key = i.toString();
    const className = ["page"];
    if (page === key) className.push("page--selected");

    pageLinks.push(
      <div
        className={className.join(" ")}
        key={key}
        onClick={() => applyPageParams(key)}
      >
        {i}
      </div>,
    );
  }

  return <div className="pages">{pageLinks}</div>;
};

export default Pagination;
