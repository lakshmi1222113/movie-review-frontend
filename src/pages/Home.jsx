import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

import {
  getTrendingMovies,
  getPopularMovies,
  searchMovies,
} from "../services/movieService";

import "../styles/Home.css";

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [loading, setLoading] = useState(true);

  // 🔥 LOAD TRENDING + POPULAR
  useEffect(() => {
    const loadData = async () => {
      try {
        const trending = await getTrendingMovies();
        const popular = await getPopularMovies();

        // ✅ NOW BOTH ARE DIRECT ARRAYS
        setTrendingMovies(trending || []);
        setPopularMovies(popular || []);

      } catch (error) {
        console.log("LOAD ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // 🔎 AUTO SEARCH
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.trim()) {
        try {
          const res = await searchMovies(query);

          setSearchResults(res || []);
          setIsSearching(true);
        } catch (err) {
          console.log("SEARCH ERROR:", err);
        }
      } else {
        setIsSearching(false);
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="home">
      <Navbar />

      <div className="home-content">

        <SearchBar query={query} setQuery={setQuery} />

        {/* SEARCH RESULTS */}
        {isSearching && searchResults.length > 0 && (
          <section className="movie-section">
            <h2>🔎 Search Results</h2>

            <div className="movie-grid">
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <>
            {/* TRENDING */}
            <section className="movie-section">
              <h2>🔥 Trending Movies</h2>
              <div className="movie-grid">
                {trendingMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>

            {/* POPULAR */}
            <section className="movie-section">
              <h2>🎬 Popular Movies</h2>
              <div className="movie-grid">
                {popularMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          </>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default Home;