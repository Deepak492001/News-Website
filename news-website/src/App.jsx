// import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Layouts/Navbar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Categories from "./pages/Categories";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/general" element={<Categories category="general" />} />
          <Route
            path="/technology"
            element={<Categories category="technology" />}
          />
          <Route path="/science" element={<Categories category="science" />} />
          <Route path="/health" element={<Categories category="health" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
