import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Team from './components/Homepage/Team';
import Events from './components/Homepage/Events';
import Footer from './components/Homepage/Footer';
import Header from './components/Homepage/Header';
import Index from './components/Homepage/Hero';
import './App.css';
import SignupPage from './components/Login/SignupPage';
import LoginPage from './components/Login/LoginPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={
                    <div>
                        <Header />
                        <Index />
                        <Team />
                        <Events />
                        <Footer />
                    </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;
