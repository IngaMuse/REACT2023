import React, { useState } from "react";
import "../styles.css";
import { RefObject } from "react";
import { useAppSelector } from "../../../hooks/redux";

interface CountryProps {
  countryRef: RefObject<HTMLInputElement>;
}

const AutocompleteCountry = ({ countryRef }: CountryProps) => {
  const countries = useAppSelector((state) => state.country.countries);
  const countryError = useAppSelector((state) => state.error.country);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const updateSearchCountry = (value: string) => {
    countryRef.current!.value = value;
    setDisplay(false);
  };

  return (
    <>
      <label htmlFor="country">Country:</label>
      <div>
        <input
          id="country"
          name="country"
          ref={countryRef}
          className="input_box"
          onClick={() => setDisplay(!display)}
          placeholder="Click and type country"
          onChange={(event) => setSearch(event.target.value)}
        />
        {display && countryRef.current?.value && (
          <div className="autoContainer">
            {countries
              .filter(
                (country) =>
                  country.toLowerCase().indexOf(search.toLowerCase() || "") >
                  -1,
              )
              .map((value) => {
                return (
                  <label
                    htmlFor="country"
                    onClick={() => updateSearchCountry(value)}
                    className="option"
                    key={value}
                  >
                    <span>{value}</span>
                  </label>
                );
              })}
          </div>
        )}
      </div>
      <span className="text_danger">{countryError ? countryError : ""}</span>
    </>
  );
};

export default AutocompleteCountry;
