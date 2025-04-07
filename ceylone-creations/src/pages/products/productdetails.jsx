import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaTruck, FaShoppingBag } from "react-icons/fa";
import ProductImageCarousel from "../../components/ProductImageCarousel/ImageCarousel";
import ReviewSection from "../../pages/ReviewRating/reviewsection";
import "./productdetails.css";


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(""); // Selected color state
  const [filteredImages, setFilteredImages] = useState([]); // State for images based on color
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const descriptionRef = useRef(null);
  const reviewsRef = useRef(null);


  const scrollToSection = (section) => {
    if (section === "description" && descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "reviews" && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setTotalPrice(response.data.price);
        
        // Set the first available color as default
        if (response.data.images.length > 0) {
          const firstColor = response.data.images[0].color;
          setSelectedColor(firstColor);
          setFilteredImages(response.data.images[0].urls); // Show images for the first color
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    
    // Find images for the selected color
    const selectedImages = product.images.find(img => img.color === color);
    setFilteredImages(selectedImages ? selectedImages.urls : []);
  };

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
      setTotalPrice((prev) => prev + product.price);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
      setTotalPrice((prev) => prev - product.price);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">




        {/* Image Carousel - Shows only filtered images */}
        <ProductImageCarousel images={filteredImages} />

          


        <div className="product-info">
          <h1 className="productdetail-title">{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <h3 className="productdetail-price">Price: Rs. {product.price}</h3>

          {/* Select Color */}
          <div className="product-colors">
            <p>Select Color</p>
            <div className="color-options">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`color-box ${selectedColor === image.color ? "selected" : ""}`}
                  style={{ backgroundColor: image.color }}
                  onClick={() => handleColorSelect(image.color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Quantity and Total Price */}
          <div className="quantity-price">
            <div className="quantity">
              <p>Quantity:</p>
              <button onClick={() => handleQuantityChange("decrement")}>-</button>
              <span className="qnumber">{quantity}</span>
              <button onClick={() => handleQuantityChange("increment")}>+</button>
            </div>
            <div className="total-price">
              <p>Price Total:</p>
              <h3>Rs. {totalPrice}</h3>
            </div>
          </div>



          <div className="product-actions">
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="buy-now-btn">Buy Now</button>
          </div>
    
          <div className="shipping-return-container">
            {/* Free Shipping Card */}
            <div className="info-card">
              <FaTruck className="icon" />
              <div>
                <h4>Free Shipping</h4>
                <p>Enter your Postal code for Delivery Availability</p>
              </div>
            </div>

            {/* Return Delivery Card */}
            <div className="info-card-Delivery">
              <FaShoppingBag className="icon" />
              <div>
                <h4>Return Delivery</h4>
                <p>Free 30 days Delivery Return. <a href="/deilvary">Details</a></p>
              </div>
            </div>
          </div>       
        </div>
      </div>
            {/* Tab Navigation */}
          <div className="tab-navigation">
          <button onClick={() => scrollToSection("description")} className="tab-button-one">
            Description
          </button>
          <button onClick={() => scrollToSection("reviews")} className="tab-button-two">
            Reviews
          </button>
        </div>

          {/* Reviews */}
          <div ref={reviewsRef}>
            <h2>Reviews</h2>
            <ReviewSection productId={id} />
          </div>



    </div>

    

    
  );
};

export default ProductDetail;
