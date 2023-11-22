import React, { useState } from "react";
//import { useSearchParams } from "react-router-dom";
import styles from "../../styles/search.module.css";
import { useActions } from "../../lib/hooks/redux";

const Search = () => {
  const [value, setValue] = useState("");
  //const [searchParams, setSearchParams] = useSearchParams();
  const { setSearch } = useActions();

  const submitSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    localStorage.setItem("search", value);
    //searchParams.delete("page");
    setSearch(value);
    //setSearchParams(searchParams);
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
