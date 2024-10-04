import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QueryPage from "./pages/QueryPage";
import QueriesPage from "./pages/QueriesPage";
import InfiniteQueriesPage from "./pages/InfiniteQueriesPage";
import MutationPage from "./pages/MutationPage";

function App() {
  return (
    <>
      <Header />
      <div className="p-4">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="query" element={<QueryPage />} />
          <Route path="queries" element={<QueriesPage />} />
          <Route path="infinite-queries" element={<InfiniteQueriesPage />} />
          <Route path="mutation" element={<MutationPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
