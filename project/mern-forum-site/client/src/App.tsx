import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import HomePage from "./pages/public/home-page";
import NotFoundPage from "./pages/public/not-found-page";

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
