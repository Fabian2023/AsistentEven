import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./Components/Inicio";
import Avatar from "./Components/Avatar";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/avatar" element={<Avatar />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;