import React from "react";
import { Routes, Route } from "react-router-dom";
import Home2 from "./Components/Home2";
import Pricing2 from "./Components/Pricing2"; // ✅ Corrected import path

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home2 />} />
      <Route path="/Pricing2" element={<Pricing2 />} /> {/* ✅ New route */}
    </Routes>
  );
}

export default MainRoutes;
