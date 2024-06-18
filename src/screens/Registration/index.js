import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { baseUrl } from "../../Urls";


export const Registration = () => {
  const [pass, setPass] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [serverErrors, setServerErrors] = useState({});

  const navigate = useNavigate();

  const handleRecaptchaChange = (value) => {
    if (value) {
      setIsVerified(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password === data.rePassword) {
      try {
        const response = await axios.post(
          `${baseUrl}/users/registration`,
          {
            firstName: data.firstName,
            email: data.email,
            mobileNumber: data.mobileNumber,
            password: data.password,
          }
        );

        if (response.status === 200) {
          setPass(true);
          console.log(`Регистрация успешна ${response.data.message}`);
          navigate("/regSuccess");
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
        if (error.response && error.response.data && error.response.data.errors) {
          setServerErrors(error.response.data.errors);
        } 
      }
    } else {
      setPass(false);
      toast.error(
        'Пароли не совпадают! Пожалуйста введите пароль и повторите его в поле "Повторите пароль"'
      );
    }
  };

  return (
    <div className={style.container}>
      <h2 className="welcome">Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="textClass">Имя</p>
        <input
          className={`${style.input} ${ serverErrors.firstName ? style.inputError : ''}`}
          type="text"
          placeholder="Имя"
          {...register("firstName", { required: true, maxLength: 20 })}
        />
        {serverErrors.firstName && <span className={style.error}>{serverErrors.firstName}</span>}

        <p className="textClass" >Почта</p>
        <input
          className={`${style.input} ${ serverErrors.firstName ? style.inputError : ''}`}
          type="text"
          placeholder="Электронная почта"
          {...register("email", { required: true })}
        />
        {serverErrors.email && <span className={style.error}>{serverErrors.email}</span>}
        
        <p className="textClass">Номер телефона</p>
        <input
          className={`${style.input} ${ serverErrors.firstName ? style.inputError : ''}`}
          type="tel"
          placeholder="Номер телефона"
          {...register("mobileNumber", { required: true })}
        />
        {serverErrors.mobileNumber && <span className={style.error}>{serverErrors.mobileNumber}</span>}

        <p className="textClass">Пароль</p>
        <input
          className={`${style.input} ${ serverErrors.firstName ? style.inputError : ''}`}
          type="password"
          placeholder="Пароль"
          {...register("password", { required: true })}
        />
        {serverErrors.password && <span className={style.error}>{serverErrors.password}</span>}

        <p className="textClass">Повторите пароль</p>
        <input
          className={`${style.input} ${ serverErrors.firstName ? style.inputError : ''}`}
          type="password"
          placeholder="Повторите пароль"
          {...register("rePassword", { required: true })}
        />
        {serverErrors.rePassword && <span className={style.error}>{serverErrors.rePassword}</span>}

        <ReCAPTCHA
          className={style.reCAPTCHA}
          sitekey="6LcwysMpAAAAAJkItsh9LcA0UfpDvEzlZ8rdi9wd"
          onChange={handleRecaptchaChange}
        />

        <input
          disabled={!isVerified}
          className={`Btn ${!isVerified ? "disabledBtn" : ""}`}
          type="submit"
          value="Регистрация"
        />
      </form>
    </div>
  );
};
