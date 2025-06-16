import axios from "axios";
import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  // Initialize the token state
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // User state
  const [user, setUser] = useState(null);

  const isAuthenticated = !!token;

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const fetchUserInfo = async (authToken = token) => {
    if (!authToken) return;

    try {
      const res = await axios.get("/api/auth/getUserInfo", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setUser(res.data);
      console.log("Fetched user:", res.data);
    } catch (error) {
      console.error("Failed to fetch user info frontend: ", error);
      logout();
    }
  };

  // AuthProvider.js snippet
  console.log("Token:", token);
  console.log("User in provider:", user);

  // On initial load or when token changes
  useEffect(() => {
    if (token && !user) {
      fetchUserInfo();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{
      token,
      login,
      logout,
      isAuthenticated,
      user
    }}>
      {children}
    </AuthContext.Provider>
  );
};