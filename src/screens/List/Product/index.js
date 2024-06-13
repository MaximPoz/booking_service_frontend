import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { ImageSlider } from "../../../components/ImageSlider/ImageSlider";

export const ProductPage = ({ isAuth }) => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const API_PRODUCTS = "https://booking-service-backend.onrender.com/houses";

  const [item, setItem] = useState({
    price: "",
    area: "",
    title: "",
    address: "",
    description: "",
    img: [],
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_PRODUCTS}/${_id}`);
        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [_id]);

  const images = item.img;
  const { price, area, title, address, description } = item;

  console.log(images);
  return (
    <div className={style.container}>
      {images  && images.length > 0 ? (
        <ImageSlider images={images} />
      ) : (
        "Изображения отстствуют"
      )}
      <p className={style.textClass}>{title}</p>
      <p className={style.textClass}>Цена за сутки: {price} рублей</p>
      <p className={style.textClass}>Площадь: {area} м²</p>
      <p className={style.textClass}>Адрес: {address} </p>
      <p className={style.textClass}>Описание: {description}</p>

      {isAuth ? (
        <Link target="_blank" to={`https://forms.yandex.ru/cloud/6620d988d046880423b4b472/`}>
          <button className={style.btn}>Написать сообщение арендодателю</button>
        </Link>
      ) : (
        <Link to={"/logIn"}>
          <button className={style.btn}>
            Для того что бы написать сообщения арендодателю авторизуйтесь
          </button>
        </Link>
      )}
    </div>
  );
};
