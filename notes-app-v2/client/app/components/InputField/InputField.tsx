import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  togglePassword?: () => void;
  showPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  togglePassword,
  showPassword,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full px-4 py-2 border rounded-md focus:outline-green-500  ${error ? "border-red-500" : "border-gray-300"
            }`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        />

        {/* Eye Button for Password Visibility */}
        {togglePassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-sm mt-1" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;