import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../components/Hero/productcard.jsx";
import "../../components/Hero/productgrid.css";



const CategoryPage = () => {
  const {category} = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/category/${category}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="product-list-container">
        <h1 className="category-title">{category}</h1>
        <div className="product-list">
            {products.map(product => (
                <ProductCard key={product._id} products={product} />
            ))}
        </div>
       
    </div>
);


};

export default CategoryPage;