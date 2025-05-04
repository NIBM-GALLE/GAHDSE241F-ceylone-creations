import React, { useState } from "react";
import "./Reviews.css";
import { FaStar, FaRegStar, FaStarHalfAlt, FaCloudUploadAlt } from "react-icons/fa";

const reviewsData = [
  {
    id: 1,
    topic: "Outstanding Craftsmanship!",
    name: "Emily Johnson",
    rating: 5,
    review:
      "Absolutely love the handcrafted wooden sculptures I purchased! The attention to detail is amazing.",
    date: "March 20, 2025",
  },
  {
    id: 2,
    topic: "Excellent Customer Service",
    name: "Michael Roberts",
    rating: 4.5,
    review:
      "Had a minor issue with my order, but the support team resolved it quickly. Very satisfied!",
    date: "March 18, 2025",
  },
  {
    id: 3,
    topic: "High-Quality Products",
    name: "Sophia Martinez",
    rating: 4,
    review:
      "The jewelry pieces I bought are elegant and durable. Will definitely buy again!",
    date: "March 15, 2025",
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(reviewsData);
  const [newReview, setNewReview] = useState({
    name: "",
    topic: "",
    review: "",
    artisanRating: 0,
    productRating: 0,
    overallRating: 0,
    image: null,
  });

  const handleInputChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewReview({ ...newReview, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleStarClick = (category, rating) => {
    setNewReview({ ...newReview, [category]: rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.review) {
      setReviews([{ ...newReview, date: new Date().toLocaleDateString() }, ...reviews]);
      setNewReview({
        name: "",
        topic: "",
        review: "",
        artisanRating: 0,
        productRating: 0,
        overallRating: 0,
        image: null,
      });
    }
  };

  const renderStars = (rating, category) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} onClick={() => handleStarClick(category, index + 1)}>
        {index + 1 <= rating ? <FaStar className="star full" /> : <FaRegStar className="star empty" />}
      </span>
    ));
  };

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Customer Reviews & Ratings</h2>

      {/* Review Submission Form */}
      <div className="review-form">
        <h3>Share Your Experience</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={newReview.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="topic"
            placeholder="Review Topic (e.g. 'Amazing Handcrafted Art!')"
            value={newReview.topic}
            onChange={handleInputChange}
          />
          <textarea
            name="review"
            placeholder="Write your review here..."
            value={newReview.review}
            onChange={handleInputChange}
            required
          ></textarea>

          <label>Rate the Artisan:</label>
          <div className="star-rating">{renderStars(newReview.artisanRating, "artisanRating")}</div>

          <label>Rate the Product:</label>
          <div className="star-rating">{renderStars(newReview.productRating, "productRating")}</div>

          <label>Overall Experience:</label>
          <div className="star-rating">{renderStars(newReview.overallRating, "overallRating")}</div>

          <label className="file-upload">
            <FaCloudUploadAlt className="upload-icon" />
            <span>Attach an image</span>
            <input type="file" onChange={handleFileChange} />
          </label>

          {newReview.image && <img src={newReview.image} alt="Uploaded preview" className="preview-img" />}

          <button type="submit" className="submit-button">Submit Review</button>
        </form>
      </div>

      {/* Submitted Reviews */}
      <div className="reviews-section">
        {reviews.map(({ id, topic, name, rating, review, date, image }) => (
          <div key={id} className="review-card">
            <h3 className="review-topic">{topic}</h3> {/* Topic added */}
            <p className="reviewer-name">by {name} <span className="review-date">({date})</span></p>
            <div className="star-rating">{renderStars(rating)}</div>
            {image && <img src={image} alt="User submitted" className="review-img" />}
            <p className="review-text">{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
