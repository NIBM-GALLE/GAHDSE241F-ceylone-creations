// SuccessStoriesBlogs.jsx

import React from "react";
import "./SuccessStoriesBlogs.css";
import SuccessStory1 from "../../assets/images/success-story-1.jpeg";
import SuccessStory2 from "../../assets/images/success-story-2.jpeg";
import SuccessStory3 from "../../assets/images/success-story-3.jpeg";
import Blog1 from "../../assets/images/blog-1.jpeg";
import Blog2 from "../../assets/images/blog-2.jpeg";
import Artisan1 from "../../assets/images/artisan-1.jpeg";
import Artisan2 from "../../assets/images/artisan-2.jpeg";

const SuccessStoriesBlogs = () => {
  console.log("Blogs Section Loaded"); // Debugging line

  return (
    <div className="success-stories-blogs">
      {/* Banner Section */}
      <div className="banner">
        <div className="banner-overlay">
          <h1 className="fade-in">Success Stories & Blogs</h1>
          <p className="slide-in">Inspiring Journeys & Insights</p>
        </div>
      </div>

      {/* Success Stories Section */}
      <section className="success-stories section">
        <h2>Success Stories</h2>
        <div className="stories-container">
          <div className="story-card fade-up">
            <img src={SuccessStory1} alt="Success Story 1" />
            <h3>From Local to Global</h3>
            <p>Discover how our artisans transformed their crafts into international brands.</p>
          </div>
          <div className="story-card fade-up">
            <img src={SuccessStory2} alt="Success Story 2" />
            <h3>Empowering Women Through Handicrafts</h3>
            <p>Learn how Ceylon Creations is supporting female artisans in Sri Lanka.</p>
          </div>
          <div className="story-card fade-up">
            <img src={SuccessStory3} alt="Success Story 3" />
            <h3>Artisans who benefited from Ceylon Creations</h3>
            <p>Meet talented artisans whose lives have changed through our platform's support.</p>
          </div>
        </div>
      </section>

      {/* Real Artisan Stories Section */}
      <section className="artisan-stories section">
        <h2>Artisan Stories</h2>
        <p className="sub-heading">
          Read about real artisans who have achieved success through our platform.
        </p>
        <div className="stories-container">
          <div className="story-card fade-up">
            <img src={Artisan1} alt="Artisan 1" />
            <h3>Kamal - The Weaving Maestro</h3>
            <p>
              Kamal, a traditional handloom weaver, struggled to sell his work until he joined our 
              platform. Now, his handmade textiles are shipped to customers worldwide, securing 
              a stable income for his family.
            </p>
          </div>
          <div className="story-card fade-up">
            <img src={Artisan2} alt="Artisan 2" />
            <h3>Anusha - The Pottery Queen</h3>
            <p>
              Anusha's passion for pottery remained hidden in her small village. With our website, 
              she gained exposure and now runs a thriving online business, delivering her beautiful 
              ceramic creations globally.
            </p>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="blogs section">
        <h2>Latest Blogs</h2>
        <div className="blogs-container">
          <div className="blog-card slide-up">
            <img src={Blog1} alt="Blog 1" />
            <h3>The Art of Handwoven Textiles</h3>
            <p>Explore the traditional techniques behind Sri Lanka’s unique handwoven fabrics.</p>
          </div>
          <div className="blog-card slide-up">
            <img src={Blog2} alt="Blog 2" />
            <h3>Eco-Friendly Craftsmanship</h3>
            <p>How sustainable practices are shaping the future of handmade products.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesBlogs;
