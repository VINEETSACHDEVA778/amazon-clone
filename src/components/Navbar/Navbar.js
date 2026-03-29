import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar({ cartCount, searchTerm, setSearchTerm }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">

      <div className="navbar__logo">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon"
            className="navbar__logoImage"
          />
        </Link>
      </div>

      <div className="navbar__search">
        <select className="navbar__searchCategory">
          <option>All</option>
          <option>Electronics</option>
          <option>Books</option>
          <option>Clothing</option>
          <option>Home</option>
        </select>
        <input
            type="text"
            className="navbar__searchInput"
            placeholder="Search Amazon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="navbar__searchButton">🔍</button>
      </div>

      <div className="navbar__right">

        {user ? (
          <>
            <div className="navbar__option">
              <span className="navbar__optionLineOne">Hello, {user.name}</span>
              <span className="navbar__optionLineTwo">Account</span>
            </div>
            <div className="navbar__option" onClick={handleLogout}
              style={{ cursor: 'pointer' }}>
              <span className="navbar__optionLineOne">Sign out</span>
              <span className="navbar__optionLineTwo">→ Logout</span>
            </div>
          </>
        ) : (
          <Link to="/auth" style={{ textDecoration: 'none' }}>
            <div className="navbar__option">
              <span className="navbar__optionLineOne">Hello, sign in</span>
              <span className="navbar__optionLineTwo">Account & Lists</span>
            </div>
          </Link>
        )}

        <div className="navbar__option">
          <span className="navbar__optionLineOne">Returns</span>
          <span className="navbar__optionLineTwo">& Orders</span>
        </div>

        <Link to="/cart" className="navbar__optionCart">
          <span className="navbar__cartCount">{cartCount || 0}</span>
          <span className="navbar__optionLineTwo">Cart</span>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;