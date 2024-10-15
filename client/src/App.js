import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import SignupPage from './components/Login/SignupPage';
import LoginPage from './components/Login/LoginPage';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <Router>
            <div className={`App ${darkMode ? 'dark' : ''}`}>
                <motion.button
                    onClick={toggleDarkMode}
                    className={`fixed top-4 right-4 p-2 rounded-full ${
                        darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-yellow-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {darkMode ? '☀️' : '🌙'}
                </motion.button>

                <Routes>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<div className="container mx-auto p-4">
                        <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
                        <p className="text-xl">Please sign up or log in to get started.</p>
                    </div>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;