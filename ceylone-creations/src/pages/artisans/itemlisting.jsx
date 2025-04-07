import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./itemlisting.css";
import countryList from "react-select-country-list";
import axios from "axios";
//import { data } from "react-router-dom";

const AddProduct = () => {

  const [selectedOption, setSelectedOption] = useState("manual");
  const [showPreview, setShowPreview] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [formData, setFormData] = useState({
    
    title: "",
    description: "",
    price: "",
    itemadded_date: "",
    stock_quantity: "",
    colors: [{ color: "#000000", images: [] }], 
    category: "",
    profileName: "Used Shipping Profile",
    country: "",
    postalCode: "",
    processingTimeMin: "",
    processingTimeMax: "",
    timeUnit: "",
    shippingService: "",
    deliveryTimeMin: "",
    deliveryTimeMax: "",
    cost: "",
       
  });


const [categories, setCategories] = useState([]);


  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);


//country selection

const handleCountryChange = (selectedOption) => {
  setFormData((prev) => ({ ...prev, country: selectedOption.label }));
};

//Handle shpping
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //handle colors
  const handleColorChange = (index, key, value) => {
    const updatedColors = [...formData.colors];
    updatedColors[index] = { ...updatedColors[index], [key]: value };
    setFormData((prev) => ({ ...prev, colors: updatedColors }));
  };

  const handleFileUpload = (e, index = null) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
  
    if (index !== null) {
      // If uploading images for a specific color
      setFormData((prev) => {
        const updatedColors = [...prev.colors];
        updatedColors[index].images = files;
        return { ...prev, colors: updatedColors };
      });
    } else {
      // General image upload
      setFormData((prev) => ({ ...prev, images: files }));
    }
  };

    //handle colors input & output
  const addColorInput = () => {
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { color: "#000000", images: [] }],
    }));
  };

  const removeColorInput = (index) => {
    const updatedColors = formData.colors.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, colors: updatedColors }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log("Form submitted");
  
    // Append product details
    Object.keys(formData).forEach((key) => {
      if (key !== "colors") {
        data.append(key, formData[key]);
      }
    });

    // Convert colors to a JSON string before appending
    data.append("colors", JSON.stringify(formData.colors));
    
    // Append the selected renewal option
    data.append("renewalOption", selectedOption);

    // Append images for each color
    formData.colors.forEach((color, index) => {
        color.images.forEach((file) => {
            data.append(`images[${index}]`, file);
        });
    });

    try {
        const response = await fetch("http://localhost:5000/api/products/listproduct", {
            method: "POST",
            body: data,
        });

        const result = await response.json();
        if (response.ok) {
            alert("Product created successfully");
        } else {
            alert(result.message || "Product creation failed");
        }
    } catch (error) {
        console.error("Error during Product Creation:", error);
        alert("An error occurred, please try again later");
    }
};

  return (
   
    <div>
      <h1 className="page-title">List Your Product & Reach More Buyers</h1>
      <p className="create-product-description">
         customize your product listing to attract buyers. Start selling in just a few steps!
      </p>
    

    <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
      <div className="form-container">
      <h3 className="form-title">Complete Your Listing</h3>
        <div className="form-group">
          <label >Title</label>
          <small className="form-helper">Include keywords that buyers would use to search for this item.</small>
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
          <label>Category</label>
          <small className="form-helper">Select the most relevant category for your product.</small>
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
          <label>Price</label>
          <small className="form-helper">Set the price you want to sell this item for.</small>
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
          <small className="form-helper">Choose the date this product will be available.</small>
          <input
            type="date"
            name="itemadded_date"
            value={formData.itemadded_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <small className="form-helper">Enter how many items you have in stock.</small>
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
          <small className="form-helper">Explain what makes your product special. Keep it clear and concise.</small>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Product description"
            rows="4"
            required
          ></textarea>
        </div>
        </div>     

        <div className="color-inputs-container">
        <h3 className="variation-title">Variation</h3>
        <p className="variation-description">
          Add availability options like color. Buyers will choose from these at checkout.
        </p>
        <div className="manage-variations-container">
        <button className="manage-variations-btn">Manage variations</button>
        </div>
        <h4 className="variation-title-two">pick the colours and upload images ✨</h4>

        {formData.colors.map((color, index) => (
          <div key={index} className="color-input-card">
            <input type="color" value={color.color} onChange={(e) => handleColorChange(index, "color", e.target.value)} />
            <input 
              type="file" 
              name={`colors[${index}][images]`} 
              multiple 
              onChange={(e) => handleFileUpload(e, index)} 
              className="file"
            />
            <button type="button" onClick={() => removeColorInput(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addColorInput}>Add Color</button>
        </div>

        {/* Shipping section */}  

      <div className="shipping-container">
        <h3 className="shipping-title">Shipping</h3>
        <p className="shipping-description">
          Give shoppers clear expectations about delivery time and cost by making sure your shipping info is accurate.
        </p>

      {/* Shipping Info Box */}
      <div className="shipping-box">
        <div className="shipping-details">
          <p className="shipping-option">
            {formData.profileName} <span className="fixed-badge">Fixed</span>
          </p>
          <p className="shipping-info">
            {formData.processingTimeMin}-{formData.processingTimeMax} days processing time, from {formData.postalCode}
          </p>
        </div>

        {/* Edit Button */}
        <button type="button" className="edit-btn-shipping" onClick={() => setShowShippingForm(true)}>
          Edit
        </button>
      </div>

      {/* Preview Shipping Cost Button */}
      <button
        className="preview-btn"
        onClick={() => setShowPreview(!showPreview)}
      >
        ▼ Preview shipping cost
      </button>

          {/* Shipping Preview Section */}
          {showPreview && (
            <div className="shipping-preview">
              <h2 className="preview-title">Preview shipping price</h2>
              <p className="preview-subtitle">See what buyers will pay for shipping</p>

              <div className="preview-content">
                {/* Destination Dropdown */}
                <div className="form-group">
                  <label>Country</label>
                  <Select
                    options={countryList().getData()}
                    value={countryList().getData().find(c => c.label === formData.country) || null}
                    onChange={handleCountryChange}
                  />
                </div>

                {/* Shipping Cost Details */}
                <div className="shipping-price">
                  <p className="label">Shipping price</p>
                  <p className="price-value text-green-600">Free</p>

                  <p className="label">Total price</p>
                  <p className="total-price">USD 55</p>
                </div>
              </div>
            </div>
          )}

      {/* Shipping Form Modal */}
      {showShippingForm && (
        <>
          <div className="shipping-overlay" onClick={() => setShowShippingForm(false)}></div>
          <div className="shipping-form">
            <h3 className="form-title">Edit Shipping</h3>

            {/* Profile Name */}
            <div className="form-group">
              <label>Profile Name</label>
              <input type="text" name="profileName" value={formData.profileName} onChange={handleShippingChange} />
            </div>

            {/* Country Selection */}
            <div className="form-group">
              <label>Country</label>
              <Select
                options={countryList().getData()}
                value={countryList().getData().find(c => c.label === formData.country) || null}
                onChange={handleCountryChange}
              />
            </div>

            {/* Origin Postal Code */}
            <div className="form-group">
              <label>Origin Postal Code</label>
              <input type="text" name="postalCode" value={formData.postalCode} onChange={handleShippingChange} />
            </div>

            {/* Processing Time */}
            <div className="form-group">
              <label>Processing Time (Days)</label>
              <div className="input-range">
                <input type="number" name="processingTimeMin" value={formData.processingTimeMin} onChange={handleShippingChange} />
                <span>-</span>
                <input type="number" name="processingTimeMax" value={formData.processingTimeMax} onChange={handleShippingChange} />
              </div>
            </div>

            {/* Delivery Time */}
            <div className="form-group">
              <label>Delivery Time (Business Days)</label>
              <div className="input-range">
                <input type="number" name="deliveryTimeMin" value={formData.deliveryTimeMin} onChange={handleShippingChange} />
                <span>-</span>
                <input type="number" name="deliveryTimeMax" value={formData.deliveryTimeMax} onChange={handleShippingChange} />
              </div>
            </div>

                {/* Shipping Cost */}
                <div className="form-group">
                  <label>Shipping Cost</label>
                  <input type="text" name="cost" value={formData.cost} onChange={handleShippingChange} />
                </div>

                {/* Save & Close Buttons */}
                <div className="form-buttons">
                  <button type="button" className="save-btn" onClick={() => setShowShippingForm(false)}>
                    Save
                  </button>
                  <button type="button" className="close-btn" onClick={() => setShowShippingForm(false)}>
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* RenewalOption */}

      <div className="renewal-container">
      <h2 className="renewal-title">
        Renewal options 
      </h2>
      <p className="renewal-desc">
        Each renewal lasts for four months or until the listing sells out.{" "}
        <a href="#" className="renewal-link">Get more details on auto-renewing.</a>
      </p>

      <div>
        {/* Automatic Option */}
        <label className="renewal-option">
          <input
            type="radio"
            value="automatic"
            checked={selectedOption === "automatic"}
            onChange={() => setSelectedOption("automatic")}
          />
          <div>
            <span className="automatic">Automatic</span>
            <p>This listing will renew as it expires for USD 0.20 each time (recommended).</p>
          </div>
        </label>

        {/* Manual Option */}
        <label className="renewal-option">
          <input
            type="radio"
            value="manual"
            checked={selectedOption === "manual"}
            onChange={() => setSelectedOption("manual")}
          />
          <div>
            <span className="manual">Manual</span>
            <p>Expires on Jul 31, 2025</p>
          </div>
        </label>
      </div>
    </div>


        <button type="submit" className="submit-button">
          Save Changes
        </button>
    </form>
  </div>
   
  );
};

export default AddProduct;
