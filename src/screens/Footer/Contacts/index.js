import React from 'react'
import style from "./style.module.css";


export const Contacts = () => {
    return (
        <div className={style.backgroundImage}>
            <div className={style.container}>
                <h1 className={style.title1}>Контакты</h1>
                <ul className={style.contentList}>
                    <li className={style.contentListItem}>
                        <h2 className={style.title2}>Местоположение</h2>
                        <p> Якутия, Россия</p>
                    </li>
                    <li className={style.contentListItem}>
                        <h2 className={style.title2}>Telegram / WhatsApp</h2>
                        <p><a href="tel:+79990602832"> +7 (999) 060-28-32</a></p>
                    </li>
                    <li className={style.contentListItem}>
                        <h2 className={style.title2}>Email</h2>
                        <p><a href="executioner2126@gmail.com"> executioner2126@gmail.com</a></p>
                    </li>
                </ul>
            </div>
        </div>
    );
}