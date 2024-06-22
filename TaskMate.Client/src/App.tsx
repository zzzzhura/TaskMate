import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login.page";
import RegisterPage from "./pages/auth/register.page";
import "./scss/app.scss";
import HomePage from "./pages/home/home.page";
import IntroPage from "./pages/intro/intro.page";
import CalendarPage from "./pages/calendar/calendar.page";
import AdminPage from "./pages/admin/admin.page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/calendar" element={<CalendarPage />} />\
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
