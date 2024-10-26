import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

// ProtectedRoute component
const ProtectedRoute = ({ element, user }) => {
  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  const [user, setUser] = useState(null); // Initialize user state

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Here you might want to validate the token or fetch user details
      setUser(true); // Set user to true if token is valid
    } else {
      setUser(false); // No token means no user
    }
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute user={user} element={<Home />} />}
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
