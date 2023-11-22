import React from "react";
import { NextPage } from "next";
import styles from "../styles/_error.module.css";

const Error: NextPage = () => {
  return <h2 className={styles.error__boundary}>Page not exists</h2>;
};

export default Error;
