import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "./authService";
import "../styles/Navbar.css";

function Navbar() {
  const user = authService.getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? "navbar-light bg-white shadow-sm" : "navbar-dark"
      }`}
      style={{
        background: scrolled
          ? "white"
          : "linear-gradient(90deg, #001F3F, #004080)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <div className="container">
        <Link
          className={`navbar-brand fw-bold ${
            scrolled ? "text-primary" : "text-white"
          }`}
          to="/"
          style={{ fontSize: "1.5rem" }}
        >
          <i className="bi bi-shield-lock me-2"></i>
          UserPortal
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            className={`navbar-toggler-icon ${scrolled ? "" : "text-white"}`}
          ></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {user ? (
              <>
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle ${
                      scrolled ? "text-dark" : "text-white"
                    }`}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    {user.name || "Profile"}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end animate slideIn">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="bi bi-person me-2"></i> View Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/edit-profile">
                        <i className="bi bi-gear me-2"></i> Edit Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <Link
                    className={`nav-link btn login-btn ${isActive("/login")}`}
                    to="/login"
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link btn register-btn ${isActive(
                      "/register"
                    )}`}
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
