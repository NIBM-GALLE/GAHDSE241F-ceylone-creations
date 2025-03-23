import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/Hero/productcard";

export default function CategoryPage() {
  const { categoryName } = useParams(); // Get category name from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!categoryName) return;

    fetch(`http://localhost:5000/api/products/${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [categoryName]);

  return (
    <div className="product-list-container">
      <h2 className="section-title">Products in {categoryName}</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
      
    </div>
  );
}