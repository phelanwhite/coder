import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/public/HomePage";
import BlogIdPage from "./pages/public/BlogIdPage";
import Header from "./components/layout/Header";
import BookmarkPage from "./pages/auth/BookmarkPage";
import AuthLayout from "./components/layout/AuthLayout";
import MyBlogPage from "./pages/auth/MyBlogPage";
import PublishedPage from "./pages/auth/PublishedPage";
import DraftPage from "./pages/auth/DraftPage";
import BlogNewAndUpdatePage from "./pages/auth/BlogNewAndUpdatePage";
import AuthProtected from "./components/common/auth/AuthProtected";
import SearchPage from "./pages/public/SearchPage";
import AuthorIdPage from "./pages/public/AuthorIdPage";
import ActivityPage from "./pages/auth/ActivityPage";
import HistoryPage from "./pages/auth/HistoryPage";
import CommentPage from "./pages/auth/CommentPage";
import FavoritePage from "./pages/auth/FavoritePage";
import { useEffect } from "react";
import ButtonScrollBackToTop from "./components/form/button-scroll-back-to-top";
import CommentByBlogIdPage from "./pages/public/CommentByBlogIdPage";
import NotFoundPage from "./pages/public/NotFoundPage";
import ProfilePage from "./pages/auth/ProfilePage";
import ResponsesPage from "./pages/auth/ResponsesPage";
import TopicIdPage from "./pages/public/TopicIdPage";
import TopicPage from "./pages/public/TopicPage";
import ManagementPage from "./pages/auth/ManagementPage";
import AdminTopicPage from "./pages/admin/AdminTopicPage";
import AdminCommentPage from "./pages/admin/AdminCommentPage";
import AdminProtected from "./components/common/admin/AdminProtected";
import NotificationsPage from "./pages/auth/NotificationsPage";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div>
        <Header />
        <div className="my-8">
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="topic" element={<TopicPage />} />
            <Route path="topic/:id" element={<TopicIdPage />} />
            <Route path="blog/:id" element={<BlogIdPage />} />
            <Route path="blog/:id/comment" element={<CommentByBlogIdPage />} />
            <Route path="author/:id" element={<AuthorIdPage />} />

            <Route path="me" element={<AuthProtected />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="new-blog" element={<BlogNewAndUpdatePage />} />
              <Route
                path="update-blog/:id"
                element={<BlogNewAndUpdatePage />}
              />
              <Route element={<AuthLayout />}>
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="my-blogs" element={<MyBlogPage />}>
                  <Route index element={<DraftPage />} />
                  <Route path="published" element={<PublishedPage />} />
                  <Route path="responses" element={<ResponsesPage />} />
                </Route>
                <Route path="activity" element={<ActivityPage />}>
                  <Route index element={<HistoryPage />} />
                  <Route path="comment" element={<CommentPage />} />
                  <Route path="bookmark" element={<BookmarkPage />} />
                  <Route path="favorite" element={<FavoritePage />} />
                </Route>
              </Route>
            </Route>

            <Route path="admin" element={<AdminProtected />}>
              <Route element={<AuthLayout />}>
                <Route path="management" element={<ManagementPage />}>
                  <Route index element={<AdminTopicPage />} />
                  <Route path="comment" element={<AdminCommentPage />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
      <Toaster />
      <ButtonScrollBackToTop />
    </>
  );
}

export default App;
