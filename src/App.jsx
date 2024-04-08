import { Routes, Route } from "react-router-dom";
import Home from "./templates/Home/Home";
import About from "./templates/About/About";
import Header from "./templates/Header/Header";
import NotFound from "./templates/NotFound/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Header/>
    </>
  );
}

export default App;