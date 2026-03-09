import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { carsService } from "../services/carsService"

export default function CocheDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [coche, setCoche] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadCar = async () => {
      try {
        setLoading(true)
        const data = await carsService.getById(id)
        setCoche(data)
      } catch (err) {
        console.error(err)
        setError("Coche no encontrado")
      } finally {
        setLoading(false)
      }
    }

    loadCar()
  }, [id])

  if (loading) {
    return <p className="text-zinc-400">Cargando detalle...</p>
  }

  if (error || !coche) {
    return <p className="text-red-400">{error || "Coche no encontrado"}</p>
  }

  return (
    <section className="max-w-4xl mx-auto flex flex-col items-center gap-6">
      <span
        className={`px-4 py-1 text-sm font-bold rounded ${
          coche.tipo === "historico" ? "bg-white text-black" : "bg-red-500 text-black"
        }`}
      >
        {coche.tipo.toUpperCase()}
      </span>

      <img
        src={coche.imagen}
        alt={coche.nombre}
        className="w-full max-w-xl rounded-md border border-red-600 bg-zinc-900"
      />

      <h1 className="text-red-500 text-4xl font-black text-center max-[510px]:text-3xl">{coche.nombre}</h1>

      <p className="text-white text-lg">{coche.escuderia} - {coche.año}</p>
      <p className="text-zinc-400">Pilotos: {coche.piloto}</p>

      <button
        type="button"
        onClick={() => navigate("/coches")}
        className="mt-4 px-6 py-2 border border-red-600 text-red-500 hover:bg-red-600 hover:text-black transition font-bold"
      >
        Volver al catalogo
      </button>
    </section>
  )
}
