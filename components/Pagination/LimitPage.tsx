import React, { useState } from "react";
//import { useSearchParams } from "react-router-dom";
//import "./style.css";
import { useAppSelector } from "../../lib/hooks/redux";
import { useActions } from "../../lib/hooks/redux";

const LimitPage = () => {
  //const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(
    useAppSelector((state) => state.limit.limit),
  );
  const { setLimit } = useActions();

  const applyLimitParams = (limit: string) => {
    // if (searchParams.has("limit")) {
    //   searchParams.set("limit", limit);
    // } else searchParams.append("limit", limit);
    // if (searchParams.has("page")) {
    //   searchParams.set("page", "1");
    // } else searchParams.append("page", "1");
    // setSearchParams(searchParams);
  };

  const submitSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLimit(value);
    applyLimitParams(value);
  };

  return (
    <form role="form" onSubmit={submitSearch}>
      <input
        type="text"
        className="input limit__input"
        value={value}
        placeholder="30"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="button search__button">
        Change Limit Page
      </button>
    </form>
  );
};

export default LimitPage;
