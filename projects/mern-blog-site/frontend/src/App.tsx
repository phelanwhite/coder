import "./App.css";
import { Route, Routes } from "react-router-dom";

import Footer from "components/footer";
import Header from "components/header";

import HomePage from "pages/home";
import PostIDPage from "pages/post-id";
import PostCreateUpdatePage from "pages/post-create-update";
import SigninAndSignupPage from "pages/auth/SigninAndSignup";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "components/Wrapper";
import UpdateProfilePage from "pages/auth/UpdateProfilePage";
import MyPost from "pages/post-my";

function App() {
  return (
    <div>
      <Header />
      <Wrapper>
        <div className="min-h-screen py-4">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/signin" element={<SigninAndSignupPage />} />
            <Route path="/signup" element={<SigninAndSignupPage />} />
            <Route path="/my-posts" element={<MyPost />} />
            <Route path="/post-id/:id" element={<PostIDPage />} />
            <Route path="/post-create" element={<PostCreateUpdatePage />} />
            <Route
              path="/post-update-id/:id"
              element={<PostCreateUpdatePage />}
            />
            <Route path="/profile-update" element={<UpdateProfilePage />} />
          </Routes>
        </div>
      </Wrapper>
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
