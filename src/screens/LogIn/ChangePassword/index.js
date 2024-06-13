import React, { useState, createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import style from "./style.module.css";


export const ChangePassword = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate();

  const handleRecaptchaChange = (value) => {
    if (value) {
      setIsVerified(true);
    }
  };

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setEmail(data.Email);
    try {
      setLoading(true)
      const response = await axios.post(
        "https://booking-service-backend.onrender.com/users/send-pin",
        { email: data.Email }
      );
      console.log("Ответ от сервера:", response.data.message);
      setMessage(response.data.message);
      navigate("/emailPassword", { state: { pinCode: response.data.message, email: data.Email } });
    } catch (error) {
      setMessage(error.response.data.message);
    } finally {
      setLoading(false)
    }
  };

  console.log(email);

  return (
    <div className={style.container}>
      <h2 className="welcome">Восстановление пароля</h2>

      {loading ? (
        <div className={style.loader}>
          <div className={style.loaderInner}>Loading</div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit(onSubmit)}>
          <p className="textClass">Электронная почта</p>

          <input
            className={style.input}
            type="text"
            placeholder="Электронная почта"
            {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.Email && (
            <span className={style.error}>
              Поле "Электронная почта" обязательно и должно быть в формате
              чё_то_там@блабла.ком xD
            </span>
          )}
          <ReCAPTCHA
            className={style.reCAPTCHA}
            sitekey="6LcwysMpAAAAAJkItsh9LcA0UfpDvEzlZ8rdi9wd"
            onChange={handleRecaptchaChange}
          />

          <input
            disabled={!isVerified}
            className={`Btn ${!isVerified && !errors.Email && !email ? "disabledBtn" : ""
              }`}
            type="submit"
            value="Отправить"
          />

        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};
