import React, { useState } from "react";
import styles from "./styles.module.css";
import {
  ImCircleRight,
  ImCircleLeft,
  ImCoinDollar,
  ImHome3,
} from "react-icons/im";

export const ToolBar = ({
  filters,
  onSelectFilter,
  onPriceFilter,
  onAreaFilter,
}) => {
  const renamedFilters = {
    All: "Все",
    rooms: "Комнаты",
    apartments: "Апартаменты",
    hotel: "Отель",
  };

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handlePriceFilter = () => {
    onPriceFilter(minPrice, maxPrice);
  };

  const handleMinAreaChange = (event) => {
    setMinArea(event.target.value);
  };

  const handleMaxAreaChange = (event) => {
    setMaxArea(event.target.value);
  };

  const handleAreaFilter = () => {
    onAreaFilter(minArea, maxArea);
  };

  const handleClick = (filter) => {
    onSelectFilter(filter);
  };

  const handleTogglePanel = () => {
    setIsOpen(!isOpen);
  };

  const upperCase = (string) => {
    return string
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : "Loading...";
  };

  return (
    <div className={`${styles.toolbar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.btnOpen} onClick={handleTogglePanel}>
        {isOpen ? <ImCircleLeft /> : <ImCircleRight />}
      </button>
      <ul className={styles.filter}>
        {filters.map((filter) => {
          const displayName = renamedFilters[filter] || filter;
          return (
            <li
              key={filter}
              className={styles.filterElement}
              onClick={() => handleClick(filter)}
            >
              {upperCase(displayName)}
            </li>
          );
        })}
      </ul>
      <div className={styles.priceFilter}>
        <div className={styles.titleFilter}>
          <ImCoinDollar /> Цена
        </div>
        <input
          className={styles.input}
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
        <button className={styles.buttonForm} onClick={handlePriceFilter}>Применить</button>
      </div>
      <div className={styles.priceFilter}>
        <div className={styles.titleFilter}>
          <ImHome3 /> Площадь
        </div>
        <input
          className={styles.input}
          type="number"
          placeholder="Min"
          value={minArea}
          onChange={handleMinAreaChange}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Max"
          value={maxArea}
          onChange={handleMaxAreaChange}
        />
        <button className={styles.buttonForm} onClick={handleAreaFilter}>Применить</button>
      </div>
    </div>
  );
};
