import React, { useState, useEffect } from "react";
import "./Reviews.css";
import { FaStar, FaRegStar, FaStarHalfAlt, FaCloudUploadAlt } from "react-icons/fa";

const Reviews = () => {
  // State for reviews and form data (keeping your original structure)
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    topic: "",
    review: "",
    artisanRating: 0,
    productRating: 0,
    overallRating: 0,
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reviews");
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  // Your original handlers (unchanged)
  const handleInputChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewReview({ ...newReview, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleStarClick = (category, rating) => {
    setNewReview({ ...newReview, [category]: rating });
  };

  // Modified submit handler to connect to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.review) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newReview.name,
          topic: newReview.topic,
          review: newReview.review,
          artisanRating: newReview.artisanRating,
          productRating: newReview.productRating,
          overallRating: newReview.overallRating,
          image: newReview.image,
          date: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })
        }),
      });

      if (response.ok) {
        const createdReview = await response.json();
        setReviews([createdReview, ...reviews]);
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
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Your original star rendering function (unchanged)
  const renderStars = (rating, category) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} onClick={() => handleStarClick(category, index + 1)}>
        {index + 1 <= rating ? <FaStar className="star full" /> : <FaRegStar className="star empty" />}
      </span>
    ));
  };

  // Your exact original JSX structure
  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Customer Reviews & Ratings</h2>

      {/* Review Submission Form - completely unchanged */}
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

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Reviews Display - completely unchanged except for backend data */}
      <div className="reviews-section">
        {reviews.map((review) => (
          <div key={review._id} className="review-card">
            <h3 className="review-topic">{review.topic}</h3>
            <p className="reviewer-name">by {review.name} <span className="review-date">({review.date})</span></p>
            <div className="star-rating">
              {[...Array(5)].map((_, i) => (
                i + 1 <= review.overallRating 
                  ? <FaStar key={i} className="star full" /> 
                  : <FaRegStar key={i} className="star empty" />
              ))}
            </div>
            {review.image && <img src={review.image} alt="User submitted" className="review-img" />}
            <p className="review-text">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;