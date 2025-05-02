import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import AllTransactions from './pages/Dashboard/AllTransactions';
import Expense from './pages/Dashboard/Expense';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import IncomeProvider from './providers/IncomeProvider';
import UserProvider from './providers/UserProvider';

const App = () => {
  return (
    <UserProvider>
      <IncomeProvider>
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route path="/dashboard" exact element={<Home />} />
              <Route path="/income" exact element={<Income />} />
              <Route path="/expense" exact element={<Expense />} />
              <Route path="/all-transactions" exact element={<AllTransactions />} />
            </Routes>
          </Router>
        </div>

        <Toaster
          toastOptions={{
            className: '',
            style: {
              fontSize: '13px',
            }
          }}
        />
      </IncomeProvider>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};