import React, { useEffect, useState } from 'react';

const searchResultsData = [
  {
    Title: 'The Fast and the Furious',
    Year: '2001',
    imdbID: 'tt0232500',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZGRiMDE1NTMtMThmZS00YjE4LWI1ODQtNjRkZGZlOTg2MGE1XkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'Fast & Furious 6',
    Year: '2013',
    imdbID: 'tt1905041',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX300.jpg',
  },
  {
    Title: 'Fast Five',
    Year: '2011',
    imdbID: 'tt1596343',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTUxNTk5MTE0OF5BMl5BanBnXkFtZTcwMjA2NzY3NA@@._V1_SX300.jpg',
  },
  {
    Title: 'Fast & Furious',
    Year: '2009',
    imdbID: 'tt1013752',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BM2Y1YzhkNzUtMzhmZC00OTFkLWJjZDktMWYzZmQ0Y2Y5ODcwXkEyXkFqcGc@._V1_SX300.jpg',
  },
  {
    Title: 'The Fast and the Furious: Tokyo Drift',
    Year: '2006',
    imdbID: 'tt0463985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTQ2NTMxODEyNV5BMl5BanBnXkFtZTcwMDgxMjA0MQ@@._V1_SX300.jpg',
  },
  {
    Title: '2 Fast 2 Furious',
    Year: '2003',
    imdbID: 'tt0322259',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTQzYzEwNWMtOTAwYy00YWYwLWE1NTEtZTkxOGQxZTM0M2VhXkEyXkFqcGc@._V1_SX300.jpg',
  },
];

export default function SearchSection() {
  const [query, setQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('asc');
  const [filteredResults, setFilteredResults] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const uniqueYears = Array.from(new Set(searchResultsData.map(movie => movie.Year)));
    setYears(uniqueYears.sort());
  }, []);

  useEffect(() => {
    searchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, yearFilter, sortFilter]);

  const searchMovies = () => {
    setLoading(true);

    setTimeout(() => {
      let results = searchResultsData.filter(
        movie =>
          movie.Title.toLowerCase().includes(query.toLowerCase()) &&
          (yearFilter ? movie.Year === yearFilter : true)
      );

      if (sortFilter === 'asc') {
        results.sort((a, b) => a.Title.localeCompare(b.Title));
      } else {
        results.sort((a, b) => b.Title.localeCompare(a.Title));
      }

      setFilteredResults(results);
      setLoading(false);
    }, 500);
  };

  return (
    <section id="search">
      <div className="container">
        <h2>Search results:</h2>

        <div className="filters">
          <label htmlFor="year-filter">Filter by Year:</label>
          <select id="year-filter" value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <label htmlFor="sort-filter">Sort Alphabetically:</label>
          <select id="sort-filter" value={sortFilter} onChange={e => setSortFilter(e.target.value)}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>

        {loading ? (
          <div className="spinner" id="loading-spinner"></div>
        ) : (
          <div id="results">
            {filteredResults.length > 0 ? (
              filteredResults.map(movie => (
                <div className="result-item" key={movie.imdbID}>
                  <img className="movie-poster" src={movie.Poster} alt={movie.Title} />
                  <h3>
                    {movie.Title} ({movie.Year})
                  </h3>
                  <a
                    href={`https://www.imdb.com/title/${movie.imdbID}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="imdb-link"
                  >
                    View on IMDb
                  </a>
                </div>
              ))
            ) : (
              <p>No results found for "{query}".</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}