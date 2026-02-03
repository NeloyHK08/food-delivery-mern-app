import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import axiosInstance from '../api/axiosConfig';

const FoodPartnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    try {
      const response = await axiosInstance.post('/api/auth/food-partner/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Redirect to food partner create food page after successful login
      navigate('/food-partner-create');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <div className="auth-badge">Partner Login</div>
          <h1>Partner Portal</h1>
          <p>Sign in to manage your restaurant</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="role-switcher">
            <span className="role-label">Continue as:</span>
            <Link to="/user/login" className="role-switcher-btn">
              Customer
            </Link>
            <span className="role-switcher-btn active">
              Food Partner
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="partner@restaurant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-checkbox">
            <input
              id="rememberMe"
              type="checkbox"
              className="checkbox-input"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="checkbox-label">
              Remember me
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have a partner account?
            <a href="/food-partner/register">Register here</a>
          </p>
          <p style={{ marginTop: '8px' }}>
            <a href="#" className="form-link">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
