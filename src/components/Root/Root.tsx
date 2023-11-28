import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Root = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
