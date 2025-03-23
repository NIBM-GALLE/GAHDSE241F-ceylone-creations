import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./bannerslider.css";

import img1 from "../../assets/images/img1.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
import img4 from "../../assets/images/img4.png";

const slides = [
  { image: img1, text: "Handwoven Bags - Stylish & Eco-Friendly" },
  { image: img2, text: "Authentic Basket Collection for Your Home" },
  { image: img3, text: "Decor That Elevates Your Living Space" },
  { image: img4, text: "Elegant Kitchen & Dining Essentials" },
];

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.image} alt={`Banner ${index + 1}`} />
            <div className="slide-content">
              <h2 className="slide-text">{slide.text}</h2>
              <a href="/login" className="read-more">Read More</a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
