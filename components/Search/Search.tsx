import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/search.module.css";

const Search = ({ searchValue }: { searchValue: string | string[] }) => {
  const [value, setValue] = useState<string | string[]>(searchValue);
  const router = useRouter();
  const { query } = router;
  const { limit, search } = query;

  const submitSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("1111");
    router.push({
      query: { search: value, page: "1", limit: limit || "30" },
    });
  };

  return (
    <form role="form" onSubmit={submitSearch}>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.search__input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className={styles.search__button}>
          SEARCH
        </button>
      </div>
    </form>
  );
};

export default Search;
