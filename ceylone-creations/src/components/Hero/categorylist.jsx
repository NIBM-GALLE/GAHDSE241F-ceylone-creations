import React from "react";
import "./categorylist.css";

import cat1 from "../../assets/images/cat1.png";
import cat2 from "../../assets/images/cat2.png";
import cat3 from "../../assets/images/cat3.png";
import cat4 from "../../assets/images/cat4.png";
import cat5 from "../../assets/images/cat5.png";

const categories = [
  { img: cat1, name: "Water Fountains" },
  { img: cat2, name: "Kitchen & Dining" },
  { img: cat3, name: "Pendulum Clock" },
  { img: cat4, name: "Buddha Idols" },
  { img: cat5, name: "Wall Hangings" },
];

const CategoryList = () => {
  return (
    <div className="category-list">
      {categories.map((item, index) => (
        <div key={index} className="category-item">
          <img src={item.img} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
