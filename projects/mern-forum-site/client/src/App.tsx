import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AuthProtectedLayout from "./components/layout/layout/AuthProtectedLayout";
import PublicLayout from "./components/layout/layout/PublicLayout";

import Header from "./components/layout/header";

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
import PostIdPage from "./pages/public/post-id-page";
import AuthorIdPage from "./pages/public/author-id-page";
import PostCreateUpdatePage from "./pages/auth/post-create-update-page";
import MyActivityPage from "./pages/auth/activity-page";
import SearchPage from "./pages/public/search-page";
import MyPostPage from "./pages/auth/post-page";
import MyLibraryPage from "./pages/auth/library-page";

function App() {
  return (
    <>
      <Header />
      <div className="min-h-screen mx-auto max-w-[1336px] py-10">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="signin" element={<SigninSignupPage />} />
          <Route path="signup" element={<SigninSignupPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          {/* public  */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="post/:id" element={<PostIdPage />} />
            <Route path="search/*" element={<SearchPage />} />
            <Route path="author/:id/*" element={<AuthorIdPage />} />
          </Route>
          {/* auth  */}
          <Route element={<AuthProtectedLayout />}>
            <Route element={<AuthProtectedRouter />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/update" element={<ProfileUpdatePage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="setting" element={<SettingPage />} />

              <Route path="me">
                <Route path="create-post" element={<PostCreateUpdatePage />} />
                <Route
                  path="update-post/:id"
                  element={<PostCreateUpdatePage />}
                />
                <Route path="post/*" element={<MyPostPage />} />
                <Route path="library/*" element={<MyLibraryPage />} />
                <Route path="activity/*" element={<MyActivityPage />} />
              </Route>
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
