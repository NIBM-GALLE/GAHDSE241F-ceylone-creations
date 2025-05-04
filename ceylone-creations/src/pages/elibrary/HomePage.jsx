import { Link } from 'react-router-dom';
import './HomePage.css';

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
  ];

  return (
    <div className="home-page">
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
                <div className="image-placeholder">Tutorial Image</div>
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
                    <span className="star">★</span>
                    <span>{tutorial.rating}</span>
                  </div>
                  <span>{tutorial.duration}</span>
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
  );
};

export default HomePage;