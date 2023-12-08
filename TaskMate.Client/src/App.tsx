import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login.page";
import RegisterPage from "./pages/auth/register.page";
import "./scss/app.scss";
import HomePage from "./pages/home/home.page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
