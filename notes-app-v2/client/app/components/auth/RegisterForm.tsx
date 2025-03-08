"use client";

import { useUserContext } from "@/context/userContext";
import useValidation from "@/hooks/useValidation";
import React, { useEffect, useState } from "react";

import Button from "../Button/Button";
import FormField from "../InputField/FormField";

const RegisterForm = () => {
  const { registerUser, userState, handleUserInput } = useUserContext();
  const { name, email, password } = userState;
  const { formErrors, validateInput } = useValidation();

  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange =
    (field: string) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        handleUserInput(field)(e);
        validateInput(field, e.target.value);
      };

  useEffect(() => {
    setIsFormValid(
      !formErrors.name && !formErrors.email && !formErrors.password && name && email && password
    );
  }, [formErrors, name, email, password]);

  return (
    <form
      className="relative m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]"
      aria-labelledby="register-heading"
      noValidate
    >
      <div className="relative z-10">
        {/* Accessible Heading */}
        <h1 id="register-heading" className="mb-2 text-center text-[1.35rem] font-medium">
          Account Registration
        </h1>

        {/* Full Name */}
        <FormField
          label="Full Name"
          id="name"
          value={name}
          onChange={handleChange("name")}
          error={formErrors.name}
          placeholder="John Doe"
          aria-describedby={formErrors.name ? "name-error" : undefined}
        />

        {/* Email */}
        <FormField
          label="Email"
          id="email"
          value={email}
          onChange={handleChange("email")}
          error={formErrors.email}
          placeholder="johndoe@gmail.com"
          aria-describedby={formErrors.email ? "email-error" : undefined}
        />

        {/* Password */}
        <FormField
          label="Password"
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handleChange("password")}
          error={formErrors.password}
          placeholder="Enter your password"
          togglePassword={togglePassword}
          showPassword={showPassword}
          aria-describedby={formErrors.password ? "password-error" : undefined}
        />

        {/* Submit Button */}
        <div className="flex">
          <Button type="submit" onClick={registerUser} disabled={!isFormValid}>
            Register
          </Button>
        </div>

        {/* Login Redirect */}
        <p className="mt-4 px-[2rem] text-center text-[#999] text-[14px]">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-bold text-blue-400 hover:text-[#7263f3] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login here
          </a>
        </p>
      </div>

      {/* Decorative Image (Marked as Presentational) */}
      <img src="/flurry.png" alt="" role="presentation" />
    </form>
  );
};

export default RegisterForm;