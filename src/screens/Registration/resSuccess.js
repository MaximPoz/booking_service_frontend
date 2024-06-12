import React from 'react'
import style from "./style.module.css";
import {Link } from 'react-router-dom';

export const RegSuccess = () => {

    return (
        <div className={style.container}>
            <h1 className='welcome'>✔ Регистрация прошла успешно ✨🎉🎊</h1>
            <Link to={'/logIn'} className={style.text}> Авторизоваться</Link>
        </div>
    )
}