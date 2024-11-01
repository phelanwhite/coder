import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TaskCreateUpdate from "./pages/TaskCreateUpdate";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="container p-4">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="create-task" element={<TaskCreateUpdate />} />
        <Route path="update-task/:id" element={<TaskCreateUpdate />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
