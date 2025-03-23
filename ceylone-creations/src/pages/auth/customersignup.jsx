import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import PhoneInput  from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import"../../styles/auth.css";
import ourpeoples from "../../assets/images/ourpeople.png";


const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
    password: "",
    role: "Buyer"
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle phone input separately
const handlePhoneChange = (value, country) => {
  setFormData({
    ...formData,
    country_code: `+${country.dialCode}`,
    contactNo: value.replace(`+${country.dialCode}`, ""), // Remove country code from number
  });
};


// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    firstname: formData.firstName,
    lastname: formData.lastName,
    phone: formData.contactNo,
    email: formData.email,
    password: formData.password,
    role: formData.role
  };

  try {
    const response = await fetch("http://localhost:5000/signupb", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Server Response:", result);

    if (response.status === 200) {
      localStorage.setItem("token", result.token);
      alert("Registration Successful");
      window.location.href = "/login";
    } else {
      alert(result.message || "Registration Failed");
      console.error("Error:", result);
    }
  } catch (error) {
    console.error("Network or Server Error:", error);
    alert("An error occurred, please try again later.");
  }
};

  

  return (
    <div className="register-container">
      <div className="register-left">
        <img src={ourpeoples} alt="our peoples" />
      </div>
      <div className="register-right">
        <h2>Create an account</h2>
        <div className="toggle-buttons">
          <button 
            className="active"
            onClick={() => window.location.href = "/registercustomer"}
          >
            Personal
          </button>
          <button 
            onClick={() => window.location.href = "/registerartist"}
          >
            Business
          </button>
        </div>

        {/* Personal Account Form */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-box">
              <input 
                type="text" 
                name="firstName"
                placeholder="First Name" 
                value={formData.firstName}
                onChange={handleChange}
                required  
              />
            </div>
            <div className="input-box">
              <input 
                type="text" 
                name="lastName"
                placeholder="Last Name" 
                value={formData.lastName}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          <div className="input-box">
          <PhoneInput
            country={"lk"} // Sri Lanka
            value={formData.contactNo}
            onChange={(value, country) => handlePhoneChange(value, country)}
            inputProps={{
              name: "contactNo",
              required: true,
              placeholder: "Phone"
            }}
          />
        </div>
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            required 
          /> 
          <button type="submit" className="create-account-btn">
            Create Personal Account
          </button>
        </form>

        <p>or continue with</p>
        <div className="social-buttons">
          <button className="google"><FaGoogle /> Google</button>
          <button className="facebook"><FaFacebook /> Facebook</button>
          <button className="apple"><FaApple /> Apple</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
