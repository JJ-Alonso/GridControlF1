import { NavLink, Outlet } from "react-router-dom"
import { useAuth } from "../../context/useAuth"

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${
    isActive ? "bg-red-600 text-black" : "text-white hover:bg-zinc-800"
  }`

export default function MainLayout() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 sticky top-0 z-40 bg-zinc-950/95 backdrop-blur">
        <div className="app-shell">
          <div className="flex min-h-16 items-center justify-between gap-4 max-[767px]:flex-col max-[767px]:items-start max-[767px]:py-3">
            <NavLink to="/" className="text-xl font-black tracking-wide text-red-500">
              GridControl F1
            </NavLink>

            <nav className="flex flex-wrap items-center gap-2">
              <NavLink to="/" className={linkClass}>
                Inicio
              </NavLink>
              <NavLink to="/coches" className={linkClass}>
                Coches
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/favoritos" className={linkClass}>
                  Favoritos
                </NavLink>
              )}
              {isAuthenticated && (
                <NavLink to="/perfil" className={linkClass}>
                  Usuario
                </NavLink>
              )}
              {user?.role === "admin" && (
                <NavLink to="/admin" className={linkClass}>
                  Admin
                </NavLink>
              )}
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-zinc-800 hover:bg-zinc-700"
                >
                  Salir
                </button>
              ) : (
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="app-shell py-8 max-[510px]:py-6">
        <Outlet />
      </main>
    </div>
  )
}
