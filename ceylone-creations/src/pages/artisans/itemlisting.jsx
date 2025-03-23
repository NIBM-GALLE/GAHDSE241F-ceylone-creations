import React, { useState, useEffect } from "react";
import "./itemlisting.css";
import axios from "axios";
//import { data } from "react-router-dom";

const AddProduct = () => {


  const [formData, setFormData] = useState({
    
    title: "",
    description: "",
    price: "",
    itemadded_date: "",
    stock_quantity: "",
    image: null,
    category: ""
  });

  
const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  //Handle input changes
  const handleFileUpload = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      // File input handling
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    } 
     // Store multiple files in state
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const artistId = localStorage.getItem('artistId');
  
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/listproduct", {
        method: "POST",
        body: data,
        artistId,
      });

      const text = await response.text(); // Log raw response
      console.log("Raw response:", text);

      const result = JSON.parse(text); // Try parsing as JSON
      console.log(result);

      if (response.ok) {
        alert("Product created successfully");
      } else {
        alert(result.message || "Product Creation Failed");
      }
    } catch (error) {
      console.error("Error during Product Creation:", error);
      alert("An error occurred, please try again later");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Complete Your Listing</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Item Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter item title"
            required
          />
        </div>

        <div className="form-group dropdown-wrapper">
          <label>Item Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="category-select"
          >
            <option value="" disabled>Select a Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Item Price</label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label>Publish Date</label>
          <input
            type="date"
            name="itemadded_date"
            value={formData.itemadded_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Item Quantity</label>
          <input
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Product description"
            rows="4"
            required
          ></textarea>
        </div>

        
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            name="image"
            multiple
            onChange={handleFileUpload}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
