import "./App.css";
import HomePage from "pages/HomePage";
import Header from "components/Header";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <HomePage />
      <Toaster />
    </>
  );
}

export default App;
