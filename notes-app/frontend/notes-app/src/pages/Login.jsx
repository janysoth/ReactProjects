import { useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    }

    if (!password) {
      setPasswordError("Please enter a password.");
      return;
    }

    setEmailError("");
    setPasswordError("");

    // Login API Call
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
            {emailError &&
              <p className="text-red-500 text-xs pb-3">
                {emailError}
              </p>
            }

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError &&
              <p className="text-red-500 text-xs pb-3">
                {passwordError}
              </p>
            }

            <button type="submit" className="btn-primary">
              Login
            </button>

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