import React from "react";
import type { CardProps } from "../../types/form.types";
import "./styles.css";

const Card = ({ info }: CardProps) => {
  return (
    <>
      <div className="card">
        <div className="card__img">
          <img src={info?.image} alt="image" />
        </div>
        <div className="card__content">
          <div className="card__name">{info?.name}</div>
          <div className="card__info">
            <u>age:</u>
            <b>{info?.age}</b>
          </div>
          <div className="card__info">
            <u>gender:</u>
            <b>{info?.gender}</b>
          </div>
          <div className="card__info">
            <u>country:</u>
            <b>{info?.country}</b>
          </div>
          <div className="card__info">
            <u>email:</u>
            <b>{info?.email}</b>
          </div>
          <div className="card__info">
            <u>password:</u>
            <b>{info?.password}</b>
          </div>
          <div className="card__info">
            <u>accept:</u>
            <b>{info?.accept}</b>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
