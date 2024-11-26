import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const user = true;
  return (
    <div>
      {!user ? <LoginPage /> : <HomePage />}
    </div>
  );
}

export default App;
