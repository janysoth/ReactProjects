import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import ForgotPassword from './pages/Auth/ForgotPassword';
import Login from './pages/Auth/Login';
import ProfilePage from './pages/Auth/ProfilePage';
import SignUp from './pages/Auth/SignUp';
import AllTransactions from './pages/Dashboard/AllTransactions';
import Expense from './pages/Dashboard/Expense';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import AppProviders from './providers/AppProvider';


const App = () => {
  return (
    <AppProviders>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route path="/profile-page" exact element={<ProfilePage />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
          <Route path="/all-transactions" exact element={<AllTransactions />} />
        </Routes>
      </Router>

      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: '13px',
          },
        }}
      />
    </AppProviders>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};