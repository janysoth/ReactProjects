import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Inputs/Input';
import AuthLayout from '../../components/layouts/AuthLayout';
import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';

const PASSWORD_EXPIRY_HOURS = 24;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Load stored email/password on first load
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const passwordData = JSON.parse(localStorage.getItem("rememberedPasswordData") || "{}");
    const remember = localStorage.getItem("rememberMe") === "true";

    if (rememberedEmail) setEmail(rememberedEmail);
    if (remember) setRememberMe(true);

    // If password exists and is still within 24 hours
    if (passwordData.password && passwordData.timestamp) {
      const now = Date.now();
      const ageInHours = (now - passwordData.timestamp) / (1000 * 60 * 60);

      if (ageInHours <= PASSWORD_EXPIRY_HOURS) {
        setPassword(passwordData.password);
      } else {
        localStorage.removeItem("rememberedPasswordData"); // expired
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        // Remember email indefinitely
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberMe", "true");

          // Store password + timestamp for 24 hours
          localStorage.setItem(
            "rememberedPasswordData",
            JSON.stringify({
              password,
              timestamp: Date.now(),
            })
          );
        } else {
          // Clear all remember data
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPasswordData");
          localStorage.removeItem("rememberMe");
        }

        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>
          Welcome Back
        </h3>

        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            type="text"
            placeholder="johnsmith@gmail.com"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            placeholder="Min 8 characters"
          />

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-primary cursor-pointer"
              />
              Remember Me
            </label>

            <Link to="/forgot-password" className="text-sm text-primary underline hover:opacity-80">
              Forgot Password?
            </Link>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button
            type="submit"
            className={`btn-primary cursor-pointer ${(!email || !password) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!email || !password}
          >
            Login
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don’t have an account?{" "}
            <Link className='font-medium text-primary underline' to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;