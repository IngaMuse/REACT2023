import React, { useState } from "react";
import styles from "../../styles/pagination.module.css";
import stylesSearch from "../../styles/search.module.css";
import { useAppSelector } from "../../lib/hooks/redux";
import { useActions } from "../../lib/hooks/redux";
import { useRouter } from "next/router";

const LimitPage = () => {
  const [value, setValue] = useState(
    useAppSelector((state) => state.limit.limit),
  );
  //const { setLimit } = useActions();
  const router = useRouter();

  const applyLimitParams = (limit: string) => {
    router.push({
      query: { limit: limit },
    });
    router.push({
      query: { page: "1" },
    });
  };

  const submitSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    //setLimit(value);
    applyLimitParams(value);
  };

  return (
    <form role="form" onSubmit={submitSearch}>
      <input
        type="text"
        className={styles.limit__input}
        value={value}
        placeholder="30"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className={stylesSearch.search__button}>
        Change Limit Page
      </button>
    </form>
  );
};

export default LimitPage;
