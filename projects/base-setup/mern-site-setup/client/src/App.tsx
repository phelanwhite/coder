import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthProtectedLayout from "./components/layout/layout/AuthProtectedLayout";
import PublicLayout from "./components/layout/layout/PublicLayout";

import Header from "./components/layout/header";
// import Footer from "./components/layout/footer";

import HomePage from "./pages/public/home-page";
import SigninSignupPage from "./pages/public/signin-signup-page";
import ForgotPasswordPage from "./pages/public/forgot-password-page";
import ResetPasswordPage from "./pages/public/reset-password-page";
import NotFoundPage from "./pages/public/not-found-page";
import AuthProtectedRouter from "./components/common/auth/AuthProtectedRouter";
import DashboardPage from "./pages/auth/dashboard-page";
import SettingPage from "./pages/auth/setting-page";
import ProfilePage from "./pages/auth/profile-page";
import ProfileUpdatePage from "./pages/auth/profile-update-page";
import ButtonScrollBackToTop from "./components/form/button-scroll-back-to-top";
import Footer from "./components/layout/footer";

function App() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="signin" element={<SigninSignupPage />} />
          <Route path="signup" element={<SigninSignupPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          {/* public  */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          {/* auth  */}
          <Route element={<AuthProtectedLayout />}>
            <Route element={<AuthProtectedRouter />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/update" element={<ProfileUpdatePage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="setting" element={<SettingPage />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />

      <ButtonScrollBackToTop />
      <Toaster />
    </>
  );
}

export default App;
