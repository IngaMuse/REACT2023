import React, { useState } from "react";
import SearchButton from "./SearchButton";
import { useSearchParams } from "react-router-dom";
import "./style.css";
import { useActions } from "../../hooks/redux";
import { setSearch } from "../../store/reducers/SearchSlice";

const Search = () => {
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearch } = useActions();

  const submitSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    localStorage.setItem("search", value);
    searchParams.delete("page");
    setSearch(value);
    setSearchParams(searchParams);
  };

  return (
    <form role="form" onSubmit={submitSearch}>
      <div className="search">
        <input
          type="text"
          className="input search__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <SearchButton />
      </div>
    </form>
  );
};

export default Search;
