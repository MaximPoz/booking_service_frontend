import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./style.module.css";
import axios from "axios";

export const EmailPassword = () => {
  // const [id, setId] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email; // Получение pinCode из стейта

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const cleanedPinCode = data.pinCode.trim(); // Убираем пробелы
  
    try {
      const response = await axios.post(
        "https://booking-service-backend.onrender.com/users/check-pin",
        {
          email: email,
          pinCode: cleanedPinCode,
        }
      );
  
      console.log("Ответ от сервера:", response.data.message);
      // setId(response.data.message);
  
      // Проверка статуса ответа
      if (response.status === 200) {
        navigate("/emailNewPassword", {
          state: { id: response.data.message },
        });
      }
  
    } catch (error) {
      // setId(error.response.data.message);
      console.log("Ответ от сервера:", error);
    }
  };

  return (
    <div className={style.container}>
      <h2 className="welcome">Введите пин-код</h2>
      <p>который получили в указанном ранее e-mail</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="textClass">Пин-код</p>
        <input
          className={style.input}
          type="text"
          placeholder="Ввод пин-кода"
          {...register("pinCode", {
            required: "Поле обязательно к заполнению",
            minLength: {
              value: 6,
              message: "Минимум 6 символов",
            },
            maxLength: {
              value: 6,
              message: "Максимум 6 символов",
            },
          })}
        />
        <div className={style.errorsValid}>
          {errors?.pinCode && <p>{errors?.pinCode?.message || "Errors!!!"} </p>}
        </div>

        <input className="Btn" type="submit" value="Отправить" />
      </form>
    </div>
  );
};
