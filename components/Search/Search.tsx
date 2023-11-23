import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/search.module.css";
import { useActions } from "../../lib/hooks/redux";

const Search = () => {
  const [value, setValue] = useState("");
  const { setSearch } = useActions();
  const router = useRouter();

  const submitSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    //setSearch(value);
    router.push({
      query: { search: value },
    });
    router.push({
      query: { page: "1" },
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
