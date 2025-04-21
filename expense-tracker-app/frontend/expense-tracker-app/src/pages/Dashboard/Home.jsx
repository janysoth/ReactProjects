import React from 'react';

import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';

const Home = () => {
  useUserAuth();

  return (
    <DashboardLayout activeMenu="Dashboard">
      <main className="my-5 mx-auto">
        <h1 className="text-2xl font-semibold">Welcome to the Dashboard</h1>
      </main>
    </DashboardLayout>
  );
};

export default Home;