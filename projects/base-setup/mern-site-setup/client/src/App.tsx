import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/public/home-page";
import SigninSignupPage from "./pages/public/signin-signup-page";
import ForgotPasswordPage from "./pages/public/forgot-password-page";
import ResetPasswordPage from "./pages/public/reset-password-page";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="signin" element={<SigninSignupPage />} />
          <Route path="signup" element={<SigninSignupPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;