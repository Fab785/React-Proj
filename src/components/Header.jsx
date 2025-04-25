import React from 'react';

function Header({ query, setQuery }) {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="header__description">
            <h1>Browse all movies</h1>
            <div className="header__src">
              <div className="search-wrapper">
                <input
                  type="text"
                  className="header__src--input"
                  placeholder="Search Movie"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button className="search-btn">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
