// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const navigate = useNavigate();

  const validateEmailWithZeroBounce = async (email) => {
    setIsCheckingEmail(true);

    const apiKey = '1aea3bd60c1f410bb57ba8b1bd27106a'; // Replace with your ZeroBounce API key
    const url = `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${email}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setIsCheckingEmail(false);
      return data.status === 'valid';
    } catch (error) {
      setIsCheckingEmail(false);
      console.error('Error validating email:', error);
      return false;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    const isEmailValid = await validateEmailWithZeroBounce(email);
    if (!isEmailValid) {
      setError('Invalid email address.');
      return;
    }

    // Hardcoded registration logic
    const hardcodedUsername = 'user';
    const hardcodedEmail = 'user@example.com';
    const hardcodedPassword = 'password123';

    if (username === hardcodedUsername && email === hardcodedEmail && password === hardcodedPassword) {
      navigate('/login');
    } else {
      setError('Registration failed. Please use the hardcoded credentials.');
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-page-container-inner">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isCheckingEmail}>
            {isCheckingEmail ? 'Checking Email...' : 'Register'}
          </button>
        </form>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;