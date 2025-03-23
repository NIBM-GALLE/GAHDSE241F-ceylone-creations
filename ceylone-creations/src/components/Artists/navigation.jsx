import { FaSearch, FaUser, FaBell, FaBars } from "react-icons/fa";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import handleLogout from "../../utills/logout/logout";
import "./navigation.css"

import profile from "../../assets/icons/profile.png";
import edit from "../../assets/icons/edit.png";
import logout from "../../assets/icons/logout.png";
import settings from "../../assets/icons/settings.png";
import mail from "../../assets/icons/mail.png";
import shopicon from "../../assets/icons/shop.png"; 

export default function Navbarartist() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    if (storedRole === "Artist" && storedUsername) {
      setUsername(storedUsername);
    }
  }, []);






  return (
    <div className="navbar-container">
      {/* Top Bar */}
      <div className="top-bar">Empowering Sri Lankan Artisans</div>

      {/* Main Navbar */}
      <div className="main-navbar">
        {/* Mobile Menu Button */}
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </button>

        {/* Search Bar */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="What are you looking for?" className="search-input" />
        </div>

        {/* Logo */}
        <h1 className="logo">Celone Creations</h1>

        {/* Icons */}
        <div className="nav-icons">
          <span className="currency">SRI LANKA (RUPEES Rs)</span>
          <FaBell className="icon" />
          <img src={shopicon} alt="Shop" className="icon" />
          <FaUser 
          className="icon cursor-pointer"
          onClick={() => setProfileDropdown(!profileDropdown)}
          />
          {profileDropdown && (
            <div className="dropdown-menu-profile">
              <p className="profile-name">Hello,{username}</p>
              <Link to="/profile" className="profile-link" >
                <img src={profile}  alt="Profile" className="dropdown-icon"/>
                <span> profile</span>
              </Link>
              <Link to="/edit-profile" className="profile-link">
                <img src={edit} alt="Edit Profile" className="dropdown-icon"/>
               <span> Edit Profile</span>
              </Link>
              <Link to="/messages" className="profile-link">
                <img src={mail} alt="Messages" className="dropdown-icon"/>
                <span>Messages</span>
              </Link>
              <Link to="/logout" className="profile-link" onClick={handleLogout}>  
                <img src={logout} alt="Logout" className="dropdown-icon"/>
                <span>Logout</span>
              </Link> 
              <Link to="/settings" className="profile-link">
              <img src={settings} alt="Settings" className="dropdown-icon"/>
              <span>Settings</span>
              </Link>
            </div>
          )}
          
        </div>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links${menuOpen ? "active" : ""}`}>
        {[
          { name: "HOME", path: "/" },
          
          {
            
            name: "PRODUCTS",
            
            dropdown: [
              { name: "Handwoven Textiles & Clothing", path: "/category/textiles" },
              { name: "Batik sarees & clothing", path: "/category/batik" },
              { name: "Handloom fabrics", path: "/category/handloom" },
              { name: "Traditional sarongs & shawls", path: "/category/sarongs" },
              { name: "Handmade Jewelry & Accessories", path: "/category/jewelry" },
              { name: "Brass & silver jewelry", path: "/category/brass-jewelry" },
              { name: "Beaded & wooden accessories", path: "/category/beaded-accessories" },
              { name: "Clay & lacquer bangles", path: "/category/clay-bangles" },
              { name: "Woodcraft & Furniture", path: "/category/woodcraft" },
              { name: "Hand-carved wooden statues", path: "/category/wooden-statues" },
              { name: "Traditional wooden masks", path: "/category/wooden-masks" },
              { name: "Teak & bamboo furniture", path: "/category/furniture" },
              { name: "Pottery & Ceramics", path: "/category/pottery" },
              { name: "Terracotta home decor", path: "/category/terracotta" },
              { name: "Clay cooking pots & tableware", path: "/category/clay-pots" },
              { name: "Porcelain & ceramic ornaments", path: "/category/ceramics" },
              { name: "Traditional Sri Lankan Masks & Sculptures", path: "/category/masks" },
              { name: "Yaksha & Raksha masks", path: "/category/yaksha-masks" },
              { name: "Hand-carved religious statues", path: "/category/religious-statues" },
              { name: "Stone & brass figurines", path: "/category/stone-figurines" },
              { name: "Hand-painted & Artistic Items", path: "/category/paintings" },
              { name: "Traditional paintings", path: "/category/traditional-paintings" },
              { name: "Folk art & mural-style works", path: "/category/folk-art" },
              { name: "Natural & Herbal Products", path: "/category/herbal-products" },
              { name: "Handmade organic soaps & skincare", path: "/category/organic-soaps" },
              { name: "Ayurvedic oils & balms", path: "/category/ayurvedic-oils" },
              { name: "Cane, Rattan & Coconut Shell Products", path: "/category/cane-products" },
              { name: "Woven baskets & bags", path: "/category/woven-baskets" },
              { name: "Handmade furniture & home decor", path: "/category/handmade-furniture" },
              { name: "Hand-stitched & Embroidered Goods", path: "/category/embroidered-goods" },
              { name: "Lacework (Beeralu lace)", path: "/category/lacework" },
              { name: "Recycled & Upcycled Crafts", path: "/category/recycled-crafts" }
            ]
          },

          { name: "ORDERS", path: "/orders" },  
          { name: "CROWD FUNDING", path: "/crowdfunding" },
          { name: "LERNING HUB", path: "/workshops" },
          { name: "WORKSHOPS", path: "/workshops" },
          { name: "BLOGS", path: "/logout" },
          { name: "LISTINGS", path: "/listing" },
         
          
        ].map((item) => (
          <div
            key={item.name}
            className="nav-item"
            onMouseEnter={() => item.dropdown && setDropdownOpen(true)}
            onMouseLeave={() => item.dropdown && setDropdownOpen(false)}
          >
            <Link to={item.path} className="nav-link">
              {item.name}
            </Link>
            {item.dropdown && dropdownOpen && (
              <div className="dropdown-menu">
                {item.dropdown.map((category) => (
                <Link to={`/category/${category._id}`} key={category._id} className="dropdown-item">
                  {category.name}
                </Link>
              ))}
              </div>
            )}
          </div>
        ))}
        
      
      </div>
    </div>
  );
}
