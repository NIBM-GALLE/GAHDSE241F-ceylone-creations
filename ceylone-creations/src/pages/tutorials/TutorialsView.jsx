// TutorialsView.jsx - Component to display tutorials in a grid layout

import React from 'react';
import './TutorialsView.css';

const TutorialsView = () => {
  // Sample tutorial data
  const tutorials = [
    {
      id: 1,
      title: "Beginner Crochet Scarf",
      author: "Maria Fernandez",
      rating: "★★★★☆",
      duration: "2 hours",
      imageUrl: "https://example.com/scarf-tutorial.jpg"
    },
    {
      id: 2,
      title: "Easy Knit Hat Pattern",
      author: "James Wilson",
      rating: "★★★★★",
      duration: "1.5 hours",
      imageUrl: "https://example.com/hat-tutorial.jpg"
    },
    {
      id: 3,
      title: "Intermediate Blanket Design",
      author: "Sarah Johnson",
      rating: "★★★☆☆",
      duration: "4 hours",
      imageUrl: "https://example.com/blanket-tutorial.jpg"
    },
    {
      id: 4,
      title: "Advanced Amigurumi Techniques",
      author: "David Kim",
      rating: "★★★★☆",
      duration: "3 hours",
      imageUrl: "https://example.com/amigurumi-tutorial.jpg"
    }
  ];

  return (
    <div className="tutorials-view">
      <div className="tutorials-header">
        <h1>Tutorials</h1>
        <p>Learn new crafting techniques with our expert guides</p>
      </div>

      <div className="tutorials-grid">
        {tutorials.map(tutorial => (
          <div key={tutorial.id} className="tutorial-card">
            <img 
              src={tutorial.imageUrl} 
              alt={tutorial.title}
              className="tutorial-image" 
            />
            <div className="tutorial-content">
              <h3 className="tutorial-title">{tutorial.title}</h3>
              <p className="tutorial-author">By {tutorial.author}</p>
              <div className="tutorial-meta">
                <span className="tutorial-rating">{tutorial.rating}</span>
                <span className="tutorial-duration">{tutorial.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialsView;