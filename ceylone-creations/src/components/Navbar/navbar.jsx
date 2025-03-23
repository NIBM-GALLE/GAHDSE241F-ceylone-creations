import { FaSearch, FaUser, FaHeart, FaShoppingCart, FaBars } from "react-icons/fa";
import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import handleLogout from "../../utills/logout/logout";
import "./navbar.css";


import profile from "../../assets/icons/profile.png";
import edit from "../../assets/icons/edit.png";
import logout from "../../assets/icons/logout.png";
import settings from "../../assets/icons/settings.png";
import mail from "../../assets/icons/mail.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [ username, setUsername] = useState("");


  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    if (storedRole === "Buyer" && storedUsername) {
      setUsername(storedUsername);
    }
  }, []);



  return (
    <div className="navbar-container">
      {/* Top Bar */}
      <div className="top-bar">Free Home Shipping above Rs 5000</div>

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
          <FaHeart className="icon" />
          <FaShoppingCart className="icon" />
          <FaUser 
          className="icon cursor-pointer"
          onClick={() => setProfileDropdown(!profileDropdown)}
          />
          {profileDropdown && (
            <div className="dropdown-menu-profile">
              <p className="profile-name">Hello, {username}</p>
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
              { name: "Handmade Jewelry & Accessories", path: "/category/Jewelry & Accessorie" },
              { name: "Woodcraft & Furniture", path: "/category/Woodcraft & Furniture" },
              { name: "Pottery & Ceramics", path: "/category/Pottery & Ceramics" },
              { name: "Traditional Sri Lankan Masks & Sculptures", path: "/category/Traditional Sri Lankan Masks & Sculptures" },
              { name: "Hand-painted & Artistic Items", path: "/category/Hand-painted & Artistic Items" },
              { name: "Natural & Herbal Products", path: "/category/Natural & Herbal Products" },
              { name: "Cane, Rattan & Coconut Shell Products", path: "/category/Cane, Rattan & Coconut Shell Products" },
              { name: "Hand-stitched & Embroidered Goods", path: "/category/Hand-stitched & Embroidered Goods" },
              { name: "Recycled & Upcycled Crafts", path: "/category/Recycled & Upcycled Crafts" },
              { name: "Handmade Leather Goods", path: "/category/Handmade Leather Goods" },
              { name: "Traditional Batik & Dyed Fabrics", path: "/category/Traditional Batik & Dyed Fabrics" },
              { name: "Eco-friendly & Sustainable Products", path: "/category/Eco-friendly & Sustainable Products" },
              { name: "Metal & Brass Handicrafts", path: "/category/Metal & Brass Handicrafts" },
              { name: "Bamboo & Palm Leaf Creations", path: "/category/Bamboo & Palm Leaf Creations" },
              { name: "Hand-carved Wooden Utensils", path: "/category/Hand-carved Wooden Utensils" },
              { name: "Paper & Stationery Crafts", path: "/category/Paper & Stationery Crafts" },
              { name: "Cultural & Ethnic Accessories", path: "/category/Cultural & Ethnic Accessories" },
              { name: "Custom Artwork & Illustrations", path: "/category/Custom Artwork & Illustrations" },
              { name: "Handcrafted Home Décor Items", path: "/category/Handcrafted Home Décor Items" },
            ],
          },

          { name: "CROWD FUNDING", path: "/crowdfunding" },
          { name: "WORKSHOPS", path: "/workshops" },
          { name: "BLOGS", path: "/logout" },
          { name: "CREATE ACCOUNT", path: "/registercustomer" },
          { name: "LOGIN", path: "/login" },
          
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
              <Link to={`/category/${category.path}`} key={category.path} className="dropdown-item">
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
