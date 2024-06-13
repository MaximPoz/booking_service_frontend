import "./App.css";
import React, { createContext, useContext } from 'react';
import { NavBar } from "./components/NavBar";
import { FootBar } from "./components/FootBar";
import { LogIn } from "./screens/LogIn";
import { List } from "./screens/List";
import { PersonalAccount } from "./screens/PersonalAccount/UserProfile";
import { Registration } from "./screens/Registration";
import { Toaster } from "react-hot-toast";

import {  Routes, Route } from "react-router-dom";
import { ChangePassword } from "./screens/LogIn/ChangePassword";
import { EmailPassword } from "./screens/LogIn/EmailPassword";
import { AboutUs } from "./screens/Footer/AboutUs";
import { Contacts } from "./screens/Footer/Contacts";
import { ChangeProfile } from "./screens/PersonalAccount/ChangeProfile";
import { ProductPage } from "./screens/List/Product";
import { useState } from "react";
import { RegSuccess } from "./screens/Registration/resSuccess";
import { EmailNewPassword } from "./screens/LogIn/EnteringNewPass";
import { SuccessPasswordRestored } from "./screens/LogIn/SuccessPasswordRestored";


export const MyContext = createContext();

export default function App() {
  // Получаем значение isAuth из локального хранилища при загрузке компонента
  const [isAuth, setIsAuth] = useState(() => {
    const storedIsAuth = localStorage.getItem('isAuth');
    return storedIsAuth === 'true';
  });

  // Функция для обновления состояния и сохранения его в локальном хранилище
  const updateState = (newState) => {
    setIsAuth(newState);
    localStorage.setItem('isAuth', newState.toString());
  };


  let itemsListNoAuth = [
    { nameNav: "Список помещений", url: "project_cooking_service" },
    { nameNav: "Авторизация", url: "logIn" },
    { nameNav: "Регистрация", url: "reg" },
  ];

  let itemsListIsAuth = [
    { nameNav: "Список помещений", url: "project_cooking_service" },
    { nameNav: "Личный кабинет", url: "personalAccount" },
  ];

  let footer = [
    { nameNav: "О нас", url: "aboutUs" },
    { nameNav: "Контакты", url: "contacts" },
  ];

  return (
    <>
        <Toaster position="top-right" gutter={10} />

        {isAuth === true ? (
          <NavBar itemsList={itemsListIsAuth} />
        ) : (
          <NavBar itemsList={itemsListNoAuth} />
        )}

        <FootBar footer={footer} />

        <Routes>
          <Route path="/project_cooking_service" element={<List />} />

          <Route path="/logIn" element={<LogIn updateState={updateState} />} />


          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/emailPassword" element={<EmailPassword  />} />
          <Route path="/emailNewPassword" element={<EmailNewPassword  />} />
          <Route path="/successPasswordRestored" element={<SuccessPasswordRestored  />} />



          <Route
            path="/personalAccount"
            element={<PersonalAccount isAuth={isAuth} updateState={updateState}/>}
          />
          <Route path="/changeProfile" element={<ChangeProfile isAuth={isAuth} updateState={updateState}/>} />

          <Route path="/reg" element={<Registration isAuth={isAuth} />} />
          <Route path="/regSuccess" element={<RegSuccess />} />

          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />

          <Route
            path="/:_id"
            element={<ProductPage  isAuth={isAuth}/>} //поскольку тут id это переменная, мы можем передать её в компоненту ProductPage
          />
        </Routes>
    </>
  );
}
