import React from "react";
import style from "./style.module.css";
import { Link } from "react-router-dom";

export const Product = ({ items }) => {
  
  return (
    <div className={style.container}>
      {items &&
        items.map(
          (
            { price, title, _id, area, address, img, description } // Убираем квадратные скобки
          ) => (
            <Link to={`/${_id}`} key={_id}>
              <div className={style.item} key={title}>
                <img
                  src={img && img.length > 0 ? img[0] : "/project_cooking_service/imgApartments/1/1.jpeg"}
                  alt="тут должна быть картинка какого-то помещения"
                />
                <p className={style.textClass}>
                  <b>{title}</b>
                </p>
                <p className={style.textClass}>Цена за сутки: {price} рублей</p>
                <p className={style.textClass}>Площадь: {area} м²</p>
                <p className={style.textClass}>Адрес: {address} </p>
                <p className={style.textClass}>Описание: {description}</p>
              </div>
            </Link>
          )
        )}
    </div>
  );
};
