import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { useFavoritos } from "../../context/useFavoritos"
import { useAuth } from "../../context/useAuth"

export default function CocheCard({ coche }) {
  const navigate = useNavigate()
  const { favoritos, toggleFavorito } = useFavoritos()
  const { isAuthenticated } = useAuth()

  const esFavorito = favoritos.includes(coche.id)

  const handleFavorito = (event) => {
    event.preventDefault()

    if (!isAuthenticated) {
      toast("Inicia sesion para guardar favoritos")
      navigate("/login")
      return
    }

    toggleFavorito(coche.id)
  }

  return (
    <Link to={`/coches/${coche.id}`}>
      <article className="relative rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.35)] transition">
        <button
          type="button"
          onClick={handleFavorito}
          className={`absolute top-2 left-2 text-xl transition ${
            esFavorito ? "text-yellow-400" : "text-zinc-500"
          } hover:scale-110`}
        >
          ★
        </button>

        <span
          className={`absolute top-2 right-2 rounded px-2 py-1 text-xs font-bold ${
            coche.tipo === "historico" ? "bg-white text-black" : "bg-red-500 text-black"
          }`}
        >
          {coche.tipo === "historico" ? "HISTORICO" : "ACTUAL"}
        </span>

        <img
          src={coche.imagen}
          alt={coche.nombre}
          className="h-44 w-full object-contain"
          onError={(event) => {
            event.target.src = "/vite.svg"
          }}
        />

        <h3 className="mt-2 text-lg font-bold text-red-400">{coche.nombre}</h3>
        <p className="text-sm text-zinc-200">{coche.escuderia} - {coche.año}</p>
        <p className="text-sm text-zinc-400">Pilotos: {coche.piloto}</p>
      </article>
    </Link>
  )
}
