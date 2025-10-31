import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // ✅ import here

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* ✅ AuthProvider wraps App */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
