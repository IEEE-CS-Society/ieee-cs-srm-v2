import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Homepage from './HomePage'; // Import your Homepage component
import RegisterPage from './RegistrationPage'; // Assuming you have a RegisterPage component

const App = () => {
  const handleLogin = () => {
    // Handle login logic (e.g., setting user state)
    console.log('User logged in');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} /> {/* Login Page */}
        <Route path="/home" element={<Homepage />} /> {/* Homepage */}
        <Route path="/register" element={<RegisterPage />} /> {/* Registration Page */}
      </Routes>
    </Router>
  );
};

export default App;
