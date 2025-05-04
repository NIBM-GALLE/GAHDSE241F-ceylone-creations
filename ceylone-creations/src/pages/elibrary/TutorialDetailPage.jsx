import { Link } from 'react-router-dom';
import './TutorialDetailPage.css';

const TutorialDetailPage = () => {
  const tutorial = {
    id: 1,
    title: 'Handmade Ceramic Mug from Scratch',
    author: {
      name: 'James Potter',
      artisanSince: '2018',
    },
    rating: 4.5,
    reviewCount: 42,
    duration: '4 hours',
    difficulty: 'Intermediate',
    materials: [
      'Clay (1kg)',
      'Pottery wheel',
      'Ceramic glaze',
      'Kiln access',
      'Sponge',
      'Rib tool'
    ],
    steps: [
      {
        title: 'Preparing the clay',
        description: 'Wedge the clay to remove air bubbles and create uniform consistency.',
        time: '20 mins'
      },
      {
        title: 'Centering on the wheel',
        description: 'Center the clay on the wheel head before shaping.',
        time: '30 mins'
      },
    ],
    createdAt: 'March 15, 2023'
  };

  return (
    <div className="tutorial-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <nav aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tutorials">Tutorials</Link></li>
            <li aria-current="page">{tutorial.title}</li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <main className="tutorial-main">
        <div className="tutorial-container">
          {/* Left Column */}
          <div className="tutorial-content">
            <h1>{tutorial.title}</h1>
            
            {/* Author Info */}
            <div className="author-info">
              <div className="author-avatar">
                <div className="avatar-placeholder">Avatar</div>
              </div>
              <div>
                <p className="author-name">{tutorial.author.name}</p>
                <p className="author-since">Artisan since {tutorial.author.artisanSince}</p>
              </div>
            </div>

            {/* Tutorial Meta */}
            <div className="tutorial-meta">
              <div className="meta-rating">
                <span className="star">★</span>
                <span>{tutorial.rating}</span>
                <span>({tutorial.reviewCount})</span>
              </div>
              <div className="meta-item">{tutorial.duration}</div>
              <div className="meta-item">{tutorial.difficulty}</div>
              <div className="meta-item">Created: {tutorial.createdAt}</div>
            </div>

            {/* Main Image */}
            <div className="main-image">
              <div className="image-placeholder">Tutorial Main Image</div>
            </div>

            {/* Materials */}
            <div className="materials-section">
              <h2>Materials Needed</h2>
              <ul className="materials-list">
                {tutorial.materials.map((material, index) => (
                  <li key={index}>
                    <span>•</span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="steps-section">
              <h2>Step-by-Step Instructions</h2>
              <div className="steps-container">
                {tutorial.steps.map((step, index) => (
                  <div key={index} className="step-card">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      <div className="step-image">
                        <div className="image-placeholder">Step Image</div>
                      </div>
                      <div className="step-time">Estimated time: {step.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="tutorial-sidebar">
            <div className="sidebar-card">
              <h2>About This Tutorial</h2>
              <p className="sidebar-description">
                Learn to create beautiful ceramic mugs from scratch. Perfect for beginners with some pottery experience.
              </p>
              
              <div className="sidebar-info">
                <div className="info-item">
                  <h3>Category</h3>
                  <p>Pottery</p>
                </div>
                <div className="info-item">
                  <h3>Techniques</h3>
                  <p>Wheel throwing, Glazing</p>
                </div>
              </div>

              <button className="sidebar-button primary">Save to Favorites</button>
              <button className="sidebar-button secondary">Purchase Materials Kit ($45)</button>

              {/* Author Profile Card */}
              <div className="author-card">
                <div className="author-header">
                  <div className="author-avatar small">
                    <div className="avatar-placeholder">Avatar</div>
                  </div>
                  <div>
                    <p className="author-name">{tutorial.author.name}</p>
                    <p className="author-title">Pottery Artist</p>
                  </div>
                </div>
                <p className="author-bio">
                  James has been creating ceramic pieces for over 5 years. Specializes in functional pottery with modern designs.
                </p>
                <Link 
                  to={`/artisans/${tutorial.author.name.replace(' ', '-').toLowerCase()}`}
                  className="author-link"
                >
                  View all tutorials by James
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorialDetailPage;