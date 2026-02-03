import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';
import axiosInstance from '../api/axiosConfig';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('First Name:', formData.fullName);
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
    console.log('Confirm Password:', formData.confirmPassword);
    console.log('Agree to Terms:', formData.agreeToTerms);
    console.log('Form Data:', formData);

    try {
      const response = await axiosInstance.post('/api/auth/user/register', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <div className="auth-badge">User Register</div>
          <h1>Join Our Community</h1>
          <p>Create your account to get started</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="role-switcher">
            <span className="role-label">Register as:</span>
            <span className="role-switcher-btn active">
              Customer
            </span>
            <Link to="/food-partner/register" className="role-switcher-btn">
              Food Partner
            </Link>
          </div>

          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              className="form-input"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-checkbox">
            <input
              id="agreeToTerms"
              type="checkbox"
              name="agreeToTerms"
              className="checkbox-input"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeToTerms" className="checkbox-label">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?
            <a href="/user/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
