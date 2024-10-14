import React from 'react';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import './HomePage.css'; // Ensure this import is at the top of your HomePage.js file

const HomePage = ({ onLogout }) => (
  <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/30" />
    <div className="absolute inset-auto w-[60rem] h-[60rem] bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
    <div className="absolute inset-auto w-[50rem] h-[50rem] bg-blue-400/20 rounded-full blur-2xl animate-pulse" />
    <div className="absolute inset-auto w-[40rem] h-[40rem] bg-blue-300/10 rounded-full blur-xl animate-pulse" />

    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center relative z-10">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to IEEE CS Society</h1>
      <p className="mb-8 text-gray-600 text-lg">You've successfully logged in!</p>

      <img 
        src="/IEEE1.png"
        alt="Welcome Illustration"
        className="mb-6 mx-auto w-32 h-auto"
      />

      <motion.button
        whileHover={{ scale: 1.05 }} // Increase scale on hover
        whileTap={{ scale: 0.95 }} // Decrease scale on tap
        onClick={onLogout} // Call the logout function passed from parent
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center mx-auto transition duration-200 ease-in-out"
      >
        <LogOut className="mr-2" size={18} />
        Log out
      </motion.button>
    </div>
  </div>
);

export default HomePage;
