import React, { useState } from "react";
import "./imagecarousel.css";

const ProductImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-carousel">
      <button className="carousel-btn prev-btn" onClick={handlePrev}>
        &#8249;
      </button>
      <div className="carousel-images">
        {images.length > 0 ? (
          <img
            src={`http://localhost:5000${images[currentIndex]}`}
            alt={`Product Image ${currentIndex + 1}`}
            className="carousel-main-image"
          />
        ) : (
          <p>No Image Available</p>
        )}
      </div>
      <button className="carousel-btn next-btn" onClick={handleNext}>
        &#8250;
      </button>
      <div className="carousel-thumbnails">
        {images.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:5000${img}`}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${currentIndex === index ? "active-thumbnail" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
