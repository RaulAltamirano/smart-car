import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
// import AuthLayout from '../modules/core/AuthLayout';
// import MainLayout from '../modules/core/MainLayout';
// import Login from '../modules/auth/pages/Login';
// import UserList from '../modules/user/page/UserPage';
// import Home from '../modules/Dashboard/pages/Home';
// import { AuthProvider } from '../modules/auth/context/AuthContext';
// import Register from '../modules/auth/pages/Register';

const AppRouter: React.FC = () => {
  
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user-list" element={<UserList />} />
        </Route> */}

        {/* Protected Routes */}
        {/* <Route element={<AuthProvider />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Route> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;