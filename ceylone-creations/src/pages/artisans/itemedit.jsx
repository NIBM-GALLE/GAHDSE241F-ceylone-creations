import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import "./itemedit.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    image: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/listproduct/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);


  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setProduct((prev) => ({ ...prev, image: file })); // Store the file in the state
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/editproduct/${id}`, product);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleClose = () => {
    navigate("/myitems"); // Close the panel and navigate back
  };
  

  return (
    <div className="edit-panel-wrapper">
      <div className="edit-panel">
        <button className="close-btn" onClick={handleClose}>
          Close
        </button>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Item Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Enter item title"
            required
          />

          <label>Item Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            style={{display:"block"}}
          >
            <option value="" disabled>Select a Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          <label>Item Price</label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />

          <label>Item Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            placeholder="Enter image URL"
          />
          {product.image && (
            <img
              src={
                typeof product.image === "string"
                  ? product.image // If the image is a URL, display it
                  : URL.createObjectURL(product.image) // If it's a file, create a preview URL
              }
              alt="Product Preview"
              className="preview-image"
            />
          )}

                    <div className="buttons">
            <button type="button" className="btn btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};





export default EditProduct;