import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { motion } from 'framer-motion';
import { Sun, Moon, Mail, Lock, Phone, UserPlus, EyeOff, Eye } from 'lucide-react';

const SignupPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: '',
        srmMailId: '',
        registrationNumber: '',
        ieeeMembershipNumber: '',
    });
    const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
=======
    const [isLoading, setIsLoading] = useState(false); // For loading state
    const [errorMessage, setErrorMessage] = useState(''); // For displaying errors
    const [successMessage, setSuccessMessage] = useState(''); // For success messages

    const navigate = useNavigate(); // Get the navigate function from react-router-dom
>>>>>>> 2992d069dd27aeb991f55be3a1db6c199b192576

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        // Prepare data for API request
        const requestData = {
            email: formData.email,
            password: formData.password,
            phone_number: formData.phoneNumber,
            srm_id: formData.srmMailId,
            roll_no: formData.registrationNumber,
            ieee_membership: formData.ieeeMembershipNumber || null, // Handle optional IEEE membership
        };

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccessMessage('Account created successfully! Redirecting to login page...');
                // Clear form
                setFormData({
                    email: '',
                    password: '',
                    phoneNumber: '',
                    srmMailId: '',
                    registrationNumber: '',
                    ieeeMembershipNumber: '',
                });

                // Redirect to /login after 4 seconds
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                }, 4000); // 4 seconds
            } else {
                setErrorMessage(result.detail || 'Signup failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage('Error connecting to the server. Please try again later.');
        }

        setIsLoading(false);
    };

    const backgroundVariants = {
        light: {
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        },
        dark: {
            background: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
        },
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative"
            animate={darkMode ? 'dark' : 'light'}
            variants={backgroundVariants}
            transition={{ duration: 1 }}
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${darkMode ? 'bg-purple-500' : 'bg-pink-400'} opacity-30`}
                        style={{
                            width: Math.random() * 200 + 60,
                            height: Math.random() * 200 + 60,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.4, 1],
                            rotate: [0, 360, 720],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Main container */}
            <motion.div
                className={`max-w-lg w-full space-y-8 p-10 ${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-3xl shadow-2xl relative z-10 backdrop-filter backdrop-blur-md bg-opacity-95`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Logo and title */}
                <motion.div className="text-center" variants={itemVariants}>
                    <motion.div
                        className={`mx-auto h-24 w-24 rounded-full ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'} flex items-center justify-center shadow-lg transform hover:rotate-12 transition-all duration-500`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <UserPlus className="h-14 w-14 text-white" />
                    </motion.div>
                    <h2 className={`mt-6 text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Create an Account
                    </h2>
                    <p className={`mt-2 text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Join us and start your journey
                    </p>
                </motion.div>

                {/* Signup form */}
                <motion.form className="mt-8 space-y-6" onSubmit={handleSubmit} variants={itemVariants}>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className={`appearance-none rounded-full relative block w-full px-6 py-4 pl-12 transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-600'
                                            : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                                    } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-md`}
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="sr-only">
                                Phone Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    className={`appearance-none rounded-full relative block w-full px-6 py-4 pl-12 transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-600'
                                            : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                                    } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-md`}
                                    placeholder="Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    className={`appearance-none rounded-full relative block w-full px-6 py-4 pl-12 transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-600'
                                            : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                                    } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-md`}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-500'} focus:outline-none`}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="srmMailId" className="sr-only">
                                SRM Mail ID
                            </label>
                            <div className="relative">
                                <input
                                    id="srmMailId"
                                    name="srmMailId"
                                    type="email"
                                    required
                                    className={`appearance-none rounded-full relative block w-full px-6 py-4 transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-600'
                                            : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                                    } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-md`}
                                    placeholder="SRM Mail ID"
                                    value={formData.srmMailId}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="registrationNumber" className="sr-only">
                                Registration Number
                            </label>
                            <div className="relative">
                                <input
                                    id="registrationNumber"
                                    name="registrationNumber"
                                    type="text"
                                    required
                                    className={`appearance-none rounded-full relative block w-full px-6 py-4 transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-600'
                                            : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                                    } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-md`}
                                    placeholder="Registration Number"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="ieeeMembershipNumber" className="sr-only">
                                IEEE Membership Number
                            </label>
                            <div className="relative">
                                <input
                                    id="ieeeMembershipNumber"
                                    name="ieeeMembershipNumber"
                                    type="text"
                                    required
                                    className={`appearance-none rounded-full relative block w-full px-6 py-4 transition-all duration-300 ${
                                        darkMode
                                            ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-600'
                                            : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                                    } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm shadow-md`}
                                    placeholder="IEEE Membership Number"
                                    value={formData.ieeeMembershipNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Success and error messages */}
                    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                    <div>
                        <motion.button
                            type="submit"
                            className={`group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-full text-white transition-all duration-300 ${
                                darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-xl transform hover:scale-105 hover:-rotate-1`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing up...' : 'Sign up'}
                        </motion.button>
                    </div>
                </motion.form>

                {/* Dark mode toggle */}
                <motion.div className="absolute top-4 right-4" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <button
                        onClick={toggleDarkMode}
                        className={`p-3 rounded-full transition-colors duration-300 ${
                            darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg`}
                    >
                        {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default SignupPage;
