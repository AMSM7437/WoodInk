import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Router, Routes, Navigate, Route } from "react-router-dom";
import Homepage  from "./Pages/Homepage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/Homepage" element={<Homepage />} />
      <Route path="/" element={<Navigate to="/Homepage" replace />} />
    </Routes>
  );
}

export default App;
