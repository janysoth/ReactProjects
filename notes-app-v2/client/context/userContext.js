import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  const router = useRouter();

  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);

  // Register user
  const registerUser = async (e) => {
    e.preventDefault();

    if (!userState.email.includes("@") || !userState.password || userState.password.length < 6) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);

      console.log("User registered successfully", res.data);
      toast.success("User registered successfully");

      // Clear the form 
      setUserState({
        name: "",
        email: "",
        password: "",
      });

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error in registering user", error);
      toast.error(error.response.data.message);
    }
  };

  // Log in 
  const loginUser = async (e) => { };

  // Dynamic form handler
  const handleUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <UserContext.Provider value={{
      registerUser,
      userState,
      handleUserInput,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
}

