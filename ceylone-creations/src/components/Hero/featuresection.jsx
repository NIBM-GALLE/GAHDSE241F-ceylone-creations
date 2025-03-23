import React from "react";
import "./featuresection.css";

// Import images (replace with correct paths)
import featureImage from "../../assets/images/feature.png"; // Update with your actual image path
import { FaHandsHelping, FaExchangeAlt, FaShieldAlt } from "react-icons/fa";



const FeatureSection = () => {
  return (
    <div className="feature-section">
      {/* Top Benefits Section */}
      <div className="benefits">
        <div className="benefit">
          <FaHandsHelping className="icon" />
          <p>Support Independent Brands</p>
        </div>
        <div className="benefit">
          <FaExchangeAlt className="icon" />
          <p>Free Returns and Exchanges</p>
        </div>
        <div className="benefit">
          <FaShieldAlt className="icon" />
          <p>Support Independent Brands</p>
        </div>
        <div className="benefit">
          <FaHandsHelping className="icon" />
          <p>Support Independent Brands</p>
        </div>
      </div>

      {/* Image & Description Section */}
      <div className="feature-content">
        <div className="feature-image">
          <img src={featureImage} alt="Handicraft" />
        </div>
        <div className="feature-text">
          <h5>LOREM IPSUM</h5>
          <h2>Lorem Ipsum is simply dummy text of the printing.</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
