import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtisantSubmitForm.css';

const ArtisantSubmitForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    craftType: '',
    description: '',
    fundingGoal: '',
    timeline: '',
    story: '',
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, images: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    // Show success message and redirect
    alert('Your project has been submitted for review!');
    navigate('/support-artisans');
  };

  return (
    <div className="artisan-form-container">
      <div className="form-header">
        <h1>Submit Your Artisan Project</h1>
        <p>Share your craft with our community and get the support you need</p>
      </div>

      <form onSubmit={handleSubmit} className="artisan-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="craftType">Type of Craft</label>
            <select
              id="craftType"
              name="craftType"
              value={formData.craftType}
              onChange={handleChange}
              required
            >
              <option value="">Select your craft</option>
              <option value="pottery">Pottery/Ceramics</option>
              <option value="woodwork">Woodworking</option>
              <option value="textiles">Textiles/Weaving</option>
              <option value="metalwork">Metalwork</option>
              <option value="glass">Glasswork</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Project Details</h2>
          <div className="form-group">
            <label htmlFor="description">Short Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              maxLength="100"
              placeholder="Max 100 characters"
            />
          </div>

          <div className="form-group">
            <label htmlFor="story">Your Story</label>
            <textarea
              id="story"
              name="story"
              value={formData.story}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Tell us about your craft, your journey, and why you need support"
            ></textarea>
          </div>
        </div>

        <div className="form-section">
          <h2>Funding Details</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fundingGoal">Funding Goal ($)</label>
              <input
                type="number"
                id="fundingGoal"
                name="fundingGoal"
                value={formData.fundingGoal}
                onChange={handleChange}
                required
                min="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeline">Project Timeline (weeks)</label>
              <input
                type="number"
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                required
                min="1"
                max="52"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Show Your Work</h2>
          <div className="form-group">
            <label htmlFor="images">Upload Images (Max 5)</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
              required
            />
            <div className="image-preview">
              {formData.images.map((image, index) => (
                <div key={index} className="preview-item">
                  <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtisantSubmitForm;