import React, { useState } from 'react';

const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration successful!');
    setSubmitted(true);
  };

  if (submitted) {
    return <div>Thank you for registering!</div>;
  }

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" required />
      <select required>
        <option value="">Select Year of College</option>
        <option value="1st">1st Year</option>
        <option value="2nd">2nd Year</option>
        <option value="3rd">3rd Year</option>
        <option value="4th">4th Year</option>
      </select>
      <input type="email" placeholder="Email" required />
      <button type="submit" className="submit-button">Submit Registration</button>
    </form>
  );
};

export default RegistrationForm;