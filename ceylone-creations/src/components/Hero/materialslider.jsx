import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./materialslider.css";

import pic1 from "../../assets/images/pic1.png";
import pic2 from "../../assets/images/pic2.png";
import pic3 from "../../assets/images/pic3.png";
import pic7 from "../../assets/images/pic7.png";
import pic5 from "../../assets/images/pic5.jpg";
import pic6 from "../../assets/images/pic6.png";    

const materials = [
    { img: pic1, name: "Terracotta"},
    { img: pic2, name: "Reed Bag" },
    { img: pic3, name: "Leather Humpties" },
    { img: pic7, name: "Ceramic" },
    { img: pic5, name: "Wood" },
    { img: pic6, name: "Steel" },
]   

const MaterialSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="material-slider">
      <Slider {...settings}>
        {materials.map((item, index) => (
          <div key={index} className="material-item">
            <img src={item.img} alt={item.name} />  {/* FIXED */}
            <p>{item.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MaterialSlider;
