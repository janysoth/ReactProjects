// import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const user = false;
  return (
    <div>
      {!user ? <LoginPage /> : <HomePage />}
    </div>
  );
}

export default App;
