import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Ensure SightReader script is loaded before React renders
const script = document.createElement("script");
script.src = "/js/sightreader.js";
script.async = true;
script.onload = () => {
  if (window.initializeSightReader) {
    window.initializeSightReader();
  }
};
document.body.appendChild(script);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
