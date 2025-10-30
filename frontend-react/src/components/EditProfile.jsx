
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../components/authService";
import "../styles/EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const u = authService.getCurrentUser();
    if (!u) {
      navigate("/login");
      return;
    }
    setForm(u);
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required!");
      return;
    }
    try {
      authService.updateUser(form);
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "90vh",
        background: "linear-gradient(135deg, #001f3f, #004080)",
      }}
    >
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-3" style={{ color: "#003366" }}>
          Edit Profile
        </h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={form.name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={form.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter new password"
                value={form.password || ""}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            style={{ backgroundColor: "#003366", borderColor: "#003366" }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
