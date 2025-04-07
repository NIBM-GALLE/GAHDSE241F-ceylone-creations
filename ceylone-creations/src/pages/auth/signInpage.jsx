import React, { useState } from "react";
import axios from 'axios';
import { FaGoogle, FaFacebook} from "react-icons/fa";
import "../../styles/signin.css"


const SignIn= () => {
  const [formData, setFormData] = useState({email: "",password: "",});
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
      const response = await axios.post("http://localhost:5000/api/auth/signin", formData);
      const {token,role,username}=response.data;

      localStorage.setItem("token",token);
      localStorage.setItem("username", username);  
      localStorage.setItem("role",role);
      
      alert(`Login successful as ${role}`);
      if(role==="Buyer"){
        window.location.href="/";
        
      }
      else{
        window.location.href="/artisanDashbord";
      }
      
    }
    catch(error){
      setError(error.response?.data.message ||"Login failed");

    }
  };

  return (
    <div className="signin-container">
      <div className="login-center">
        <h2>Sign In to your Account</h2> 
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="signin-account-btn">
            Continue
          </button>
        </form>

        <p>or continue with</p>
        <div className="social-buttons-signin">
          <button className="google"><FaGoogle /> Google</button>
          <button className="facebook"><FaFacebook /> Facebook</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
