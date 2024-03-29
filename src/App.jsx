import { Routes, Route } from "react-router-dom";
import Home from "./templates/Home";
import About from "./templates/About";
import Header from "./templates/Header";
import "./App.scss"
import NotFound from "./templates/NotFound";

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;