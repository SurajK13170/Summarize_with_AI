import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Nav.css';

function Nav() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-links">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-links">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/logout" className="nav-links" onClick={handleLogout}>
              <button style={{ backgroundColor: 'Black', border: 'none', cursor: 'pointer', width: '100px', height: '40px', color:'white', borderRadius: '10px' }}>Logout</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
