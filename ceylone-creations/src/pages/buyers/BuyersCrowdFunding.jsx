import React from 'react';
import './BuyersCrowdFunding.css';

const BuyersCrowdFunding = () => {
  const campaigns = [
    {
      id: 1,
      title: 'Handmade Pottery Collection',
      artisan: 'Ayesha Pottery Studio',
      description: 'Help us expand our workshop and create beautiful ceramic pieces for your home.',
      progress: { raised: 1250, goal: 3000 },
      image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rewards: [
        'Small vase for $25+ pledge',
        'Custom dinner set for $100+',
        'Pottery workshop invite for $250+'
      ]
    },
    {
      id: 2,
      title: 'Traditional Weaving Project',
      artisan: 'Mahesh Handlooms',
      description: 'Support our weavers to preserve ancient textile techniques and bring you authentic fabrics.',
      progress: { raised: 3200, goal: 5000 },
      image: 'https://images.unsplash.com/photo-1595642527925-4d41cb781653?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rewards: [
        'Handwoven scarf for $30+',
        'Custom saree for $150+',
        'Weaving experience for $300+'
      ]
    },
    {
      id: 3,
      title: 'Organic Woodcraft Series',
      artisan: 'Sunil Woodworks',
      description: 'Fund our sustainable woodworking tools to craft eco-friendly furniture for you.',
      progress: { raised: 1800, goal: 4000 },
      image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rewards: [
        'Hand-carved bowl for $40+',
        'Custom cutting board for $120+',
        'Woodworking class for $200+'
      ]
    }
  ];

  return (
    <div className="buyers-app">
      {/* Navigation - Fixed Layout */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <span className="logo-icon">🤝</span>
            <span className="logo-text">Support for Artisans</span>
          </div>
          
          <div className="nav-menu">
            <ul className="nav-links">
              <li><a href="#" className="nav-link">Discover</a></li>
              <li><a href="#" className="nav-link">Categories</a></li>
              <li><a href="#" className="nav-link">How It Works</a></li>
              <li><a href="#" className="nav-link">Stories</a></li>
            </ul>
            <button className="nav-cta">Become a Patron</button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Improved */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">
            <h1>Bring Handcrafted Excellence to Your Home</h1>
            <p className="hero-subtitle">
              Support master artisans and receive beautiful, handmade products directly from their workshops.
            </p>
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search for pottery, textiles, woodwork..." 
                aria-label="Search campaigns"
              />
              <button className="search-btn" aria-label="Search">
                <span role="img" aria-hidden="true">🔍</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Campaigns */}
      <section className="featured-campaigns">
        <div className="section-header">
          <h2 className="section-title">Featured Artisan Projects</h2>
          <p className="section-subtitle">Back these projects to receive exclusive handmade rewards</p>
        </div>
        
        <div className="campaigns-grid">
          {campaigns.map(campaign => (
            <div className="campaign-card" key={campaign.id}>
              <div className="campaign-image" style={{ backgroundImage: `url(${campaign.image})` }}>
                <div className="artisan-badge">{campaign.artisan}</div>
              </div>
              <div className="campaign-content">
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                
                <div className="progress-container">
                  <div className="progress-info">
                    <span className="amount-raised">${campaign.progress.raised.toLocaleString()}</span>
                    <span className="goal">of ${campaign.progress.goal.toLocaleString()} goal</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(campaign.progress.raised / campaign.progress.goal) * 100}%` }}
                    ></div>
                  </div>
                  <div className="progress-percent">
                    {Math.round((campaign.progress.raised / campaign.progress.goal) * 100)}% funded
                  </div>
                </div>
                
                <div className="rewards">
                  <h4>Pledge Rewards:</h4>
                  <ul>
                    {campaign.rewards.map((reward, i) => (
                      <li key={i}>
                        <span className="reward-icon">✨</span> {reward}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="support-btn">Support This Project</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>Join Our Artisan Community</h2>
            <p>Get early access to new projects and exclusive member benefits</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                aria-label="Email address"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon">🤝</span>
                <span className="logo-text">Support for Artisans</span>
              </div>
              <p className="footer-motto">Connecting buyers with authentic handmade craftsmanship</p>
            </div>
            
            <div className="footer-links">
              <div className="link-column">
                <h4>Discover</h4>
                <a href="#">Popular Projects</a>
                <a href="#">New Arrivals</a>
                <a href="#">Limited Editions</a>
              </div>
              <div className="link-column">
                <h4>About</h4>
                <a href="#">Our Story</a>
                <a href="#">Artisan Network</a>
                <a href="#">Sustainability</a>
              </div>
              <div className="link-column">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Shipping Info</a>
                <a href="#">Returns</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 ArtisanBuy. All rights reserved.</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="Pinterest">Pinterest</a>
              <a href="#" aria-label="Facebook">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BuyersCrowdFunding;