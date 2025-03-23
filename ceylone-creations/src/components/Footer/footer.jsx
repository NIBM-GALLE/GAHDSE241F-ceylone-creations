import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import "./footer.css";

import googleplay from "../../assets/images/googleplay.png"
import appstore from "../../assets/images/appstore.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Online Shopping */}
        <div className="footer-section">
          <h3 className="footer-heading">ONLINE SHOPPING</h3>
          <ul className="footer-list">
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Home & Living</li>
            <li>Beauty</li>
            <li>Gift Cards</li>
          </ul>
        </div>

        {/* Customer Policies */}
        <div className="footer-section">
          <h3 className="footer-heading">CUSTOMER POLICIES</h3>
          <ul className="footer-list">
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>T&C</li>
            <li>Terms of Use</li>
            <li>Track Orders</li>
            <li>Shipping</li>
            <li>Cancellation</li>
            <li>Returns</li>
            <li>Privacy Policy</li>
            <li>Grievance Officer</li>
          </ul>
        </div>

        {/* Experience Mobile App */}
        <div className="footer-section">
          <h3 className="footer-heading">EXPERIENCE MOBILE APP</h3>
          <div className="footer-images">
            <img src={googleplay} alt="Google Play Store" className="app-image" />
            <img src={appstore} alt="App Store" className="app-image" />
          </div>
          <h3 className="footer-heading2">KEEP IN TOUCH</h3>
          <div className="footer-icons">
            <FaFacebookF className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaYoutube className="social-icon" />
            <FaInstagram className="social-icon" />
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter-section">
          <h3 className="footer-heading">JOIN US</h3>
          <p className="footer-text">SUBSCRIBE TO OUR NEWSLETTERS</p>
          <div className="footer-input">
            <input type="email" placeholder="Email Address" className="input-field" />
            <button className="subscribe-button">SUBSCRIBE!</button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 www.Dreamkart.com. All Rights Reserved.</p>
        <p>In Case Of Any Concern, <span className="footer-link">Contact Us</span></p>
      </div>
    </footer>
  );
};

export default Footer;
