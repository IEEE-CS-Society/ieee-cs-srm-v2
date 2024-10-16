import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import SignupPage from './components/Login/SignupPage';
import LoginPage from './components/Login/LoginPage';

// Import components from the offer folder
import BrandingCard from './components/Offer/BrandingCard';
import WebDevelopmentCard from './components/Offer/WebDevCard';
import DigitalMarketingCard from './components/Offer/DigitalMarketingCard';
import MobileAppCard from './components/Offer/MobileAppCard';
import SeoCard from './components/Offer/SeoCard';
import UserTestingCard from './components/Offer/UserTestingCard';
import Testimonials from './components/Offer/Testimonials';

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
                    <Route path="*" element={
                        <div>
                            <div className="bg-custom-black text-white py-16 px-8 min-h-screen">
                                <div className="container mx-auto max-w-screen-xl">
                                    <h2 className="text-4xl mb-8 text-center" style={{ fontFamily: 'Roboto', fontSize: '40px', fontWeight: 'bold', color: '#FFFFFF' }}>
                                        We Offer
                                    </h2>
                                    <p className="text-center mb-12" style={{ fontFamily: 'Roboto', fontSize: '16px', color: '#9E9E9E' }}>
                                        Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta
                                        feugiat
                                        <br /> scelerisque in elit. Morbi rhoncus, tellus, eros consequat magna
                                        semper orci a
                                        <br /> tincidunt.
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <BrandingCard />
                                        <WebDevelopmentCard />
                                        <DigitalMarketingCard />
                                        <MobileAppCard />
                                        <SeoCard />
                                        <UserTestingCard />
                                    </div>
                                </div>
                            </div>

                            <Testimonials />
                        </div>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;