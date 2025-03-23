import React from "react";
import "./craftgalary.css";

import p1 from "../../assets/images/p1.png";
import p2 from "../../assets/images/p2.png";
import p3 from "../../assets/images/p3.png";
import p4 from "../../assets/images/p4.png";
import p5 from "../../assets/images/p5.png";
import p6 from "../../assets/images/p6.png";
import p7 from "../../assets/images/p7.png";
import p8 from "../../assets/images/p8.png";
import p9 from "../../assets/images/p9.png";

const images = [p1, p2, p3, p4, p5, p6, p7, p8, p9];

const Gallery = () => {
  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <p className="gallery-subtitle">Lorem Ipsum</p>
        <h2 className="gallery-title">Lorem Ipsum  _______</h2>
        <button className="see-all">SEE ALL</button>
      </div>
      <div className="gallery-grid">
        <div className="left-column">
          <img src={images[1]} alt="craft 2" className="gallery-item" />
          <img src={images[8]} alt="craft 3" className="gallery-item" />   
        </div>
        <div className="left-column">
          <img src={images[5]} alt="craft 6" className="gallery-item" />
          <img src={images[6]} alt="craft 7" className="gallery-item" /> 
        </div>
        <div className="center-column">
          <img src={images[0]} alt="craft 3" className="gallery-item large" />
        </div>
        <div className="right-column">
          <img src={images[3]} alt="craft 4" className="gallery-item" />
          <img src={images[4]} alt="craft 5" className="gallery-item" />
        </div>
        <div className="right-column">
          <img src={images[2]} alt="craft 4" className="gallery-item" />
          <img src={images[7]} alt="craft 5" className="gallery-item" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
