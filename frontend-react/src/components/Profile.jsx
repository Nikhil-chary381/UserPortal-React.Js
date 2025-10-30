// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../components/authService";
import "../styles/Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const current = authService.getCurrentUser();
    if (!current) {
      navigate("/login");
    } else {
      setUser(current);
    }
  }, [navigate]);

  const handleEdit = () => {
    navigate("/edit");
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  if (!user) return null; // Wait until user is loaded

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "80vh",
        background: "linear-gradient(135deg, #001f3f, #004080)",
        color: "white",
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4" style={{ color: "#003366" }}>
          Profile Information
        </h3>

        <div className="mb-3">
          <strong>Name:</strong>
          <p className="mb-0">{user.name}</p>
        </div>

        <div className="mb-3">
          <strong>Email:</strong>
          <p className="mb-0">{user.email}</p>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-primary w-50 me-2"
            onClick={handleEdit}
            style={{ backgroundColor: "#003366", borderColor: "#003366" }}
          >
            <i className="bi bi-pencil-square me-1"></i> Edit Profile
          </button>

          <button
            className="btn btn-danger w-50 ms-2"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
