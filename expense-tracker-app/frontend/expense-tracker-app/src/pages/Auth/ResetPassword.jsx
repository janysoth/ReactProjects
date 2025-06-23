import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '../../components/Inputs/Input';
import AuthLayout from '../../components/layouts/AuthLayout';
import PasswordRules from '../../components/PasswordRules';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import { passwordRulesList } from '../../utils/helper';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const passwordRef = useRef(null);

  const isPasswordValid = passwordRulesList.every(rule => rule.test(password));
  const ifFormValid = (password === confirmPassword) && isPasswordValid;

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword)
      return setError("All fields are required.");

    if (password !== confirmPassword)
      return setError("Passwords do not match. Please try again.");

    setError("");
    setMessage("");

    try {
      const response = await axiosInstance.post(`${API_PATHS.AUTH.RESET_PASSWORD}/${token}`, { password });

      setMessage(response.data.message || "Password reset successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.response?.data?.message)
        setError(error.response.data.message);
      else
        setError("Something went wrong. Please try again.");
    }

  };

  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Reset Your Password</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Enter your new password below.
        </p>

        <form onSubmit={handleResetPassword}>
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (!touched) setTouched(true);
            }}
            label="New Password"
            type="password"
            placeholder="Min 8 characters"
            ref={passwordRef}
          />

          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter password"
          />

          {touched && <PasswordRules password={password} />}

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          {message && <p className="text-green-600 text-xs pb-2.5">{message}</p>}

          <button
            type="submit"
            className={`btn-primary ${!ifFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!password || !confirmPassword}
          >
            Reset Password
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;