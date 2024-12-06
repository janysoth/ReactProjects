import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";

function App() {
  const [user] = useAuthState(auth);
  const [isSignUp, setIsSignUp] = useState(false);

  console.log(user);

  return (
    <div>
      {!user ? (
        isSignUp ? (
          <SignUp onSwitchToLogin={() => setIsSignUp(false)} />
        ) : (
          <LoginPage onSwitchToSignUp={() => setIsSignUp(true)} />
        )
      ) : (
        <HomePage />
      )}
    </div>
  );
}

export default App;