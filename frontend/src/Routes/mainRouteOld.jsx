import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./route";

function MainRoutes() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );  
} 

export default MainRoutes;
