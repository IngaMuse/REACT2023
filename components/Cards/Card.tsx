import React from "react";
import { CardProps } from "../../types/card.types";
//import { Link } from "react-router-dom";
import Link from "next/link";
//import { useParams } from "react-router-dom";
//import { useSearchParams } from "react-router-dom";
import CardInfo from "./CardInfo";
import { useAppSelector } from "../../lib/hooks/redux";
//import "./style.css";

const Card = ({ info, details }: CardProps) => {
  //const params = useParams();
  //const [searchParams] = useSearchParams();
  const page = useAppSelector((state) => state.page.page);
  const limit = useAppSelector((state) => state.limit.limit);

  if (info == null) {
    return <div className="cards__not">card not found</div>;
  }

  let link = ("/details/" + info.id).toString() + "?page=" + page;
  if (limit !== "30") link = link + "&limit=" + limit;

  return (
    //params.id == undefined ? (
    //   <Link to={link} className="card">
    //     {<CardInfo info={info} details={details} />}
    //   </Link>
    // ) : (
    <div className="card">{<CardInfo info={info} details={details} />}</div>
    //);
  );
};

export default Card;
