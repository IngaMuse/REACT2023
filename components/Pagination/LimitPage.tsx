import React, { useState } from "react";
import styles from "../../styles/pagination.module.css";
import stylesSearch from "../../styles/search.module.css";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const LimitPage = ({ limit }: { limit: string | string[] }) => {
  const [value, setValue] = useState<string | string[]>(limit);
  const router = useRouter();
  const { query } = router;

  const submitLimit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push({
      query: { ...query, page: "1", limit: value },
    });
  };

  return (
    <form role="form" onSubmit={submitLimit}>
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
