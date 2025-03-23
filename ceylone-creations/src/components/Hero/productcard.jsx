import React from "react";
import "./productcard.css";

const ProductCard = ({ products }) => {
    return (
        <div className="product-card">
            <div className="image-container">
                <img src={`http://localhost:5000${products.image}`} alt={products.title} className="product-image" />
                <button className="favorite-btn">♡</button>
            </div>
            {/* <p className="product-category">{products.category?.name ? products.category.name:"Category Not Found"}</p> */}
            <p className="product-title">{products.title}</p>
            <p className="product-price">Rs. {products.price}</p>
        </div>
    );
};

export default ProductCard;
