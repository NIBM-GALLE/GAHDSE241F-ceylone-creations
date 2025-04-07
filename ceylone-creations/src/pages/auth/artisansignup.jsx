import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import PhoneInput  from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import "../../styles/auth.css";
import ourpeoples from "../../assets/images/ourpeople.png";


const Registerartisian = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    password: "",
    confirmPassword: "",
    businessEmail: "",
    contactNo: "", 
    acceptTerms: false,
    role: "artisian",
    passwordError:"" 
  });

   // Handle input changes
   const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };



    // Handle phone input separately
const handlePhoneChange = (value, country, event, formattedValue) => {
  setFormData({
    ...formData,
    country_code: `+${country.dialCode}`,
    contactNo: value.replace(`+${country.dialCode}`, ""), // Remove country code from number
  });
};

// Password validation function
const validatePassword = () => {
  // Reset error message
  setFormData((prevState) => ({ ...prevState, errorMessage: "" }));

  // Validate password length
  if (formData.password.length < 8) {
    alert ("Password must be at least 8 characters");
  }

  // Validate if passwords match
  if (formData.password !== formData.confirmPassword) {
    alert ("Passwords do not match");
  }

  return ""; // No errors
};

 
const handleClick = async (e) => {
  e.preventDefault();

  const errorMessage = validatePassword();
  if (errorMessage) {
    setFormData((prevState) => ({ ...prevState, error: errorMessage }));
    return;
  }

  const data = {
    firstname: formData.firstname,
    email: formData.businessEmail,
    password: formData.password,
    confirmpassword: formData.confirmPassword,
    phone: formData.contactNo,
    role: formData.role
  };

  try {
    const response = await fetch("http://localhost:5000/api/artisans/register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      localStorage.setItem("token", result.token);
      alert("Registration Successful");
      window.location.href = "/login";
    } else {
      alert(result.message || "Registration Failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred, please try again later");
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
            onClick={() => window.location.href = "/registercustomer"}
          >
            Personal
          </button>
          <button 
            className="active"
            onClick={() => window.location.href = "/registerartist"}
          >
            Business
          </button>
        </div>  

        {/* Business Account Form */}
        <form onSubmit={handleClick}>
        <input 
              type="text" 
              name="firstname"
              placeholder="Enter name" 
              value={formData.firstname}
              onChange={handleChange}
              required 
            />
          <div className="input-group">
            <div className="input-box">
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
                required 
              /> 
            </div>
            <div className="input-box">
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm Password" 
                value={formData.confirmPassword}
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
            name="businessEmail"
            placeholder="Email" 
            value={formData.businessEmail}
            onChange={handleChange}
            required 
          />
          <div className="terms-and-conditions">
          <input type="checkbox" onChange={handleChange} />
            <p className="terms">
              By signing you agree to our Terms of Service and Privacy. 
            </p>
          </div>
          <button type="submit" className="create-account-btn">
            Create Business Account
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

export default Registerartisian;
