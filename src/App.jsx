import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Router, Routes, Navigate, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/*" element={<Navigate to={"/homepage"} />} />
      <Route path="/" element={<Navigate to="/homepage" replace />} />
    </Routes>
  );
}

export default App;
