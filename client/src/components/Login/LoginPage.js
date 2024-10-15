import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/IEEE-CS_LogoTM-white.png';
import { Sun, Moon, Mail, Lock,Fingerprint, EyeOff, Eye} from 'lucide-react';

const LoginPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginMethod, setLoginMethod] = useState('email');

    const toggleDarkMode = () => setDarkMode(!darkMode);

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
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${darkMode ? 'bg-purple-500' : 'bg-pink-400'} opacity-20`}
                        style={{
                            width: Math.random() * 250 + 50,
                            height: Math.random() * 250 + 50,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 360, 720],
                        }}
                        transition={{
                            duration: Math.random() * 12 + 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* Main container */}
            <motion.div
                className={`max-w-md w-full space-y-8 p-10 ${
                    darkMode ? 'bg-gray-900' : 'bg-white'
                } rounded-3xl shadow-2xl relative z-10 backdrop-filter backdrop-blur-md bg-opacity-95`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Logo and title */}
                <motion.div className="text-center" variants={itemVariants}>
                    <motion.div
                        className={`mx-auto h-20 w-20 rounded-full ${
                            darkMode ? 'bg-indigo-500' : 'bg-indigo-600'
                        } flex items-center justify-center shadow-lg`}
                        whileHover={{scale: 1.15}}
                        whileTap={{scale: 0.95}}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-12 w-12 object-contain"
                        />
                    </motion.div>

                    <h2 className={`mt-6 text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Welcome Back
                    </h2>
                    <p className={`mt-2 text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Sign in to continue your journey
                    </p>
                </motion.div>

                {/* Login method toggle */}
                <motion.div className="flex justify-center space-x-4 mt-8" variants={itemVariants}>
                    <button
                        onClick={() => setLoginMethod('email')}
                        className={`p-3 rounded-full transition-all duration-300 ${
                            loginMethod === 'email'
                                ? darkMode
                                    ? 'bg-indigo-600'
                                    : 'bg-indigo-500'
                                : darkMode
                                    ? 'bg-gray-700'
                                    : 'bg-gray-200'
                        }`}
                    >
                        <Mail className={`h-6 w-6 ${loginMethod === 'email' ? 'text-white' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                    <button
                        onClick={() => setLoginMethod('fingerprint')}
                        className={`p-3 rounded-full transition-all duration-300 ${
                            loginMethod === 'fingerprint'
                                ? darkMode
                                    ? 'bg-indigo-600'
                                    : 'bg-indigo-500'
                                : darkMode
                                    ? 'bg-gray-700'
                                    : 'bg-gray-200'
                        }`}
                    >
                        <Fingerprint className={`h-6 w-6 ${loginMethod === 'fingerprint' ? 'text-white' : darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </button>
                </motion.div>

                {/* Login form */}
                {loginMethod === 'email' && (
                    <motion.form className="mt-8 space-y-6" action="#" method="POST" variants={itemVariants}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                    </div>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className={`appearance-none rounded-lg relative block w-full px-4 py-3 pl-10 transition-all duration-300 ${
                                            darkMode
                                                ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-600'
                                                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                                        } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        className={`appearance-none rounded-lg relative block w-full px-4 py-3 pl-10 transition-all duration-300 ${
                                            darkMode
                                                ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-600'
                                                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                                        } border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
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
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className={`h-4 w-4 rounded transition-all duration-200 ${
                                        darkMode ? 'text-indigo-600 bg-gray-800 border-gray-600' : 'text-indigo-600 bg-white border-gray-300'
                                    } focus:ring-indigo-500`}
                                />
                                <label htmlFor="remember-me" className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="#"
                                    className={`font-medium transition-all duration-300 ${
                                        darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'
                                    }`}
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <motion.button
                                type="submit"
                                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-300 ${
                                    darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                whileHover={{ scale: 1.07 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Sign in
                            </motion.button>
                        </div>
                    </motion.form>
                )}

                {loginMethod === 'fingerprint' && (
                    <motion.div className="mt-8 text-center" variants={itemVariants}>
                        <motion.div
                            className={`mx-auto h-32 w-32 rounded-full shadow-lg cursor-pointer transition-all duration-300 ${
                                darkMode ? 'bg-indigo-500' : 'bg-indigo-600'
                            } flex items-center justify-center`}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Fingerprint className="h-20 w-20 text-white" />
                        </motion.div>
                        <p className={`mt-6 text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Touch the sensor to sign in
                        </p>
                    </motion.div>
                )}

                <motion.div variants={itemVariants}>
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className={`w-full border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className={`px-2 ${darkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-500'}`}>
                                    Or
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center">
                        <div className="text-sm">
                            <a
                                href="./signup"
                                className={`font-medium transition-all duration-300 ${
                                    darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-500'
                                }`}
                            >
                                Don't have an account? Sign up
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Dark mode toggle */}
                <motion.div className="absolute top-4 right-4" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition-colors duration-300 ${
                            darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default LoginPage;
