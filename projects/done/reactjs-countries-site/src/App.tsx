import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import CountryIdPage from "./pages/CountryIdPage";

function App() {
  return (
    <div>
      <Header />
      <div className="py-8">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/:id" element={<CountryIdPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
