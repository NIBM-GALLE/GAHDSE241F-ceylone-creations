import React from "react";
import "./bannersection.css" // Importing the CSS fileng

import banner from "../../assets/images/banner1.png" // Importing the image file
const Banner = () => {
  return (
    <div className="banner-container" style={{ backgroundImage: `url(${banner})` }}>
      <div className="banner-overlay">
        <div className="banner-content">
        <h1>Simple Way to Identify</h1>
          <h2>Sri Lanakan Handicafts</h2>
          <p>Made By Ceylone Creations Artist</p>
          <button className="banner-button">Add an item</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
