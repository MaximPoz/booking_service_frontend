import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../Urls";

export const ChangeProfile = ({updateState}) => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "Загрузка",
    email: "Загрузка",
    phone: "Загрузка",
  });

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { id } = decodedToken;

  console.log(id)

  const API_USERS = `${baseUrl}/users`

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_USERS}/${id}`);
        if (!response.ok) {
          throw new Error('Ошибка')
        }
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, [id]);

  const upperCase = (string) => {
    return string
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : user.name;
  };

  const handleLogout = () => {
    // Сбрасываем состояние isAuth
    updateState(false);
    // Удаляем токен аутентификации из локального хранилища
    localStorage.removeItem("token");
    // Удаляем токен аутентификации из куков
    Cookies.remove("token");
    // Перенаправляем пользователя на страницу авторизации 
    navigate("/logIn");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // Отфильтровываем данные, чтобы не отправлять пустые поля
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== '')
    );
    console.log(filteredData);

    if(Object.keys(filteredData).length === 0){
      navigate("/personalAccount");
      toast.success("В связи с отсутствием изменений вы были перенаправлены в Личный кабинет 😀", {
        duration: 3000,
      });
    }else{

    try {
      const response = await axios.put(`${API_USERS}/${id}`, filteredData);
      console.log("Данные пользователя успешно обновлены:", response.data);
      toast.success("Данные пользователя успешно обновлены, в целях безовпасности просим вас повторно авторизоваться", {
        duration: 3000,
      });
      handleLogout()
    } catch (error) {
      console.error("Ошибка при обновлении данных пользователя:", error);
    }
  };
  }

  return (
    <div className={style.personalAccount}>
      <h2 className="welcome">
        {upperCase(user.firstName)} тут вы можете изменить свои личные данные
      </h2>

      <form className={style.changeAccount} onSubmit={handleSubmit(onSubmit)}>
        <input
          autocomplete="new-password"
          className={style.changeInfo}
          type="text"
          placeholder="Введите новое Имя"
          {...register("firstName", { required: false, maxLength: 80 })}
        />
        <input
          autocomplete="new-password"
          className={style.changeInfo}
          type="text"
          placeholder="Введите новый Email"
          {...register("email", { required: false })}
        />
        <input
          autocomplete="new-password"
          className={style.changeInfo}
          type="tel"
          placeholder="Введите новый номер телефона"
          {...register("mobileNumber", {
            required: false,
            minLength: 6,
            maxLength: 12,
          })}
        />
        <input
          autocomplete="new-password"
          className={style.changeInfo}
          type="password"
          placeholder="Введите новый пароль"
          {...register("Password", {
            required: false,
          })}
        />

        <input className="Btn" type="submit" />
      </form>
    </div>
  );
};
