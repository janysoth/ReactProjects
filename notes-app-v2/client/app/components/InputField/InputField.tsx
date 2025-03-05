import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePassword?: () => void;
  showPassword?: boolean;
}

const InputField = ({
  label,
  id,
  type = "text",
  value,
  placeholder = "",
  error,
  onChange,
  togglePassword,
  showPassword,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col mt-4">
      <label htmlFor={id} className="mb-1 text-[#999]">
        {label}
      </label>

      {/* Wrapper for input & eye button */}
      <div className="relative">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800 pr-12 min-h-[48px] 
            ${error ? 'border-red-500' : 'border-gray-300'}`}
          placeholder={placeholder}
        />

        {/* Eye Icon Button */}
        {id === "password" && togglePassword && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[22px] text-blue-500 opacity-45"
            onClick={togglePassword}
          >
            <i className={`fas fa-eye${showPassword ? "-slash" : ""}`}></i>
          </button>
        )}
      </div>

      {/* Error Message (won’t push input down) */}
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField