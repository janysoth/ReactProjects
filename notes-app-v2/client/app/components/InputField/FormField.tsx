interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  id: string;
  type?: "text" | "email" | "password" | "textarea" | "select" | "date";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  placeholder?: string;
  togglePassword?: () => void;
  showPassword?: boolean;
  options?: Option[];  // options as an array of Option objects
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  togglePassword,
  showPassword,
  options
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative mt-1">
        {/* Input Field */}
        {type !== "textarea" && type !== "select" && (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`block w-full px-4 py-2 border rounded-md focus:outline-green-500 ${error ? "border-red-500" : "border-gray-300"}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        )}

        {/* Textarea Field (for description) */}
        {type === "textarea" && (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={4}
            className={`block w-full px-4 py-2 border rounded-md resize-none focus:outline-green-500 ${error ? "border-red-500" : "border-gray-300"}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
          />
        )}

        {type === "select" && options && (
          <select
            id={id}
            value={value || "No"}
            onChange={onChange}
            className={`block w-full px-4 py-2 border rounded-md bg-white focus:outline-green-500 ${error ? "border-red-500" : "border-gray-300"}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${id}-error` : undefined}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}  {/* Render the label here */}
              </option>
            ))}
          </select>
        )}

        {/* Eye Button for Password Visibility */}
        {togglePassword && type === "password" && (
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

export default FormField;
