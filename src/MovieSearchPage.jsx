import React, { useState } from 'react';


const config = require('./config.json');
// You'll need to get your own API key from http://www.omdbapi.com/
const OMDB_API_KEY = config.OMDB_API_KEY; 
// You'll need to get your own API key from https://www.themoviedb.org/
const TMDB_API_KEY = config.TMDB_API_KEY; 

function MovieSearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStreamingProviders = async (imdbId) => {
    try {
      const searchResponse = await fetch(
        `https://api.themoviedb.org/3/find/${imdbId}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
      );
      const searchData = await searchResponse.json();
      
      if (searchData.movie_results && searchData.movie_results.length > 0) {
        const tmdbId = searchData.movie_results[0].id;
        const providersResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${tmdbId}/watch/providers?api_key=${TMDB_API_KEY}`
        );
        const providersData = await providersResponse.json();
        
        const usProviders = providersData.results?.US || {};
        return usProviders;
      }
      return {};
    } catch (err) {
      console.error("Error fetching streaming providers:", err);
      return {};
    }
  };

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setMovies([]);
    setMovieDetails({});
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
        
        const details = {};
        for (const movie of data.Search) {
          details[movie.imdbID] = {
            loading: true,
            providers: null
          };
        }
        setMovieDetails(details);
        
        // Fetch providers in parallel
        await Promise.all(data.Search.map(async (movie) => {
          const providers = await fetchStreamingProviders(movie.imdbID);
          setMovieDetails(prev => ({
            ...prev,
            [movie.imdbID]: {
              loading: false,
              providers
            }
          }));
        }));
      } else {
        setError(data.Error || 'No results found.');
      }
    } catch (err) {
      setError('Failed to fetch data.');
    }
    setLoading(false);
  };

  const renderProviders = (movieId) => {
    const details = movieDetails[movieId];
    
    if (!details) return null;
    if (details.loading) return <p className="no-providers">Loading providers...</p>;
    if (!details.providers || (!details.providers.flatrate && !details.providers.rent && !details.providers.buy)) {
      return <p className="no-providers">No streaming info available</p>;
    }
    
    return (
      <div className="providers-section">
        <h4 className="providers-title">Where to Watch:</h4>
        {details.providers.flatrate && (
          <div className="provider-category">
            <p className="provider-label">Streaming:</p>
            <div className="providers-list">
              {details.providers.flatrate.slice(0, 5).map(provider => (
                <div key={provider.provider_id}>
                  <img 
                    className="provider-logo"
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} 
                    alt={provider.provider_name}
                    title={provider.provider_name}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {details.providers.rent && (
          <div className="provider-category">
            <p className="provider-label">Rent:</p>
            <div className="providers-list">
              {details.providers.rent.slice(0, 5).map(provider => (
                <div key={provider.provider_id}>
                  <img 
                    className="provider-logo"
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} 
                    alt={provider.provider_name}
                    title={provider.provider_name}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {details.providers.buy && (
          <div className="provider-category">
            <p className="provider-label">Buy:</p>
            <div className="providers-list">
              {details.providers.buy.slice(0, 5).map(provider => (
                <div key={provider.provider_id}>
                  <img 
                    className="provider-logo"
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} 
                    alt={provider.provider_name}
                    title={provider.provider_name}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="header">
        <h1>FilmFinder</h1>
        <p>Find where to watch your favorite movies and shows</p>
      </div>
      
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for a movie or TV show..."
            className="search-input"
            onKeyPress={e => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch} 
            className="search-button"
          >
            Search
          </button>
        </div>
      </div>
      
      {loading && <div className="loading">Searching for movies...</div>}
      {error && <div className="error">{error}</div>}
      
      {movies.length > 0 && (
        <div className="movie-grid">
          {movies.map(movie => (
            <div key={movie.imdbID} className="movie-card">
              <img 
                className="movie-poster"
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'} 
                alt={movie.Title} 
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-year">{movie.Year}</p>
                <span className="movie-type">{movie.Type.replace(/^./, char => char.toUpperCase())}</span>
                <div>
                  <a 
                    className="imdb-link"
                    href={`https://www.imdb.com/title/${movie.imdbID}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View on IMDb
                  </a>
                </div>
                {renderProviders(movie.imdbID)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieSearchPage;