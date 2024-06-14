import React from "react";
import axios from "axios";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const LogIn = ({ updateState }) => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const res = await axios.post(
        "https://booking-service-backend.onrender.com/users/login",
        {
          email,
          password,
        }
      );

      // Получение токена из куки
      const getTokenFromCookie = () => {
        const token = document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith("token="));
        return token ? token.split("=")[1] : null;
      };

      // Использование функции для получения токена
      const token = getTokenFromCookie();

      if (token != null) {
        localStorage.setItem("token", token);
        updateState(true);
        navigate("/personalAccount");
      }else{
        console.error('Проблема с куками')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 405) {
          console.error(error.response.data.message);
          toast(
            (t) => (
              <span>
                Забыли пароль?¯\_(ツ)_/¯ Восстановим! 😀
                <button
                  className={style.btn}
                  onClick={() => toast.dismiss(navigate("/changePassword"))}
                >
                  Жми сюда!
                </button>
              </span>
            ),
            { duration: 8000 }
          );
        } else if (error.response.status === 404) {
          console.error(error.response.data.message);
          toast(
            (t) => (
              <span>
                Такого аккаунта не существует¯\_(ツ)_/¯ Хотите зарегистрироваться?!
                <button
                  className={style.btn}
                  onClick={() => toast.dismiss(navigate("/reg"))}
                >
                  Жми сюда!
                </button>
              </span>
            ),
            { duration: 8000 }
          );
        }
      } else {
        // Обработка ошибок, которые не связаны с ответом сервера (например, сетевая ошибка)
        console.error("Ошибка запроса:", error.message);
        toast.error("Ошибка запроса, попробуйте снова позже.");
      }
    }
  };

  return (
    <div className={style.container}>
      <h2 className="welcome">Пожалуйста авторизуйтесь</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="textClass">Электронная почта</p>
        <input
          className={style.input}
          type="text"
          placeholder="Электронная почта"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className={style.error}>
            Поле "Электронная почта" обязательно для заполнения и должно быть в
            формате example@example.com
          </span>
        )}

        <p className="textClass">Пароль</p>
        <input
          className={style.input}
          type="password"
          placeholder="Пароль"
          {...register("password", { required: true, maxLength: 100 })}
        />
        {errors.password && (
          <span className={style.error}>
            Пароль должен содержать не менее 8 символов
          </span>
        )}

        <input className="Btn" type="submit" value="Отправить" />
      </form>
      <hr />

      <Link to="/changePassword">
        <button className="Btn">Забыли пароль</button>
      </Link>
    </div>
  );
};
