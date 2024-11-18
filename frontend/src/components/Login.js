// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    // Hardcoded credentials
    const hardcodedEmail = 'sivasudharsan.it22@bitsathy.ac.in';
    const hardcodedPassword = 'user';

    if (email === hardcodedEmail && password === hardcodedPassword) {
      navigate('/home'); // Redirect to dashboard or any other page
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-container-inner">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;