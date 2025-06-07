import React, { useState } from "react";
import "./Crowdfunding.css";
import BannerImg from "../../assets/images/banner4.jpg";
import Crowdfunding1Img from "../../assets/images/crowdfunding1.jpeg";
import Crowdfunding2Img from "../../assets/images/crowdfunding2.jpg";
import Crowdfunding3Img from "../../assets/images/crowdfunding3.jpg";
import Crowdfunding4Img from "../../assets/images/crowdfunding4.jpg";
import Crowdfunding5Img from "../../assets/images/crowdfunding5.jpg";
import Crowdfunding6Img from "../../assets/images/crowdfunding6.jpg";
import Crowdfunding7Img from "../../assets/images/crowdfunding7.jpeg";

const Crowdfunding = () => {
  const [showDetails, setShowDetails] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const campaigns = [
    {
      id: 1,
      title: "Traditional Handloom Revival",
      description:
        "Help us revive ancient handloom techniques in rural Sri Lanka. Support this campaign to preserve cultural heritage and provide sustainable income for weavers.",
      image: Crowdfunding1Img,
      goal: 5000,
      raised: 3200,
      daysLeft: 15,
      category: "textiles",
      backers: 142,
      rewards: [
        { amount: 25, description: "Handwoven bookmark", itemsLeft: 32 },
        { amount: 50, description: "Set of 2 cotton napkins", itemsLeft: 18 },
        { amount: 100, description: "Custom woven table runner", itemsLeft: 5 },
        { amount: 250, description: "Personalized saree with your name woven in", itemsLeft: 2 },
      ],
      artisan: {
        name: "Ranjani Weavers Collective",
        location: "Kandy, Sri Lanka",
        story: "For generations, our family has kept the handloom tradition alive. With modernization, we risk losing these ancient techniques. Your support helps train new weavers and preserve our heritage.",
      },
    },
    {
      id: 2,
      title: "Pottery Workshop Expansion",
      description:
        "Support our pottery workshop expansion to train more artisans and create a sustainable production facility for traditional Sri Lankan ceramics.",
      image: Crowdfunding2Img,
      goal: 7500,
      raised: 4200,
      daysLeft: 22,
      category: "pottery",
      backers: 89,
      rewards: [
        { amount: 30, description: "Handcrafted clay cup", itemsLeft: 45 },
        { amount: 75, description: "Set of 4 ceramic bowls", itemsLeft: 22 },
        { amount: 150, description: "Custom pottery workshop experience", itemsLeft: 8 },
        { amount: 300, description: "Large hand-painted vase", itemsLeft: 3 },
      ],
      artisan: {
        name: "Clay Artisans Guild",
        location: "Galle, Sri Lanka",
        story: "Our cooperative of 15 potters has been creating traditional ceramics for decades. We need better equipment to increase production while maintaining quality craftsmanship.",
      },
    },
    {
      id: 3,
      title: "Woodcarving Tools Fund",
      description:
        "Help equip our woodcarving cooperative with modern tools while preserving traditional techniques. Your support keeps this ancient craft alive.",
      image: Crowdfunding3Img,
      goal: 3000,
      raised: 1800,
      daysLeft: 8,
      category: "woodwork",
      backers: 64,
      rewards: [
        { amount: 20, description: "Hand-carved wooden keychain", itemsLeft: 28 },
        { amount: 60, description: "Decorative wooden wall art", itemsLeft: 12 },
        { amount: 120, description: "Custom carved jewelry box", itemsLeft: 5 },
        { amount: 200, description: "Personalized name plaque", itemsLeft: 2 },
      ],
      artisan: {
        name: "Heritage Woodcarvers",
        location: "Negombo, Sri Lanka",
        story: "Our small workshop creates intricate carvings using techniques passed down for generations. New tools will help us work more efficiently without sacrificing traditional methods.",
      },
    },
    {
      id: 4,
      title: "Lacquerware Artisan Training",
      description:
        "Fund a training program for young artisans to learn the ancient art of Sri Lankan lacquerware, creating beautiful decorative items and jewelry.",
      image: Crowdfunding4Img,
      goal: 4000,
      raised: 2100,
      daysLeft: 30,
      category: "crafts",
      backers: 53,
      rewards: [
        { amount: 35, description: "Lacquer bangle set", itemsLeft: 40 },
        { amount: 80, description: "Decorative lacquer box", itemsLeft: 15 },
        { amount: 150, description: "Custom lacquer jewelry set", itemsLeft: 7 },
        { amount: 350, description: "Large lacquer wall art piece", itemsLeft: 1 },
      ],
      artisan: {
        name: "Lanka Lacquer Artists",
        location: "Matara, Sri Lanka",
        story: "This dying art form needs new practitioners to survive. Your support funds apprenticeships for disadvantaged youth to learn this valuable craft.",
      },
    },
    {
      id: 5,
      title: "Handmade Paper Production",
      description:
        "Establish a sustainable handmade paper workshop using traditional methods and local materials, creating eco-friendly stationery products.",
      image: Crowdfunding5Img,
      goal: 6000,
      raised: 3800,
      daysLeft: 18,
      category: "paper",
      backers: 97,
      rewards: [
        { amount: 20, description: "Set of 5 handmade cards", itemsLeft: 50 },
        { amount: 50, description: "Handmade journal", itemsLeft: 25 },
        { amount: 120, description: "Custom stationery set", itemsLeft: 10 },
        { amount: 250, description: "Personalized wedding invitations (set of 50)", itemsLeft: 3 },
      ],
      artisan: {
        name: "Eco Paper Collective",
        location: "Kurunegala, Sri Lanka",
        story: "We're reviving the ancient art of handmade paper using recycled materials and natural dyes. This workshop will provide employment for rural women while creating sustainable products.",
      },
    },
    {
      id: 6,
      title: "Traditional Mask Carving Studio",
      description:
        "Support the establishment of a dedicated studio for traditional Sri Lankan mask carving, preserving this unique cultural art form.",
      image: Crowdfunding6Img,
      goal: 5500,
      raised: 2900,
      daysLeft: 12,
      category: "woodwork",
      backers: 71,
      rewards: [
        { amount: 40, description: "Small decorative mask", itemsLeft: 30 },
        { amount: 90, description: "Medium ceremonial mask", itemsLeft: 15 },
        { amount: 180, description: "Large traditional mask", itemsLeft: 5 },
        { amount: 400, description: "Custom family mask set", itemsLeft: 2 },
      ],
      artisan: {
        name: "Ambalangoda Mask Makers",
        location: "Ambalangoda, Sri Lanka",
        story: "Our family has been carving traditional masks for rituals and performances for over 100 years. This studio will allow us to teach apprentices and expand our craft.",
      },
    },
    {
      id: 7,
      title: "Batik Workshop Equipment",
      description:
        "Provide modern equipment for a women's batik cooperative to increase production while maintaining traditional wax-resist dyeing techniques.",
      image: Crowdfunding7Img,
      goal: 3500,
      raised: 1750,
      daysLeft: 25,
      category: "textiles",
      backers: 48,
      rewards: [
        { amount: 25, description: "Batik scarf", itemsLeft: 35 },
        { amount: 60, description: "Batik wall hanging", itemsLeft: 20 },
        { amount: 130, description: "Custom batik shirt", itemsLeft: 8 },
        { amount: 300, description: "Large batik tapestry", itemsLeft: 1 },
      ],
      artisan: {
        name: "Sisterhood Batik Artisans",
        location: "Colombo, Sri Lanka",
        story: "Our cooperative of 12 women creates beautiful batik textiles. New equipment will help us meet growing demand while maintaining our traditional methods.",
      },
    },
  ];

  const handleDetailsToggle = (id) => {
    setShowDetails(showDetails === id ? null : id);
  };

  const filteredCampaigns = activeFilter === "all" 
    ? campaigns 
    : campaigns.filter(campaign => campaign.category === activeFilter);

  const categories = [
    { id: "all", name: "All Campaigns" },
    { id: "textiles", name: "Textiles" },
    { id: "pottery", name: "Pottery" },
    { id: "woodwork", name: "Woodwork" },
    { id: "crafts", name: "Traditional Crafts" },
    { id: "paper", name: "Paper Crafts" },
  ];

  return (
    <div className="crowdfunding">
      {/* Banner Section */}
      <div className="banner" style={{ backgroundImage: `url(${BannerImg})` }}>
        <div className="banner-overlay">
          <h1 className="fade-in">Artisan Crowdfunding</h1>
          <p className="slide-in">Support Sri Lankan Craftsmanship</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Campaigns Container */}
      <div className="campaign-container">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-box fade-up">
            <div className="campaign-image-container">
              <img src={campaign.image} alt={campaign.title} />
              <div className="category-badge">{campaign.category}</div>
            </div>
            <h2>{campaign.title}</h2>
            <p>{campaign.description}</p>
            
            {/* Progress Bar */}
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${Math.min(100, (campaign.raised / campaign.goal) * 100)}%` }}
              ></div>
            </div>
            
            <div className="campaign-stats">
              <div>
                <strong>${campaign.raised.toLocaleString()}</strong> raised of ${campaign.goal.toLocaleString()}
              </div>
              <div>
                <strong>{campaign.backers}</strong> backers
              </div>
              <div>
                <strong>{campaign.daysLeft}</strong> days left
              </div>
            </div>
            
            {/* Button to show reward details */}
            <button
              className="details-btn"
              onClick={() => handleDetailsToggle(campaign.id)}
            >
              {showDetails === campaign.id ? 'Hide Rewards' : 'View Reward Tiers'}
            </button>

            {/* Reward Details Box */}
            {showDetails === campaign.id && (
              <div className="reward-details">
                <h3>Reward Tiers</h3>
                {campaign.rewards.map((reward, index) => (
                  <div key={index} className="reward-tier">
                    <p>
                      <strong>${reward.amount}</strong>: {reward.description}
                      <span className="items-left">{reward.itemsLeft} left</span>
                    </p>
                  </div>
                ))}
                <div className="artisan-info">
                  <h4>About the Artisan</h4>
                  <p><strong>Name:</strong> {campaign.artisan.name}</p>
                  <p><strong>Location:</strong> {campaign.artisan.location}</p>
                  <p className="artisan-story">{campaign.artisan.story}</p>
                </div>
                <button className="support-btn">Support This Campaign</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crowdfunding;