import React from "react";

const InputField = ({ type = "text", label, value, onChange, ...props }) => {
  return (
    <div className="field">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        {...props}
        required
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
};

export default InputField;