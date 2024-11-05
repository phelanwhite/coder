import { Route, Routes, useLocation } from "react-router-dom";
import "./assets/styles/App.css";
import AuthLayout from "./components/layout/layout/AuthLayout";
import HomePage from "./pages/HomePage";
import MediaIdPage from "./pages/MediaIdPage";
import PersonIdPage from "./pages/PersonIdPage";
import SearchPage from "./pages/SearchPage";
import Header from "./components/layout/header";
import SigninSignupPage from "./pages/SigninSignupPage";
import { Toaster } from "react-hot-toast";
import ButtonScrollBackToTop from "./components/layout/button-scroll-back-to-top";
import MoviesPage from "./pages/MoviesPage";
import TvSeriesPage from "./pages/TvSeriesPage";
import UpdateMePage from "./pages/auth/UpdateMePage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import MyFavoritePage from "./pages/auth/MyFavoritePage";
import MyBookmarkPage from "./pages/auth/MyBookmarkPage";
import MyCommentPage from "./pages/auth/MyCommentPage";
import CollectionIdPage from "./pages/CollectionIdPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthProtectedRouter from "./routers/AuthProtectedRouter";
import { useAuthStore } from "./stores/auth-store";
import { useEffect } from "react";
import Footer from "./components/layout/footer";

function App() {
  const { logginWithPassportSuccess } = useAuthStore();
  // signin with passport successfully
  useEffect(() => {
    logginWithPassportSuccess();
  }, []);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div>
      <Toaster />
      <ButtonScrollBackToTop />

      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route index element={<HomePage />} />
            <Route path="media/:id" element={<MediaIdPage />} />
            <Route path="person/:id" element={<PersonIdPage />} />
            <Route path="collection/:id" element={<CollectionIdPage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="tv-series" element={<TvSeriesPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="signin" element={<SigninSignupPage />} />
            <Route path="signup" element={<SigninSignupPage />} />
          </Route>
          <Route element={<AuthProtectedRouter />}>
            <Route element={<AuthLayout />}>
              <Route path="update-me" element={<UpdateMePage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route path="my-favorite" element={<MyFavoritePage />} />
              <Route path="my-bookmark" element={<MyBookmarkPage />} />
              <Route path="my-comment" element={<MyCommentPage />} />
            </Route>
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
