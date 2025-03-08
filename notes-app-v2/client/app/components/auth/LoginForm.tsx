"use client"

import { useUserContext } from '@/context/userContext';
import useValidation from '@/hooks/useValidation';
import React, { useEffect, useState } from 'react';

import FormField from '../InputField/FormField';

const LoginForm = () => {
  const { loginUser, userState, handleUserInput } = useUserContext();
  const { email, password } = userState;
  const { formErrors, validateInput } = useValidation();

  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);


  const togglePassword = () => setShowPassword(!showPassword);

  // Handle input change and validation
  const handleChange =
    (field: string) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        handleUserInput(field)(e);
        validateInput(field, e.target.value);
      };

  // Check form validity
  useEffect(() => {
    setIsFormValid(!formErrors.email && !formErrors.password && email && password);
  }, [formErrors, email, password]);

  return (
    <form
      className='relative m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]'
      aria-labelledby="register-heading"
      noValidate
    >
      <div className="relative z-10">
        {/* Accessible Heading */}
        <h1
          id="register-heading"
          className='mb-2 text-center text-[1.35rem] font-medium'
        >
          Login to Your Account
        </h1>

        {/* Email */}
        <FormField
          label='Email'
          id='email'
          value={email}
          onChange={handleChange("email")}
          error={formErrors.email}
          placeholder='johndoe@gmail.com'
          aria-describedby={formErrors.email ? "email-error" : undefined}
        />

        {/* Password */}
        <FormField
          label='Password'
          type={showPassword ? "text" : "password"}
          id='password'
          value={password}
          onChange={handleChange("password")}
          togglePassword={togglePassword}
          showPassword={showPassword}
          placeholder='Password'
          error={formErrors.password}
          aria-describedby={formErrors.password ? "password-error" : undefined}
        />

        <div className="mt-4 flex justify-end">
          <a
            href="/forgot-password"
            className="font-bold text-blue-400 text-[14px] hover:text-[#7263F3] transition-all duration-300"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <div className="flex">
          <button
            type="submit"
            disabled={!isFormValid}
            onClick={loginUser}
            className={`mt-[1.5rem] flex-1 px-4 py-3 font-bold text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              ${isFormValid ? "bg-blue-600 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Log in
          </button>
        </div>

        <p className='mt-4 px-[2rem] text-center text-[#999] text-[14px]'>
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-bold text-blue-400 hover:text-[#7263f3] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register here
          </a>
        </p>
      </div>
      <img src="/flurry.png" alt="" />
    </form>
  )
}

export default LoginForm;