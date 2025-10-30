import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "./authService";
import "../styles/Login.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      return setError("Please fill in all fields.");
    }

    try {
      authService.login(form.email, form.password);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "15px" }}>
        <div className="login-header text-center mb-4">
          <h3 className="fw-bold text-primary">Login Here</h3>
          <p className="text-muted">Please login to continue</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <div className="form-floating mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={handleChange}
              id="email"
            />
            <label htmlFor="email">Email</label>
          </div>

          {/* Password Input with Show/Hide */}
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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 py-2 rounded-3">
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-3">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary fw-semibold text-decoration-none">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
