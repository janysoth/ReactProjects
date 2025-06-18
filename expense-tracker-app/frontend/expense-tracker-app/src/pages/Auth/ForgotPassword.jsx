import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail } from "../../utils/helper";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, {
        email,
      });

      setMessage(res.data.message);
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Forgot Password?</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            type="email"
            placeholder="johnsmith@gmail.com"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          {message && <p className="text-green-600 text-xs pb-2.5">{message}</p>}

          <button
            type="submit"
            className={`btn-primary ${!email ? "opacity-50 cursor-not-allowed" : ""} cursor-pointer`}
            disabled={!email}
          >
            Send Reset Link
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Back to{" "}
            <Link to="/login" className="font-medium text-primary underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;