import {  FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/MovieCard.css";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!movie?.id) return; // ✅ safety check
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>

      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title || "movie"}
        />
      </div>

      <div className="movie-details">
        <h3>{movie.title || "No Title"}</h3>

        <div className="movie-rating">
          <FaStar className="star-icon" />
          <span>
            {movie.vote_average
              ? movie.vote_average.toFixed(1)
              : "N/A"}
          </span>
        </div>

       
      </div>
    </div>
  );
}

export default MovieCard;