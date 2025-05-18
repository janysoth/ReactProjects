import React from 'react';

import { DashboardProvider } from './DashboardProvider';
import ExpenseProvider from './ExpenseProvider';
import IncomeProvider from './IncomeProvider';
import UserProvider from './UserProvider';

const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <IncomeProvider>
        <ExpenseProvider>
          <DashboardProvider>
            {children}
          </DashboardProvider>
        </ExpenseProvider>
      </IncomeProvider>
    </UserProvider>
  );
};

export default AppProviders;