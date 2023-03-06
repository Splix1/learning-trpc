import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <div className='navbar-menu'>

        <Link className='navbar-link' to="/">Home</Link>

        <Link className='navbar-link' to="/students">Students</Link>

        <Link className='navbar-link' to="/campuses">Campuses</Link>

      </div>
    </div>
  );
};

export default NavBar;
