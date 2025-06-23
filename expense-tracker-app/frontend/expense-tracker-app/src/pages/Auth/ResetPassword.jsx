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
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef(null);

  const isPasswordValid = passwordRulesList.every(rule => rule.test(password));
  const ifFormValid = password && confirmPassword && password === confirmPassword && isPasswordValid;

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!ifFormValid) {
      setError("Please make sure all fields are valid.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(
        `${API_PATHS.AUTH.RESET_PASSWORD}/${token}`,
        { password }
      );

      setMessage(response.data.message || "Password reset successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.response?.status === 403) {
        navigate("/forgot-password", {
          state: { error: "Token expired or invalid. Please request a new password reset link." },
        });
        return;
      }

      setError(
        typeof error.response?.data?.message === "string"
          ? error.response.data.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
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

        <form onSubmit={handleResetPassword} noValidate>
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
            aria-invalid={!isPasswordValid && touched}
          />

          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter password"
            aria-invalid={password !== confirmPassword}
          />

          {touched && <PasswordRules password={password} />}

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          {message && <p className="text-green-600 text-xs pb-2.5">{message}</p>}

          <button
            type="submit"
            className={`btn-primary ${!ifFormValid || loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!ifFormValid || loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;