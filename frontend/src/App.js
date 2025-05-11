import React, { useEffect } from "react";
import AOS from "aos";
import "./App.css";
import "aos/dist/aos.css";
import MainRoutes from "./Routes/mainRoute";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000, // Duration of the animation
      easing: "ease-in-out", // Easing function for the animation
      once: false, // Set to false to allow animations to occur multiple times
      offset: 100, // Offset (in px) from the original trigger point
    });
  }, []);


  return (
    <MainRoutes />
  );
}

export default App;
