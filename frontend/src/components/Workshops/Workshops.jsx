import React, { useState } from "react";
import "./Workshops.css";
import BannerImg from "../../assets/images/banner3.jpg";
import Workshop1Img from "../../assets/images/workshop1.jpeg";
import Workshop2Img from "../../assets/images/workshop2.jpeg";
import Workshop3Img from "../../assets/images/workshop3.jpeg";
import Workshop4Img from "../../assets/images/workshop4.jpeg"; 
import Workshop5Img from "../../assets/images/workshop5.jpeg"; 

const Workshops = () => {
  const [showContact, setShowContact] = useState(null); // State to handle showing contact details box

  const workshops = [
    {
      id: 1,
      title: "Traditional Handcraft Workshop",
      description:
        "Discover and own unique, hand-made Sri Lankan crafts! In this workshop, you will not only learn traditional handcraft techniques, but you'll also get the chance to purchase beautiful, locally-made items such as intricate wooden carvings, hand-woven fabrics, and stunning pottery. Take home a piece of Sri Lanka’s rich heritage today!",
      image: Workshop1Img,
      contact: {
        name: "Sri Lankan Handcrafts",
        phone: "071-2345678",
        address: "123 Handcraft Lane, Colombo",
        email: "contact@handcrafts.lk",
      },
    },
    {
      id: 2,
      title: "Pottery & Clay Art",
      description:
        "Get hands-on with clay and create your own masterpiece at the Pottery & Clay Art Workshop! We’re proud to showcase a collection of premium handmade pottery available for purchase. From elegant vases to charming decorative pieces, you'll find high-quality ceramics that reflect the craft’s rich history. Don’t miss the opportunity to own one-of-a-kind pieces of art!",
      image: Workshop2Img,
      contact: {
        name: "Clay Creations",
        phone: "072-3456789",
        address: "45 Pottery Street, Kandy",
        email: "info@claycreations.lk",
      },
    },
    {
      id: 3,
      title: "Weaving & Textile Workshop",
      description:
        "Experience the art of weaving and explore a wide variety of high-quality handwoven textiles! At our Weaving & Textile Workshop, you’ll not only learn about the weaving process but also have the chance to purchase finely crafted textiles, including stylish scarves, beautiful table runners, and exclusive handcrafted fabric designs. Take a piece of tradition home with you.",
      image: Workshop3Img,
      contact: {
        name: "Weave Wonders",
        phone: "073-4567890",
        address: "78 Textile Avenue, Galle",
        email: "weave@wonders.lk",
      },
    },
    {
      id: 4,
      title: "Woodworking & Carpentry",
      description:
        "Transform wood into functional art! In our Woodworking & Carpentry Workshop, you’ll gain skills in creating beautiful wooden items. Additionally, our workshop features a selection of expertly crafted wooden furniture and home decor pieces for sale. From custom-made tables to uniquely carved sculptures, bring the warmth and elegance of handcrafted wood into your home.",
      image: Workshop4Img,
      contact: {
        name: "Wooden Crafts",
        phone: "074-5678901",
        address: "12 Carpenter's Road, Negombo",
        email: "crafts@wooden.com",
      },
    },
    {
      id: 5,
      title: "Candle Making & Fragrance Crafting",
      description:
        "Immerse yourself in the soothing world of candle making! This workshop allows you to create your own candles while learning the intricate art of fragrance crafting. Our collection of luxurious, handcrafted candles in various shapes, sizes, and scents will be available for purchase, perfect for gifting or adding a calming touch to your space. Bring home your very own bespoke candles to fill your home with warmth and fragrance.",
      image: Workshop5Img,
      contact: {
        name: "Candle Creations",
        phone: "075-6789012",
        address: "98 Candle Lane, Matara",
        email: "info@candlecreations.com",
      },
    },
  ];

  // Function to toggle contact details visibility
  const handleContactToggle = (id) => {
    setShowContact(showContact === id ? null : id);
  };

  return (
    <div className="workshops">
      {/* Banner Section */}
      <div className="banner" style={{ backgroundImage: `url(${BannerImg})` }}>
        <div className="banner-overlay">
          <h1 className="fade-in">Our Workshops</h1>
          <p className="slide-in">Learn, Create, and Inspire</p>
        </div>
      </div>

      {/* Workshop Boxes */}
      <div className="workshop-container">
        {workshops.map((workshop) => (
          <div key={workshop.id} className="workshop-box fade-up">
            <img src={workshop.image} alt={workshop.title} />
            <h2>{workshop.title}</h2>
            <p>{workshop.description}</p>
            {/* Button to show contact details */}
            <button
              className="contact-btn"
              onClick={() => handleContactToggle(workshop.id)}
            >
              View Contact Details
            </button>

            {/* Contact Details Box */}
            {showContact === workshop.id && (
              <div className="contact-details">
                <h3>Contact Details</h3>
                <p><strong>Name:</strong> {workshop.contact.name}</p>
                <p><strong>Phone:</strong> {workshop.contact.phone}</p>
                <p><strong>Address:</strong> {workshop.contact.address}</p>
                <p><strong>Email:</strong> {workshop.contact.email}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workshops;
