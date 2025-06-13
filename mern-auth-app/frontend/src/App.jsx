import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Terms from "./pages/Terms";
import { CustomThemeProvider } from "./theme/ThemeContext";


function App() {

  return (
    <CustomThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* <Route element={<Layout />}> */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Register */}
            <Route
              path="/register"
              element={<Register />}
            />

            {/* Login */}
            <Route
              path="/login"
              element={<Login />}
            />

            {/* Reset Password */}
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />

            {/* Forgot Password */}
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            {/* Policies */}
            <Route
              path="/terms"
              element={<Terms />}
            />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* </Route> */}
          </Routes>
        </Router>
      </AuthProvider>
    </CustomThemeProvider>

  );
}

export default App;
