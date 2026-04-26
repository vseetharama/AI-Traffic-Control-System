// main.jsx → Entry point of React application

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Renders App component into index.html (root div)
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);