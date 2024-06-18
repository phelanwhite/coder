import "assets/styles/App.css";
import { Route, Routes } from "react-router-dom";
import Toastify from "components/ui/toastify";
import HomePage from "pages/home";
import Wrapper from "components/ui/wrapper";
import Header from "layouts/header";
import ProtectedWithAuth from "features/auth/components/ProtectedWithAuth";
import SigninPage from "pages/auth/signin";
import SignupPage from "pages/auth/signup";
import ForgotPasswordPage from "pages/auth/forgot-password";
import ResetPasswordPage from "pages/auth/reset-password";
import UpdateMePage from "pages/auth/update-me";
import Footer from "layouts/footer";

function App() {
  return (
    <div>
      <Header />
      <Wrapper>
        <div>
          <Routes>
            <Route index element={<HomePage />} />

            {/* auth routes */}
            <Route path="signin" element={<SigninPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            {/* protected routes */}
            <Route path="/" element={<ProtectedWithAuth />}>
              <Route path="update-profile" element={<UpdateMePage />} />
            </Route>
          </Routes>
        </div>
      </Wrapper>
      <Footer />
      <Toastify />
    </div>
  );
}

export default App;
