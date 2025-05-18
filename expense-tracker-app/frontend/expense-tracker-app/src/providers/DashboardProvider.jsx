import { useEffect, useState } from "react";
import DashboardContext from "../context/DashboardContext";
import { API_PATHS } from "../utils/apiPath";
import axiosInstance from "../utils/axiosInstance";

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        loading,
        error,
        refreshDashboard: fetchDashboardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};