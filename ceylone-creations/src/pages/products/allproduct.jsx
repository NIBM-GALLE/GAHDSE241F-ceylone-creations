import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../components/Hero/productcard";
import "../../components/Hero/productgrid.css";

const AllproductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:5000/api/products/allproducts")
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="product-list-container">
            <h2 className="section-title">Explore Our Products</h2>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard key={product._id} products={product} />
                ))}
            </div> 
        </div>
    );
};

export default AllproductList
