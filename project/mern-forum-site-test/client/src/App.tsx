import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home-page";
import Header from "./components/layout/Header";
import BlogByIdPage from "./pages/blog-by-id-page";
import AuthLayout from "./components/layout/AuthLayout";
import StoriesPage from "./pages/stories-page";
import DraftsPage from "./pages/stories-page/DraftsPage";
import ResponsesPage from "./pages/stories-page/ResponsesPage";
import PublishedPage from "./pages/stories-page/PublishedPage";
import LibraryPage from "./pages/library-page";
import NotFoundPage from "./pages/not-found-page";
import ReadingHistoryPage from "./pages/library-page/ReadingHistoryPage";
import HighlightsPage from "./pages/library-page/HighlightsPage";
import SavedPage from "./pages/library-page/SavedPage";
import ListsPage from "./pages/library-page/ListsPage";
import NotificationsPage from "./pages/notifications-page";
import NotificationsAllPage from "./pages/notifications-page/NotificationsAllPage";
import NotificationsResponsesPage from "./pages/notifications-page/NotificationsResponsesPage";
import ProfilePage from "./pages/profile-page";
import ProfileHomePage from "./pages/profile-page/ProfileHomePage";
import ProfileAboutPage from "./pages/profile-page/ProfileAboutPage";
import { Toaster } from "react-hot-toast";
import CreateAndUpdateBlogPage from "./pages/create-and-update-blog-page";
import SearchPage from "./pages/search-page";
import ButtonScrollBackToTop from "./components/layout/ButtonScrollBackToTop";
import { useEffect } from "react";
import RootLayout from "./components/layout/RootLayout";
import TagsPage from "./pages/tags-page";
import AuthorByIdPage from "./pages/author-by-id-page";
import SigninSignupPage from "./pages/signin-signup-page";
import ListByIdPage from "./pages/list-by-id-page";
import Testpage from "./pages/Testpage";
import CommentByBlogIdPage from "./pages/comments-by-blog-id-page";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <Header />
      <div>
        <div className="py-8">
          <Routes>
            <Route path="test" element={<Testpage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="blog-id/:slug/:id" element={<BlogByIdPage />} />
            <Route
              path="blog-id/:slug/:id/comments"
              element={<CommentByBlogIdPage />}
            />
            <Route path="signin" element={<SigninSignupPage />} />
            <Route path="signup" element={<SigninSignupPage />} />
            {/* root  */}
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="tag" element={<TagsPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="author-id/:id" element={<AuthorByIdPage />} />
              <Route path="list-id/:id" element={<ListByIdPage />} />
            </Route>

            {/* auth  */}
            <Route path="me" element={<AuthLayout />}>
              <Route path="new-story" element={<CreateAndUpdateBlogPage />} />
              <Route
                path="update-story/:id"
                element={<CreateAndUpdateBlogPage />}
              />

              <Route path="profile" element={<ProfilePage />}>
                <Route index element={<ProfileHomePage />} />
                <Route path="about" element={<ProfileAboutPage />} />
              </Route>

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

              <Route path="notifications" element={<NotificationsPage />}>
                <Route index element={<NotificationsAllPage />} />
                <Route
                  path="responses"
                  element={<NotificationsResponsesPage />}
                />
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
