import React, { useState } from "react";
import styles from "../../styles/search.module.css";

const ErrorTest = function () {
  const [error, setError] = useState(false);

  function handleClick() {
    setError(true);
  }

  if (error) {
    throw new Error("Oops, something went wrong!");
  }

  return (
    <button onClick={handleClick} className={styles.search__button}>
      Test Error
    </button>
  );
};

export default ErrorTest;
