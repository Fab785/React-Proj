import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import newLogo from './assets/undraw_home-cinema_jdm1.svg';
import noResultsImg from './assets/undraw_file-search_cbur.svg';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHome, setShowHome] = useState(true);

  const fetchMovies = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=410e5f98&s=${query}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') fetchMovies();
  };

  const handleHomeClick = () => {
    setQuery('');
    setMovies([]);
    setShowHome(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchClick = () => {
    setShowHome(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar onHomeClick={handleHomeClick} onSearchClick={handleSearchClick} />

      {showHome ? (
        <div className="home-wrapper">
          <div className="homepage">
            <img src={newLogo} alt="New Logo" className="home-logo" />
            <h1>Welcome to the Fast & Furious Universe</h1>
            <p>Click "Find your movie" to explore the franchise!</p>
          </div>
        </div>
      ) : (
        <>
          <header className="header">
            <div className="header__description">
              <h1>Browse the Fast & Furious Movies</h1>
              <div className="header__src">
                <input
                  type="text"
                  className="header__src--input"
                  placeholder="Search Movie"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="search-btn" onClick={fetchMovies}>
                  Search
                </button>
              </div>
            </div>
          </header>

          <section id="search">
            <div className="container">
              <h2>Search results:</h2>
              {loading ? (
                <div className="spinner" />
              ) : (
                <div id="results">
                  {movies.length > 0 ? (
                    movies.map((movie) => (
                      <div key={movie.imdbID} className="result-item">
                        <img
                          className="movie-poster"
                          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                          alt={movie.Title}
                        />
                        <h3>
                          {movie.Title} ({movie.Year})
                        </h3>
                        <Link to={`/movie/${movie.imdbID}`} className="imdb-link">
                          View Details
                        </Link>
                      </div>
                    ))
                  ) : (
                    query && (
                      <div className="no-results">
                        <img
                          src={noResultsImg}
                          alt="No results"
                          className="no-results__img"
                        />
                        <p>No results found for "{query}".</p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default App;
