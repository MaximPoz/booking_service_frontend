import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { ImCircleRight, ImCircleLeft, ImCoinDollar, ImHome3 } from "react-icons/im";

const renamedFilters = {
  All: "Все",
  rooms: "Комнаты",
  apartments: "Апартаменты",
  hotel: "Отель",
};

export const ToolBar = ({ filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { selected, minPrice, maxPrice, minArea, maxArea } = filters;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClick = (filter) => {
    setFilters({
      ...filters,
      selected: filter,
    });
  };

  const handleTogglePanel = () => {
    setIsOpen(!isOpen);
  };

  const upperCase = (string) => {
    return string
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : "Loading...";
  };

  const onSubmit = (data) => {
    setFilters({
      ...filters,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      minArea: data.minArea,
      maxArea: data.maxArea,
    });
  };

  return (
    <div className={`${styles.toolbar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.btnOpen} onClick={handleTogglePanel}>
        {isOpen ? <ImCircleLeft /> : <ImCircleRight />}
      </button>
      <ul className={styles.filter}>
        {Object.keys(renamedFilters).map((filter) => {
          const displayName = renamedFilters[filter];
          return (
            <li
              key={filter}
              className={`${styles.filterElement} ${
                selected === filter ? styles.active : ""
              }`}
              onClick={() => handleClick(filter)}
            >
              {upperCase(displayName)}
            </li>
          );
        })}
      </ul>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.priceFilter}>
          <div className={styles.titleFilter}>
            <ImCoinDollar /> Цена
          </div>
          <input
            className={styles.input}
            type="number"
            placeholder="Min"
            defaultValue={minPrice}
            {...register("minPrice")}
          />
          <input
            className={styles.input}
            type="number"
            placeholder="Max"
            defaultValue={maxPrice}
            {...register("maxPrice")}
          />
        </div>
        <div className={styles.priceFilter}>
          <div className={styles.titleFilter}>
            <ImHome3 /> Площадь
          </div>
          <input
            className={styles.input}
            type="number"
            placeholder="Min"
            defaultValue={minArea}
            {...register("minArea")}
          />
          <input
            className={styles.input}
            type="number"
            placeholder="Max"
            defaultValue={maxArea}
            {...register("maxArea")}
          />
        </div>
        <button className={styles.buttonForm} type="submit">Применить</button>
      </form>
    </div>
  );
};
