import { useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/root/not-found-page";
import HomePage from "./pages/root/home-page";
import SigninSignupPage from "./pages/root/signin-signup-page";
import AuthorByIdPage from "./pages/root/author-by-id-page";
import BlogByIdPage from "./pages/root/blog-by-id-page";
import CommentsByBlogIdPage from "./pages/root/comments-by-blog-id-page";
import RootLayout from "./components/layouts/RootLayout";
import ButtonScrollBackToTop from "./components/layouts/button-scroll-back-to-top";
import Header from "./components/layouts/Header";
import CreateUpdateBlogPage from "./pages/auth/create-update-blog-page";
import StoriesPage from "./pages/auth/stories-page";
import DraftsPage from "./pages/auth/stories-page/DraftsPage";
import PublishedPage from "./pages/auth/stories-page/PublishedPage";
import ResponsesPage from "./pages/auth/stories-page/ResponsesPage";
import LibraryPage from "./pages/auth/library-page";
import ListsPage from "./pages/auth/library-page/ListsPage";
import HighlightsPage from "./pages/auth/library-page/HighlightsPage";
import ReadingHistoryPage from "./pages/auth/library-page/ReadingHistoryPage";
import SearchPage from "./pages/root/search-page";
import ProfilePage from "./pages/auth/profile-page";
import ProfileHomePage from "./pages/auth/profile-page/ProfileHomePage";
import ProfileAboutPage from "./pages/auth/profile-page/ProfileAboutPage";
import AuthProtectedRouter from "./components/layouts/AuthProtectedRouter";
import SavedPage from "./pages/auth/library-page/SavedPage";
import ListByIdPage from "./pages/auth/library-page/ListByIdPage";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div>
        <Header />
        <div className="py-6">
          <Routes>
            {/* root  */}
            <Route path="*" element={<NotFoundPage />} />
            <Route path="signin" element={<SigninSignupPage />} />
            <Route path="signup" element={<SigninSignupPage />} />
            <Route path="author-id/:id" element={<AuthorByIdPage />} />
            <Route path="blog-id/:slug/:id" element={<BlogByIdPage />} />
            <Route
              path="blog-id/:slug/:id/comments"
              element={<CommentsByBlogIdPage />}
            />

            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="tag" element={<SearchPage />} />
            </Route>

            <Route path="me" element={<AuthProtectedRouter />}>
              <Route path="new-story" element={<CreateUpdateBlogPage />} />
              <Route
                path="update-story/:id"
                element={<CreateUpdateBlogPage />}
              />
              <Route path="profile" element={<ProfilePage />}>
                <Route index element={<ProfileHomePage />} />
                <Route path="about" element={<ProfileAboutPage />} />
              </Route>
              <Route element={<RootLayout />}>
                <Route path="stories" element={<StoriesPage />}>
                  <Route path="drafts" element={<DraftsPage />} />
                  <Route path="published" element={<PublishedPage />} />
                  <Route path="responses" element={<ResponsesPage />} />
                </Route>
                <Route path="library" element={<LibraryPage />}>
                  <Route path="list" element={<ListsPage />} />
                  <Route path="saved" element={<SavedPage />} />
                  <Route path="highlights" element={<HighlightsPage />} />
                  <Route
                    path="reading-history"
                    element={<ReadingHistoryPage />}
                  />
                </Route>
                <Route path="library/list/:id" element={<ListByIdPage />} />
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
