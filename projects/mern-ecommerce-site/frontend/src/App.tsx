import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "pages/public/home";
import ProductID from "pages/public/product";
import ProductByCategory from "pages/public/product-by-category";
import Search from "pages/public/search";
import Header from "layouts/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-id/:id" element={<ProductID />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/product-by-category/:id"
          element={<ProductByCategory />}
        />
      </Routes>
    </div>
  );
}

export default App;
