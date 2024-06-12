import React from "react";
import s from "./style.module.css";
import { Link } from "react-router-dom";

export const SuccessPasswordRestored = () => {
  

  return (
    <div className={s.container}>
      <h2 className="welcome">
        Пароль восстановлен успешно🎉✨🎊! 
      </h2>

      <p className={s.pText}>Для того чтобы отправить сообщение арендодателю
        авторизуйтесь! </p>

      <Link to={'/logIn'} className={s.text}> Авторизоваться</Link>



    </div>
  );
};
