import "assets/styles/App.css";
import { Route, Routes, useLocation } from "react-router-dom";
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
import AboutPage from "pages/about";
import ContactPage from "pages/contact";
import MediaId from "pages/media-id";
import PersonId from "pages/person-id";
import Search from "pages/search";
import TvSeries from "pages/tv-series";
import Movie from "pages/movie";
import MediaFavorites from "pages/media-favorite";
import PersonFavorites from "pages/person-favorite";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="media-id/:id" element={<MediaId />} />
          <Route path="person-id/:id" element={<PersonId />} />
          <Route path="search" element={<Search />} />
          <Route path="tv-series" element={<TvSeries />} />
          <Route path="movies" element={<Movie />} />

          {/* auth routes */}
          <Route path="signin" element={<SigninPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          {/* protected routes */}
          <Route path="/" element={<ProtectedWithAuth />}>
            <Route path="update-profile" element={<UpdateMePage />} />
            <Route path="media-favorites" element={<MediaFavorites />} />
            <Route path="person-favorites" element={<PersonFavorites />} />
          </Route>
        </Routes>
      </div>
      <Footer />
      <Toastify />
    </div>
  );
}

export default App;
