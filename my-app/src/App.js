// App.js
import React from "react";
import "./styles.css"; // Importing styles
import Register from "./register"; // Importing the Register component
import Home from "./home/home";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Importing routing components

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <nav>
          <Link to="/home">Home</Link> | {/* Link to the main game page */}
          <Link to="/register">Register</Link>{" "}
          {/* Link to the registration page */}
        </nav>

        <Routes>
          {/* Home route */}
          <Route path="/home" element={<Home />} />

          {/* Registration page */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App; // Exporting the App component
