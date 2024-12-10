import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaShoppingCart, FaStore, FaSignInAlt, FaUserPlus, FaUserCircle, FaHeart,FaShoppingBag } from 'react-icons/fa'; // Import the icons from react-icons
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">KIDDO KORNER</div>
      <nav className="nav">
        <a href="#about">
          <FaHome /> {/* Icon for home */}
        </a>
        <Link to="/ProductList">
          <FaStore /> {/* Icon for Shop */}
        </Link>
        <Link to="/Cart">
          <FaShoppingCart /> {/* Icon for Cart */}
        </Link>
        <Link to="/ShortList">
          <FaHeart /> {/* Icon for Cart */}
        </Link>
        
        <Link to="/login">
          <FaSignInAlt /> {/* Icon for Login */}
        </Link>
        
        <Link to="/register">
          <FaUserPlus /> {/* Icon for Register */}
        </Link>
        
        <Link to="/order">
          <FaShoppingBag /> {/* Icon for User Profile */}
        </Link>

        {/* Profile Icon - Clickable link */}
        <Link to="/profile" className="profile-icon">
          <FaUserCircle /> {/* Icon for User Profile */}
        </Link>

        
      </nav>
    </header>
  );
}

export default Header;

