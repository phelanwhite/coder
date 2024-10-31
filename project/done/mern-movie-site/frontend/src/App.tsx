import { Route, Routes, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import MediaId from "./pages/MediaId";
import PersonId from "./pages/PersonId";
import Search from "./pages/Search";
import Header from "./components/Header";
import LoginAndRegister from "./pages/LoginAndRegister";
import Footer from "./components/Footer";
import MyList from "./pages/MyList";
import MyFavorite from "./pages/MyFavorite";
import MyListId from "./pages/MyListId";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import NotFound from "./pages/NotFound";
import AuthProvider from "./components/AuthProvider";
import CollectionId from "./pages/CollectionId";
import UpdateMe from "./pages/UpdateMe";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div>
      <Toaster />
      <Header />
      <div className="min-h-screen">
        <Routes>
          <Route index element={<Home />} />
          <Route path="media/:id" element={<MediaId />} />
          <Route path="person/:id" element={<PersonId />} />
          <Route path="collection/:id" element={<CollectionId />} />
          <Route path="search" element={<Search />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv-series" element={<TVSeries />} />
          <Route path="search" element={<Search />} />
          <Route path="login" element={<LoginAndRegister />} />
          <Route path="register" element={<LoginAndRegister />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<AuthProvider />}>
            <Route path="update-me" element={<UpdateMe />} />
            <Route path="my-list" element={<MyList />} />
            <Route path="my-list/:id" element={<MyListId />} />
            <Route path="my-favorite" element={<MyFavorite />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
