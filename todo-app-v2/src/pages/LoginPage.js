import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { auth, provider } from "../firebase";

function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const signInUser = async (e) => {
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

  return (
    <div className="LoginPage">
      <div className="login-container">
        <div className="branding">
          <h1>Welcome to My Todo App</h1>
          <div className='divider' />
          <p>Your tasks, organized effortlessly.</p>
        </div>

        <form class="email-login-form" onsubmit="handleEmailLogin(event)">
          <input type="email" name="email" placeholder="Email Address" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Log in</button>
        </form>

        <div class="divider">
          <span>OR</span>
        </div>
        <div className="login-form">
          <button onClick={signInUser} className="login-button">
            {isLoading ? "Signing In..." : "Sign in with Google"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>

        <p class="signup-text">
          Don't have an account?
          <Link to="/signup" className="link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;