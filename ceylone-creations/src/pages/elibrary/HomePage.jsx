import { Link, NavLink } from 'react-router-dom'; // Added NavLink for header active states
import './HomePage.css';
// You will still need SiteHeader.css and SiteFooter.css to be imported in your main App.js or index.js
// or combine their contents into HomePage.css if you prefer one CSS file for this view.
// For simplicity of this example, I'm assuming HomePage.css will contain all necessary styles
// or that you'll manage the CSS imports elsewhere.

// --- SiteHeader Component (defined internally) ---
const SiteHeader = () => {
  return (
    <header className="site-header"> {/* Ensure .site-header styles are available */}
      <div className="header-container">
        <Link to="/" className="logo">
          Crafty<span className="logo-accent">Learn</span>
        </Link>
        <nav className="main-nav">
          <NavLink to="/tutorials" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Tutorials
          </NavLink>
          <NavLink to="/categories" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Categories
          </NavLink>
          <NavLink to="/artisans" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Artisans
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Blog
          </NavLink>
        </nav>
        <div className="auth-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="header-cta-button">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

// --- SiteFooter Component (defined internally) ---
const SiteFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer"> {/* Ensure .site-footer styles are available */}
      <div className="footer-container">
        <div className="footer-section">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <Link to="/contact">Contact Us</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/help-center">Help Center</Link>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
        <div className="footer-section footer-social-connect">
          <h4>Connect With Us</h4>
          <div className="footer-social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">TW</a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">PT</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright-text">
          © {currentYear} CraftyLearn. All rights reserved.
        </p>
      </div>
    </footer>
  );
};


// --- HomePage Component ---
const HomePage = () => {
  const featuredCategories = [
    { name: 'Knitting', icon: '🧶', count: 128 },
    { name: 'Pottery', icon: '🏺', count: 76 },
    { name: 'Woodworking', icon: '🪵', count: 92 },
    { name: 'Jewelry', icon: '💍', count: 64 },
  ];

  const popularTutorials = [
    {
      id: 1,
      title: 'Beginner Crochet Scarf',
      author: 'Maria Fernandez',
      rating: 4.8,
      duration: '2 hours',
      difficulty: 'Beginner',
    },
    {
      id: 2,
      title: 'Handmade Ceramic Mug',
      author: 'James Potter',
      rating: 4.5,
      duration: '4 hours',
      difficulty: 'Intermediate',
    },
    {
      id: 3, // Added another tutorial for variety
      title: 'Wooden Spice Rack',
      author: 'Alex Woodman',
      rating: 4.2,
      duration: '3 hours',
      difficulty: 'Intermediate',
    },
  ];

  // Helper function to render stars
  const renderStars = (rating, tutorialId) => {
    const roundedRating = Math.round(rating);
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        starsArray.push(<span key={`star-filled-${tutorialId}-${i}`} className="star filled">★</span>);
      } else {
        starsArray.push(<span key={`star-empty-${tutorialId}-${i}`} className="star empty">☆</span>);
      }
    }
    return (
      <>
        {starsArray}
        <span className="rating-text" key={`rating-text-${tutorialId}`}>({rating.toFixed(1)})</span>
      </>
    );
  };

  return (
    <> {/* Fragment to wrap header, main content, and footer */}
      <SiteHeader /> {/* Using the internally defined SiteHeader */}
      <div className="home-page"> {/* This div remains for specific homepage content styling */}
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Craft Your Creativity</h1>
            <p>Learn handmade crafts from expert artisans. Tutorials for all skill levels.</p>
            <div className="hero-buttons">
              <Link to="/tutorials" className="primary-button">Browse Tutorials</Link>
              <Link to="/register" className="secondary-button">Join as Artisan</Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <h2>Explore Categories</h2>
          <div className="categories-grid">
            {featuredCategories.map((category, index) => (
              <Link
                to={`/tutorials?category=${category.name.toLowerCase()}`}
                key={index}
                className="category-card"
              >
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
                <p>{category.count} tutorials</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Tutorials */}
        <section className="popular-tutorials">
          <div className="section-header">
            <h2>Popular Tutorials</h2>
            <Link to="/tutorials" className="view-all">View all</Link>
          </div>

          <div className="tutorials-grid">
            {popularTutorials.map(tutorial => (
              <div key={tutorial.id} className="tutorial-card">
                <div className="tutorial-image">
                  <div className="image-placeholder">Tutorial Image for {tutorial.title}</div>
                </div>
                <div className="tutorial-content">
                  <div className="tutorial-header">
                    <h3>{tutorial.title}</h3>
                    <span className={`difficulty-badge ${tutorial.difficulty.toLowerCase()}`}>
                      {tutorial.difficulty}
                    </span>
                  </div>
                  <p className="author">By {tutorial.author}</p>
                  <div className="tutorial-footer">
                    <div className="rating">
                      {renderStars(tutorial.rating, tutorial.id)}
                    </div>
                    <span className="duration-text">{tutorial.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>Ready to start crafting?</h2>
          <p>Join our community of artisans and learners today.</p>
          <Link to="/register" className="cta-button">Get Started - It's Free</Link>
        </section>
      </div>
      <SiteFooter /> {/* Using the internally defined SiteFooter */}
    </>
  );
};

export default HomePage;