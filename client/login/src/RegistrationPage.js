import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
  // State for input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [srmMail, setSrmMail] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [batch, setBatch] = useState('');
  const [department, setDepartment] = useState('');

  // useNavigate hook for navigation
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Log the input values (you can replace this with your registration logic)
    console.log({
      firstName,
      lastName,
      srmMail,
      registrationNumber,
      batch,
      department,
    });
    // Optionally, navigate to another page after submission
    // navigate('/some-route'); // Uncomment this to navigate after form submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Flashing background */}
      <div className="flashing-background"></div>
      <div className="bg-white rounded-lg shadow-lg w-400 h-auto p-8 flex flex-col justify-between relative z-10">
        <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center">
          Registration
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="login-input mb-4"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="login-input mb-4"
          />
          <input
            type="email"
            placeholder="SRM Mail ID"
            value={srmMail}
            onChange={(e) => setSrmMail(e.target.value)}
            required
            className="login-input mb-4"
          />
          <input
            type="text"
            placeholder="Registration Number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
            className="login-input mb-4"
          />
          <input
            type="text"
            placeholder="Batch"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            required
            className="login-input mb-4"
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="login-input mb-4"
          />
          <button
            type="submit"
            className="login-button"
          >
            Register
          </button>
        </form>
        <Link to="/" className="text-blue-500 mt-4 text-center">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
