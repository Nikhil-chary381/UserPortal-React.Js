import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "./authService";
import "../styles/Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Validate password strength
  const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      return setError("⚠️ Please fill in all fields.");
    }

    if (!isPasswordValid(form.password)) {
      return setError(
        "⚠️ Password must have at least 8 characters, one uppercase, one lowercase, and one number."
      );
    }

    try {
      authService.register(form);
      alert("✅ Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <div className="register-header text-center mb-4">
          <h3 className="fw-bold text-primary">Create Account</h3>
          <p className="text-muted">Join us by creating your account</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          {/* Full Name */}
          <div className="form-floating mb-3">
            <input
              name="name"
              className="form-control"
              placeholder="Enter name"
              onChange={handleChange}
              id="name"
            />
            <label htmlFor="name">Full Name</label>
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleChange}
              id="email"
            />
            <label htmlFor="email">Email Address</label>
          </div>

          {/* Password */}
          <div className="form-floating mb-3 position-relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
              id="password"
            />
            <label htmlFor="password">Password</label>

            <button
              type="button"
              className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none pe-3"
              onClick={() => setShowPassword(!showPassword)}
              style={{ color: "#0d6efd" }}
            >
              <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
            </button>
          </div>

          {/* Password Info */}
          <div className="text-muted small mb-3">
            Password must contain:
            <ul className="mb-1">
              <li>At least 8 characters</li>
              <li>One uppercase letter</li>
              <li>One lowercase letter</li>
              <li>One number</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 py-2 rounded-3">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold text-decoration-none">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
