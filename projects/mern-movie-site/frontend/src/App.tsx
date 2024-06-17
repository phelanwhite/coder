import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "pages/Home";
import Header from "layouts/Header";
import Footer from "layouts/Footer";
import MediaId from "pages/MediaId";
import ActorId from "pages/ActorId";
import Search from "pages/Search";
import Movie from "pages/Movie";
import TvSeries from "pages/TvSeries";
import SigninAndSignup from "pages/SigninAndSignup";
import ViewMore from "pages/ViewMore";
import MediaFavorites from "pages/MediaFavorites";
import ActorFavorites from "pages/ActorFavorites";
import UpdateProfile from "pages/UpdateProfile";
import { useEffect } from "react";
import ProtectedWithAuth from "components/ProtectedWithAuth";

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
          <Route index element={<Home />} />
          <Route path="/media-id/:id" element={<MediaId />} />
          <Route path="/actor-id/:id" element={<ActorId />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/tv-series" element={<TvSeries />} />
          <Route path="/view-more" element={<ViewMore />} />
          <Route path="/signin" element={<SigninAndSignup />} />
          <Route path="/signup" element={<SigninAndSignup />} />
          <Route path="/" element={<ProtectedWithAuth />}>
            <Route path="/media-favorites" element={<MediaFavorites />} />
            <Route path="/actor-favorites" element={<ActorFavorites />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>
          {/* <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
