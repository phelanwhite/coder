import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Champions from "pages/Champions";
import Items from "pages/Items";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/champions" element={<Champions />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
