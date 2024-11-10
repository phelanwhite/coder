import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ReactQuillPage from "./pages/ReactQuillPage";
import ReactQuillNewPage from "./pages/ReactQuillNewPage";
import TiptapPage from "./pages/TiptapPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <div className="p-4">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/react-quill" element={<ReactQuillPage />} />
          <Route path="/react-quill-new" element={<ReactQuillNewPage />} />
          <Route path="/tiptap" element={<TiptapPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
