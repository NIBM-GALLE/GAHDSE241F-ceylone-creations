import React from "react";
import "./productcard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        console.log("Navigating to product ID:", products._id); 
        navigate(`/products/${products._id}`); 
    };

    return (
        <div className="product-card" onClick={handleCardClick}>
            <div className="image-container">
                
                {products.images && products.images.length > 0 && products.images[0].urls.length > 0 ? (
                    <img 
                        src={`http://localhost:5000${products.images[0].urls[0]}`} 
                        alt={products.title} 
                        className="product-image" 
                    />
                ) : (
                    <p>No Image Available</p> // Show a placeholder if no image exists
                )}
                <button className="favorite-btn">♡</button>
            </div>
            <p className="product-title">{products.title}</p>
            <p className="product-price">Rs. {products.price}</p>
        </div>
    );
};

export default ProductCard;
