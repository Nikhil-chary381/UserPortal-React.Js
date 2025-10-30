
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./authService";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      // redirect if not logged in
      navigate("/login"); 
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  return (
    <div className="text-center mt-5">
      {user && (
        <>
          <h1 className="fw-bold">Welcome, {user.name} 👋</h1>
          <p className="text-muted">We’re glad to have you back!</p>
        </>
      )}
    </div>
  );
}

export default Home;
