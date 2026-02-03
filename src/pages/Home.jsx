import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div className="home-header">
          <h1 className="home-title">Welcome</h1>
          <p className="home-subtitle">Choose how you'd like to proceed</p>
        </div>

        <div className="cards-grid">
          {/* User Section */}
          <div className="auth-card">
            <div className="card-header">
              <h2>Customer</h2>
              <p className="card-description">Order delicious food</p>
            </div>

            <div className="card-links">
              <Link to="/user/login" className="card-link primary">
                Sign In
              </Link>
              <Link to="/user/register" className="card-link secondary">
                Create Account
              </Link>
            </div>
          </div>

          {/* Food Partner Section */}
          <div className="auth-card">
            <div className="card-header">
              <h2>Food Partner</h2>
              <p className="card-description">Grow your restaurant</p>
            </div>

            <div className="card-links">
              <Link to="/food-partner/login" className="card-link primary">
                Sign In
              </Link>
              <Link to="/food-partner/register" className="card-link secondary">
                Register Restaurant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
