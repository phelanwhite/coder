import { Route, Routes, useLocation } from "react-router-dom";
import "./assets/styles/App.css";
import AuthLayout from "./components/layout/layout/AuthLayout";
import HomePage from "./pages/HomePage";
import Header from "./components/layout/header";
import { Toaster } from "react-hot-toast";
import ButtonScrollBackToTop from "./components/form/button-scroll-back-to-top";
import UpdateMePage from "./pages/auth/UpdateMePage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthProtectedRouter from "./components/common/auth/AuthProtectedRouter";
import { useAuthStore } from "./stores/auth-store";
import { useEffect } from "react";
import Footer from "./components/layout/footer";
import BlogIdPage from "./pages/BlogIdPage";
import PublicLayout from "./components/layout/layout/PublicLayout";
import AuthorIdPage from "./pages/AuthorIdPage";
import SearchPage from "./pages/SearchPage";
import TopicIdPage from "./pages/TopicIdPage";
import ProfilePage from "./pages/auth/ProfilePage";
import ProfileUpdatePage from "./pages/auth/ProfileUpdatePage";
import PublishedPage from "./pages/auth/PublishedPage";
import DraftPage from "./pages/auth/DraftPage";
import ResponsesPage from "./pages/auth/ResponsesPage";
import HistoryPage from "./pages/auth/HistoryPage";
import BookmarkPage from "./pages/auth/BookmarkPage";
import FavoritePage from "./pages/auth/FavoritePage";
import BlogNewAndUpdatePage from "./pages/auth/BlogNewAndUpdatePage";
import CommentPage from "./pages/auth/CommentPage";
import BlogIdCommentPage from "./pages/BlogIdCommentPage";

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
      <div className="min-h-screen py-8">
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="topic/:id" element={<TopicIdPage />} />
          </Route>
          <Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="blog/:id" element={<BlogIdPage />} />
            <Route path="blog/:id/comment" element={<BlogIdCommentPage />} />
            <Route path="author/:id" element={<AuthorIdPage />} />
          </Route>
          <Route path="me" element={<AuthProtectedRouter />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/update" element={<ProfileUpdatePage />} />
            <Route path="new-blog" element={<BlogNewAndUpdatePage />} />
            <Route path="update-blog/:id" element={<BlogNewAndUpdatePage />} />
            <Route element={<AuthLayout />}>
              <Route path="update-me" element={<UpdateMePage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
              <Route path="my-blogs">
                <Route index element={<PublishedPage />} />
                <Route path="draft" element={<DraftPage />} />
                <Route path="responses" element={<ResponsesPage />} />
              </Route>
              <Route path="activity">
                <Route index element={<HistoryPage />} />
                <Route path="bookmark" element={<BookmarkPage />} />
                <Route path="favorite" element={<FavoritePage />} />
                <Route path="comment" element={<CommentPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
