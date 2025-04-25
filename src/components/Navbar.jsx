import React from 'react';
import logo from '../assets/whitelogo.39850b27.png';

const Navbar = ({ onHomeClick, onSearchClick }) => {
  return (
    <nav>
      <div className="row nav__row">
        <div className="nav__logo">
          <img className="nav__logo--img" src={logo} alt="Logo" />
        </div>
        <div className="nav__links">
          <button className="nav__link nav__link--button" onClick={onHomeClick}>
            Home
          </button>
          <button className="nav__link nav__link--button" onClick={onSearchClick}>
            Find your movie
          </button>
          <a href="/contact" className="nav__link nav__link--primary">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;






  