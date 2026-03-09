import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "../components/layout/MainLayout"
import ProtectedRoute from "./ProtectedRoute"

import Home from "../pages/Home"
import Coches from "../pages/Coches"
import CocheDetalle from "../pages/CocheDetalle"
import Favoritos from "../pages/Favoritos"
import Login from "../pages/Login"
import Perfil from "../pages/Perfil"
import Admin from "../pages/Admin"
import NotFound from "../pages/NotFound"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/coches" element={<Coches />} />
          <Route path="/coches/:id" element={<CocheDetalle />} />
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute roles={["user", "admin"]}>
                <Favoritos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute roles={["user", "admin"]}>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
