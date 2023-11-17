import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Card from "./Card";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { cardsAPI } from "../../services/CardsService";
import { useActions } from "../../hooks/redux";
import "./style.css";

const CardPage = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || "1";
  const limit = useAppSelector((state) => state.limit.limit);
  const { setLoadingDetails } = useActions();

  let link = "/?page=" + page;
  if (limit !== "30") link = link + "&limit=" + limit;
  const id = params.id?.toString() || "";

  const { isLoading, isSuccess, data: cardData } = cardsAPI.useGetCardQuery(id);

  useEffect(() => {
    if (isLoading) {
      setLoadingDetails(true);
    }
    if (isSuccess) {
      setLoadingDetails(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, isLoading, isSuccess]);

  return (
    <div className="card__page card__column" data-testid="detail">
      <Link to={link} className="card__drop"></Link>
      {!isLoading ? (
        <Card info={cardData} details={true} />
      ) : (
        <div className="main__loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default CardPage;
