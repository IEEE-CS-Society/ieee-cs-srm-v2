import React, { useState } from 'react';
import { Lock, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LoginPage.css'; // Ensure this matches your CSS file

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted');
    onLogin();

    // Redirect to Homepage after login
    navigate('/home'); // Update this path to match your actual homepage route
  };

  const handleRegister = () => {
    console.log('Redirecting to registration page');
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-light-gray">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/30" />

      {/* Flash effect */}
      <div className="absolute inset-auto w-[60rem] h-[60rem] bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute inset-auto w-[50rem] h-[50rem] bg-blue-400/20 rounded-full blur-2xl animate-pulse" />
      <div className="absolute inset-auto w-[40rem] h-[40rem] bg-blue-300/10 rounded-full blur-xl animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-form" // Using CSS class from your styles
      >
        <div className="logo-container mb-6 flex justify-center">
          <img
            src="/IEEE1.png"
            alt="IEEE Logo"
            className="h-16 w-auto"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2 tracking-wide" htmlFor="username">
              Username
            </label>
            <input
              className="login-input" // Using CSS class for input styling
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2 tracking-wide" htmlFor="password">
              Password
            </label>
            <input
              className="login-input" // Using CSS class for input styling
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="login-button" // Using CSS class for button styling
            type="submit"
          >
            <Lock className="mr-2" size={18} />
            Access Account
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2 text-base font-medium tracking-wider">Don't have an account?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="signup-button" // Updated CSS class for Sign Up button
            onClick={handleRegister}
          >
            <UserPlus className="mr-2" size={18} />
            Sign Up
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
