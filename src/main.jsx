import React from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "react-hot-toast"
import App from "./App"
import "./index.css"

import { AuthProvider } from "./context/AuthProvider"
import { FavoritosProvider } from "./context/FavoritosProvider"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <FavoritosProvider>
        <App />
        <Toaster position="top-right" />
      </FavoritosProvider>
    </AuthProvider>
  </React.StrictMode>
)
