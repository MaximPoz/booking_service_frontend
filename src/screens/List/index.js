import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { Product } from "./allProduct";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import axios from "axios";

const API_PRODUCTS = "https://booking-service-backend.onrender.com/houses";

export const List = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    selected: "All",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: ""
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response = await axios.get(API_PRODUCTS);
        setItems(response.data);
        setIsLoading(false)
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  const applyFilters = (items) => {
    const { selected, minPrice, maxPrice, minArea, maxArea } = filters;

    let filteredItems = items; // Изначально все элементы

    if (selected !== "All") {
      filteredItems = filteredItems.filter((item) => item.category === selected);
    }

    // Фильтрация по цене
    filteredItems = filteredItems.filter((item) => {
      const price = item.price;
      return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    });

    // Фильтрация по площади
    filteredItems = filteredItems.filter((item) => {
      const area = item.area;
      return (!minArea || area >= minArea) && (!maxArea || area <= maxArea);
    });

    return filteredItems;
  };

  const handleFiltersChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  const filteredItems = items.data ? applyFilters(items.data) : [];

  return (
    <div>
      <h1 className="welcome">Каталог</h1>
      <ToolBar
        filters={filters}
        applyFilters={applyFilters}
        setFilters={handleFiltersChange}
      />
       {isLoading ? ( // Проверка состояния загрузки
        <h1 className="welcome">Загрузка каталога...</h1>
      ) : filteredItems.length === 0 ? (
        <h1 className="welcome">Ничего не нашли👀 <br /> Попробуйтей изменить значения фильтров</h1>
      ) : (
        <div className={style.container}>
          <Product items={filteredItems} />
        </div>
      )} 
    </div>
  );
};


