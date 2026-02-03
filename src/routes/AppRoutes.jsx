import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import UserHome from '../pages/UserHome';
import FoodPartnerHome from '../pages/FoodPartnerHome';
import UserLogin from '../pages/UserLogin';
import UserRegister from '../pages/UserRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerCreateFood from '../pages/FoodPartnerCreateFood';

const AppRoutes = () => {
  return (
   <Router>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/food-partner-home" element={<FoodPartnerHome />} />
        <Route path="/food-partner-create" element={<FoodPartnerCreateFood />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
    </Routes>
   </Router>
  )
}

export default AppRoutes
