import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, provider } from "../firebase";

import InputField from '../components/InputField';
import GoogleLogo from '../images/google.png';
import MainLogo from '../images/USA&Khmer.png';

function LoginPage({ onSwitchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
    } catch (error) {
      setError("Failed to sign in. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="LoginPage">
      <div className="login-container">
        <div className="branding">
          <h1>Welcome to My Todo App</h1>
          <div className='divider'>
            <img src={MainLogo} alt="flags" className="main-logo" />
          </div>
          <p>Your tasks, organized effortlessly.</p>
        </div>

        <h1>Log In</h1>

        <form className="email-login-form" onSubmit={handleEmailLogin}>
          <InputField
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {isLoading ? "Signing In..." : "Log in"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>
        <div>
          <button onClick={signInWithGoogle} className="google-login-button">
            {/* <FaGoogle className="google-icon" /> */}
            <img src={GoogleLogo} alt="Google logo" className="google-icon" />
            {isLoading ? "Signing In..." : "Sign in with Google"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>

        <p className="signup-text">
          Don't have an account?{" "}
          <button onClick={onSwitchToSignUp} className="link-button">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

