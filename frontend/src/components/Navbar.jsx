import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

/**
 * Navbar Component
 * Shows different options based on authentication status
 */
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ACM Catalog
        </Link>
        <Link to="/" className="navbar-link">
          Sever
        </Link>
        <Link to="/" className="navbar-link">
          Book & Supplies
        </Link>
        <Link to="/" className="navbar-link">
          Hardware Rental
        </Link>
        <Link to="/" className="navbar-link">
          Workstation booking 
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">
                Welcome, {user?.name || user?.email}!
              </span>
              <button onClick={handleLogout} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/signup" className="navbar-button">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
