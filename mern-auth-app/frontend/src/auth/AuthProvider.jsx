import { useState } from "react";

import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  // Initialize the token state
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{
      token,
      login,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};