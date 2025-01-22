import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

// Ser Axios to include credentials with every request
axios.defaults.withCredentials = true;

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

  const [loading, setLoading] = useState(false);

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
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("User logged in successfully");

      // Clear the form
      setUserState({
        email: "",
        password: "",
      });

      // Refresh the user details
      await getUser(); // fetch before redirecting

      // Push user to the dashboard page
      router.push("/");
    } catch (error) {
      console.log("Error logging in user", error);
      toast.error(error.response.data.message);
    }
  };

  // Get User Logged in Status
  const userLoginStatus = async () => {
    let loggedIn = false;

    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
        withCredentials: true,
      });

      // Coerce the string to boolean
      loggedIn = !!res.data;
      setLoading(false);

      if (!loggedIn)
        router.push("/login");

    } catch (error) {
      console.log("Error in userLoginStatus.", error);
    }
    console.log("User logged in status: ", loggedIn);
    return loggedIn;
  };

  // Logout user
  const logoutUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true,
      });

      toast.success("User logged out successfully.");

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error in logoutUser.", error);
      toast.error(error.response.data.message);
    }
  };

  // getUser details
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`, {
        withCredentials: true, // send cookies to the server
      });

      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // Update user details
  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
        withCredentials: true,
      });

      // Update the User state
      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      toast.success("User updated successfully.");

      setLoading(false);
    } catch (error) {
      console.log("Error in updating user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // Dynamic form handler
  const handleUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoginStatus();

      if (isLoggedIn) {
        await getUser();
      }
    };

    loginStatusGetUser();
  }, []);

  return (
    <UserContext.Provider value={{
      userState,
      registerUser,
      loginUser,
      userLoginStatus,
      logoutUser,
      getUser,
      handleUserInput,
      user,
      updateUser,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
}

