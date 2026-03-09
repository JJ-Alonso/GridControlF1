import { Link } from "react-router-dom"
import { useAuth } from "../context/useAuth"

export default function Perfil() {
  const { user } = useAuth()

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-black text-red-500">Zona de usuario</h1>
      <p className="text-zinc-300">Sesion iniciada como: <strong>{user?.email}</strong> ({user?.role})</p>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
        <p className="text-zinc-300">Desde aqui puedes gestionar tus favoritos y navegar por el catalogo.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/coches" className="rounded-md border border-zinc-700 px-4 py-2 hover:bg-zinc-800">
            Ir al catalogo
          </Link>
          <Link to="/favoritos" className="rounded-md bg-red-600 px-4 py-2 font-semibold text-black hover:bg-red-500">
            Ver favoritos
          </Link>
        </div>
      </div>
    </section>
  )
}
