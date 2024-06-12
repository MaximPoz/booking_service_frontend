import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Product } from "./allProduct";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import axios from "axios";

const API_PRODUCTS = "http://localhost:5555/houses";

export const List = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState("All");
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');

  // Забираем файлы с API_PRODUCTS
  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response = await axios.get(API_PRODUCTS);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  // Фильтрация по цене
  const filterItemsByPrice = (items, minPrice, maxPrice) => {
    return items.filter((item) => {
      const price = item.price;
      return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    });
  };

  // Фильтрация по площади
  const filterItemsByArea = (items, minArea, maxArea) => {
    return items.filter((item) => {
      const area = item.area;
      return (!minArea || area >= minArea) && (!maxArea || area <= maxArea);
    });
  };

  // Применение всех фильтров
  const applyFilters = (items) => {
    let filteredItems = items; // Изначально все элементы

    // Фильтрация по выбранной категории
    if (selected !== "All") {
      filteredItems = filteredItems.filter((item) => item.category === selected);
    }

    // Фильтрация по цене
    filteredItems = filterItemsByPrice(filteredItems, minPrice, maxPrice);

    // Фильтрация по площади
    filteredItems = filterItemsByArea(filteredItems, minArea, maxArea);

    return filteredItems;
  };

  const handlePriceFilter = (minPrice, maxPrice) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  const handleAreaFilter = (minArea, maxArea) => {
    setMinArea(minArea);
    setMaxArea(maxArea);
  };

  return (
    <div>
      <h1 className="welcome">Каталог</h1>
      <ToolBar
        filters={["All", "rooms", "apartments", "hotel"]}
        selected={selected}
        onSelectFilter={(filter) => setSelected(filter)}
        onPriceFilter={handlePriceFilter}
        onAreaFilter={handleAreaFilter}
      />
      {items.length === 0 ? (
        <h1 className="welcome">Loading...</h1>
      ) : (
        <div className={style.container}>
          <Product items={applyFilters(items.data)} />
        </div>
      )}
    </div>
  );
};
