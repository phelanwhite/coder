import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";
import { PlayTrailerProvider } from "./contexts/PlayTrailerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ReactQueryProvider>
        <PlayTrailerProvider>
          <App />
        </PlayTrailerProvider>
      </ReactQueryProvider>
    </BrowserRouter>
  </StrictMode>
);
