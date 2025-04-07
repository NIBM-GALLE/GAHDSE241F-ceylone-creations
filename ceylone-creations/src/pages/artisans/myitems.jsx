import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./myitems.css";
import "./itemedit.jsx"
import "./itemedit.css"; // Include styles for the edit panel

const Myitemlist = () => {
  const [products, setProducts] = useState([]); // Ensure default state is an array
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditPanelOpen, setEditPanelOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch products and categories when component mounts
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Fetch products with improved error handling
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/myproducts");
      console.log("API Response:", response.data); // Debugging step
      // Ensure the response is an array before setting state
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Prevent errors by setting an empty array
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  // Handle category selection separately
  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((cat) => cat._id === e.target.value);
    setSelectedProduct((prev) => ({
      ...prev,
      category: selectedCategory || {},
    }));
  };

  // Save changes to the database
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/editproduct/${selectedProduct._id}`, selectedProduct);
      alert("Product updated successfully!");
      fetchProducts(); // Refresh the product list after saving changes
      handleClosePanel(); // Close the edit panel after saving changes
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle product deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/listproduct/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error.response?.data || error);
      }
    }
  };

  // Handle edit click
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditPanelOpen(true);
  };

  // Handle closing the edit panel
  const handleClosePanel = () => {
    setEditPanelOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="product-list">
      <h2 className="headingmylist">Products</h2>
      <div className="button-container">
        <Link to="/listing">
        <button className="create-btn">Create Product</button>
        </Link>
      </div>

      {/* Ensure `products` is an array before calling `.map()` */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) &&
            products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.category?.name || "No Category"}</td>
                <td>{product.price} Rs</td>
                <td>
                {product.images && product.images.length > 0 && product.images[0].urls.length > 0 ? (
                  <img
                    src={`http://localhost:5000${product.images[0].urls[0]}`}
                    alt={product.title}
                    width="50"
                  />
                ) : (
                  <p>No Image Available</p>
                )}
              </td>
                <td>{new Date(product.itemadded_date).toISOString().split("T")[0]}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(product)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Edit Panel (Only shows when editing a product) */}
      {isEditPanelOpen && selectedProduct && (
        <div className="edit-panel-wrapper">
          <div className="edit-panel">
            <h2>Edit Product</h2>

            <label>Item Title</label>
            <input
              type="text"
              name="title"
              value={selectedProduct.title}
              onChange={handleChange}
              placeholder="Enter item title"
              required
            />

            <label>Item Category</label>
            <select
              name="category"
              value={selectedProduct.category?._id || ""}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled>Select a Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label>Item Price</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={selectedProduct.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />

            <label>Item Image</label>
            <input
              type="text"
              name="image"
              value={selectedProduct.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />

            {/* Display first image like the product card */}
            {selectedProduct.images && selectedProduct.images.length > 0 && selectedProduct.images[0].urls.length > 0 ? (
                <img 
                    src={`http://localhost:5000${selectedProduct.images[0].urls[0]}`} 
                    alt={selectedProduct.title} 
                    width="100"
                    className="preview-image"
                />
            ) : (
                <p>No Image Available</p> // Show a placeholder if no image exists
            )}
            <div className="editbuttons">
              <button type="button" className="btn btn-cancel" onClick={handleClosePanel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-save" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myitemlist;