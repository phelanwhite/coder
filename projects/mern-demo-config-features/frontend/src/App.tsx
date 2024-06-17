import SigninAndSignupForm from "features/auth/components/SigninAndSignupForm";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Toastify from "components/ui/toastify";
import ForgotPasswordAndResetPasswordForm from "features/auth/components/ForgotPasswordAndResetPasswordForm";
import HomePage from "pages/home";
import Wrapper from "components/ui/wrapper";
import Header from "layouts/header";
import UpdateMeForm from "features/auth/components/UpdateMeForm";
import ProtectedWithAuth from "features/auth/components/ProtectedWithAuth";

function App() {
  return (
    <div>
      <Header />
      <Wrapper>
        <div>
          <Routes>
            <Route index element={<HomePage />} />

            {/* auth routes */}
            <Route path="signin" element={<SigninAndSignupForm />} />
            <Route path="signup" element={<SigninAndSignupForm />} />
            <Route
              path="forgot-password"
              element={<ForgotPasswordAndResetPasswordForm />}
            />
            <Route
              path="reset-password"
              element={<ForgotPasswordAndResetPasswordForm />}
            />
            {/* protected routes */}
            <Route path="/" element={<ProtectedWithAuth />}>
              <Route path="update-profile" element={<UpdateMeForm />} />
            </Route>
          </Routes>
        </div>
      </Wrapper>
      <Toastify />
    </div>
  );
}

export default App;
