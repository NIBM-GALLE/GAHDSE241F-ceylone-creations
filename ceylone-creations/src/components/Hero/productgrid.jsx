import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "./productcard";
import "./productgrid.css";


const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/productgrid")
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="product-list-container">
            <h2 className="section-title">Lorem Ipsum</h2>
            <div className="product-list">
                {products.slice(0, 10).map(product => (
                    <ProductCard key={product._id} products={product} />
                ))}
            </div>
            <Link to="/allproducts">
                <button className="view-all-btn">VIEW ALL</button>
            </Link>
        </div>
    );
};

export default ProductList;
