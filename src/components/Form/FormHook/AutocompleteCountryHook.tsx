import React, { useState } from "react";
import "../styles.css";
import { useAppSelector } from "../../../hooks/redux";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { FormValues } from "../../../types/form.types";

interface CountryProps {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
  setValue: UseFormSetValue<FormValues>;
  trigger: UseFormTrigger<FormValues>;
}

const AutocompleteCountry = ({
  register,
  error,
  setValue,
  trigger,
}: CountryProps) => {
  const countries = useAppSelector((state) => state.country.countries);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const updateSearchCountry = (value: string) => {
    setValue("country", value);
    trigger("country");
    setDisplay(false);
  };

  return (
    <>
      <label htmlFor="country">Country:</label>
      <div>
        <input
          id="country"
          {...register("country")}
          className="input_box"
          onClick={() => setDisplay(!display)}
          placeholder="Click and type country"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        {display && (
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
      <span className="text_danger">{error ? error : ""}</span>
    </>
  );
};

export default AutocompleteCountry;
