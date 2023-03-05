import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = () => {
  return (
    <div id="navbar">
      <div>
        <Link to="/">Home</Link>
      </div>

      <div>
        <Link to="/students">Students</Link>
      </div>
      <div>
        <Link to="/campuses">Campuses</Link>
      </div>
    </div>
  );
};

export default NavBar;
