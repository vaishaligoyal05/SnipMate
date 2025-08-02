import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { FiHome, FiUser, FiEdit, FiLogOut, FiPlusCircle, FiLogIn } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUser(userInfo ? JSON.parse(userInfo) : null);
    setAuthLoaded(true);
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("userInfo");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => {
          navigate("/");
          closeMenu();
        }}
      >
        SnipMate
        <div className="logo-underline" />
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {authLoaded && (
        <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
          {user ? (
            <>
              {/* <li>
                <Link to="/" onClick={closeMenu}>
                  <FiHome /> Home
                </Link>
              </li> */}
              <li>
                <Link to="/dashboard" onClick={closeMenu}>
                  <FiUser /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/snippets" onClick={closeMenu}>
                  <FiPlusCircle /> New Snippet
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="logout-btn"
                >
                  <FiLogOut /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={closeMenu}>
                  <FiLogIn /> Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={closeMenu}>
                  <FiUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
