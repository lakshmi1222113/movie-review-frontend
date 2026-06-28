import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getMovieDetails } from "../services/movieService";
import "../styles/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // 🎬 FETCH MOVIE DETAILS (FIXED)
  const fetchMovie = async () => {
    try {
      const res = await getMovieDetails(id);
      setMovie(res); // ✅ direct object
    } catch (err) {
      console.error("Movie fetch error:", err);
      setMovie(null);
    }
  };

  // ⭐ FETCH REVIEWS
  const fetchReviews = async () => {
    try {
     const res = await axios.get(
  `https://movie-review-backend-vlzn.onrender.com/reviews/movie/${id}`
);
      
      setReviews(res.data);
    } catch (err) {
      console.error("Review fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMovie();
    fetchReviews();
  }, [id]);

  const resetForm = () => {
    setReviewText("");
    setRating(5);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmitReview = async () => {
    if (!reviewText) return alert("Write something!");

    try {
      if (editingId) {
       await axios.put(
  `https://movie-review-backend-vlzn.onrender.com/reviews/${editingId}`,
  {
    comment: reviewText,
    rating,
  }
);
        
      } else {
        await axios.post("https://movie-review-backend-vlzn.onrender.com/reviews", {
          user: userId,
          tmdbId: Number(id),
          movieTitle: movie.title,
          posterPath: movie.poster_path,
          rating,
          comment: reviewText,
        });
      }

      window.dispatchEvent(new Event("review-updated"));

      resetForm();
      fetchReviews();
    } catch (err) {
      console.error("Review submit error:", err);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(
        `https://movie-review-backend-vlzn.onrender.com/reviews/${reviewId}`
      );
      window.dispatchEvent(new Event("review-updated"));
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setReviewText(review.comment);
    setRating(review.rating);
    setShowForm(true);
  };

  // ---------------- SAFE LOADING ----------------
  if (!movie) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="movie-details-page">

      {/* MOVIE SECTION */}
      <div className="movie-details-container">

        <div className="movie-image">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300"
            }
            alt={movie.title}
          />
        </div>

        <div className="movie-info">
          <h1>{movie.title}</h1>

          <div className="rating">
            ⭐ {movie.vote_average?.toFixed(1)}
          </div>

          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p className="overview">{movie.overview}</p>
        </div>
      </div>

      {/* REVIEW HEADER */}
      <div className="reviews-header">
        <h2>User Reviews</h2>

        <button
          className="review-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Write Review"}
        </button>
      </div>

      {/* REVIEW FORM */}
      {showForm && (
        <div className="review-form">

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
          />

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="5">5 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="1">1 ⭐</option>
          </select>

          <button className="submit-btn" onClick={handleSubmitReview}>
            {editingId ? "Update Review" : "Submit Review"}
          </button>
        </div>
      )}

      {/* REVIEWS */}
      <div className="reviews-list">

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first!</p>
        ) : (
          reviews.map((rev) => (
            <div className="review-card" key={rev._id}>

              <div className="review-top">
                <h4>
                  {rev.user
                    ? `${rev.user.firstName} ${rev.user.lastName}`
                    : "Anonymous"}
                </h4>

                <span>⭐ {rev.rating}</span>
              </div>

              <p>{rev.comment}</p>

              {rev.user?._id === userId && (
                <div className="review-actions">

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(rev)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(rev._id)}
                  >
                    Delete
                  </button>

                </div>
              )}

            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default MovieDetails;