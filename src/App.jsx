import { Routes, Route } from "react-router-dom";
import Home from "./templates/Home";
import About from "./templates/About";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={Home} />
        <Route path="/about" element={About} />
      </Routes>
    </>
  );
}

export default App;