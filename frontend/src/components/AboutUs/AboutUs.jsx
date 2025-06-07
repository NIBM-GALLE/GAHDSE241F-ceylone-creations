import React from "react";
import "./AboutUs.css";
import BannerImg from "../../assets/images/banner.jpg";
import WhoWeAreImg from "../../assets/images/who-we-are.jpeg";
import OurMissionImg from "../../assets/images/our-mission.jpeg";
import AuthenticityImg from "../../assets/images/authenticity.jpeg";
import QualityImg from "../../assets/images/quality.jpeg";
import SustainabilityImg from "../../assets/images/sustainability.jpeg";
import SupportImg from "../../assets/images/support.jpeg";

const AboutUs = () => {
  return (
    <div className="about-us">
      {/* Banner Section */}
      <div className="banner" style={{ backgroundImage: `url(${BannerImg})` }}>
        <div className="banner-overlay">
          <h1 className="fade-in">Welcome to Ceylon Creations</h1>
          <p className="slide-in">Where Tradition Meets Art</p>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="who-we-are section">
        <div className="section-content">
          <img src={WhoWeAreImg} alt="Who We Are" className="fade-up" />
          <div className="text-content">
            <h2>Who We Are</h2>
            <p>
              Ceylon Creations is a brand that cherishes and revives the deep-rooted 
              heritage of Sri Lanka’s traditional craftsmanship. We work with local artisans 
              to bring unique handmade products to a global audience.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="our-mission section">
        <div className="section-content reverse">
          <div className="text-content">
            <h2>Our Mission</h2>
            <p>
              Our mission is to preserve and promote Sri Lankan traditional arts by blending 
              them with modern design aesthetics. We aim to create sustainable and eco-friendly 
              handcrafted products while supporting local talent.
            </p>
          </div>
          <img src={OurMissionImg} alt="Our Mission" className="fade-up" />
        </div>
      </section>

      {/* Our Values Section */}
      <section className="our-values section">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card slide-up">
            <img src={AuthenticityImg} alt="Authenticity" />
            <h3>Authenticity & Heritage</h3>
          </div>
          <div className="value-card slide-up">
            <img src={QualityImg} alt="Quality" />
            <h3>High-Quality Craftsmanship</h3>
          </div>
          <div className="value-card slide-up">
            <img src={SustainabilityImg} alt="Sustainability" />
            <h3>Eco-Friendly & Sustainable</h3>
          </div>
          <div className="value-card slide-up">
            <img src={SupportImg} alt="Support" />
            <h3>Supporting Local Artisans</h3>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p></p>
      </footer>
    </div>
  );
};

export default AboutUs;
