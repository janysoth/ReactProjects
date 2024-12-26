import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import GoogleLogo from '../assets/images/google.png';
import NavBar from "../components/NavBar";
import PasswordInput from "../components/PasswordInput";
import axiosInstance from "../utils/axiosInstance";
import { signInWithGoogle } from "../utils/firebase";
import { validateEmail } from "../utils/helper";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Handle successful login
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle login error
      if (error.response && error.response.data && error.response.data.message)
        setError(error.response.data.message);
      else
        setError("An unexpected error occurred. Please try again.");
    }
  };

  // Handle Firebase Google login
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { token } = await signInWithGoogle(); // Use Firebase sign-in method

      // Send Firebase ID token to your backend to verify and retrieve user details
      const response = await axiosInstance.post("/google-login", { token });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-6 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">
              Login
            </h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error &&
              <p className="text-red-500 text-xs pb-3">
                {error}
              </p>
            }

            <button type="submit" className="btn-primary">
              Login
            </button>

            <div className="flex justify-center mt-3">
              <button
                onClick={handleGoogleLogin}
                className="h-[4vh] w-full flex items-center justify-center px-3 py-2 bg-primary text-white rounded text-sm transition duration-300 ease-in-out hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                <img src={GoogleLogo} alt="Google logo" className="text-base mr-2" />
                {isLoading ? "Signing In..." : "Sign in with Google"}
              </button>
            </div>

            <p className="text-sm text-center mt-4">
              Not Registered Yet? {" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div >
    </>
  );
};

export default Login;