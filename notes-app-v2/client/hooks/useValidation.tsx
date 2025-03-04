import { useState } from "react";

const useValidation = () => {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateInput = (name: string, value: string) => {
    let error = "";

    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    if (!value.trim()) {
      error = `${formattedName} is required.`
    } else {
      switch (name) {
        case "email":
          if (!/^\S+@\S+\.\S+$/.test(value))
            error = "Invalid email format";
          break;

        case "password":
          if (value.length < 6)
            error = "Password must be at least 6 characters";
          break;

        case "name":
          if (value.length < 3)
            error = "Name must be at least 3 characters"
          break;

        case "username":
          if (value.length < 3)
            error = "Username must be at least 3 characters"
          break;

        default:
          break;
      }
    }

    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: error
    }));
  }

  return { formErrors, validateInput }
};

export default useValidation;

