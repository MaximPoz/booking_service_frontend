import React from "react";
import { useForm } from "react-hook-form";
import style from "./style.module.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";


export const EmailNewPassword = () => {
  const location = useLocation();
  const API_USERS = "http://localhost:5555/users";

  const id = location.state?.id; // Получение _id из стейта

  console.log(id)

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password", "");
  const repeatPassword = watch("repeatPassword", "");

  const onSubmit = async (data) => {

    const userData = {
      password: data.password,
    };
    console.log(userData)
    try {
      const response = await axios.put(`${API_USERS}/${id}`, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Ответ от сервера:", response.data);
      navigate('/successPasswordRestored');
    } catch (error) {
      console.error("Ошибка при обновлении данных пользователя:", error.response.data);
    }
  };

  const isPasswordsMatch = password === repeatPassword && password !== "";

  return (
    <div className={style.container}>
      <h2 className="welcome">Введите новый пароль</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="textClass">Введите пароль</p>
        <input
          className={style.input}
          type="password"
          placeholder="Пароль"
          {...register("password", { required: true, minLength: 6 })}
        />

        <p className="textClass">Повторите пароль</p>
        <input
          className={style.input}
          type="password"
          placeholder="Повторите пароль"
          {...register("repeatPassword", { required: true, minLength: 6 })}
        />

        <input
          disabled={!isPasswordsMatch}
          className={`Btn ${!isPasswordsMatch ? "disabledBtn" : ""}`}
          type="submit"
          value="Отправить"
        />
      </form>
    </div>
  );
};
