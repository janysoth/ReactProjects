import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";

import InputField from "../components/InputField"; // Adjust path based on your folder structure
import MainLogo from "../images/USA&Khmer.png";

const SignUp = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the displayName
      await updateProfile(user, { displayName });

      // Re-fetch the user data to confirm changes
      await auth.currentUser.reload();

      // Switch to login after profile update
      onSwitchToLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="SignUpPage">
      <div className="signup-container">
        <div className="branding">
          <h1>Welcome to My Todo App</h1>
          <div className="divider">
            <img src={MainLogo} alt="flags" className="main-logo" />
          </div>
          <p>Your tasks, organized effortlessly.</p>
        </div>

        <h1>Sign Up</h1>

        {error && <p className="error">{error}</p>}

        <form className="signup-form" onSubmit={handleSignUp}>
          <InputField
            type="text"
            label="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <InputField
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} className="link-button">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;