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
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminBlogsPage from "./pages/admin/AdminBlogsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminCommentsPage from "./pages/admin/AdminCommentsPage";
import AdminLayout from "./components/layout/layout/AdminLayout";
import AdminProtectedRouter from "./components/common/auth/AdminProtectedRouter";
import NotificationPage from "./pages/auth/NotificationPage";
import TopicPage from "./pages/TopicPage";
import SeriesPage from "./pages/auth/SeriesPage";
import ListPage from "./pages/auth/ListPage";
import ListNewAndUpdatePage from "./pages/auth/ListNewAndUpdatePage";
import ListIdPage from "./pages/auth/ListIdPage";

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
            <Route path="topic" element={<TopicPage />} />
            <Route path="topic/:id" element={<TopicIdPage />} />
          </Route>
          <Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="blog/:id" element={<BlogIdPage />} />
            <Route path="blog/:id/comment" element={<BlogIdCommentPage />} />
            <Route path="author/:id" element={<AuthorIdPage />} />
          </Route>
          <Route element={<AuthProtectedRouter />}>
            <Route path="me">
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/update" element={<ProfileUpdatePage />} />
              <Route path="new-list" element={<ListNewAndUpdatePage />} />
              <Route
                path="update-list/:id"
                element={<ListNewAndUpdatePage />}
              />
              <Route path="new-blog" element={<BlogNewAndUpdatePage />} />
              <Route
                path="update-blog/:id"
                element={<BlogNewAndUpdatePage />}
              />
              <Route path="list/:id" element={<ListIdPage />} />
              <Route element={<AuthLayout />}>
                <Route path="notifications" element={<NotificationPage />} />
                <Route path="update-me" element={<UpdateMePage />} />
                <Route
                  path="change-password"
                  element={<ChangePasswordPage />}
                />
                <Route path="my-blogs">
                  <Route index element={<PublishedPage />} />
                  <Route path="draft" element={<DraftPage />} />
                  <Route path="responses" element={<ResponsesPage />} />
                </Route>
                <Route path="my-activity">
                  <Route index element={<HistoryPage />} />
                  <Route path="bookmark" element={<BookmarkPage />} />
                  <Route path="favorite" element={<FavoritePage />} />
                  <Route path="comment" element={<CommentPage />} />
                </Route>
                <Route path="my-library">
                  <Route index element={<ListPage />} />
                  <Route path="series" element={<SeriesPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route element={<AdminProtectedRouter />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="blogs" element={<AdminBlogsPage />} />
              <Route path="comments" element={<AdminCommentsPage />} />
            </Route>
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
