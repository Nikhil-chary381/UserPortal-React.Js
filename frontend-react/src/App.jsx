import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home"; // ✅ Import new Home page

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
