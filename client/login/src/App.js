import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Homepage from './HomePage'; // Import your Homepage component
import RegisterPage from './RegistrationPage'; // Assuming you have a RegisterPage component

const App = () => {
  const handleLogin = () => {
    // Handle login logic (e.g., setting user state)
    console.log('User logged in');
  };

  const handleLogout = () => {
    // Handle logout logic (e.g., clearing user state)
    console.log('User logged out');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} /> {/* Login Page */}
        <Route path="/home" element={<Homepage onLogout={handleLogout} />} /> {/* Homepage */}
        <Route path="/register" element={<RegisterPage />} /> {/* Registration Page */}
      </Routes>
    </Router>
  );
};

export default App;
