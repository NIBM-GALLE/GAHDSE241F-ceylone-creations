import React, { useState } from 'react';
import './CrowdFundingRequestForm.css';

function CrowdFundingRequestForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    country: '',
    address: '',
    title: '',
    description: '',
    amount: '',
    category: '',
    idFront: null,
    idBack: null,
    supportDoc: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and API logic here
    console.log('Submitted Data:', formData);
  };

  return (
    <div className="form-container">
      <h2>Create Fundraising Request</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Your Permanent Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="idFront">ID Verification (Front Image)</label>
        <input
          id="idFront"
          type="file"
          name="idFront"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <label htmlFor="idBack">ID Verification (Back Image)</label>
        <input
          id="idBack"
          type="file"
          name="idBack"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <div style={{
          margin: '20px 0',
          background: '#f3e6da',
          padding: '18px',
          borderRadius: '8px',
          border: '2px solid #bfa181'
        }}>
          <label htmlFor="supportDoc" style={{ fontWeight: 'bold', color: '#8B4513' }}>
            Supporting Document (Issued by Grama Seva Officer)
          </label>
          <input
            id="supportDoc"
            type="file"
            name="supportDoc"
            accept=".pdf,image/*"
            onChange={handleChange}
            required
            style={{ margin: '12px 0', background: '#fff', padding: '10px' }}
          />
          <div style={{ fontSize: '1rem', color: '#4e342e', marginTop: '10px' }}>
            <strong>This Document should include the following details:</strong>
            <ul style={{ margin: '8px 0 0 18px' }}>
              <li>Full name and address of the artisan</li>
              <li>Description of your work or craft</li>
              <li>Reason for crowdfunding</li>
              <li>The Grama Seva Officer should certify that you are financially weak</li>
            </ul>
          </div>
        </div>

        <label htmlFor="title">Project Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter your project title"
          required
        />

        <label htmlFor="description">Project Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description..."
          required
        />

        <label htmlFor="amount">Funding Amount (USD)</label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="5000"
          min="1"
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          <option value="pottery">Pottery</option>
          <option value="jewelry">Jewelry</option>
          <option value="calligraphy">Calligraphy</option>
          <option value="woodwork">Woodwork</option>
          <option value="textiles">Textiles/Weaving</option>
          <option value="metalwork">Metalwork</option>
          <option value="glass">Glasswork</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default CrowdFundingRequestForm;
