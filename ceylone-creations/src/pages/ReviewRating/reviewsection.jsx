import { useState,useEffect } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./reviewsection.css";

export default function ReviewSection({ productId }) {
console.log("productId received:", productId);   
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, title: "", content: "" });
  const [averageRating, setAverageRating] = useState(0);
  const [ratingsBreakdown, setRatingsBreakdown] = useState([0, 0, 0, 0, 0]);
  const [ username, setUsername] = useState("");  
  
  // Fetch existing reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/review/products/${productId}/review`);
        const fetchedReviews = res.data.reviews || [];
        setReviews(fetchedReviews);
        updateRatingStats(fetchedReviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, [productId]);


  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    if (storedRole === "Buyer" && storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

// Calculate average and breakdown
  const updateRatingStats = (allReviews) => {
    if (allReviews.length === 0) return;

    const total = allReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = total / allReviews.length;
    setAverageRating(avg.toFixed(1));

    const breakdown = [0, 0, 0, 0, 0];
    allReviews.forEach((r) => {
      breakdown[5 - r.rating] += 1;
    });

    const totalReviews = allReviews.length;
    const percentages = breakdown.map((count) => ((count / totalReviews) * 100).toFixed(0));
    setRatingsBreakdown(percentages);
  };

  const handleSubmit = async () => {
    if (!newReview.title || !newReview.content) {
      alert("Please complete the review.");
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:5000/api/review/products/${productId}/review`, {
        rating: newReview.rating,
        user: username,
        reviewtitle: newReview.title,
        comment: newReview.content,
      });
  
      const updated = [...reviews, response.data.review];
      setReviews(updated);
      updateRatingStats(updated);
      setNewReview({ rating: 5, title: "", content: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review.");
    }
  }
  return (
    <div className="review-section">
      <h2 className="title">Customers Feedback</h2>

      <div className="rating-summary">
        <div className="rating-value">{averageRating}</div>
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} fill={i < Math.round(averageRating) ? "currentColor" : "none"} stroke="currentColor" size={20} />
          ))}
        </div>
      </div>
      <p className="rating-text">Product Rating</p>

      <div className="rating-breakdown">
        {ratingsBreakdown.map((percentage, index) => (
          <div key={index} className="rating-bar">
            <span className="rating-label">{5 - index} ★</span>
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
            </div>
            <span className="rating-percentage">{percentage}%</span>
          </div>
        ))}
      </div>

      <h3 className="Reviews-title-one">Reviews</h3>
      <div className="review-list">
        {reviews.slice(0.2).map((review, index) => (
          <div key={index} className="review-card">
            <h4 className="review-author">{review.user}</h4>
            <div className="stars">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} fill="currentColor" stroke="none" size={16} />
              ))}
            </div>
            <p className="review-title">{review.reviewtitle}</p>
            <p className="review-text">{review.comment}</p>
          </div>
        ))}
      </div>

      <Link to={`/reviews/${productId}`} className="view-all-reviews">
        View All Reviews
      </Link>



      <h3 className="Reviews-title-second">Write a Review</h3>
      
      <div className="review-form">
        <label className="form-label">What is it like to Product?</label>
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              fill={newReview.rating > i ? "currentColor" : "none"}
              stroke="currentColor"
              size={20}
              onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
              className="clickable-star"
            />
          ))}
        </div>

        <input
          type="text"
          placeholder="Review Title"
          className="input-field"
          value={newReview.title}
          onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
        />

        <textarea
          placeholder="Review Content"
          className="textarea-field"
          rows="3"
          value={newReview.content}
          onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
        ></textarea>

        <button className="submit-button-reviews" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
}
